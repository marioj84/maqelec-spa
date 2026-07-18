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
    const visual = item.image
      ? `<div class="machine-visual machine-visual-photo">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy">
          <span>${item.mediaType === "real" ? "Equipo real" : "Imagen referencial"}</span>
        </div>`
      : `<div class="machine-visual" aria-hidden="true">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>`;
    const statusLabel =
      item.status === "live" ? "Equipo real" : "Ficha en preparación";
    return `
      <article class="catalog-card machine-card" data-searchable="${escapeHTML(
        [item.name, item.category, item.summary, ...item.specs].join(" "),
      )}">
        ${visual}
        <div class="catalog-card-body">
          <div class="card-meta"><span>${escapeHTML(item.category)}</span><span class="status-pill">${statusLabel}</span></div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <ul>${specs}</ul>
          <div class="card-footer">
            <b>${escapeHTML(modalityLabel(item.modality))}</b>
            <div class="card-links">
              ${item.technicalSpecs ? `<a href="maquina.html?id=${encodeURIComponent(item.id)}">Ver ficha técnica →</a>` : ""}
              <a href="${whatsappLink(`Hola MAQELEC, quiero cotizar: ${item.name}`)}" target="_blank" rel="noopener noreferrer">Cotizar equipo →</a>
            </div>
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
    const visual = item.image
      ? `<div class="machine-teaser-visual machine-teaser-photo">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy">
          <span>${item.mediaType === "real" ? "Equipo real" : "Imagen referencial"}</span>
        </div>`
      : `<div class="machine-teaser-visual" aria-hidden="true">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>`;
    return `
      <a class="machine-teaser" href="${item.technicalSpecs ? `maquina.html?id=${encodeURIComponent(item.id)}` : "maquinaria.html"}" data-searchable="${escapeHTML(
        [item.name, item.category].join(" "),
      )}">
        ${visual}
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
    const steps = (item.processSteps || [])
      .map((step) => `<li>${escapeHTML(step)}</li>`)
      .join("");
    return `
      <article id="${escapeHTML(item.id)}" class="project-card${gallery ? " project-card-featured" : ""}" data-searchable="${escapeHTML(
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
          ${steps ? `<ol class="project-steps">${steps}</ol>` : ""}
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
        href: item.technicalSpecs
          ? `maquina.html?id=${encodeURIComponent(item.id)}`
          : "maquinaria.html",
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

  function renderMachineDetail() {
    const mount = document.querySelector("[data-machine-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const requested = params.get("id") || "";
    const item = data.machinery.find(
      (machine) => machine.id === requested || machine.slug === requested,
    );

    if (!item || !item.technicalSpecs) {
      mount.innerHTML = `
        <div class="machine-not-found">
          <span class="eyebrow">Ficha no disponible</span>
          <h1>No encontramos esta máquina</h1>
          <p>La ficha puede estar en preparación o el enlace no corresponde a un equipo publicado.</p>
          <a class="button primary" href="maquinaria.html">Volver a maquinaria</a>
        </div>`;
      return;
    }

    document.title = `${item.name} | MAQELEC`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = item.summary;

    const gallery = (item.gallery || [{ src: item.image, alt: item.imageAlt }])
      .map(
        (image, index) => `
          <button class="machine-gallery-thumb${index === 0 ? " is-active" : ""}" type="button" data-gallery-src="${escapeHTML(image.src)}" data-gallery-alt="${escapeHTML(image.alt || "")}" aria-label="Ver imagen ${index + 1} de ${escapeHTML(item.name)}">
            <img src="${escapeHTML(image.src)}" alt="" loading="lazy">
          </button>`,
      )
      .join("");
    const facts = (item.keyFacts || [])
      .map(
        (fact) => `<div><strong>${escapeHTML(fact.value)}</strong><span>${escapeHTML(fact.label)}</span></div>`,
      )
      .join("");
    const paragraphs = (item.description || [item.summary])
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join("");
    const operations = (item.operations || [])
      .map((operation) => `<li>${escapeHTML(operation)}</li>`)
      .join("");
    const specs = item.technicalSpecs
      .map(
        (spec) => `<div class="spec-row"><dt>${escapeHTML(spec.label)}</dt><dd>${escapeHTML(spec.value)}</dd></div>`,
      )
      .join("");
    const services = (item.includedServices || [])
      .map((service) => `<li>${escapeHTML(service)}</li>`)
      .join("");
    const quoteUrl = whatsappLink(
      `Hola MAQELEC, quiero cotizar el equipo ${item.name}. Necesito información sobre configuración, entrega e instalación.`,
    );

    mount.innerHTML = `
      <section class="machine-detail-hero">
        <div class="ma-container">
          <nav class="machine-breadcrumb" aria-label="Ruta de navegación">
            <a href="index.html">Inicio</a><span>/</span><a href="maquinaria.html">Maquinaria</a><span>/</span><b>${escapeHTML(item.name)}</b>
          </nav>
          <div class="machine-product-layout">
            <div class="machine-gallery">
              <div class="machine-gallery-main">
                <img data-gallery-main src="${escapeHTML(item.gallery?.[0]?.src || item.image)}" alt="${escapeHTML(item.gallery?.[0]?.alt || item.imageAlt || "")}">
                <span>Fotografías reales del equipo y su operación</span>
              </div>
              <div class="machine-gallery-thumbs">${gallery}</div>
            </div>
            <div class="machine-product-copy">
              <div class="machine-product-labels"><span>Equipo real</span><small>${escapeHTML(item.category)}</small></div>
              <h1>${escapeHTML(item.name)}</h1>
              <p class="machine-product-summary">${escapeHTML(item.summary)}</p>
              <div class="machine-key-facts">${facts}</div>
              <div class="machine-commercial-note">
                <strong>${escapeHTML(modalityLabel(item.modality))}</strong>
                <p>Configuramos la propuesta según proceso, material, energía disponible, accesorios y condiciones de instalación.</p>
              </div>
              <div class="hero-actions">
                <a class="button primary" href="${quoteUrl}" target="_blank" rel="noopener noreferrer">Cotizar este equipo</a>
                ${item.projectId ? `<a class="button secondary" href="proyectos.html#${escapeHTML(item.projectId)}">Ver trabajo real</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="machine-detail-nav-section">
        <div class="ma-container machine-detail-nav">
          <a href="#descripcion">Descripción</a>
          <a href="#operaciones">Operaciones</a>
          <a href="#especificaciones">Especificaciones</a>
          <a href="#acompanamiento">Venta y soporte</a>
        </div>
      </section>

      <section id="descripcion" class="machine-detail-section">
        <div class="ma-container machine-description-grid">
          <div>
            <span class="eyebrow">Descripción del equipo</span>
            <h2>Una máquina que conocemos trabajando</h2>
          </div>
          <div class="machine-prose">${paragraphs}</div>
        </div>
      </section>

      <section id="operaciones" class="machine-detail-section machine-detail-soft">
        <div class="ma-container machine-two-column">
          <div>
            <span class="eyebrow">Aplicaciones</span>
            <h2>Procesos que puede realizar</h2>
            <p>La capacidad efectiva depende del material, la herramienta instalada y la configuración seleccionada.</p>
          </div>
          <ul class="machine-operation-list">${operations}</ul>
        </div>
      </section>

      <section id="especificaciones" class="machine-detail-section">
        <div class="ma-container machine-spec-layout">
          <div class="machine-spec-heading">
            <span class="eyebrow">Datos técnicos</span>
            <h2>Especificaciones del modelo</h2>
            <p>${escapeHTML(item.source?.note || "Valores referenciales sujetos a confirmación.")}</p>
            ${item.source ? `<a class="source-link" href="${escapeHTML(item.source.url)}" target="_blank" rel="noopener noreferrer">Consultar ${escapeHTML(item.source.name)} ↗</a>` : ""}
          </div>
          <dl class="machine-spec-table">${specs}</dl>
        </div>
      </section>

      <section id="acompanamiento" class="machine-detail-section machine-support-section">
        <div class="ma-container machine-support-grid">
          <div>
            <span class="eyebrow">Acompañamiento MAQELEC</span>
            <h2>No entregamos solo una máquina</h2>
            <p>La propuesta puede contemplar el recorrido completo, desde la selección hasta la operación del equipo.</p>
          </div>
          <ul>${services}</ul>
          <div class="machine-support-cta">
            <strong>Cuéntanos qué necesitas fabricar</strong>
            <p>Con material, medidas, producción esperada y energía disponible podemos orientar la configuración.</p>
            <a class="button primary" href="${quoteUrl}" target="_blank" rel="noopener noreferrer">Hablar con MAQELEC</a>
          </div>
        </div>
      </section>`;

    const mainImage = mount.querySelector("[data-gallery-main]");
    mount.querySelectorAll("[data-gallery-src]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!mainImage) return;
        mainImage.src = button.dataset.gallerySrc;
        mainImage.alt = button.dataset.galleryAlt || "";
        mount
          .querySelectorAll("[data-gallery-src]")
          .forEach((thumb) => thumb.classList.toggle("is-active", thumb === button));
      });
    });
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
    renderMachineDetail();
    bindRequirementForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
