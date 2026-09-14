// Lightbox de proyección: al hacer clic en una tarjeta de proyecto (o en el
// reel) abre un overlay a pantalla completa con el video (con sonido, propio
// de una acción explícita del usuario), título, ficha técnica y sinopsis.
// Cierra con botón, clic en el fondo o Escape. Con movimiento reducido se
// muestra sin animación.
export function initLightbox() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tarjetas = document.querySelectorAll('.proyecto-card')
  const reeles = document.querySelectorAll('[data-reel-play]')

  function construir() {
    const caja = document.createElement('div')
    caja.className = 'lightbox'
    caja.dataset.lightbox = ''
    caja.setAttribute('role', 'dialog')
    caja.setAttribute('aria-modal', 'true')
    caja.setAttribute('aria-labelledby', 'lightbox-titulo')
    caja.hidden = true
    caja.innerHTML = `
      <button class="lightbox__cerrar" type="button" aria-label="Cerrar vista">
        Cerrar
      </button>
      <figure class="lightbox__escena">
        <div class="lightbox__video-wrap" data-lightbox-video></div>
        <figcaption class="lightbox__info">
          <span class="lightbox__kicker">Pánico presenta</span>
          <h3 class="lightbox__titulo" id="lightbox-titulo" data-lightbox-titulo></h3>
          <p class="lightbox__meta" data-lightbox-meta></p>
          <p class="lightbox__descripcion" data-lightbox-descripcion></p>
        </figcaption>
      </figure>
    `
    document.body.appendChild(caja)
    return caja
  }

  let caja = null
  let elementoFocoPrevio = null
  let videoActual = null

  function abrir(contenido) {
    if (!caja) caja = construir()
    if (!contenido) return

    const { titulo, meta, descripcion, videoSrc, imagenSrc } = contenido
    const contenedor = caja.querySelector('[data-lightbox-video]')
    contenedor.innerHTML = ''

    // En el lightbox el video arranca sonando: es una acción explícita del
    // usuario, así que el navegador permite el audio.
    if (videoSrc) {
      const video = document.createElement('video')
      video.className = 'lightbox__video'
      video.loop = true
      video.playsInline = true
      video.autoplay = true
      video.muted = false
      const fuente = document.createElement('source')
      fuente.src = videoSrc
      fuente.type = 'video/mp4'
      video.appendChild(fuente)
      contenedor.appendChild(video)
      videoActual = video
    } else if (imagenSrc) {
      const img = document.createElement('img')
      img.className = 'lightbox__imagen'
      img.src = imagenSrc
      img.alt = ''
      contenedor.appendChild(img)
    }

    caja.querySelector('[data-lightbox-titulo]').textContent = titulo || ''
    caja.querySelector('[data-lightbox-meta]').textContent = meta || ''
    caja.querySelector('[data-lightbox-descripcion]').textContent = descripcion || ''

    // Foco: se mueve al botón cerrar y se devuelve al abrir.
    elementoFocoPrevio = document.activeElement
    const cerrar = caja.querySelector('.lightbox__cerrar')

    caja.hidden = false
    if (reduceMotion) {
      caja.classList.add('lightbox--instantaneo')
    }
    requestAnimationFrame(() => cerrar.focus())

    // Bloquea el scroll del sitio mientras está abierto (Lenis o nativo).
    if (window.lenis) {
      window.lenis.stop()
    } else {
      document.body.classList.add('no-scroll')
    }

    videoActual?.play().catch(() => {})
  }

  function cerrar() {
    caja.hidden = true
    videoActual?.pause()
    videoActual = null
    if (window.lenis) {
      window.lenis.start()
    } else {
      document.body.classList.remove('no-scroll')
    }
    elementoFocoPrevio?.focus()
  }

  // Clic en una tarjeta de proyecto → contenido desde su DOM.
  tarjetas.forEach((tarjeta) => {
    const abrirDesdeTarjeta = () => {
      const titulo = tarjeta.querySelector('.proyecto-card__titulo')?.textContent?.trim()
      const meta = Array.from(
        tarjeta.querySelectorAll('.proyecto-card__meta span'),
      )
        .map((span) => span.textContent.trim())
        .join(' · ')
      const descripcion = tarjeta.dataset.descripcion || ''
      const videoEl = tarjeta.querySelector('.proyecto-card__video source')
      const videoSrc = videoEl?.getAttribute('src') || null
      const imagenSrc =
        tarjeta.querySelector('.proyecto-card__still')?.getAttribute('src') || null
      abrir({ titulo, meta, descripcion, videoSrc, imagenSrc })
    }
    tarjeta.addEventListener('click', abrirDesdeTarjeta)
    // Accesibilidad: Enter y Espacio también abren la vista.
    tarjeta.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        abrirDesdeTarjeta()
      }
    })
  })

  // Clic en el botón del reel → abre el showreel con sonido.
  reeles.forEach((reel) => {
    reel.addEventListener('click', () => {
      abrir({
        titulo: reel.dataset.reelTitulo || 'Showreel',
        meta: reel.dataset.reelMeta || '',
        descripcion: reel.dataset.reelDescripcion || '',
        videoSrc: reel.dataset.reelSrc || null,
      })
    })
  })

  // Cierre: botón, fondo y teclado.
  const eventoClick = (event) => {
    if (!caja || caja.hidden) return
    if (event.target.closest('.lightbox__cerrar') || event.target === caja) {
      cerrar()
    }
  }
  const eventoTecla = (event) => {
    if (!caja || caja.hidden) return
    if (event.key === 'Escape') cerrar()
  }

  // Trampa de foco: Tab nunca sale del diálogo mientras está abierto.
  const eventoTab = (event) => {
    if (!caja || caja.hidden) return
    if (event.key !== 'Tab') return
    const elementos = Array.from(
      caja.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null)
    if (!elementos.length) return
    const primero = elementos[0]
    const ultimo = elementos[elementos.length - 1]
    const indice = elementos.indexOf(document.activeElement)
    if (event.shiftKey) {
      if (indice <= 0) {
        event.preventDefault()
        ultimo.focus()
      }
    } else if (indice === -1 || indice === elementos.length - 1) {
      event.preventDefault()
      primero.focus()
    }
  }

  document.addEventListener('click', eventoClick)
  document.addEventListener('keydown', eventoTecla)
  document.addEventListener('keydown', eventoTab)
}