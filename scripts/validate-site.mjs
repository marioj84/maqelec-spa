import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const errors = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

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
for (const match of sitemap.matchAll(/<loc>https:\/\/maqelec\.cl\/([^<]*)<\/loc>/g)) {
  const target = match[1] || "index.html";
  if (!fs.existsSync(path.join(root, target))) errors.push(`sitemap.xml: URL sin archivo ${target}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Sitio validado: ${htmlFiles.length} páginas, enlaces y recursos locales correctos.`);
