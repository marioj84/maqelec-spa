(function () {
  "use strict";

  window.MAQELEC_CATALOG = {
    schemaVersion: "1.1.0",
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
        id: "srv-punzonado-hidraulico",
        slug: "punzonado-y-cizallado-hidraulico",
        name: "Punzonado y cizallado hidráulico",
        category: "Fabricación",
        image:
          "assets/trabajos-reales/punzonadora-hidraulica-operacion.webp",
        imageAlt:
          "Operación real de punzonado de una pieza metálica en una máquina hidráulica combinada",
        mediaType: "real",
        status: "live",
        summary:
          "Perforación, corte y conformado de piezas metálicas con matrices intercambiables para distintos diámetros y geometrías.",
      },
      {
        id: "srv-corte",
        slug: "corte-cnc-y-oxicorte",
        name: "Corte CNC y oxicorte",
        category: "Fabricación",
        image: "assets/trabajos-reales/piezas-metalicas-fabricadas.webp",
        imageAlt:
          "Conjunto real de piezas metálicas fabricadas en diferentes formas y tamaños",
        mediaType: "real",
        status: "live",
        summary:
          "Ejecución de trabajos de corte para piezas y proyectos metalmecánicos según plano o requerimiento.",
      },
      {
        id: "srv-mecanizado",
        slug: "mecanizado-industrial",
        name: "Mecanizado industrial",
        category: "Fabricación",
        image: "assets/trabajos-reales/ejes-bujes-mecanizados.webp",
        imageAlt:
          "Ejes, bujes y componentes metálicos mecanizados sobre un banco de trabajo",
        mediaType: "real",
        status: "live",
        summary:
          "Fabricación, recuperación y ajuste de piezas mediante torno, fresado y apoyo técnico.",
      },
      {
        id: "srv-soldadura",
        slug: "soldadura-y-fabricacion",
        name: "Soldadura y fabricación",
        category: "Fabricación",
        image: "assets/trabajos-reales/yegua-industrial-fabricacion.webp",
        imageAlt:
          "Yegua o carro de carga industrial fabricado mediante corte y soldadura",
        mediaType: "real",
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
        id: "proy-punzonado-hidraulico",
        title: "Punzonado y corte hidráulico de metal",
        type: "Corte y conformado",
        image:
          "assets/trabajos-reales/punzonadora-cizalla-vista-general.webp",
        imageAlt:
          "Vista general de la punzonadora y cizalla hidráulica combinada en el taller",
        gallery: [
          {
            src: "assets/trabajos-reales/punzonadora-hidraulica-operacion.webp",
            alt: "Operación de punzonado hidráulico de una pieza metálica",
          },
          {
            src: "assets/trabajos-reales/punzonado-hidraulico-detalle.webp",
            alt: "Detalle del punzón y la matriz durante el trabajo",
          },
          {
            src: "assets/trabajos-reales/equipo-q35y20-frontal.webp",
            alt: "Vista frontal del equipo combinado Q35Y-20",
          },
          {
            src: "assets/trabajos-reales/estaciones-punzonado-corte.webp",
            alt: "Detalle de las estaciones de trabajo del equipo combinado",
          },
          {
            src: "assets/trabajos-reales/punzonado-hidraulico-vista-frontal.webp",
            alt: "Vista frontal del punzón hidráulico preparado para trabajar",
          },
          {
            src: "assets/trabajos-reales/equipo-q35y20-identificacion.webp",
            alt: "Identificación del modelo Q35Y-20 en el equipo combinado",
          },
        ],
        status: "live",
        summary:
          "Trabajo real con una punzonadora y cizalla hidráulica combinada para realizar perforaciones, cortes y formas mediante matrices intercambiables.",
      },
      {
        id: "proy-yegua-industrial",
        title: "Fabricación de yegua industrial",
        type: "Soldadura y fabricación",
        image: "assets/trabajos-reales/yegua-industrial-fabricacion.webp",
        imageAlt:
          "Yegua o carro de carga industrial fabricado en estructura metálica soldada",
        status: "live",
        summary:
          "Fabricación de un carro de carga —conocido en Chile como yegua— mediante corte, armado y soldadura de su estructura metálica.",
      },
      {
        id: "proy-estructura-gran-formato",
        title: "Fabricación de estructura metálica de gran formato",
        type: "Armado y soldadura",
        image:
          "assets/trabajos-reales/estructura-metalica-gran-formato.webp",
        imageAlt:
          "Estructura metálica de gran formato en proceso de armado y soldadura dentro del taller",
        status: "live",
        summary:
          "Trabajo de fabricación en taller mediante preparación de material, armado estructural y soldadura de sus componentes.",
      },
      {
        id: "proy-piezas-metalicas",
        title: "Fabricación de piezas metálicas",
        type: "Corte y fabricación",
        image: "assets/trabajos-reales/piezas-metalicas-fabricadas.webp",
        imageAlt:
          "Piezas metálicas terminadas con distintas geometrías, perforaciones y tamaños",
        gallery: [
          {
            src: "assets/trabajos-reales/piezas-cortadas-formas.webp",
            alt: "Piezas metálicas pequeñas cortadas con formas repetibles",
          },
          {
            src: "assets/trabajos-reales/piezas-cortadas-en-taller.webp",
            alt: "Lotes de piezas metálicas cortadas y organizadas en el taller",
          },
          {
            src: "assets/trabajos-reales/piezas-metalicas-detalle.webp",
            alt: "Detalle de piezas metálicas terminadas con perforaciones y ranuras",
          },
        ],
        status: "live",
        summary:
          "Producción de piezas con distintas formas y perforaciones, seleccionando el proceso según su geometría y tamaño; las piezas mayores incluyen trabajos de oxicorte.",
      },
    ],
  };
})();
