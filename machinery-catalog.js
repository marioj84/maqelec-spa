(function () {
  "use strict";

  const catalog = window.MAQELEC_CATALOG;
  const mount = document.querySelector("[data-machine-grid]");
  if (!catalog?.machinery || !mount) return;

  const searchInput = document.querySelector("[data-machine-filter]");
  const statusSelect = document.querySelector("[data-machine-status]");
  const sortSelect = document.querySelector("[data-machine-sort]");
  const categoryMount = document.querySelector("[data-machine-categories]");
  const countMount = document.querySelector("[data-machine-count]");
  const emptyMount = document.querySelector("[data-machine-empty]");
  const realCountMount = document.querySelector("[data-machine-real-count]");
  const totalCountMount = document.querySelector("[data-machine-total-count]");
  const whatsappNumber = "56991514957";

  const state = {
    query: "",
    category: "all",
    status: "all",
    sort: "priority",
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function modalityLabel(value) {
    return {
      importacion: "Importación a pedido",
      stock: "Disponibilidad local",
      ambas: "Suministro local o importación",
    }[value] || "Disponibilidad por confirmar";
  }

  function experienceLabel(item) {
    return item.mediaType === "real"
      ? "Experiencia real MAQELEC"
      : "Configuración referencial";
  }

  function detailUrl(item) {
    return item.technicalSpecs && item.slug
      ? `maquina-${encodeURIComponent(item.slug)}.html`
      : `cotizar.html?tipo=maquinaria&equipo=${encodeURIComponent(item.id)}`;
  }

  function quoteUrl(item) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hola MAQELEC, quiero evaluar el equipo: ${item.name}`,
    )}`;
  }

  function searchableText(item) {
    return normalize([
      item.name,
      item.category,
      item.summary,
      ...(item.specs || []),
      ...(item.operations || []),
    ].join(" "));
  }

  function machineCard(item) {
    const specs = (item.specs || [])
      .slice(0, 3)
      .map((spec) => `<li>${escapeHTML(spec)}</li>`)
      .join("");
    const hasDetail = Boolean(item.technicalSpecs && item.slug);
    const mediaClass = item.mediaType === "real" ? "is-real" : "is-reference";
    const primaryLabel = hasDetail ? "Ver ficha técnica" : "Solicitar configuración";

    return `
      <article class="machine-catalog-card" data-machine-id="${escapeHTML(item.id)}">
        <div class="machine-card-media">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || item.name)}" loading="lazy" decoding="async">
          <div class="machine-card-badges">
            <span class="machine-card-badge ${mediaClass}">${escapeHTML(experienceLabel(item))}</span>
            ${hasDetail ? '<span class="machine-card-badge">Ficha técnica</span>' : '<span class="machine-card-badge">A configurar</span>'}
          </div>
        </div>
        <div class="machine-card-body">
          <span class="machine-card-category">${escapeHTML(item.category)}</span>
          <h3>${escapeHTML(item.name)}</h3>
          <p class="machine-card-summary">${escapeHTML(item.summary)}</p>
          ${specs ? `<ul class="machine-card-specs">${specs}</ul>` : ""}
          <div class="machine-card-commercial">${escapeHTML(modalityLabel(item.modality))}</div>
          <div class="machine-card-actions">
            <a href="${detailUrl(item)}">${primaryLabel}</a>
            <a href="${quoteUrl(item)}" target="_blank" rel="noopener noreferrer" aria-label="Cotizar ${escapeHTML(item.name)} por WhatsApp">Cotizar</a>
          </div>
        </div>
      </article>`;
  }

  function categories() {
    return [...new Set(catalog.machinery.map((item) => item.category))]
      .sort((a, b) => a.localeCompare(b, "es"));
  }

  function renderCategories() {
    if (!categoryMount) return;
    const options = ["all", ...categories()];
    categoryMount.innerHTML = options
      .map((category) => {
        const label = category === "all" ? "Todas" : category;
        const active = state.category === category;
        return `<button type="button" class="${active ? "is-active" : ""}" data-machine-category="${escapeHTML(category)}" aria-pressed="${String(active)}">${escapeHTML(label)}</button>`;
      })
      .join("");

    categoryMount.querySelectorAll("[data-machine-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.category = button.dataset.machineCategory || "all";
        renderCategories();
        render();
      });
    });
  }

  function filteredItems() {
    const items = catalog.machinery.filter((item) => {
      const matchesQuery = !state.query || searchableText(item).includes(normalize(state.query));
      const matchesCategory = state.category === "all" || item.category === state.category;
      const matchesStatus = state.status === "all"
        || (state.status === "real" && item.mediaType === "real")
        || (state.status === "reference" && item.mediaType !== "real")
        || (state.status === "detail" && Boolean(item.technicalSpecs));
      return matchesQuery && matchesCategory && matchesStatus;
    });

    return items.sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name, "es");
      if (state.sort === "category") {
        return a.category.localeCompare(b.category, "es") || a.name.localeCompare(b.name, "es");
      }
      const score = (item) => {
        let value = 0;
        if (item.mediaType === "real") value += 4;
        if (item.technicalSpecs) value += 2;
        if (item.status === "live") value += 1;
        return value;
      };
      return score(b) - score(a) || a.name.localeCompare(b.name, "es");
    });
  }

  function render() {
    const items = filteredItems();
    mount.innerHTML = items.map(machineCard).join("");
    if (countMount) {
      countMount.textContent = `${items.length} ${items.length === 1 ? "equipo visible" : "equipos visibles"}`;
    }
    if (emptyMount) emptyMount.hidden = items.length !== 0;
  }

  function bindControls() {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";
    state.query = initialQuery;
    if (searchInput) {
      searchInput.value = initialQuery;
      searchInput.addEventListener("input", () => {
        state.query = searchInput.value;
        render();
      });
    }
    statusSelect?.addEventListener("change", () => {
      state.status = statusSelect.value;
      render();
    });
    sortSelect?.addEventListener("change", () => {
      state.sort = sortSelect.value;
      render();
    });
  }

  function setSummary() {
    const real = catalog.machinery.filter((item) => item.mediaType === "real").length;
    if (realCountMount) realCountMount.textContent = String(real);
    if (totalCountMount) totalCountMount.textContent = String(catalog.machinery.length);
  }

  bindControls();
  setSummary();
  renderCategories();
  render();
})();
