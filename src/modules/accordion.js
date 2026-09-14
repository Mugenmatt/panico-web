// Acordeón de "Formatos y encargos" (sección nosotros).
// Cada fila despliega la lista de obras de un formato. Apertura exclusiva:
// abrir una fila cierra la que estuviera abierta. Sin JS el panel queda
// cerrado pero el contenido sigue en el DOM (el panel usa grid-template-rows).
export function initAccordion() {
  const contenedor = document.querySelector('[data-acordeon]')
  if (!contenedor) return

  const items = contenedor.querySelectorAll('.nosotros__item')

  function cerrar(item) {
    item.classList.remove('is-open')
    item.querySelector('.nosotros__item-disparador').setAttribute('aria-expanded', 'false')
  }

  items.forEach((item) => {
    const disparador = item.querySelector('.nosotros__item-disparador')
    if (!disparador) return

    disparador.addEventListener('click', () => {
      const estabaAbierto = item.classList.contains('is-open')

      // Apertura exclusiva: cierra el resto de las filas.
      items.forEach((otro) => {
        if (otro !== item) cerrar(otro)
      })

      if (estabaAbierto) {
        cerrar(item)
      } else {
        item.classList.add('is-open')
        disparador.setAttribute('aria-expanded', 'true')
      }
    })
  })
}