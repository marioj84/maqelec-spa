import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogSource = fs.readFileSync(path.join(root, "catalog-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(catalogSource, sandbox);
const catalog = sandbox.window.MAQELEC_CATALOG;
const updated = "2026-07-20";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugMachine(item) {
  return `maquina-${item.slug}.html`;
}

function slugService(item) {
  return `servicio-${item.slug}.html`;
}

function slugProject(item) {
  return `proyecto-${item.id.replace(/^proy-/, "")}.html`;
}

function head({ title, description, feature, extraScripts = "" }) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(description)}" />
    <title>${esc(title)}</title>
    <link rel="icon" href="favicon.png" />
    <link rel="stylesheet" href="site-shell.css?v=20260720-2" />
    <link rel="stylesheet" href="feature-manager.css?v=20260718-1" />
    <link rel="stylesheet" href="catalog.css?v=20260720-2" />
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <script src="site-config.js?v=20260720-2"></script>
    ${extraScripts}
    <script src="site-shell.js?v=20260720-2" defer></script>
    <script src="feature-manager.js?v=20260718-3" defer></script>
  </head>
  <body class="catalog-site" data-page-feature="${feature}">`;
}

function footer() {
  return `
  </body>
</html>
`;
}

function specsList(items) {
  return (items || []).map((spec) => `<div class="spec-row"><dt>${esc(spec.label)}</dt><dd>${esc(spec.value)}</dd></div>`).join("");
}

function createMachinePage(item) {
  const gallery = item.gallery || [{ src: item.image, alt: item.imageAlt }];
  const paragraphs = (item.description || [item.summary]).map((text) => `<p>${esc(text)}</p>`).join("");
  const operations = (item.operations || []).map((text) => `<li>${esc(text)}</li>`).join("");
  const services = (item.includedServices || []).map((text) => `<li>${esc(text)}</li>`).join("");
  const facts = (item.keyFacts || []).map((fact) => `<div><strong>${esc(fact.value)}</strong><span>${esc(fact.label)}</span></div>`).join("");
  const output = `${head({
    title: `${item.name} | Venta, instalación y soporte MAQELEC`,
    description: item.summary,
    feature: "machinery",
    extraScripts: `<script src="catalog-data.js?v=20260718-13"></script>\n    <script src="catalog.js?v=20260720-1" defer></script>`,
  }).replace('data-page-feature="machinery"', `data-page-feature="machinery" data-machine-id="${esc(item.id)}"`)}
    <main id="mainContent" data-machine-detail>
      <section class="machine-detail-hero">
        <div class="ma-container">
          <nav class="machine-breadcrumb" aria-label="Ruta de navegación"><a href="index.html">Inicio</a><span>/</span><a href="maquinaria.html">Maquinaria</a><span>/</span><b>${esc(item.name)}</b></nav>
          <div class="machine-product-layout">
            <div class="machine-gallery"><div class="machine-gallery-main"><img src="${esc(gallery[0].src)}" alt="${esc(gallery[0].alt || item.imageAlt)}"><span>Fotografía real del equipo y su operación</span></div></div>
            <div class="machine-product-copy"><div class="machine-product-labels"><span>Equipo real</span><small>${esc(item.category)}</small></div><h1>${esc(item.name)}</h1><p class="machine-product-summary">${esc(item.summary)}</p><div class="machine-key-facts">${facts}</div><div class="machine-commercial-note"><strong>Configuración a confirmar</strong><p>La propuesta se define según proceso, material, energía, accesorios y condiciones de instalación.</p></div><div class="hero-actions"><a class="button primary" href="cotizar.html?tipo=maquinaria&equipo=${encodeURIComponent(item.id)}">Cotizar este equipo</a><a class="button secondary" href="maquinaria.html">Ver maquinaria</a></div></div>
          </div>
        </div>
      </section>
      <section class="machine-detail-section"><div class="ma-container machine-description-grid"><div><span class="eyebrow">Descripción del equipo</span><h2>Una máquina documentada trabajando</h2></div><div class="machine-prose">${paragraphs}</div></div></section>
      <section class="machine-detail-section machine-detail-soft"><div class="ma-container machine-two-column"><div><span class="eyebrow">Aplicaciones</span><h2>Procesos que puede realizar</h2><p>La capacidad efectiva depende del material, herramienta y configuración.</p></div><ul class="machine-operation-list">${operations}</ul></div></section>
      <section class="machine-detail-section"><div class="ma-container machine-spec-layout"><div class="machine-spec-heading"><span class="eyebrow">Datos técnicos</span><h2>Especificaciones del modelo</h2><p>${esc(item.source?.note || "Valores sujetos a confirmación técnica y comercial.")}</p></div><div class="machine-spec-content"><dl class="machine-spec-table">${specsList(item.technicalSpecs)}</dl></div></div></section>
      <section class="machine-detail-section machine-support-section"><div class="ma-container machine-support-grid"><div><span class="eyebrow">Acompañamiento MAQELEC</span><h2>De la selección a la operación inicial</h2><p>El alcance puede incorporar suministro, montaje, puesta en marcha, capacitación y soporte.</p></div><ul>${services}</ul><div class="machine-support-cta"><strong>Cuéntanos qué necesitas fabricar</strong><p>Con material, medidas, producción y energía disponible podemos orientar la configuración.</p><a class="button primary" href="cotizar.html?tipo=maquinaria&equipo=${encodeURIComponent(item.id)}">Solicitar evaluación</a></div></div></section>
    </main>${footer()}`;
  fs.writeFileSync(path.join(root, slugMachine(item)), output);
}

const serviceDetails = {
  "srv-corte-laser": { application: "Piezas y geometrías en lámina metálica según plano, material, espesor y volumen.", inputs: ["Material y espesor", "Plano o geometría", "Cantidad", "Terminación y plazo"] },
  "srv-punzonado-hidraulico": { application: "Perforación, recorte y preparación de placas, perfiles y barras con matrices intercambiables.", inputs: ["Material y sección", "Diámetro o geometría", "Cantidad", "Etapa posterior"] },
  "srv-corte": { application: "Corte automatizado de planchas y fabricación de piezas para proyectos metalmecánicos.", inputs: ["Material y espesor", "Plano, croquis o muestra", "Cantidad", "Medidas y terminación"] },
  "srv-esmerilado": { application: "Retiro de rebabas, limpieza de bordes y preparación de superficies antes del armado o entrega.", inputs: ["Tipo de pieza", "Estado inicial", "Terminación esperada", "Cantidad"] },
  "srv-mecanizado": { application: "Fabricación, ajuste o recuperación de piezas mediante torno, fresado y operaciones complementarias.", inputs: ["Plano o pieza de referencia", "Material", "Medidas críticas", "Cantidad y aplicación"] },
  "srv-soldadura": { application: "Fabricación y reparación de estructuras, carros, tolvas y componentes metálicos.", inputs: ["Uso de la estructura", "Material y dimensiones", "Carga o condición de trabajo", "Ubicación y plazo"] },
  "srv-puesta-marcha": { application: "Instalación, configuración, primeras pruebas y orientación inicial para operar equipos nuevos.", inputs: ["Equipo y modelo", "Ubicación", "Energía y servicios disponibles", "Alcance de capacitación"] },
};

function createServicePage(item) {
  const detail = serviceDetails[item.id] || { application: item.summary, inputs: ["Descripción del trabajo", "Material", "Medidas", "Cantidad y plazo"] };
  const inputs = detail.inputs.map((value, index) => `<article class="knowledge-card"><b>0${index + 1}</b><h3>${esc(value)}</h3><p>Incluye este dato si está disponible; si falta, podemos comenzar la revisión con la información existente.</p></article>`).join("");
  const output = `${head({ title: `${item.name} en Santiago y Chile | MAQELEC`, description: item.summary, feature: "services" })}
    <main id="mainContent">
      <section class="page-intro"><div class="ma-container"><span class="eyebrow">${esc(item.category)}</span><h1>${esc(item.name)}</h1><p>${esc(item.summary)}</p></div></section>
      <section><div class="ma-container machine-product-layout"><div class="machine-gallery-main"><img src="${esc(item.image)}" alt="${esc(item.imageAlt || item.name)}"><span>${item.mediaType === "real" ? "Proceso documentado por MAQELEC" : "Imagen referencial identificada"}</span></div><div class="machine-product-copy"><span class="eyebrow">Aplicación</span><h2>Qué necesidad aborda</h2><p>${esc(detail.application)}</p><div class="machine-commercial-note"><strong>Alcance a confirmar</strong><p>Material, medidas, cantidad, ubicación y terminación pueden modificar el proceso y el plazo.</p></div><div class="hero-actions"><a class="button primary" href="cotizar.html?tipo=servicio">Solicitar evaluación</a><a class="button secondary" href="servicios.html">Ver servicios</a></div></div></div></section>
      <section class="knowledge-section"><div class="ma-container"><div class="compact-heading"><div><span>Información para cotizar</span><h2>Qué datos ayudan a evaluar el trabajo</h2></div></div><div class="knowledge-grid">${inputs}</div></div></section>
      <section><div class="ma-container answer-grid"><article class="answer-card"><b>Cobertura</b><h3>¿Se puede evaluar fuera de Santiago?</h3><p>Sí. La factibilidad se confirma según ubicación, transporte, alcance y condiciones técnicas.</p></article><article class="answer-card"><b>Inicio</b><h3>¿Qué pasa si todavía no tengo todos los datos?</h3><p>Podemos comenzar con fotografías, medidas aproximadas, un croquis o una pieza de referencia.</p></article></div></section>
    </main>${footer()}`;
  fs.writeFileSync(path.join(root, slugService(item)), output);
}

const projectStudies = {
  "proy-pulido-terminacion": ["Eliminar rebabas y dejar bordes seguros para armado o entrega.", "Esmeril angular y herramientas de terminación.", "Piezas limpias y listas para la siguiente etapa."],
  "proy-corte-plasma-cnc": ["Obtener geometrías repetibles desde una plancha metálica.", "Mesa plasma CNC con control automático de altura F1621.", "Cortes programados y piezas identificadas para fabricación."],
  "proy-punzonado-hidraulico": ["Perforar, recortar y preparar material con distintas geometrías.", "Punzonadora y cizalla hidráulica combinada Q35Y-20.", "Piezas preparadas para mecanizado, armado o entrega."],
  "proy-torneado-cilindrado": ["Convertir un perfil inicial en una geometría cilíndrica controlada.", "Torno convencional C0636B y sistema de lubricación.", "Diámetro exterior mecanizado y terminación uniforme."],
  "proy-yegua-industrial": ["Crear un carro manual resistente para carga y traslado.", "Corte, torno, soldadura y herramientas de terminación.", "Yegua industrial armada, pintada y lista para trabajo."],
  "proy-tolva-tractor": ["Fabricar una solución de arrastre adaptada a un tractor.", "Plasma CNC, torno, soldadura y control geométrico.", "Tolva estructural a medida, preparada para montaje y operación."],
  "proy-piezas-metalicas": ["Producir lotes de componentes en diferentes formas y medidas.", "Plasma, punzonado, mecanizado y terminación.", "Piezas clasificadas y listas para integración o despacho."],
};

function createProjectPage(item) {
  const study = projectStudies[item.id] || ["Resolver un requerimiento metalmecánico.", "Equipos definidos según material y geometría.", "Trabajo preparado para su aplicación."];
  const gallery = (item.gallery || []).map((image) => `<img src="${esc(image.src)}" alt="${esc(image.alt || "Proceso del proyecto")}" loading="lazy">`).join("");
  const steps = (item.processSteps || []).map((step) => `<li>${esc(step)}</li>`).join("");
  const output = `${head({ title: `${item.title} | Proyecto real MAQELEC`, description: item.summary, feature: "projects" })}
    <main id="mainContent">
      <section class="page-intro"><div class="ma-container"><span class="eyebrow">Trabajo real · ${esc(item.type)}</span><h1>${esc(item.title)}</h1><p>${esc(item.summary)}</p></div></section>
      <section><div class="ma-container project-card"><div class="project-media"><img class="project-main-image" src="${esc(item.image)}" alt="${esc(item.imageAlt || item.title)}"><div class="project-gallery">${gallery}</div></div><div class="project-copy"><span class="status-pill">Caso documentado</span><h2>Necesidad, equipos y resultado</h2><dl class="case-study-summary"><div><dt>Necesidad</dt><dd>${esc(study[0])}</dd></div><div><dt>Equipos</dt><dd>${esc(study[1])}</dd></div><div><dt>Resultado</dt><dd>${esc(study[2])}</dd></div></dl>${steps ? `<h3>Proceso ejecutado</h3><ol class="project-steps">${steps}</ol>` : ""}<div class="hero-actions"><a class="button primary" href="cotizar.html">Evaluar un proyecto similar</a><a class="button secondary" href="proyectos.html">Ver proyectos</a></div></div></div></section>
    </main>${footer()}`;
  fs.writeFileSync(path.join(root, slugProject(item)), output);
}

function replaceMount(fileName, marker, selector, content) {
  const file = path.join(root, fileName);
  let html = fs.readFileSync(file, "utf8");
  const begin = `<!-- ${marker}:BEGIN -->`;
  const end = `<!-- ${marker}:END -->`;
  if (html.includes(begin)) {
    html = html.replace(new RegExp(`${begin}[\\s\\S]*?${end}`), `${begin}${content}${end}`);
  } else {
    const pattern = new RegExp(`(<div[^>]*${selector}[^>]*>)[\\s\\S]*?(</div>)`);
    html = html.replace(pattern, `$1${begin}${content}${end}$2`);
  }
  fs.writeFileSync(file, html);
}

const staticMachines = catalog.machinery.map((item) => `<article class="catalog-card machine-card" data-searchable="${esc([item.name, item.category, item.summary, ...(item.specs || [])].join(" "))}"><div class="machine-visual machine-visual-photo"><img src="${esc(item.image)}" alt="${esc(item.imageAlt || item.name)}" loading="lazy"><span>${item.mediaType === "real" ? "Equipo real" : "Imagen referencial"}</span></div><div class="catalog-card-body"><div class="card-meta"><span>${esc(item.category)}</span></div><h3>${esc(item.name)}</h3><p>${esc(item.summary)}</p>${item.technicalSpecs ? `<a class="text-link" href="${slugMachine(item)}">Ver ficha técnica →</a>` : `<a class="text-link" href="cotizar.html?tipo=maquinaria&equipo=${encodeURIComponent(item.id)}">Consultar configuración →</a>`}</div></article>`).join("");

const staticServices = catalog.services.map((item) => `<article class="catalog-card service-card" data-searchable="${esc([item.name, item.category, item.summary].join(" "))}"><div class="service-image"><img src="${esc(item.image)}" alt="${esc(item.imageAlt || item.name)}" loading="lazy"><span class="real-media-label">${item.mediaType === "real" ? "Trabajo real" : "Imagen referencial"}</span></div><div class="catalog-card-body"><div class="card-meta"><span>${esc(item.category)}</span></div><h3>${esc(item.name)}</h3><p>${esc(item.summary)}</p><a class="text-link" href="${slugService(item)}">Ver servicio →</a></div></article>`).join("");

const staticProjects = catalog.projects.map((item) => `<article id="${esc(item.id)}" class="project-card"><div class="project-media"><img class="project-main-image" src="${esc(item.image)}" alt="${esc(item.imageAlt || item.title)}" loading="lazy"></div><div class="project-copy"><span class="status-pill">Trabajo real</span><small>${esc(item.type)}</small><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><a class="text-link" href="${slugProject(item)}">Abrir caso documentado →</a></div></article>`).join("");

const staticVideos = catalog.videos.map((item) => `<article class="process-video-card"><video controls playsinline preload="metadata" poster="${esc(item.poster)}"><source src="${esc(item.src)}" type="video/mp4">Tu navegador no puede reproducir este video.</video><div><small>${esc(item.type)}</small><h3>${esc(item.title)}</h3></div></article>`).join("");

const staticShowcase = catalog.machinery.slice(0, 4).map((item) => `<a class="machine-teaser" href="${item.technicalSpecs ? slugMachine(item) : "maquinaria.html"}"><div class="machine-teaser-visual machine-teaser-photo"><img src="${esc(item.image)}" alt="${esc(item.imageAlt || item.name)}" loading="lazy"><span>${item.mediaType === "real" ? "Equipo real" : "Imagen referencial"}</span></div><div class="machine-teaser-copy"><small>${esc(item.category)}</small><h3>${esc(item.name)}</h3><b>Consultar equipo →</b></div></a>`).join("");

replaceMount("maquinaria.html", "PRERENDER-MACHINERY", "data-machine-grid", staticMachines);
replaceMount("servicios.html", "PRERENDER-SERVICES", "data-service-grid", staticServices);
replaceMount("proyectos.html", "PRERENDER-PROJECTS", "data-project-grid", staticProjects);
replaceMount("proyectos.html", "PRERENDER-VIDEOS", "data-process-videos", staticVideos);
replaceMount("index.html", "PRERENDER-SHOWCASE", "data-machine-showcase", staticShowcase);

catalog.machinery.filter((item) => item.technicalSpecs && item.status === "live").forEach(createMachinePage);
catalog.services.filter((item) => item.status === "live").forEach(createServicePage);
catalog.projects.filter((item) => item.status === "live").forEach(createProjectPage);

const corePages = ["", "maquinaria.html", "servicios.html", "proyectos.html", "quienes-somos.html", "guias.html", "guia-cotizar-corte-plasma-cnc.html", "guia-elegir-maquinaria-industrial.html", "cotizar.html", "manuales.html"];
const urls = [
  ...corePages,
  ...catalog.machinery.filter((item) => item.technicalSpecs && item.status === "live").map(slugMachine),
  ...catalog.services.filter((item) => item.status === "live").map(slugService),
  ...catalog.projects.filter((item) => item.status === "live").map(slugProject),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>https://maqelec.cl/${url}</loc><lastmod>${updated}</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

console.log(`Descubrimiento generado: ${urls.length} URLs públicas.`);
await import("./apply-seo-metadata.mjs");
