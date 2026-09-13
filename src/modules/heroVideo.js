export function initHeroVideo() {
  const video = document.querySelector('.hero__video')
  if (!video) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    video.removeAttribute('autoplay')
    return
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
}