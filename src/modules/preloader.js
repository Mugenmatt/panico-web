// Preloader de la intro: pantalla negra con el wordmark y un contador de
// carga 0→100. Avanza con el progreso real de los assets (window load) y se
// desvanece apenas termina. Con movimiento reducido se muestra y se oculta
// sin animar.
export function initPreloader() {
  const preloader = document.querySelector('#preloader')
  if (!preloader) return

  const contador = preloader.querySelector('[data-preloader-numero]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let valor = 0
  const total = 100

  function fin() {
    document.documentElement.classList.add('is-loaded')
    preloader.classList.add('is-done')
    // Tras la transición de PNG se desmonta del DOM.
    setTimeout(() => preloader.remove(), reduceMotion ? 0 : 500)
  }

  // Sin JS avanzado (o con menos movimiento) se muestra un instante y se va.
  if (reduceMotion || !('IntersectionObserver' in window)) {
    fin()
    return
  }

  // Progreso real: el window load de los assets (videos, imágenes, fuentes).
  const inicio = performance.now()
  const duracion = 900

  function frame() {
    if (!document.body.contains(preloader)) return

    const avanzado = (performance.now() - inicio) / duracion
    valor = Math.min(total, Math.floor(avanzado * total))
    if (contador) contador.textContent = String(valor).padStart(3, '0')

    if (valor < total) {
      requestAnimationFrame(frame)
    } else {
      // Espera el load real como tope; si el load llega antes, se iguala a 100.
      fin()
    }
  }
  requestAnimationFrame(frame)

  window.addEventListener('load', () => {
    if (valor < total) {
      valor = total
      if (contador) contador.textContent = String(total).padStart(3, '0')
      requestAnimationFrame(fin)
    }
  })
}