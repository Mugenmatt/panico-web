// Ruteo SPA por hash. Cada página del sitio es una <section data-page> en
// index.html y coincide con una ruta de la barra de navegación:
//   #/           → inicio
//   #/proyectos  → proyectos
//   #/nosotros   → nosotros
//   #/contacto   → contacto
// Solo la página activa está visible; al navegar se vuelve arriba del scroll.
// Dispara 'routechange' para que otros módulos recalibren
// sus mediciones cuando cambia la visibilidad de sus secciones.
const RUTAS = ['inicio', 'proyectos', 'nosotros', 'contacto']

export function initRouter() {
  const paginas = document.querySelectorAll('[data-page]')
  const enlaces = document.querySelectorAll('.nav__link[data-route]')
  const footer = document.querySelector('.footer')

  // Lee la ruta del hash. Un hash vacío o desconocido cae en "inicio".
  function rutaActual() {
    const hash = window.location.hash.replace(/^#\/?/, '')
    return RUTAS.includes(hash) ? hash : 'inicio'
  }

  function mostrarPagina() {
    const ruta = rutaActual()

    paginas.forEach((pagina) => {
      const activa = pagina.dataset.page === ruta
      pagina.hidden = !activa
      pagina.classList.toggle('is-active', activa)
    })

    // Marca el enlace de la página activa en el header.
    enlaces.forEach((enlace) => {
      const activo = enlace.dataset.route === ruta
      enlace.classList.toggle('nav__link--active', activo)
      enlace.setAttribute('aria-current', activo ? 'page' : 'false')
    })

    // El footer solo aparece fuera de la home: en Inicio la pantalla es el
    // hero a toda pantalla, sin scroll ni contenido de cierre.
    if (footer) {
      footer.hidden = ruta === 'inicio'
    }

    // Avisa al resto de los módulos que cambió la página, para que
    // refresquen sus mediciones (ScrollTrigger, etc.).
    window.dispatchEvent(new CustomEvent('routechange'))

    // Cada página parte desde el inicio del scroll. Si Lenis está activo,
    // se sincroniza con él para no pelear contra la animación en curso.
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  window.addEventListener('hashchange', mostrarPagina)
  mostrarPagina()
}