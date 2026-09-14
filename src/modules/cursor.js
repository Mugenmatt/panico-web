// Cursor cinematográfico: una mira de visor (anillo + punto) que sigue al
// puntero con interpolación. Sobre elementos interactivos (enlaces, botones,
// tarjetas, acordeón) se expande y toma el rojo sangre. Solo en dispositivos
// con puntero fino y sin movimiento reducido; el cursor nativo se oculta por
// CSS (ver style.css).
export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const cursor = document.createElement('div')
  cursor.className = 'cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = '<span class="cursor__nucleo"></span>'
  document.body.appendChild(cursor)

  // Los elementos por los que el cursor "se agarra".
  const selectorInteractivo = 'a, button, .proyecto-card, .nosotros__item-disparador, input, textarea, [data-lightbox]'

  let xTarget = window.innerWidth / 2
  let yTarget = window.innerHeight / 2
  let xActual = xTarget
  let yActual = yTarget
  let escala = 1
  let escalaObjetivo = 1
  let rafId = null

  window.addEventListener('mousemove', (event) => {
    xTarget = event.clientX
    yTarget = event.clientY
    document.body.classList.add('cursor-movio')
    if (rafId === null) loop()
  })

  document.addEventListener('mouseover', (event) => {
    const sobre = event.target.closest(selectorInteractivo)
    escalaObjetivo = sobre ? 1.6 : 1
    cursor.classList.toggle('is-interactivo', Boolean(sobre))
  })

  function loop() {
    xActual += (xTarget - xActual) * 0.2
    yActual += (yTarget - yActual) * 0.2
    escala += (escalaObjetivo - escala) * 0.18
    cursor.style.transform = `translate3d(${xActual - 22}px, ${yActual - 22}px, 0) scale(${escala})`

    const asentado =
      Math.abs(xTarget - xActual) < 0.1 &&
      Math.abs(yTarget - yActual) < 0.1 &&
      Math.abs(escalaObjetivo - escala) < 0.02

    if (asentado) {
      rafId = null
      return
    }
    rafId = requestAnimationFrame(loop)
  }

  // Ocultar al salir de la ventana para no dejar la mira clavada.
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('is-saliendo')
    xTarget = -100
    yTarget = -100
    if (rafId === null) loop()
  })
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('is-saliendo')
  })
}