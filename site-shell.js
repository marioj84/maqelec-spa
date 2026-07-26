(function () {
  "use strict";

  const whatsappNumber = "56991514957";

  function currentFeature() {
    return document.body.dataset.pageFeature || "home";
  }

  function activeAttribute(feature) {
    return currentFeature() === feature
      ? ' class="is-active" aria-current="page"'
      : "";
  }

  function activeFor(features) {
    return features.includes(currentFeature())
      ? ' class="is-active" aria-current="page"'
      : "";
  }

  function headerTemplate() {
    return `
      <a class="skip-link" href="#mainContent">Saltar al contenido</a>
      <header class="mq-site-header">
        <div class="ma-topbar">
          <div class="ma-container">
            <span>Maquinaria y servicios industriales con acompañamiento técnico</span>
            <div class="ma-contact-line">
              <a href="tel:+56991514957">+56 9 9151 4957</a>
              <a href="mailto:contacto@maqelec.cl">contacto@maqelec.cl</a>
              <a href="cotizar.html">Ingresar requerimiento</a>
            </div>
          </div>
        </div>

        <div class="ma-header">
          <div class="ma-container ma-header-main">
            <a class="ma-logo" href="index.html" aria-label="Ir al inicio de MAQELEC">
              <img src="logo.png" alt="MAQELEC SpA">
            </a>

            <form class="ma-search" data-site-search>
              <input name="q" type="search" placeholder="Buscar máquina, servicio o proceso..." aria-label="Buscar en MAQELEC">
              <button type="submit">Buscar</button>
            </form>

            <div class="ma-icons">
              <a href="https://www.instagram.com/maqelec.spa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram MAQELEC">
                <img src="logo_instagram.png" alt="">
              </a>
              <a href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp MAQELEC">
                <img src="logo_wsp.png" alt="">
              </a>
            </div>
          </div>

          <nav class="ma-nav" aria-label="Navegación principal">
            <div class="ma-container ma-nav-inner">
              <div class="ma-service-selector">
                <button class="ma-category-btn" data-service-toggle type="button" aria-expanded="false" aria-controls="serviceDropdown">
                  <span>☰ &nbsp; EXPLORAR CATÁLOGO</span><span aria-hidden="true">⌄</span>
                </button>
                <div class="ma-service-dropdown" id="serviceDropdown">
                  <a href="maquinaria.html"><strong>Maquinaria</strong><span>Equipos disponibles para venta.</span></a>
                  <a href="importacion.html"><strong>Importación</strong><span>Próximos equipos gestionados a pedido.</span></a>
                  <a href="servicios.html"><strong>Servicios</strong><span>Trabajos industriales ejecutados por MAQELEC.</span></a>
                  <a href="guias.html"><strong>Guías técnicas</strong><span>Criterios para evaluar equipos, procesos y cotizaciones.</span></a>
                </div>
              </div>

              <button class="ma-mobile-toggle" data-menu-toggle type="button" aria-expanded="false" aria-controls="navMenu">Menú</button>
              <div class="ma-menu" id="navMenu">
                <a href="index.html"${activeAttribute("home")}>Inicio</a>
                <a href="maquinaria.html" data-feature="machinery"${activeFor(["machinery"])}>Maquinaria</a>
                <a href="importacion.html" data-feature="importation"${activeFor(["importation"])}>Importación</a>
                <a href="servicios.html" data-feature="services"${activeFor(["services"])}>Servicios</a>
                <a href="proyectos.html" data-feature="projects"${activeFor(["projects"])}>Proyectos</a>
                <a href="cotizar.html" data-feature="contact"${activeAttribute("contact")}>Cotizar</a>
              </div>

            </div>
          </nav>
        </div>
      </header>`;
  }

  function footerTemplate() {
    return `
      <footer class="ma-footer">
        <div class="ma-container">
          <div class="ma-footer-grid">
            <div class="ma-footer-brand">
              <img src="logo.png" alt="MAQELEC SpA">
              <p>Maquinaria y servicios industriales con apoyo desde la selección hasta la puesta en marcha.</p>
              <span class="ma-footer-location">Santiago · Proyectos en Chile</span>
            </div>
            <details class="ma-footer-section" open>
              <summary><h4>Maquinaria</h4></summary>
              <div class="ma-footer-links"><a href="maquinaria.html">Ver catálogo</a><a href="importacion.html">Importación</a><a href="maquina-mesa-corte-plasma-cnc-thc-f1621.html">Plasma CNC</a><a href="maquina-punzonadora-cizalla-hidraulica-q35y20.html">Punzonadora y cizalla</a><a href="maquina-torno-convencional-c0636b.html">Tornos</a></div>
            </details>
            <details class="ma-footer-section" open>
              <summary><h4>Servicios</h4></summary>
              <div class="ma-footer-links"><a href="servicios.html">Servicios industriales</a><a href="servicio-soldadura-y-fabricacion.html">Fabricación</a><a href="servicio-puesta-en-marcha-y-capacitacion.html">Puesta en marcha</a><a href="cotizar.html">Solicitar cotización</a></div>
            </details>
            <details class="ma-footer-section" open>
              <summary><h4>Empresa</h4></summary>
              <div class="ma-footer-links"><a href="quienes-somos.html">Quiénes somos</a><a href="proyectos.html">Proyectos</a><a href="cobertura.html">Cobertura en Chile</a><a href="guias.html">Guías técnicas</a><a href="contacto.html">Contacto</a></div>
            </details>
            <details class="ma-footer-section" open>
              <summary><h4>Soporte</h4></summary>
              <div class="ma-footer-links"><a href="seguimiento.html">Seguimiento</a><a href="manuales.html">Manuales</a><a href="vip.html">Centro Técnico</a><a href="buscar.html">Buscar en el sitio</a><a href="tel:+56991514957">+56 9 9151 4957</a><a href="mailto:contacto@maqelec.cl">contacto@maqelec.cl</a></div>
            </details>
          </div>
          <div class="ma-copy">© 2026 MAQELEC SpA · Todos los derechos reservados</div>
        </div>
      </footer>`;
  }

  function whatsappTemplate() {
    return `
      <a class="ma-whatsapp" href="https://wa.me/${whatsappNumber}?text=Hola%20MAQELEC%2C%20necesito%20ayuda" target="_blank" rel="noopener noreferrer">
        <img src="logo_wsp.png" alt=""><span>Contacto inmediato</span>
      </a>`;
  }

  function replaceShell() {
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "mainContent";
    const headerMount = document.createElement("div");
    headerMount.dataset.siteHeader = "";
    headerMount.innerHTML = headerTemplate();

    const existingHeader = document.querySelector("body > header");
    if (existingHeader) existingHeader.replaceWith(headerMount);
    else document.body.prepend(headerMount);

    const footerMount = document.createElement("div");
    footerMount.dataset.siteFooter = "";
    footerMount.innerHTML = footerTemplate();

    const existingFooter = document.querySelector("body > footer");
    if (existingFooter) existingFooter.replaceWith(footerMount);
    else document.body.appendChild(footerMount);

    document
      .querySelectorAll("body > .ma-whatsapp, body > .whatsapp-float")
      .forEach((element) => element.remove());

    const whatsappMount = document.createElement("div");
    whatsappMount.dataset.siteWhatsapp = "";
    whatsappMount.innerHTML = whatsappTemplate();
    document.body.appendChild(whatsappMount);

    document.body.dataset.shellReady = "true";
  }

  function bindInteractions() {
    const serviceToggle = document.querySelector("[data-service-toggle]");
    const serviceDropdown = document.getElementById("serviceDropdown");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const menu = document.getElementById("navMenu");
    const search = document.querySelector("[data-site-search]");
    const footerSections = Array.from(document.querySelectorAll(".ma-footer-section"));
    let footerDesktop = null;

    const syncFooterSections = () => {
      const desktop = window.matchMedia("(min-width: 621px)").matches;
      if (desktop === footerDesktop) return;
      footerDesktop = desktop;
      footerSections.forEach((section) => { section.open = desktop; });
    };

    const syncScrollState = () => {
      document.body.classList.toggle("mq-scrolled", window.scrollY > 60);
    };

    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncFooterSections, { passive: true });
    syncScrollState();
    syncFooterSections();

    serviceToggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = serviceDropdown.classList.toggle("open");
      serviceToggle.setAttribute("aria-expanded", String(open));
    });

    menuToggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    search?.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = search.querySelector("input").value.trim();
      window.location.href = query
        ? `buscar.html?q=${encodeURIComponent(query)}`
        : "buscar.html";
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".ma-service-selector")) {
        serviceDropdown?.classList.remove("open");
        serviceToggle?.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      serviceDropdown?.classList.remove("open");
      serviceToggle?.setAttribute("aria-expanded", "false");
      menu?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  }

  function render() {
    replaceShell();
    bindInteractions();
    injectStructuredData();
  }

  function injectStructuredData() {
    if (!document.querySelector("[data-maqelec-schema]")) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.maqelecSchema = "";
      script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MAQELEC SpA",
      url: "https://maqelec.cl/",
      logo: "https://maqelec.cl/logo.png",
      telephone: "+56991514957",
      email: "contacto@maqelec.cl",
      description: "Empresa chilena de maquinaria y servicios industriales: suministro e importación de equipos, corte plasma CNC, punzonado, mecanizado, fabricación, instalación, puesta en marcha y soporte técnico.",
      address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
      areaServed: { "@type": "Country", name: "Chile" },
      sameAs: ["https://www.instagram.com/maqelec.spa/"],
      knowsAbout: ["maquinaria industrial", "corte plasma CNC", "punzonado y cizallado", "mecanizado industrial", "fabricación metalmecánica", "puesta en marcha de maquinaria"],
      contactPoint: [{
        "@type": "ContactPoint",
        telephone: "+56991514957",
        email: "contacto@maqelec.cl",
        contactType: "ventas y soporte técnico",
        areaServed: "CL",
        availableLanguage: "es"
      }]
      });
      document.head.appendChild(script);
    }

    const cleanPath = window.location.pathname
      .replace(/^\/maqelec-spa(?=\/|$)/, "")
      .replace(/\/index\.html$/, "/") || "/";
    const machineQuery = cleanPath.endsWith("/maquina.html") && new URLSearchParams(window.location.search).get("id")
      ? `?id=${encodeURIComponent(new URLSearchParams(window.location.search).get("id"))}`
      : "";
    const productionUrl = new URL(`${cleanPath}${machineQuery}`, "https://maqelec.cl").href;
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = productionUrl;
      document.head.appendChild(canonical);
    }
    const description = document.querySelector('meta[name="description"]')?.content || "Maquinaria y servicios industriales MAQELEC.";
    [["og:title", document.title], ["og:description", description], ["og:url", productionUrl], ["og:image", "https://maqelec.cl/logo.png"], ["og:locale", "es_CL"]].forEach(([property, content]) => {
      if (document.querySelector(`meta[property="${property}"]`)) return;
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      meta.content = content;
      document.head.appendChild(meta);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();
