// Grano de película en toda la página: un lienzo a baja resolución redibuja
// ruido constante con transparencia muy baja, como celuloide viejo. Se pausa
// cuando la pestaña no es visible y se desactiva con movimiento reducido.
export function initGrain() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const canvas = document.createElement('canvas')
  canvas.className = 'grain'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)

  // Baja resolución: el canvas se estira a pantalla completa con CSS.
  const ancho = 180
  const alto = 100
  canvas.width = ancho
  canvas.height = alto
  const ctx = canvas.getContext('2d')

  const imagen = ctx.createImageData(ancho, alto)
  const datos = imagen.data

  let pausado = false
  document.addEventListener('visibilitychange', () => {
    pausado = document.hidden
  })

  let valor = 0
  let ultimo = 0
  function frame(ahora) {
    if (!pausado && ahora - ultimo >= 40) {
      for (let i = 0; i < datos.length; i += 4) {
        const ruido = Math.random() * 255
        datos[i] = ruido
        datos[i + 1] = ruido
        datos[i + 2] = ruido
        datos[i + 3] = 18 // alfa muy bajo: apenas se nota el grano
      }
      ctx.putImageData(imagen, 0, 0)
      ultimo = ahora
    }
    valor = requestAnimationFrame(frame)
  }
  valor = requestAnimationFrame(frame)
}