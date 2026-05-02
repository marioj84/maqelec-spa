function renderHeaderFooter(){
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  const wa = document.querySelector('[data-whatsapp]');
  const nav = `
  <header class="header"><div class="container nav"><a class="brand" href="index.html"><img src="logo.png" class="brand-logo" alt="MAQELEC"></a><div class="nav-actions"><nav class="nav-links"><a href="index.html">Home</a><a href="index.html#servicios">Servicios</a><a href="seguimiento.html"><span class="nav-icon">▰</span> Seguimiento</a><a href="manuales.html">Manuales</a><a href="contacto.html">Contacto</a><a class="btn" href="https://wa.me/56991514957?text=Hola%20MAQELEC%2C%20necesito%20cotizar%20una%20soluci%C3%B3n%20industrial" target="_blank">Cotizar</a></nav><a class="social-link" href="https://www.instagram.com/maqelec.spa/" target="_blank"><img src="logo_instagram.png" alt="Instagram"></a><a class="social-link" href="https://wa.me/56991514957" target="_blank"><img src="logo_wsp.png" alt="WhatsApp"></a></div></div></header>`;
  const foot = `<footer><div class="container footer-grid"><div><img src="logo.png" class="footer-logo"><p>Proveedor industrial para continuidad operativa.</p></div><div class="footer-col"><h4>Contacto</h4><a href="tel:+56991514957">+56 9 9151 4957</a><a href="https://www.instagram.com/maqelec.spa/" target="_blank">Instagram</a></div><div class="footer-col"><h4>Horarios</h4><p>Lunes a Viernes</p><p>Atención vía WhatsApp</p></div><div class="footer-col"><h4>Cliente</h4><a href="seguimiento.html">Seguimiento</a><a href="manuales.html">Manuales</a></div></div></footer>`;
  const whatsapp = `<div class="whatsapp-float"><div class="wa-help">¿Necesitas ayuda?<small>Escríbenos y te respondemos.</small></div><a class="wa-button" href="https://wa.me/56991514957?text=Hola%20MAQELEC%2C%20necesito%20ayuda" target="_blank"><img src="logo_wsp.png"></a></div>`;
  if(header) header.innerHTML = nav;
  if(footer) footer.innerHTML = foot;
  if(wa) wa.innerHTML = whatsapp;
}
renderHeaderFooter();
