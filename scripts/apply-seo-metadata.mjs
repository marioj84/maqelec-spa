import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = "https://maqelec.cl/";
const catalogSource = fs.readFileSync(path.join(root, "catalog-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(catalogSource, sandbox);
const catalog = sandbox.window.MAQELEC_CATALOG;

const publicPages = new Set(
  fs
    .readFileSync(path.join(root, "sitemap.xml"), "utf8")
    .match(/<loc>https:\/\/maqelec\.cl\/([^<]*)<\/loc>/g)
    ?.map((entry) => entry.replace(/^.*\.cl\//, "").replace(/<\/loc>$/, "")) || [],
);

const coreMetadata = {
  "index.html": {
    title: "Maquinaria y servicios industriales en Chile | MAQELEC",
    description:
      "MAQELEC suministra e importa maquinaria industrial y ejecuta corte plasma CNC, punzonado, mecanizado, fabricación, instalación y soporte técnico desde Santiago para proyectos en Chile.",
  },
  "maquinaria.html": {
    title: "Maquinaria industrial, instalación y soporte en Chile | MAQELEC",
    description:
      "Equipos industriales para suministro o importación en Chile: plasma CNC, punzonadoras, tornos, taladros fresadores, corte láser y soluciones configuradas con puesta en marcha y soporte.",
  },
  "servicios.html": {
    title: "Servicios metalmecánicos e industriales en Chile | MAQELEC",
    description:
      "Corte plasma CNC, corte láser, punzonado, cizallado, mecanizado, soldadura, fabricación y terminaciones, con evaluación técnica desde Santiago para proyectos en Chile.",
  },
  "proyectos.html": {
    title: "Proyectos y trabajos industriales reales | MAQELEC Chile",
    description:
      "Casos documentados de corte plasma CNC, punzonado, torneado, fabricación, soldadura y terminaciones ejecutados con equipos reales por MAQELEC.",
  },
  "quienes-somos.html": {
    title: "Quiénes somos: misión, visión y valores | MAQELEC Chile",
    description:
      "Conoce a MAQELEC, su misión, visión, valores, forma de trabajo y el equipo humano detrás de sus soluciones de maquinaria y servicios industriales en Chile.",
  },
  "guias.html": {
    title: "Guías de maquinaria y procesos industriales | MAQELEC",
    description:
      "Guías técnicas para cotizar trabajos metalmecánicos, evaluar maquinaria industrial y preparar proyectos de corte, mecanizado, fabricación e instalación en Chile.",
  },
  "guia-cotizar-corte-plasma-cnc.html": {
    title: "Cómo cotizar corte plasma CNC: datos y archivos necesarios",
    description:
      "Guía práctica para cotizar corte plasma CNC: material, espesor, dimensiones, archivos, cantidad, terminación, tolerancias, ubicación y plazo del trabajo.",
  },
  "guia-elegir-maquinaria-industrial.html": {
    title: "Cómo elegir y cotizar maquinaria industrial | Guía MAQELEC",
    description:
      "Criterios para evaluar una máquina industrial: proceso, material, capacidad, producción, energía, espacio, instalación, capacitación, repuestos y soporte técnico.",
  },
  "cotizar.html": {
    title: "Solicitar cotización de maquinaria o servicios | MAQELEC",
    description:
      "Solicita una evaluación para maquinaria industrial, corte, mecanizado, fabricación, instalación o soporte. Comparte material, medidas, cantidad, ubicación y plazo.",
  },
  "manuales.html": {
    title: "Manuales y fichas técnicas de maquinaria | MAQELEC",
    description:
      "Consulta guías preliminares, fichas y documentación técnica de equipos industriales publicados por MAQELEC, sujetos a confirmación de modelo y configuración.",
  },
};

const organization = {
  "@type": "Organization",
  "@id": `${baseUrl}#organization`,
  name: "MAQELEC SpA",
  url: baseUrl,
  logo: `${baseUrl}logo.png`,
  image: `${baseUrl}logo.png`,
  description:
    "Empresa chilena de maquinaria y servicios industriales: suministro e importación de equipos, fabricación metalmecánica, instalación, puesta en marcha y soporte técnico.",
  telephone: "+56991514957",
  email: "contacto@maqelec.cl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  areaServed: { "@type": "Country", name: "Chile" },
  sameAs: ["https://www.instagram.com/maqelec.spa/"],
  knowsAbout: [
    "maquinaria industrial",
    "corte plasma CNC",
    "punzonado y cizallado",
    "mecanizado industrial",
    "fabricación metalmecánica",
    "instalación y puesta en marcha de maquinaria",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+56991514957",
    email: "contacto@maqelec.cl",
    contactType: "ventas y soporte técnico",
    areaServed: "CL",
    availableLanguage: "es",
  },
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function textFrom(html, pattern, fallback = "") {
  return html.match(pattern)?.[1]?.replace(/\s+/g, " ").trim() || fallback;
}

function absoluteUrl(value) {
  if (!value) return `${baseUrl}logo.png`;
  return new URL(value, baseUrl).href;
}

function canonicalFor(file) {
  return file === "index.html" ? baseUrl : `${baseUrl}${file}`;
}

function breadcrumb(file, title) {
  const parent = file.startsWith("maquina-")
    ? ["Maquinaria", "maquinaria.html"]
    : file.startsWith("servicio-")
      ? ["Servicios", "servicios.html"]
      : file.startsWith("proyecto-")
        ? ["Proyectos", "proyectos.html"]
        : file.startsWith("guia-")
          ? ["Guías", "guias.html"]
          : null;
  const items = [{ "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl }];
  if (parent) {
    items.push({ "@type": "ListItem", position: 2, name: parent[0], item: `${baseUrl}${parent[1]}` });
  }
  if (file !== "index.html") {
    items.push({ "@type": "ListItem", position: items.length + 1, name: title, item: canonicalFor(file) });
  }
  return { "@type": "BreadcrumbList", itemListElement: items };
}

function schemaFor(file, title, description, image) {
  const url = canonicalFor(file);
  const graph = [];

  if (file === "index.html") {
    graph.push(organization, {
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      url: baseUrl,
      name: "MAQELEC",
      inLanguage: "es-CL",
      publisher: { "@id": `${baseUrl}#organization` },
    }, {
      "@type": "FAQPage",
      "@id": `${baseUrl}#preguntas-frecuentes`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿MAQELEC vende e importa equipos industriales?",
          acceptedAnswer: { "@type": "Answer", text: "Sí. La modalidad puede ser suministro local o importación a pedido y se confirma con el modelo, configuración, accesorios y plazo de cada proyecto." },
        },
        {
          "@type": "Question",
          name: "¿Puedo contratar un trabajo sin comprar una máquina?",
          acceptedAnswer: { "@type": "Answer", text: "Sí. MAQELEC también ejecuta corte, punzonado, mecanizado, soldadura, reparación, fabricación y terminaciones." },
        },
        {
          "@type": "Question",
          name: "¿La propuesta puede incluir instalación y capacitación?",
          acceptedAnswer: { "@type": "Answer", text: "Sí. Según el equipo y el alcance, puede contemplar montaje, configuración, primeras pruebas y orientación inicial al operador." },
        },
        {
          "@type": "Question",
          name: "¿MAQELEC atiende fuera de Santiago?",
          acceptedAnswer: { "@type": "Answer", text: "Los suministros, instalaciones y proyectos en otras regiones de Chile se evalúan según ubicación, logística y condiciones técnicas." },
        },
      ],
    });
  }

  const machine = catalog.machinery.find((item) => file === `maquina-${item.slug}.html`);
  const service = catalog.services.find((item) => file === `servicio-${item.slug}.html`);
  const project = catalog.projects.find((item) => file === `proyecto-${item.id.replace(/^proy-/, "")}.html`);

  if (machine) {
    graph.push({
      "@type": "Product",
      "@id": `${url}#product`,
      name: machine.name,
      description: machine.summary,
      image: (machine.gallery || [{ src: machine.image }]).map((item) => absoluteUrl(item.src)),
      category: machine.category,
      additionalProperty: (machine.technicalSpecs || []).slice(0, 12).map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value,
      })),
      subjectOf: { "@id": `${url}#webpage` },
    });
  } else if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      description: service.summary,
      image: absoluteUrl(service.image),
      serviceType: service.category,
      provider: { "@id": `${baseUrl}#organization` },
      areaServed: { "@type": "Country", name: "Chile" },
    });
  } else if (project) {
    graph.push({
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      name: project.title,
      description: project.summary,
      image: absoluteUrl(project.image),
      about: project.type,
      creator: { "@id": `${baseUrl}#organization` },
      inLanguage: "es-CL",
    });
  } else if (file.startsWith("guia-")) {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      image,
      dateModified: "2026-07-20",
      datePublished: "2026-07-20",
      author: { "@id": `${baseUrl}#organization` },
      publisher: { "@id": `${baseUrl}#organization` },
      inLanguage: "es-CL",
    });
  }

  graph.push({
    "@type": file === "quienes-somos.html" ? "AboutPage" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "es-CL",
    isPartOf: { "@id": `${baseUrl}#website` },
    about: machine
      ? { "@id": `${url}#product` }
      : service
        ? { "@id": `${url}#service` }
        : project
          ? { "@id": `${url}#case-study` }
          : { "@id": `${baseUrl}#organization` },
  });
  graph.push(breadcrumb(file, title));

  return { "@context": "https://schema.org", "@graph": graph };
}

function cleanExistingSeo(html) {
  return html
    .replace(/\s*<!-- SEO:BEGIN -->[\s\S]*?<!-- SEO:END -->\s*/g, "\n")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+(?:property|name)=["'](?:og:|twitter:)[^"']+["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*data-maqelec-schema[^>]*>[\s\S]*?<\/script>\s*/gi, "\n");
}

function applyToFile(file) {
  const fullPath = path.join(root, file);
  let html = cleanExistingSeo(fs.readFileSync(fullPath, "utf8"));
  const fallbackTitle = textFrom(html, /<title>([\s\S]*?)<\/title>/i, "MAQELEC");
  const fallbackDescription = textFrom(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i, "Maquinaria y servicios industriales MAQELEC.");
  const metadata = coreMetadata[file] || { title: fallbackTitle, description: fallbackDescription };
  const firstImage = textFrom(html, /<img[^>]+src=["']([^"']+)["'][^>]*>/i, "logo.png");
  const image = absoluteUrl(firstImage);
  const canonical = canonicalFor(file);
  const sitemapKey = file === "index.html" ? "" : file;
  const robots = publicPages.has(sitemapKey)
    ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    : "noindex,follow";

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(metadata.title)}</title>`);
  const descriptionTag = `<meta name="description" content="${esc(metadata.description)}" />`;
  if (/<meta\s+name=["']description["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["'][^>]*>/i,
      descriptionTag,
    );
  } else {
    html = html.replace(/<\/title>/i, `</title>\n    ${descriptionTag}`);
  }

  const schema = JSON.stringify(schemaFor(file, metadata.title, metadata.description, image));
  const block = `    <!-- SEO:BEGIN -->
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="${robots}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_CL" />
    <meta property="og:site_name" content="MAQELEC" />
    <meta property="og:title" content="${esc(metadata.title)}" />
    <meta property="og:description" content="${esc(metadata.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(metadata.title)}" />
    <meta name="twitter:description" content="${esc(metadata.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" data-maqelec-schema>${schema}</script>
    <!-- SEO:END -->
`;

  html = html.replace(/\s*<link rel="icon"/, `\n${block}    <link rel="icon"`);
  fs.writeFileSync(fullPath, html);
}

fs.readdirSync(root)
  .filter((file) => file.endsWith(".html"))
  .forEach(applyToFile);

console.log("Metadatos SEO y datos estructurados aplicados.");
