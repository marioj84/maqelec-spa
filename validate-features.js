const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("site-config.js", "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const catalogSource = fs.readFileSync("catalog-data.js", "utf8");
vm.runInContext(catalogSource, context);

const config = context.window.MAQELEC_SITE_CONFIG;
const validStates = new Set(["off", "preview", "live"]);
const errors = [];
const catalog = context.window.MAQELEC_CATALOG;

if (!config) {
  errors.push("No se pudo cargar MAQELEC_SITE_CONFIG.");
} else {
  Object.entries(config.features).forEach(([name, feature]) => {
    if (!validStates.has(feature.state)) {
      errors.push(`${name}: estado inválido \"${feature.state}\".`);
    }

    (feature.dependencies || []).forEach((dependencyName) => {
      if (!config.dependencies[dependencyName]) {
        errors.push(`${name}: dependencia inexistente \"${dependencyName}\".`);
      }
    });
  });

  Object.entries(config.pages).forEach(([page, featureName]) => {
    if (!fs.existsSync(page)) {
      errors.push(`Página configurada inexistente: \"${page}\".`);
    }
    if (!config.features[featureName]) {
      errors.push(`${page}: función inexistente \"${featureName}\".`);
    }
  });
}

if (!catalog) {
  errors.push("No se pudo cargar MAQELEC_CATALOG.");
} else {
  ["machinery", "parts", "services", "projects"].forEach((collection) => {
    if (!Array.isArray(catalog[collection])) {
      errors.push(`Colección de catálogo inexistente: \"${collection}\".`);
    }
  });

  const ids = [];
  ["machinery", "parts", "services", "projects"].forEach((collection) => {
    (catalog[collection] || []).forEach((item, index) => {
      if (!item.id) errors.push(`${collection}[${index}]: falta id.`);
      if (!item.name && !item.title) {
        errors.push(`${collection}[${index}]: falta nombre o título.`);
      }
      if (!item.summary) errors.push(`${collection}[${index}]: falta resumen.`);
      if (item.id) ids.push(item.id);
    });
  });

  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    errors.push(
      `IDs de catálogo duplicados: ${[...new Set(duplicateIds)].join(", ")}.`,
    );
  }
}

if (errors.length) {
  console.error(
    "Configuración de funciones inválida:\n- " + errors.join("\n- "),
  );
  process.exit(1);
}

console.log("Configuración de funciones y catálogo MAQELEC: OK");
