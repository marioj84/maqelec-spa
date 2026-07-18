(function () {
  "use strict";

  window.MAQELEC_SITE_CONFIG = {
    version: "1.3.0",
    environment: "preview",
    states: ["off", "preview", "live"],

    dependencies: {
      "core.brand": {
        ready: true,
        label: "Identidad visual MAQELEC",
      },
      "core.navigation": {
        ready: true,
        label: "Navegación compartida",
      },
      "channel.whatsapp": {
        ready: true,
        label: "Canal comercial de WhatsApp",
      },
      "content.services": {
        ready: true,
        label: "Catálogo de servicios",
      },
      "content.machineryCatalog": {
        ready: true,
        label: "Fichas técnicas y fotografías validadas de maquinaria",
      },
      "content.partsCatalog": {
        ready: false,
        label: "Catálogo verificado de repuestos",
      },
      "content.realProjects": {
        ready: true,
        label: "Fotografías y casos reales",
      },
      "media.realVideos": {
        ready: false,
        label: "Videos industriales optimizados",
      },
      "content.manualFiles": {
        ready: false,
        label: "Manuales descargables vigentes",
      },
      "integration.tracking": {
        ready: false,
        label: "Fuente real de seguimiento",
      },
      "security.customerAuth": {
        ready: false,
        label: "Autenticación segura de clientes",
      },
      "content.technicalCenter": {
        ready: false,
        label: "Contenido técnico por cliente o equipo",
      },
    },

    features: {
      home: {
        state: "live",
        label: "Inicio",
        dependencies: ["core.brand", "core.navigation"],
      },
      services: {
        state: "live",
        label: "Servicios",
        dependencies: ["content.services", "channel.whatsapp"],
        selectors: [
          "#servicios",
          'a[href="#servicios"]',
          'a[href="index.html#servicios"]',
        ],
      },
      machinery: {
        state: "live",
        label: "Maquinaria",
        navBadge: false,
        dependencies: ["content.machineryCatalog", "channel.whatsapp"],
        selectors: ['a[href="maquinaria.html"]', '[data-feature="machinery"]'],
      },
      parts: {
        state: "preview",
        label: "Repuestos",
        navBadge: false,
        dependencies: ["content.partsCatalog", "channel.whatsapp"],
        selectors: ['a[href="repuestos.html"]', '[data-feature="parts"]'],
        previewMessage:
          "El buscador de requerimientos está operativo. El catálogo público se activará ficha por ficha con códigos, compatibilidades y disponibilidad verificadas.",
      },
      projects: {
        state: "live",
        label: "Trabajos y proyectos",
        navBadge: false,
        dependencies: ["content.realProjects"],
        selectors: ['a[href="proyectos.html"]', '[data-feature="projects"]'],
      },
      videos: {
        state: "off",
        label: "Videos",
        dependencies: ["media.realVideos"],
        selectors: ['[data-feature="videos"]'],
      },
      manuals: {
        state: "preview",
        label: "Manuales",
        dependencies: ["content.manualFiles"],
        selectors: ['a[href="manuales.html"]', '[data-feature="manuals"]'],
        previewMessage:
          "Catálogo de demostración. Las descargas se habilitarán cuando existan documentos técnicos reales y vigentes.",
      },
      tracking: {
        state: "preview",
        label: "Seguimiento",
        dependencies: ["integration.tracking"],
        selectors: ['a[href="seguimiento.html"]', '[data-feature="tracking"]'],
        previewMessage:
          "Simulación visual: los resultados de esta página no consultan pedidos ni despachos reales.",
      },
      technicalCenter: {
        state: "preview",
        label: "Centro Técnico",
        dependencies: ["security.customerAuth", "content.technicalCenter"],
        selectors: ['a[href="vip.html"]', '[data-feature="technicalCenter"]'],
        previewMessage:
          "Demostración visual: este acceso no constituye autenticación ni protege contenido privado real.",
      },
      contact: {
        state: "live",
        label: "Contacto",
        dependencies: ["channel.whatsapp"],
        selectors: ['a[href="contacto.html"]', '[data-feature="contact"]'],
      },
      search: {
        state: "live",
        label: "Buscador",
        dependencies: ["core.navigation", "channel.whatsapp"],
        selectors: ['a[href="buscar.html"]'],
      },
    },

    pages: {
      "index.html": "home",
      "maquinaria.html": "machinery",
      "repuestos.html": "parts",
      "servicios.html": "services",
      "proyectos.html": "projects",
      "buscar.html": "search",
      "contacto.html": "contact",
      "manuales.html": "manuals",
      "seguimiento.html": "tracking",
      "vip.html": "technicalCenter",
    },
  };
})();
