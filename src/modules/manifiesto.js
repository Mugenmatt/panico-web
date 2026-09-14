// Manifiesto cinemático (bloque dentro de #inicio): mientras se scrollea, el
// texto se revela línea por línea y el fondo hace crossfade entre stills,
// como los intertítulos de una película. Usa GSAP ScrollTrigger con pin y
// scrub. Con movimiento reducido el manifiesto queda estático y legible.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initManifiesto() {
  const seccion = document.querySelector('#manifiesto')
  if (!seccion) return

  const lineas = seccion.querySelectorAll('[data-manifiesto-linea]')
  const imagenes = seccion.querySelectorAll('[data-manifiesto-imagen]')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Sin movimiento: todo visible, sin pin ni scrub.
  if (reduceMotion) {
    seccion.classList.add('manifiesto--estatico')
    return
  }

  // Integración de Lenis con ScrollTrigger: Lenis ya anima el scroll real de
  // la ventana con su propio bucle, así que basta con sincronizar el plugin.
  if (window.lenis) {
    window.lenis.on('scroll', ScrollTrigger.update)
  }

  // Al navegar entre páginas (SPA) el manifiesto pasa a display:none y sus
  // medidas se pierden; al volver se recalculan.
  document.addEventListener('routechange', () => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  // Cada línea ocupa su franja del recorrido total.
  const paso = 1 / lineas.length

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: seccion,
      start: 'top top',
      end: '+=350%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  })

  // Crossfade entre los stills de fondo.
  imagenes.forEach((imagen, i) => {
    if (i === 0) return
    const desde = i * paso
    tl.fromTo(imagen, { autoAlpha: 0 }, { autoAlpha: 1, duration: paso * 0.6 }, desde)
    if (i < imagenes.length - 1) {
      tl.to(imagen, { autoAlpha: 0, duration: paso * 0.4 }, desde + paso * 0.6)
    }
  })

  // Cada línea entra, se mantiene y sale a lo largo de su tramo.
  lineas.forEach((linea, i) => {
    const entrada = i * paso
    tl.fromTo(
      linea,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: paso * 0.35 },
      entrada,
    )
    tl.to(
      linea,
      { autoAlpha: 0, y: -40, duration: paso * 0.35 },
      entrada + paso * 0.6,
    )
  })

  return tl
}