// Scroll suave en todo el sitio con Lenis.
// Una funcionalidad = un módulo. La instancia queda expuesta en window.lenis
// para que el router navegue al inicio de página sin saltos bruscos.
// Si el usuario prefiere menos movimiento, se deja el scroll nativo.
import Lenis from 'lenis'

export function initSmoothScroll() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const lenis = new Lenis({
    duration: 2.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.5,
  })

  window.lenis = lenis

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}