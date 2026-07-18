(function () {
  "use strict";
  const catalog = window.MAQELEC_CATALOG;
  const form = document.querySelector("[data-guided-quote]");
  const select = document.querySelector("[data-quote-subject]");
  const status = document.querySelector("[data-quote-status]");
  if (!form || !catalog) return;

  const groups = {
    Maquinaria: catalog.machinery.map((item) => ({ value: item.id, label: item.name })),
    Servicio: catalog.services.map((item) => ({ value: item.id, label: item.name })),
    "Piezas a medida": [{ value: "piezas", label: "Fabricación de piezas y componentes" }]
  };

  function fill(type, preferred) {
    select.innerHTML = '<option value="">Selecciona una alternativa</option>' + groups[type]
      .map((item) => `<option value="${item.value}"${item.value === preferred ? " selected" : ""}>${item.label}</option>`)
      .join("");
  }

  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get("tipo");
  const initialType = requestedType === "servicio"
    ? "Servicio"
    : requestedType === "piezas"
      ? "Piezas a medida"
      : "Maquinaria";
  const initialRadio = form.querySelector(`[name="type"][value="${initialType}"]`);
  if (initialRadio) initialRadio.checked = true;
  fill(initialType, params.get("equipo"));
  form.querySelectorAll('[name="type"]').forEach((input) => input.addEventListener("change", () => fill(input.value)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = select.options[select.selectedIndex]?.text || "Sin alternativa indicada";
    const file = data.get("attachment");
    const lines = [
      "Hola MAQELEC, quiero solicitar una evaluación técnica.",
      `Tipo: ${data.get("type")}.`,
      `Equipo/proceso: ${subject}.`,
      `Empresa: ${data.get("company") || "No indicada"}.`,
      `Contacto: ${data.get("name")} · ${data.get("phone")}.`,
      `Material: ${data.get("material") || "Por definir"}.`,
      `Medidas/espesor: ${data.get("dimensions") || "Por definir"}.`,
      `Cantidad: ${data.get("quantity") || "Por definir"}.`,
      `Plazo: ${data.get("deadline") || "Por definir"}.`,
      `Detalle: ${data.get("details")}.`
    ];
    if (file && file.name) lines.push(`Tengo el archivo “${file.name}” para adjuntarlo en este chat.`);
    status.textContent = "Abriendo WhatsApp con el requerimiento ordenado. Revisa el mensaje y adjunta el archivo si corresponde.";
    window.open(`https://wa.me/56991514957?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  });
})();
