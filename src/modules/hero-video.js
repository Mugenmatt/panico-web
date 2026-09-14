// Comportamiento del hero #inicio:
//  - el video arranca al reproduccirse (clases is-playing)
//  - se pausa fuera de pantalla y reanuda al volver (IntersectionObserver)
//  - letterbox cinematográfico: las barras se abren/cierran según el scroll
//  - botón de sonido de la intro (el autoplay nunca lleva audio; el usuario
//    elige encenderlo)
export function initHeroVideo() {
  const video = document.querySelector('.hero__video')
  if (!video) return
  const hero = video.closest('.hero')

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    video.removeAttribute('autoplay')
  }

  video.addEventListener('playing', () => {
    video.classList.add('is-playing')
  })

  // Pausar el video cuando el hero sale de pantalla y reanudarlo al volver.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(video)
  }

  // Letterbox: al hacer scroll el hero se "descinematografía" y las barras
  // se deslizan fuera de pantalla. Solo si no se prefiere menos movimiento.
  if (hero && !reducedMotion) {
    let deslizado = false
    const sincronizar = () => {
      const activo = window.scrollY > 40
      if (activo !== deslizado) {
        deslizado = activo
        hero.classList.toggle('is-scrolled', activo)
      }
    }
    window.addEventListener('scroll', sincronizar, { passive: true })
    sincronizar()
  }

  // Botón de sonido de la intro.
  const boton = document.querySelector('.hero__sonido')
  if (boton && !reducedMotion) {
    boton.addEventListener('click', () => {
      const conSonido = !video.muted
      video.muted = conSonido
      if (!conSonido) {
        video.play().catch(() => {})
      }
      boton.classList.toggle('is-activo', !conSonido)
      boton.setAttribute('aria-pressed', String(!conSonido))
      boton.querySelector('[data-hero-sonido-on]').hidden = conSonido
      boton.querySelector('[data-hero-sonido-off]').hidden = !conSonido
    })
  }
}