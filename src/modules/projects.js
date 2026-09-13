// Maneja la interacción de las tarjetas de proyectos: preview de video al
// hover (play/pausa sin sonido, solo si la tarjeta está visible en pantalla)
// y respeto de prefers-reduced-motion.
export function initProjects() {
  const cards = document.querySelectorAll('.proyecto-card')
  if (!cards.length) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  cards.forEach((card) => {
    const video = card.querySelector('.proyecto-card__video')
    if (!video) return

    // Con movimiento reducido no se reproduce video al hover: la imagen queda
    // quieta como ficha técnica.
    if (reducedMotion) return

    let hovering = false
    let visible = false

    const tryPlay = () => {
      if (!hovering || !visible) return
      card.classList.add('is-hovering')
      video.play().catch(() => {
        // Si el asset de video todavía no existe, se conserva la imagen.
        card.classList.remove('is-hovering')
      })
    }

    const stop = () => {
      hovering = false
      card.classList.remove('is-hovering')
      video.pause()
    }

    // Puntero y teclado (accesibilidad) disparan el preview.
    card.addEventListener('mouseenter', () => {
      hovering = true
      tryPlay()
    })
    card.addEventListener('mouseleave', stop)
    card.addEventListener('focusin', () => {
      hovering = true
      tryPlay()
    })
    card.addEventListener('focusout', stop)

    // No reproducir videos fuera de pantalla y pausarlos al salir de vista.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible = entry.isIntersecting
            if (!visible) stop()
            else tryPlay()
          })
        },
        { threshold: 0.15 },
      )
      observer.observe(card)
    }
  })
}