// Revelado de elementos al entrar en el viewport.
// Cualquier elemento con [data-reveal] se anima cuando cruza la ventana.
// Sin JS (o con movimiento reducido) el contenido queda visible de una vez.
export function initReveal() {
  const elementos = document.querySelectorAll('[data-reveal]')
  if (!elementos.length) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'))
    return
  }

  // Solo las hojas de estilo ocultan los elementos si el JS ya corrió,
  // así no se pierde contenido en un navegador sin soporte.
  document.documentElement.classList.add('has-reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  elementos.forEach((el) => observer.observe(el))
}