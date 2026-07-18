(function () {
  "use strict";

  const config = window.MAQELEC_SITE_CONFIG;
  const validStates = new Set(["off", "preview", "live"]);

  if (!config || !config.features || !config.dependencies) {
    console.error(
      "MAQELEC: no se encontró una configuración de funciones válida.",
    );
    return;
  }

  function getFeature(name) {
    return config.features[name] || null;
  }

  function getMissingDependencies(name) {
    const feature = getFeature(name);
    if (!feature) return [];

    return (feature.dependencies || []).filter((dependencyName) => {
      const dependency = config.dependencies[dependencyName];
      return !dependency || dependency.ready !== true;
    });
  }

  function getEffectiveState(name) {
    const feature = getFeature(name);
    if (!feature || !validStates.has(feature.state)) return "off";
    if (feature.state !== "live") return feature.state;

    return getMissingDependencies(name).length ? "preview" : "live";
  }

  function getCurrentPageFeature() {
    const explicitFeature = document.body.dataset.pageFeature;
    if (explicitFeature) return explicitFeature;

    const pageName = window.location.pathname.split("/").pop() || "index.html";
    return config.pages[pageName] || null;
  }

  function markConfiguredElements() {
    Object.entries(config.features).forEach(([name, feature]) => {
      (feature.selectors || []).forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (!element.dataset.feature) element.dataset.feature = name;
        });
      });
    });
  }

  function clearGeneratedIndicators() {
    document
      .querySelectorAll("[data-feature-generated]")
      .forEach((element) => element.remove());

    document
      .querySelectorAll("[data-feature-page-hidden]")
      .forEach((element) => {
        element.hidden = false;
        delete element.dataset.featurePageHidden;
      });
  }

  function createBadge(name) {
    const badge = document.createElement("span");
    badge.className = "mq-feature-badge";
    badge.dataset.featureGenerated = name;
    badge.textContent = "Vista previa";
    return badge;
  }

  function createPreviewNote(name, message) {
    const note = document.createElement("div");
    note.className = "mq-feature-note";
    note.dataset.featureGenerated = name;
    note.innerHTML = `<strong>En preparación</strong><span>${message}</span>`;
    return note;
  }

  function applyElementStates() {
    document.querySelectorAll("[data-feature]").forEach((element) => {
      const name = element.dataset.feature;
      const feature = getFeature(name);
      const state = getEffectiveState(name);

      if (!feature) return;

      element.hidden = state === "off";
      element.dataset.featureState = state;

      if (state !== "preview") return;

      if (
        feature.navBadge !== false &&
        element.matches("nav a, footer a, .ma-menu a")
      ) {
        element.appendChild(createBadge(name));
      }

      if (element.matches("section")) {
        const container = element.querySelector(".ma-container, .container");
        if (container) {
          container.prepend(
            createPreviewNote(
              name,
              feature.previewMessage ||
                "Este módulo todavía utiliza contenido de demostración.",
            ),
          );
        }
      }
    });
  }

  function renderUnavailablePage(name) {
    const feature = getFeature(name);
    const main = document.querySelector("main");
    const unavailable = document.createElement("section");
    unavailable.className = "mq-feature-unavailable";
    unavailable.dataset.featureGenerated = name;
    unavailable.innerHTML = `
        <div class="container">
          <span class="mq-feature-kicker">Módulo desactivado</span>
          <h1>${feature.label}</h1>
          <p>Esta función todavía no está disponible. Se activará cuando sus contenidos y dependencias estén validados.</p>
          <a class="btn" href="index.html">Volver al inicio</a>
        </div>`;

    if (main) {
      main.hidden = true;
      main.dataset.featurePageHidden = "true";
      main.before(unavailable);
    } else {
      document.body.appendChild(unavailable);
    }
  }

  function renderPageState() {
    const name = getCurrentPageFeature();
    if (!name) return;

    const feature = getFeature(name);
    const state = getEffectiveState(name);
    document.body.dataset.pageFeatureState = state;

    if (state === "off") {
      renderUnavailablePage(name);
      return;
    }

    if (state === "preview") {
      const target =
        document.querySelector(".page-intro .ma-container") ||
        document.querySelector(".page-hero .ma-container") ||
        document.querySelector(".page-hero .container") ||
        document.querySelector("main .ma-container") ||
        document.querySelector("main .container");
      if (target) {
        target.prepend(
          createPreviewNote(
            name,
            feature.previewMessage ||
              "Este módulo todavía utiliza contenido de demostración.",
          ),
        );
      }

      document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.setAttribute("aria-disabled", "true");
        link.classList.add("mq-feature-disabled-action");
        link.textContent = "Próximamente";
        link.addEventListener("click", (event) => event.preventDefault());
      });
    }
  }

  function getReport() {
    return Object.entries(config.features).map(([name, feature]) => ({
      feature: name,
      label: feature.label,
      configuredState: feature.state,
      effectiveState: getEffectiveState(name),
      missingDependencies: getMissingDependencies(name),
    }));
  }

  function apply() {
    clearGeneratedIndicators();
    markConfiguredElements();
    applyElementStates();
    renderPageState();
  }

  window.MAQELEC_FEATURES = {
    apply,
    getFeature,
    getState: getEffectiveState,
    getMissingDependencies,
    getReport,
    setState(name, state) {
      if (!getFeature(name) || !validStates.has(state)) return false;
      config.features[name].state = state;
      apply();
      return true;
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
})();
