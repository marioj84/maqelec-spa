(function () {
  "use strict";

  const data = window.MAQELEC_CATALOG;
  const whatsappNumber = "56991514957";

  if (!data) return;

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
      .toLowerCase();
  }

  function modalityLabel(value) {
    return (
      {
        importacion: "Importación a pedido",
        stock: "Disponibilidad local",
        ambas: "Local o importación",
      }[value] || "A confirmar"
    );
  }

  function whatsappLink(message) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function machineCard(item) {
    const specs = item.specs
      .map((spec) => `<li>${escapeHTML(spec)}</li>`)
      .join("");
    return `
      <article class="catalog-card machine-card" data-searchable="${escapeHTML(
        [item.name, item.category, item.summary, ...item.specs].join(" "),
      )}">
        <div class="machine-visual" aria-hidden="true">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>
        <div class="catalog-card-body">
          <div class="card-meta"><span>${escapeHTML(item.category)}</span><span class="status-pill">Ficha en preparación</span></div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <ul>${specs}</ul>
          <div class="card-footer">
            <b>${escapeHTML(modalityLabel(item.modality))}</b>
            <a href="${whatsappLink(`Hola MAQELEC, quiero cotizar: ${item.name}`)}" target="_blank" rel="noopener noreferrer">Consultar equipo →</a>
          </div>
        </div>
      </article>`;
  }

  function serviceCard(item) {
    const mediaLabel =
      item.mediaType === "real"
        ? '<span class="real-media-label">Trabajo real</span>'
        : '<span>Imagen referencial de maqueta</span>';
    return `
      <article class="catalog-card service-card" data-searchable="${escapeHTML(
        [item.name, item.category, item.summary].join(" "),
      )}">
        <div class="service-image">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy">
          ${mediaLabel}
        </div>
        <div class="catalog-card-body">
          <div class="card-meta"><span>${escapeHTML(item.category)}</span></div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <a class="text-link" href="${whatsappLink(`Hola MAQELEC, necesito cotizar el servicio: ${item.name}`)}" target="_blank" rel="noopener noreferrer">Cotizar servicio →</a>
        </div>
      </article>`;
  }

  function compactMachineCard(item) {
    return `
      <a class="machine-teaser" href="maquinaria.html" data-searchable="${escapeHTML(
        [item.name, item.category].join(" "),
      )}">
        <div class="machine-teaser-visual">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>
        <div class="machine-teaser-copy">
          <small>${escapeHTML(modalityLabel(item.modality))}</small>
          <h3>${escapeHTML(item.name)}</h3>
          <b>Consultar equipo →</b>
        </div>
      </a>`;
  }

  function projectCard(item) {
    const gallery = (item.gallery || [])
      .map(
        (image) =>
          `<img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || "")}" loading="lazy">`,
      )
      .join("");
    return `
      <article class="project-card${gallery ? " project-card-featured" : ""}" data-searchable="${escapeHTML(
        [item.title, item.type, item.summary].join(" "),
      )}">
        <div class="project-media">
          <img class="project-main-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy">
          ${gallery ? `<div class="project-gallery">${gallery}</div>` : ""}
        </div>
        <div class="project-copy">
          <span class="status-pill">Trabajo real</span>
          <small>${escapeHTML(item.type)}</small>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.summary)}</p>
        </div>
      </article>`;
  }

  function renderCollection(selector, items, renderItem, limit) {
    const mount = document.querySelector(selector);
    if (!mount) return;
    mount.innerHTML = items
      .slice(0, limit || items.length)
      .map(renderItem)
      .join("");
  }

  function filterGrid(inputSelector, gridSelector, emptySelector) {
    const input = document.querySelector(inputSelector);
    const grid = document.querySelector(gridSelector);
    const empty = document.querySelector(emptySelector);
    if (!input || !grid) return;

    const apply = () => {
      const query = normalize(input.value.trim());
      let visible = 0;
      grid.querySelectorAll("[data-searchable]").forEach((card) => {
        const matches =
          !query || normalize(card.dataset.searchable).includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    };

    input.addEventListener("input", apply);
    apply();
  }

  function renderUnifiedSearch() {
    const mount = document.querySelector("[data-unified-results]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.trim() || "";
    const input = document.querySelector("[data-unified-input]");
    if (input) input.value = query;

    const records = [
      ...data.machinery.map((item) => ({
        type: "Maquinaria",
        href: "maquinaria.html",
        title: item.name,
        text: item.summary,
        searchable: [
          item.name,
          item.category,
          item.summary,
          ...item.specs,
        ].join(" "),
      })),
      ...data.services.map((item) => ({
        type: "Servicio",
        href: "servicios.html",
        title: item.name,
        text: item.summary,
        searchable: [item.name, item.category, item.summary].join(" "),
      })),
      ...data.projects.map((item) => ({
        type: "Proyecto",
        href: "proyectos.html",
        title: item.title,
        text: item.summary,
        searchable: [item.title, item.type, item.summary].join(" "),
      })),
    ];

    const matches = query
      ? records.filter((item) =>
          normalize(item.searchable).includes(normalize(query)),
        )
      : records;

    const count = document.querySelector("[data-result-count]");
    if (count)
      count.textContent = query
        ? `${matches.length} resultado(s) para “${query}”`
        : "Explora el catálogo o escribe una máquina, repuesto, servicio o código.";

    mount.innerHTML = matches.length
      ? matches
          .map(
            (item) => `
          <a class="search-result" href="${item.href}">
            <span>${escapeHTML(item.type)}</span>
            <div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>
            <b aria-hidden="true">→</b>
          </a>`,
          )
          .join("")
      : `<div class="empty-state"><strong>No encontramos una ficha publicada.</strong><p>Puede tratarse de un repuesto por código o de un equipo que todavía no está cargado. Envíanos el dato y lo buscamos.</p><a class="button primary" href="${whatsappLink(`Hola MAQELEC, necesito buscar: ${query}`)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a></div>`;
  }

  function bindRequirementForms() {
    document.querySelectorAll("[data-requirement-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const type = formData.get("type") || "requerimiento industrial";
        const search = formData.get("search") || "Sin código o modelo indicado";
        const company = formData.get("company") || "Sin empresa indicada";
        window.open(
          whatsappLink(
            `Hola MAQELEC, necesito cotizar ${type}. Empresa: ${company}. Detalle/código: ${search}.`,
          ),
          "_blank",
          "noopener,noreferrer",
        );
      });
    });
  }

  function init() {
    renderCollection("[data-machine-grid]", data.machinery, machineCard);
    renderCollection(
      "[data-featured-machines]",
      data.machinery,
      machineCard,
      3,
    );
    renderCollection(
      "[data-machine-showcase]",
      data.machinery,
      compactMachineCard,
      4,
    );
    renderCollection("[data-service-grid]", data.services, serviceCard);
    renderCollection("[data-featured-services]", data.services, serviceCard, 3);
    renderCollection("[data-project-grid]", data.projects, projectCard);
    renderCollection("[data-featured-projects]", data.projects, projectCard, 2);
    filterGrid(
      "[data-machine-filter]",
      "[data-machine-grid]",
      "[data-machine-empty]",
    );
    filterGrid(
      "[data-service-filter]",
      "[data-service-grid]",
      "[data-service-empty]",
    );
    renderUnifiedSearch();
    bindRequirementForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
