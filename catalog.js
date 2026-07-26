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

  function machinePageUrl(item) {
    return item.technicalSpecs && item.slug
      ? `maquina-${encodeURIComponent(item.slug)}.html`
      : "maquinaria.html";
  }

  function servicePageUrl(item) {
    return item.page || (item.slug ? `servicio-${encodeURIComponent(item.slug)}.html` : "servicios.html");
  }

  function projectPageUrl(item) {
    return item.id ? `proyecto-${encodeURIComponent(item.id.replace(/^proy-/, ""))}.html` : "proyectos.html";
  }

  function machineCard(item) {
    const specs = item.specs
      .map((spec) => `<li>${escapeHTML(spec)}</li>`)
      .join("");
    const visual = item.image
      ? `<div class="machine-visual machine-visual-photo">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy" decoding="async">
        </div>`
      : `<div class="machine-visual" aria-hidden="true">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>`;
    return `
      <article id="${escapeHTML(item.id)}" class="catalog-card machine-card" data-searchable="${escapeHTML(
        [item.name, item.category, item.summary, ...item.specs].join(" "),
      )}">
        ${visual}
        <div class="catalog-card-body">
          <div class="card-meta"><span>${escapeHTML(item.category)}</span></div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <ul>${specs}</ul>
          <div class="card-footer">
            <b>${escapeHTML(modalityLabel(item.modality))}</b>
            <div class="card-links">
              ${item.technicalSpecs ? `<a href="${machinePageUrl(item)}">Ver ficha técnica →</a>` : ""}
              <a href="${whatsappLink(`Hola MAQELEC, quiero cotizar: ${item.name}`)}" target="_blank" rel="noopener noreferrer">Cotizar equipo →</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function serviceCard(item) {
    const hasPhoto = Boolean(item.image);
    if (!hasPhoto) {
      return `
        <article id="${escapeHTML(item.id)}" class="catalog-card service-card service-card-text${item.featuredSupport ? " is-support" : ""}" data-searchable="${escapeHTML(
          [item.name, item.category, item.summary].join(" "),
        )}">
          <div class="catalog-card-body">
            <div class="card-meta"><span>${escapeHTML(item.category)}</span><span>Disponible a consulta</span></div>
            <h3>${escapeHTML(item.name)}</h3>
            <p>${escapeHTML(item.summary)}</p>
            <a class="text-link" href="${servicePageUrl(item)}">Ver servicio →</a>
          </div>
        </article>`;
    }
    return `
      <article id="${escapeHTML(item.id)}" class="catalog-card service-card${item.featuredSupport ? " is-support" : ""}" data-searchable="${escapeHTML(
        [item.name, item.category, item.summary].join(" "),
      )}">
        <div class="service-image">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy" decoding="async"${item.imagePosition ? ` style="object-position:${escapeHTML(item.imagePosition)}"` : ""}>
        </div>
        <div class="catalog-card-body">
          <div class="card-meta"><span>${escapeHTML(item.category)}</span></div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <div class="card-links"><a class="text-link" href="${servicePageUrl(item)}">Ver servicio →</a><a class="text-link" href="${whatsappLink(`Hola MAQELEC, necesito cotizar el servicio: ${item.name}`)}" target="_blank" rel="noopener noreferrer">Consultar →</a></div>
        </div>
      </article>`;
  }

  function compactMachineCard(item) {
    const visual = item.image
      ? `<div class="machine-teaser-visual machine-teaser-photo">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy">
        </div>`
      : `<div class="machine-teaser-visual" aria-hidden="true">
          <span>${escapeHTML(item.category)}</span>
          <strong>MAQELEC</strong>
        </div>`;
    return `
      <a class="machine-teaser" href="${machinePageUrl(item)}" data-searchable="${escapeHTML(
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
          `<img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || "")}" loading="lazy" decoding="async">`,
      )
      .join("");
    const steps = (item.processSteps || [])
      .map((step) => `<li>${escapeHTML(step)}</li>`)
      .join("");
    const caseStudy = projectCaseStudy(item);
    return `
      <article id="${escapeHTML(item.id)}" class="project-card" data-searchable="${escapeHTML(
        [item.title, item.type, item.summary, item.location].join(" "),
      )}">
        <div class="project-media">
          <img class="project-main-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || "")}" loading="lazy" decoding="async">
          ${gallery ? `<div class="project-gallery">${gallery}</div>` : ""}
        </div>
        <div class="project-copy">
          <small>${escapeHTML(item.type)}</small>
          ${item.location ? `<span class="project-location">${escapeHTML(item.location)}</span>` : ""}
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <dl class="case-study-summary">
            <div><dt>Necesidad</dt><dd>${escapeHTML(caseStudy.need)}</dd></div>
            <div><dt>Equipos</dt><dd>${escapeHTML(caseStudy.equipment)}</dd></div>
            <div><dt>Resultado</dt><dd>${escapeHTML(caseStudy.result)}</dd></div>
          </dl>
          ${steps ? `<details class="project-process"><summary>Ver proceso paso a paso</summary><ol class="project-steps">${steps}</ol></details>` : ""}
          <a class="text-link" href="${projectPageUrl(item)}">Abrir caso documentado →</a>
        </div>
      </article>`;
  }

  function projectCaseStudy(item) {
    const studies = {
      "proy-pulido-terminacion": { need: "Eliminar rebabas y dejar bordes seguros para armado o entrega.", equipment: "Esmeril angular y herramientas de terminación.", result: "Piezas limpias, uniformes y listas para la siguiente etapa." },
      "proy-corte-plasma-cnc": { need: "Obtener geometrías repetibles desde una plancha metálica.", equipment: "Mesa plasma CNC con control automático de altura F1621.", result: "Cortes programados y piezas identificadas para fabricación." },
      "proy-punzonado-hidraulico": { need: "Perforar, recortar y preparar material con distintas geometrías.", equipment: "Punzonadora y cizalla hidráulica combinada Q35Y-20.", result: "Piezas preparadas para mecanizado, armado o entrega." },
      "proy-torneado-cilindrado": { need: "Convertir un perfil inicial en una geometría cilíndrica controlada.", equipment: "Torno convencional C0636B y sistema de lubricación.", result: "Diámetro exterior mecanizado y terminación uniforme." },
      "proy-yegua-industrial": { need: "Crear un carro manual resistente para carga y traslado.", equipment: "Corte, torno, soldadura y herramientas de terminación.", result: "Yegua industrial armada, pintada y lista para trabajo." },
      "proy-tolva-tractor": { need: "Fabricar una solución de arrastre adaptada a un tractor.", equipment: "Plasma CNC, torno, soldadura y control geométrico.", result: "Tolva estructural a medida, preparada para montaje y operación." },
      "proy-piezas-metalicas": { need: "Producir lotes de componentes en diferentes formas y medidas.", equipment: "Plasma, punzonado, mecanizado y terminación.", result: "Piezas clasificadas y listas para integración o despacho." }
    };
    return studies[item.id] || { need: "Resolver un requerimiento metalmecánico específico.", equipment: "Equipos seleccionados según material y geometría.", result: "Trabajo fabricado y verificado para su aplicación." };
  }

  function videoCard(item) {
    return `
      <article class="process-video-card">
        <video controls playsinline preload="metadata" poster="${escapeHTML(item.poster)}">
          <source src="${escapeHTML(item.src)}" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
        <div>
          <small>${escapeHTML(item.type)}</small>
          <h3>${escapeHTML(item.title)}</h3>
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
        href: machinePageUrl(item),
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
        href: servicePageUrl(item),
        title: item.name,
        text: item.summary,
        searchable: [item.name, item.category, item.summary].join(" "),
      })),
      ...data.projects.map((item) => ({
        type: "Proyecto",
        href: projectPageUrl(item),
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
        : "Explora el catálogo o escribe una máquina, servicio o proceso.";

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
      : `<div class="empty-state"><strong>No encontramos una ficha publicada.</strong><p>Puede tratarse de un equipo o servicio que todavía no está cargado. Envíanos el dato y lo revisamos.</p><a class="button primary" href="${whatsappLink(`Hola MAQELEC, necesito buscar: ${query}`)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a></div>`;
  }

  function renderMachineDetail() {
    const mount = document.querySelector("[data-machine-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const requested = params.get("id") || document.body.dataset.machineId || "";
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
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: item.name,
      description: item.summary,
      image: (item.gallery || []).map((image) => new URL(image.src, window.location.href).href),
      model: item.slug,
      seller: { "@type": "Organization", name: "MAQELEC SpA", url: "https://maqelec.cl/" },
      additionalProperty: (item.technicalSpecs || []).map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value
      }))
    });
    document.head.appendChild(schema);

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
    const primarySpecs = item.technicalSpecs.slice(0, 6);
    const additionalSpecs = item.technicalSpecs.slice(6);
    const renderSpecs = (specItems) => specItems
      .map(
        (spec) => `<div class="spec-row"><dt>${escapeHTML(spec.label)}</dt><dd>${escapeHTML(spec.value)}</dd></div>`,
      )
      .join("");
    const specs = renderSpecs(primarySpecs);
    const moreSpecs = renderSpecs(additionalSpecs);
    const services = (item.includedServices || [])
      .map((service) => `<li>${escapeHTML(service)}</li>`)
      .join("");
    const quoteUrl = `cotizar.html?tipo=maquinaria&equipo=${encodeURIComponent(item.id)}`;

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
              </div>
              <div class="machine-gallery-thumbs">${gallery}</div>
            </div>
            <div class="machine-product-copy">
              <div class="machine-product-labels"><small>${escapeHTML(item.category)}</small></div>
              <h1>${escapeHTML(item.name)}</h1>
              <p class="machine-product-summary">${escapeHTML(item.summary)}</p>
              <div class="machine-key-facts">${facts}</div>
              <div class="machine-commercial-note">
                <strong>${escapeHTML(modalityLabel(item.modality))}</strong>
                <p>Configuramos la propuesta según proceso, material, energía disponible, accesorios y condiciones de instalación.</p>
              </div>
              <div class="hero-actions">
                <a class="button primary" href="${quoteUrl}">Cotizar este equipo</a>
                ${item.projectId ? `<a class="button secondary" href="proyectos.html#${escapeHTML(item.projectId)}">Ver trabajo real</a>` : ""}
                ${item.manualUrl ? `<a class="button secondary" href="${escapeHTML(item.manualUrl)}" target="_blank" rel="noopener noreferrer">Descargar guía preliminar</a>` : ""}
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
          ${item.manualUrl ? `<a href="${escapeHTML(item.manualUrl)}" target="_blank" rel="noopener noreferrer">Manual PDF</a>` : ""}
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
          <div class="machine-spec-content">
            <dl class="machine-spec-table">${specs}</dl>
            ${additionalSpecs.length ? `
              <details class="machine-spec-more">
                <summary>Ver ficha técnica completa <span>${additionalSpecs.length} datos adicionales</span></summary>
                <dl class="machine-spec-table">${moreSpecs}</dl>
              </details>` : ""}
          </div>
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

  function bindPromoCarousel() {
    const carousel = document.querySelector("[data-promo-carousel]");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll("[data-promo-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-promo-dot]"));
    const previous = carousel.querySelector("[data-promo-prev]");
    const next = carousel.querySelector("[data-promo-next]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let timer = null;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        slide.inert = !active;
        const video = slide.querySelector("video");
        if (!video) return;
        if (active && !reduceMotion) video.play().catch(() => {});
        else video.pause();
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };
    const start = () => {
      stop();
      if (!reduceMotion && !document.hidden) timer = window.setInterval(() => show(current + 1), 6000);
    };

    previous?.addEventListener("click", () => { show(current - 1); start(); });
    next?.addEventListener("click", () => { show(current + 1); start(); });
    dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.promoDot)); start(); }));
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    show(0);
    start();
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
    renderCollection("[data-process-videos]", data.videos || [], videoCard);
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
    bindPromoCarousel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
