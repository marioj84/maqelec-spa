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
      <header class="mq-site-header">
        <div class="ma-topbar">
          <div class="ma-container">
            <span>Maquinaria y servicios industriales con acompañamiento técnico</span>
            <div class="ma-contact-line">
              <a href="tel:+56991514957">+56 9 9151 4957</a>
              <a href="mailto:contacto@maqelec.cl">contacto@maqelec.cl</a>
              <a href="contacto.html">Ingresar requerimiento</a>
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
                  <a href="maquinaria.html"><strong>Maquinaria</strong><span>Equipos para suministro o importación.</span></a>
                  <a href="servicios.html"><strong>Servicios</strong><span>Trabajos industriales ejecutados por MAQELEC.</span></a>
                </div>
              </div>

              <button class="ma-mobile-toggle" data-menu-toggle type="button" aria-expanded="false" aria-controls="navMenu">Menú</button>
              <div class="ma-menu" id="navMenu">
                <a href="index.html"${activeAttribute("home")}>Inicio</a>
                <a href="maquinaria.html" data-feature="machinery"${activeFor(["machinery"])}>Maquinaria</a>
                <a href="servicios.html" data-feature="services"${activeFor(["services"])}>Servicios</a>
                <a href="proyectos.html" data-feature="projects"${activeFor(["projects"])}>Proyectos</a>
                <a href="contacto.html" data-feature="contact"${activeAttribute("contact")}>Contacto</a>
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
            <div>
              <img src="logo.png" alt="MAQELEC SpA">
              <p>Maquinaria y servicios industriales con apoyo desde la selección hasta la puesta en marcha.</p>
            </div>
            <div>
              <h4>Categorías</h4>
              <a href="maquinaria.html" data-feature="machinery">Maquinaria</a>
              <a href="servicios.html" data-feature="services">Servicios</a>
              <a href="proyectos.html" data-feature="projects">Proyectos</a>
            </div>
            <div>
              <h4>Contacto</h4>
              <a href="tel:+56991514957">+56 9 9151 4957</a>
              <a href="mailto:contacto@maqelec.cl">contacto@maqelec.cl</a>
              <p>Santiago, Chile</p>
            </div>
            <div>
              <h4>Cliente</h4>
              <a href="seguimiento.html" data-feature="tracking">Seguimiento</a>
              <a href="manuales.html" data-feature="manuals">Manuales</a>
              <a href="vip.html" data-feature="technicalCenter">Centro Técnico</a>
              <a href="buscar.html">Buscar en el sitio</a>
            </div>
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

    const syncScrollState = () => {
      document.body.classList.toggle("mq-scrolled", window.scrollY > 60);
    };

    window.addEventListener("scroll", syncScrollState, { passive: true });
    syncScrollState();

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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();
