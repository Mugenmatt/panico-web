// Logo 3D del header: wordmark PÁNICO girando 360° en el eje Y a velocidad
// media y constante, pequeño y centrado arriba. Solo se muestra fuera de la
// home (proyectos / nosotros / contacto); en Inicio la pantalla queda limpia
// para el hero. Escucha 'routechange' para ocultarlo o mostrarlo según la
// página activa.
// TODO: reemplazar esta escena placeholder (placa con palabra en textura)
// por el logo 3D real de Pánico (modelo .glb o geometría propia).
// Con movimiento reducido el módulo no interviene.
import * as THREE from 'three'

export function initLogo3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let overlay = null
  let renderer = null
  let escena = null
  let camara = null
  let malla = null
  let geometria = null
  let material = null
  let textura = null
  let rafId = null
  let ultimoTiempo = 0

  // Velocidad media y constante de giro en Y (rad/s): un giro completo ~9s.
  const VELOCIDAD = 0.7

  // Páginas en las que el logo del header está visible (todas salvo Inicio).
  const RUTAS_CON_LOGO = ['proyectos', 'nosotros', 'contacto']

  // Los colores se leen de los tokens CSS (con respaldo si el CSS no corre).
  function token(nombre, respaldo) {
    const valor = getComputedStyle(document.body)
      .getPropertyValue(nombre)
      .trim()
    return valor || respaldo
  }

  function construirEscena() {
    const COLOR_TEXTO = token('--color-text', '#e8e5e0')
    const COLOR_SANGRE = token('--color-blood-bright', '#c41e1e')

    overlay = document.createElement('div')
    overlay.className = 'logo3d'
    overlay.setAttribute('aria-hidden', 'true')
    const canvas = document.createElement('canvas')
    canvas.className = 'logo3d__canvas'
    overlay.appendChild(canvas)
    document.body.appendChild(overlay)

    // alpha: el canvas es transparente, el logo flota sobre el fondo de la
    // página sin una placa/caja de color detrás.
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    escena = new THREE.Scene()
    camara = new THREE.PerspectiveCamera(32, 1, 0.1, 100)

    escena.add(new THREE.AmbientLight(0xffffff, 0.6))
    const luz = new THREE.DirectionalLight(0xffffff, 1.15)
    luz.position.set(2, 1, 3)
    escena.add(luz)

    // Placa con la palabra pintada en textura (placeholder del logo real).
    const base = crearTextura(COLOR_TEXTO, COLOR_SANGRE)
    textura = base.textura
    geometria = new THREE.BoxGeometry(base.ancho, base.alto, base.alto * 0.14)
    material = new THREE.MeshStandardMaterial({
      map: textura,
      roughness: 0.42,
      metalness: 0.2,
    })
    malla = new THREE.Mesh(geometria, material)
    escena.add(malla)

    ajustarCamara()
    window.addEventListener('resize', ajustarCamara)

    // Re-dibuja la textura cuando Poppins termina de cargar para usar la
    // fuente real y no el respaldo sans-serif del primer trazo.
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          const nueva = crearTextura(COLOR_TEXTO, COLOR_SANGRE)
          geometria.dispose()
          geometria = new THREE.BoxGeometry(
            nueva.ancho,
            nueva.alto,
            nueva.alto * 0.14,
          )
          malla.geometry = geometria
          material.map = nueva.textura
          material.needsUpdate = true
          textura.dispose()
          textura = nueva.textura
          ajustarCamara()
        })
        .catch(() => {})
    }
  }

  // Palabra PÁNICO en Poppins 800 con un hairline de sangre, sobre tinta.
  function crearTextura(colorTexto, colorSangre) {
    const lienzo = document.createElement('canvas')
    const ctx = lienzo.getContext('2d')
    const alto = 256
    ctx.font = '800 180px Poppins, sans-serif'
    const ancho = Math.max(420, Math.ceil(ctx.measureText('PÁNICO').width + 190))
    lienzo.width = ancho
    lienzo.height = alto

    ctx.clearRect(0, 0, ancho, alto)
    ctx.font = '800 180px Poppins, sans-serif'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = colorTexto
    ctx.fillText('PÁNICO', ancho / 2, alto / 2 + 8)

    // Acento: hairline de sangre al pie del wordmark.
    ctx.fillStyle = colorSangre
    ctx.fillRect(ancho / 2 - 140, alto / 2 + 84, 280, 2)

    const texturaLienzo = new THREE.CanvasTexture(lienzo)
    texturaLienzo.colorSpace = THREE.SRGBColorSpace
    texturaLienzo.anisotropy = 8
    return {
      textura: texturaLienzo,
      ancho: ancho / 128, // escala del plano (alto de placa ≈ 2 unidades)
      alto: 2,
    }
  }

  // La cámara se coloca para que la placa nunca se recorte al girar en Y:
  // el ancho del frente (máximo proyectado) y el alto deben caber en el
  // fov vertical con margen, teniendo en cuenta el aspect del canvas.
  function ajustarCamara() {
    if (!renderer || !overlay || !malla || !malla.geometry.parameters) return
    const canvas = overlay.firstElementChild
    const anchoCss = canvas.clientWidth
    const altoCss = canvas.clientHeight
    if (!anchoCss || !altoCss) return
    renderer.setSize(anchoCss, altoCss, false)
    camara.aspect = anchoCss / altoCss

    const dimensiones = malla.geometry.parameters
    const margen = 1.12
    const radio = Math.max(
      dimensiones.height,
      dimensiones.width / camara.aspect,
    ) * margen
    const tangente = Math.tan(THREE.MathUtils.degToRad(camara.fov) / 2)
    camara.position.set(0, 0, radio / tangente)
    camara.lookAt(0, 0, 0)
    camara.updateProjectionMatrix()
  }

  function loop(tiempo) {
    const delta = Math.min(0.05, (tiempo - ultimoTiempo) / 1000)
    ultimoTiempo = tiempo
    // Solo se renderiza cuando la página activa muestra el logo en el header.
    if (overlay.classList.contains('is-visible')) {
      malla.rotation.y += VELOCIDAD * delta
      renderer.render(escena, camara)
    }
    rafId = requestAnimationFrame(loop)
  }

  // Muestra el logo solo fuera de la home (ruta idéntica a la del router).
  function actualizarVisibilidad() {
    if (!overlay) return
    const hash = window.location.hash.replace(/^#\/?/, '')
    overlay.classList.toggle('is-visible', RUTAS_CON_LOGO.includes(hash))
  }

  construirEscena()
  actualizarVisibilidad()
  window.addEventListener('routechange', actualizarVisibilidad)

  ultimoTiempo = performance.now()
  rafId = requestAnimationFrame(loop)
}