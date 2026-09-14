# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Potenciales clientes: bandas y realizadores audiovisuales que llegan al sitio
para evaluar el portfolio de Pánico y encargar una producción (videoclip,
cortometraje, largometraje, video arte o visual still). Vienen a mirar el
trabajo y a contactar por email; no a navegar contenido editorial prolongado.

## Product Purpose

Sitio portfolio de "Pánico", productora audiovisual argentina especializada
en terror y videos musicales para bandas. Existe para mostrar el trabajo de la
productora y conseguir que potenciales clientes los contacten por email. El
éxito se mide en encargos iniciados a través del formulario de contacto, no en
tráfico.

## Positioning

Productora dedicada exclusivamente a dos cosas — terror y videos musicales
para bandas — tratando el género con seriedad editorial (referencias
declaradas: cine de terror serio tipo Boulderlight Pictures, XYZ Films, Hammer
Films), no como festejo de Halloween. Esa especialización y ese registro serio
es lo que la distingue de productoras generalistas.

## Operating Context

- El visitante pasa por una experiencia de apertura (preloader + logo 3D)
  antes de llegar al contenido; luego navega un SPA con scroll suave.
- Recorrido típico: ver el reel/showreel, revisar la grilla de proyectos,
  leer quiénes son y llegar al formulario de contacto.
- Toda la comunicación y el contenido del sitio están en español.
- El contacto es por email vía Formspree o EmailJS; no hay backend propio.
- Secciones fijas (no agregar ni quitar sin confirmación): `#inicio` hero,
  `#proyectos` grilla de trabajos, `#sobre-nosotros` información
  institucional, `#contacto` formulario.

## Capabilities and Constraints

- Stack fijo: Vite, HTML + CSS + JavaScript vanilla (sin frameworks de UI, sin
  TypeScript). Librerías permitidas: `three`, `lenis`, `gsap`. Deploy en
  Vercel. (Autoridad: `AGENTS.md`, `package.json` — no cambiarlas sin
  confirmar.)
- Una funcionalidad = un módulo en `src/modules/`, importado y llamado desde
  `main.js`. Comentarios en español, nombres kebab-case para archivos/clases.
- Tokens de diseño fijos en `src/styles/variables.css` (colores negro/texto/
  rojo sangre, fuentes Poppins/Anton/Inter); no hardcodearlos.
- Comportamientos fijos: preloader → logo 3D girando 360° en Y → fade a la
  home; scroll suave con Lenis; envío real de email por Formspree/EmailJS.
- Decidido y pendiente: el formulario debe enviar el email real de Pánico,
  pero la dirección destino (hola@panico.agency) es provisional.
- Catálogo de obras, descripciones, stats, equipo, bandas y datos de marca
  (email, handles sociales) son placeholder inventado; todo se debe reemplazar
  por contenido y assets reales antes de considerar el sitio publicado.

## Brand Commitments

- Nombre real y vinculante: **Pánico**.
- Aesthetic vinculante (por AGENTS.md): terror/horror, oscura y editorial,
  cercana al cine de terror serio — no Halloween con calabazas. Rojo sangre
  usado como acento puntual, no como color de fondo grande. Títulos en
  mayúsculas con `--font-display`.
- El email `hola@panico.agency` y los handles `@panico` en Instagram/Vimeo/
  TikTok son **provisionales**, no compromisos de marca confirmados.

## Evidence on Hand

- Assets reales existentes: `public/video/hero-panico.mp4` y las imágenes en
  `public/images/` (posters/stills/anotaciones del equipo).
- La mayor parte del contenido del sitio está marcado en el código con `TODO`
  como provisional (obras, hover de tarjetas, catálogo de formatos, manifiesto,
  stats, bandas, equipo, descripciones).
- Ausencia confirmada por el cliente: no hay aún catálogo real de obras,
  textos institucionales, stats, equipo, bandas, ni dato de contacto
  definitivo. Nada de eso debe inventarse como si fuera contenido final.

## Product Principles

1. **La obra manda**: el portfolio es el argumento principal; toda
   decisión debe hacer que el trabajo se vea profesional y serio de entrada.
2. **El contacto es la meta**: cada flujo debe terminar naturalmente en el
   email; el formulario es la conversión del sitio, no un accesorio.
3. **Especialización estricta**: terror + videos musicales; la identidad nunca
   debe leerse como productora genérica.
4. **Honestidad con los placeholders**: nada provisional debe parecer material
   final de Pánico mientras los assets reales no lleguen.
5. **El género se toma en serio**: el tono y el registro editorial tratan el
   miedo como oficio, no como broma o decorado festivo.