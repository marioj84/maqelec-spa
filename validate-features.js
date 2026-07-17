const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("site-config.js", "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const config = context.window.MAQELEC_SITE_CONFIG;
const validStates = new Set(["off", "preview", "live"]);
const errors = [];

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

if (errors.length) {
  console.error("Configuración de funciones inválida:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log("Configuración de funciones MAQELEC: OK");
