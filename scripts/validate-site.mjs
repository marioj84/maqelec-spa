import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const errors = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const indexedCanonicals = new Set();

function record(map, value, file, label) {
  if (!value) return;
  if (map.has(value)) errors.push(`${file}: ${label} duplicado con ${map.get(value)}`);
  else map.set(value, file);
}

function relativeTarget(value) {
  if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(value)) return null;
  return decodeURIComponent(value.split(/[?#]/)[0]);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim();
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1];
  const publicPage = robots?.startsWith("index,");

  if (!title) errors.push(`${file}: falta title`);
  if (!description) errors.push(`${file}: falta meta description`);
  if (!canonical) errors.push(`${file}: falta canonical`);
  if (!robots) errors.push(`${file}: falta robots`);
  if ((html.match(/<link\s+rel="canonical"/gi) || []).length !== 1) errors.push(`${file}: canonical debe aparecer una vez`);
  if ((html.match(/<meta\s+name="robots"/gi) || []).length !== 1) errors.push(`${file}: robots debe aparecer una vez`);
  if (publicPage && (html.match(/<h1(?:\s|>)/gi) || []).length !== 1) errors.push(`${file}: una página pública debe tener exactamente un h1`);

  const schemaBlocks = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!schemaBlocks.length) errors.push(`${file}: faltan datos estructurados`);
  schemaBlocks.forEach((match) => {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${file}: JSON-LD inválido (${error.message})`); }
  });

  if (publicPage) {
    record(titles, title, file, "title");
    record(descriptions, description, file, "description");
    record(canonicals, canonical, file, "canonical");
    if (canonical) indexedCanonicals.add(canonical);
  }

  for (const match of html.matchAll(/<(?:a|link)[^>]+href="([^"]+)"/gi)) {
    const target = relativeTarget(match[1]);
    if (!target || target === "/") continue;
    if (!fs.existsSync(path.resolve(root, target))) errors.push(`${file}: enlace local inexistente ${target}`);
  }
  for (const match of html.matchAll(/<(?:img|script|source)[^>]+src="([^"]+)"/gi)) {
    const target = relativeTarget(match[1]);
    if (target && !fs.existsSync(path.resolve(root, target))) errors.push(`${file}: recurso local inexistente ${target}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/maqelec\.cl\/[^<]*)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = new Set(sitemapUrls);
if (uniqueSitemapUrls.size !== sitemapUrls.length) errors.push("sitemap.xml: contiene URLs duplicadas");

for (const sitemapUrl of sitemapUrls) {
  const target = sitemapUrl.replace("https://maqelec.cl/", "") || "index.html";
  if (!fs.existsSync(path.join(root, target))) errors.push(`sitemap.xml: URL sin archivo ${target}`);
  if (!indexedCanonicals.has(sitemapUrl)) errors.push(`sitemap.xml: URL no indexable o canónica distinta ${sitemapUrl}`);
}

for (const canonical of indexedCanonicals) {
  if (!uniqueSitemapUrls.has(canonical)) errors.push(`sitemap.xml: falta página pública ${canonical}`);
}

const robotsTxt = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
if (!/^Sitemap: https:\/\/maqelec\.cl\/sitemap\.xml$/m.test(robotsTxt)) errors.push("robots.txt: falta referencia exacta al sitemap");
if (!/User-agent: OAI-SearchBot\s+Allow: \//m.test(robotsTxt)) errors.push("robots.txt: OAI-SearchBot no tiene acceso explícito");

const llmsPath = path.join(root, "llms.txt");
if (!fs.existsSync(llmsPath)) errors.push("falta llms.txt");
else {
  const llms = fs.readFileSync(llmsPath, "utf8");
  if (!llms.includes("https://maqelec.cl/")) errors.push("llms.txt: falta el dominio canónico");
  if (!llms.includes("https://maqelec.cl/cobertura.html")) errors.push("llms.txt: falta la página de cobertura");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Sitio validado: ${htmlFiles.length} páginas, enlaces y recursos locales correctos.`);
