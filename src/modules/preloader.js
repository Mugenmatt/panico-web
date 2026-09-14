// Preloader de la intro: pantalla negra con el wordmark y un contador de
// carga 0→100. Avanza con el progreso real de los assets (window load) y se
// desvanece apenas termina. La intro dura siempre al menos 5 segundos;
// si el load tarda más, espera a que termine. Con movimiento reducido se
// muestra y se oculta sin animar.
export function initPreloader() {
  const preloader = document.querySelector('#preloader')
  if (!preloader) return

  const contador = preloader.querySelector('[data-preloader-numero]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let valor = 0
  const total = 100
  const inicio = performance.now()
  const duracion = 5000
  let loadCompleto = reduceMotion

  function fin() {
    if (!loadCompleto || (performance.now() - inicio < duracion && !reduceMotion)) return
    document.documentElement.classList.add('is-loaded')
    preloader.classList.add('is-done')
    // Avisa al resto de los módulos que la intro terminó.
    window.dispatchEvent(new CustomEvent('preloader:done'))
    // Tras la transición de PNG se desmonta del DOM.
    setTimeout(() => preloader.remove(), reduceMotion ? 0 : 500)
  }

  // Sin JS avanzado (o con menos movimiento) se muestra un instante y se va.
  if (reduceMotion || !('IntersectionObserver' in window)) {
    fin()
    return
  }

  function frame() {
    if (!document.body.contains(preloader)) return

    const avanzado = (performance.now() - inicio) / duracion
    valor = Math.min(total, Math.floor(avanzado * total))
    if (contador) contador.textContent = String(valor).padStart(3, '0')

    if (valor < total) {
      requestAnimationFrame(frame)
    } else {
      // El contador llegó a 100; falta el load real para cerrar.
      fin()
    }
  }

  window.addEventListener('load', () => {
    loadCompleto = true
    valor = total
    if (contador) contador.textContent = String(total).padStart(3, '0')
    fin()
  })

  requestAnimationFrame(frame)
}