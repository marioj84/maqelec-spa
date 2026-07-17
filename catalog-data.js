(function () {
  "use strict";

  window.MAQELEC_CATALOG = {
    schemaVersion: "1.0.0",
    lastUpdated: "2026-07-17",

    machinery: [
      {
        id: "maq-laser-fibra-1500",
        slug: "corte-laser-fibra-1500w",
        name: "Equipo de corte láser fibra 1500 W",
        category: "Corte láser",
        modality: "importacion",
        status: "preview",
        summary:
          "Alternativa para procesos de corte industrial. La configuración final se define según material, formato y producción requerida.",
        specs: [
          "Potencia base: 1500 W",
          "Configuración según requerimiento",
          "Puesta en marcha disponible",
        ],
      },
      {
        id: "maq-laser-fibra-3000",
        slug: "corte-laser-fibra-3000w",
        name: "Equipo de corte láser fibra 3000 W",
        category: "Corte láser",
        modality: "importacion",
        status: "preview",
        summary:
          "Solución de mayor potencia para proyectos industriales. Se cotiza con importación directa y acompañamiento técnico.",
        specs: [
          "Potencia base: 3000 W",
          "Configuración a medida",
          "Capacitación disponible",
        ],
      },
      {
        id: "maq-plasma-cnc",
        slug: "plasma-cnc",
        name: "Sistema de corte plasma CNC",
        category: "Plasma CNC",
        modality: "ambas",
        status: "preview",
        summary:
          "Sistema configurable para corte de planchas y fabricación metalmecánica, con alternativas de suministro e importación.",
        specs: [
          "Configuración 220/380 V",
          "Mesa y fuente según proyecto",
          "Soporte de instalación",
        ],
      },
      {
        id: "maq-oxicorte",
        slug: "sistema-oxicorte",
        name: "Sistema industrial de oxicorte",
        category: "Oxicorte",
        modality: "importacion",
        status: "preview",
        summary:
          "Equipo orientado al corte de mayores espesores. La ficha definitiva se prepara a partir de la aplicación requerida.",
        specs: [
          "Configuración según espesor",
          "Integración CNC disponible",
          "Asesoría de selección",
        ],
      },
    ],

    parts: [],

    partCategories: [
      "Consumibles de corte",
      "Componentes eléctricos",
      "Componentes mecánicos",
      "Automatización y control",
      "Repuestos por código o modelo",
    ],

    services: [
      {
        id: "srv-corte",
        slug: "corte-cnc-y-oxicorte",
        name: "Corte CNC y oxicorte",
        category: "Fabricación",
        image: "Imagen2.png",
        status: "live",
        summary:
          "Ejecución de trabajos de corte para piezas y proyectos metalmecánicos según plano o requerimiento.",
      },
      {
        id: "srv-mecanizado",
        slug: "mecanizado-industrial",
        name: "Mecanizado industrial",
        category: "Fabricación",
        image: "Imagen4.png",
        status: "live",
        summary:
          "Fabricación, recuperación y ajuste de piezas mediante torno, fresado y apoyo técnico.",
      },
      {
        id: "srv-soldadura",
        slug: "soldadura-y-fabricacion",
        name: "Soldadura y fabricación",
        category: "Fabricación",
        image: "Imagen3.png",
        status: "live",
        summary:
          "Reparación, unión y fabricación de componentes para necesidades industriales.",
      },
      {
        id: "srv-electricidad",
        slug: "electricidad-industrial",
        name: "Electricidad industrial",
        category: "Soporte",
        image: "Imagen5.png",
        status: "live",
        summary:
          "Instalaciones, diagnóstico y soporte eléctrico para equipos y operaciones industriales.",
      },
      {
        id: "srv-mantenimiento",
        slug: "mantenimiento-industrial",
        name: "Mantenimiento industrial",
        category: "Soporte",
        image: "Imagen6.png",
        status: "live",
        summary:
          "Apoyo preventivo y correctivo para recuperar continuidad y reducir detenciones.",
      },
      {
        id: "srv-puesta-marcha",
        slug: "puesta-en-marcha-y-capacitacion",
        name: "Puesta en marcha y capacitación",
        category: "Implementación",
        image: "Imagen1.png",
        status: "live",
        summary:
          "Instalación, configuración inicial, pruebas y capacitación para operar nuevos equipos.",
      },
    ],

    projects: [
      {
        id: "proy-integracion",
        title: "Integración de solución industrial",
        type: "Implementación",
        image: "Imagen1.png",
        status: "preview",
        summary:
          "Espacio reservado para documentar diagnóstico, solución, instalación y resultado del proyecto.",
      },
      {
        id: "proy-mantenimiento",
        title: "Mantenimiento y recuperación operativa",
        type: "Servicio técnico",
        image: "Imagen6.png",
        status: "preview",
        summary:
          "Plantilla preparada para incorporar fotografías, alcance y evidencia de un trabajo real.",
      },
      {
        id: "proy-abastecimiento",
        title: "Abastecimiento e importación",
        type: "Suministro",
        image: "Imagen3.png",
        status: "preview",
        summary:
          "Caso demostrativo para mostrar búsqueda, importación, entrega y soporte posterior.",
      },
    ],
  };
})();
