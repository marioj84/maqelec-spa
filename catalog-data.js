(function () {
  "use strict";

  window.MAQELEC_CATALOG = {
    schemaVersion: "1.1.0",
    lastUpdated: "2026-07-18",

    machinery: [
      {
        id: "maq-q35y20",
        slug: "punzonadora-cizalla-hidraulica-q35y20",
        name: "Punzonadora y cizalla hidráulica combinada Q35Y-20",
        category: "Punzonado y cizallado",
        modality: "ambas",
        image:
          "assets/trabajos-reales/punzonadora-cizalla-vista-general.webp",
        imageAlt:
          "Máquina hidráulica combinada Q35Y-20 operando dentro del taller",
        mediaType: "real",
        status: "live",
        summary:
          "Equipo combinado que MAQELEC utiliza en trabajos reales de punzonado, corte y preparación de perfiles, y que también suministra con instalación y soporte.",
        specs: [
          "Modelo visible en el equipo: Q35Y-20",
          "Estaciones de trabajo a ambos lados",
          "Punzones y matrices intercambiables",
          "Instalación, puesta en marcha y soporte técnico",
        ],
      },
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
        id: "srv-esmerilado",
        slug: "esmerilado-y-terminaciones",
        name: "Esmerilado y terminaciones",
        category: "Terminaciones",
        image: "assets/trabajos-reales/esmerilado-piezas-operacion.webp",
        imageAlt:
          "Operario realizando esmerilado de piezas metálicas con proyección de chispas",
        mediaType: "real",
        status: "live",
        summary:
          "Desbaste, limpieza de bordes y preparación de piezas metálicas después del corte o antes de su armado.",
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
            src: "assets/trabajos-reales/q35y20-doble-estacion.webp",
            alt: "Dos operarios trabajando simultáneamente en las estaciones laterales de la Q35Y-20",
          },
          {
            src: "assets/trabajos-reales/q35y20-punzones-matrices.webp",
            alt: "Punzones y matrices intercambiables de diferentes diámetros",
          },
          {
            src: "assets/trabajos-reales/q35y20-operador-punzonado.webp",
            alt: "Operario preparando una pieza en la estación de punzonado hidráulico",
          },
          {
            src: "assets/trabajos-reales/q35y20-punzonado-primer-plano.webp",
            alt: "Detalle del punzón hidráulico trabajando sobre una pieza metálica",
          },
          {
            src: "assets/trabajos-reales/q35y20-estacion-cizalla.webp",
            alt: "Estación lateral de corte, cizallado y preparación de perfiles",
          },
          {
            src: "assets/trabajos-reales/q35y20-modelo.webp",
            alt: "Identificación visible del modelo Q35Y-20 en la máquina",
          },
          {
            src: "assets/trabajos-reales/equipo-q35y20-frontal.webp",
            alt: "Vista frontal del equipo combinado Q35Y-20",
          },
          {
            src: "assets/trabajos-reales/estaciones-punzonado-corte.webp",
            alt: "Detalle de las estaciones de punzonado, corte y entallado",
          },
        ],
        processSteps: [
          "Recorte inicial del material en la estación de corte o cizallado",
          "Preparación de un perfil previo con caras planas",
          "Traslado de la pieza al torno convencional",
          "Cilindrado exterior hasta obtener el diámetro final",
        ],
        status: "live",
        summary:
          "Trabajo real con la Q35Y-20 en sus distintas estaciones. En este proceso se recortó primero el material para preparar el perfil que después continuó a la etapa de cilindrado en torno.",
      },
      {
        id: "proy-torneado-cilindrado",
        title: "Cilindrado de piezas en torno convencional",
        type: "Mecanizado y torneado",
        image:
          "assets/trabajos-reales/torneado-cilindrado-operacion.webp",
        imageAlt:
          "Herramienta de corte mecanizando el exterior de una pieza metálica en rotación",
        gallery: [
          {
            src: "assets/trabajos-reales/torno-pieza-hexagonal-montaje.webp",
            alt: "Conjunto de piezas hexagonales montado y sujeto en el plato del torno",
          },
          {
            src: "assets/trabajos-reales/torno-pieza-en-giro.webp",
            alt: "Pieza metálica girando durante el proceso de torneado exterior",
          },
          {
            src: "assets/trabajos-reales/torno-operador-mecanizado.webp",
            alt: "Operario trabajando en un torno convencional con sus elementos de protección",
          },
          {
            src: "assets/trabajos-reales/torno-c0636b-panel-control.webp",
            alt: "Panel de controles del torno convencional identificado visualmente como C0636B",
          },
          {
            src: "assets/trabajos-reales/torno-convencional-vista-general.webp",
            alt: "Vista general del torno convencional utilizado para el mecanizado",
          },
        ],
        processSteps: [
          "Recepción de la pieza preparada en la etapa de corte",
          "Montaje y sujeción del perfil en el plato del torno",
          "Giro, lubricación y avance controlado de la herramienta",
          "Terminación cilíndrica del diámetro exterior",
        ],
        status: "live",
        summary:
          "Transformación del perfil exterior de piezas metálicas mediante giro controlado, avance de la herramienta de corte y lubricación hasta obtener una geometría cilíndrica.",
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
          {
            src: "assets/trabajos-reales/esmerilado-piezas-chispas.webp",
            alt: "Piezas metálicas durante el proceso de esmerilado con chispas al fondo",
          },
          {
            src: "assets/trabajos-reales/esmerilado-piezas-operacion.webp",
            alt: "Operario esmerilando y terminando piezas metálicas en el taller",
          },
          {
            src: "assets/trabajos-reales/esmerilado-piezas-taller.webp",
            alt: "Esmerilado manual de una pieza metálica con elementos de protección personal",
          },
        ],
        status: "live",
        summary:
          "Producción de piezas con distintas formas y perforaciones, seleccionando el corte según su geometría y tamaño; las piezas mayores incluyen oxicorte y el acabado contempla esmerilado de bordes.",
      },
    ],
  };
})();
