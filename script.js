function consultar(tipo) {
  const input = document.getElementById(tipo);
  const valor = input ? input.value.trim() : '';
  const etiqueta = tipo === 'pedido' ? 'pedido' : 'orden de transporte';

  if (!valor) {
    alert('Ingresa un número de ' + etiqueta + ' para consultar.');
    if (input) input.focus();
    return;
  }

  const mensaje = `Hola MAQELEC, quiero consultar el estado de mi ${etiqueta} N° ${valor}.`;
  const url = `https://wa.me/56991514957?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
