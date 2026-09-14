---
name: Pánico — Portfolio
description: Sitio portfolio de terror cinematográfico con estética editorial de cuarto oscuro.
colors:
  cinema-black: "#0a0a0a"
  celluloid-cream: "#e8e5e0"
  muted-graphite: "#9a9a9a"
  dried-blood: "#8a0303"
  arterial-red: "#c41e1e"
  arterial-flash: "#da4040"
typography:
  display:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "clamp(1.6rem, 4.5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.01em"
  title:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
  body:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.35em"
  micro:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.6rem"
    fontWeight: 600
  nano:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.65rem"
    fontWeight: 600
  hairline-text:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
  fine:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
  kicker:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
  meta:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
  xmeta:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
  caption:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
  sub:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
  body-fine:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
  body-small:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
  field:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
  stat:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
rounded:
  none: "0px"
spacing:
  xs: "0.7rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.celluloid-cream}"
    typography: "{typography.label}"
    padding: "1rem 2.25rem"
    rounded: "{rounded.none}"
  button-outline-hover:
    backgroundColor: "color-mix(in srgb, {colors.dried-blood} 22%, transparent)"
    textColor: "{colors.celluloid-cream}"
  input-field:
    backgroundColor: "color-mix(in srgb, {colors.celluloid-cream} 4%, {colors.cinema-black})"
    textColor: "{colors.celluloid-cream}"
    rounded: "{rounded.none}"
    padding: "1.05rem 1.2rem"
  nav-link:
    textColor: "{colors.muted-graphite}"
    typography: "{typography.title}"
  nav-link-active:
    textColor: "{colors.arterial-flash}"
  card-media:
    backgroundColor: "color-mix(in srgb, {colors.celluloid-cream} 4%, {colors.cinema-black})"
    rounded: "{rounded.none}"
---

# Design System: Pánico — Portfolio

## Overview

**Creative North Star: "The Darkroom"**

El sitio es un cuarto oscuro: el material entra en bruto y sale procesado,
graneado y con la sangre bien revelada. Todo el sistema trabaja para que el
trabajo audiovisual sea la única luz — HTML oscuro, tipografía densa y
mayúsculas editoriales, y un rojo que corta el monocromo solo donde importa.
La interfaz recede; la obra manda.

**Cinematic restraint.** Oscuro, deliberado, sin concesiones. Cada elemento
es de borde filoso, con grano de película en toda la pantalla y una viñeta que
aprieta los bordes del viewport, como si se mirara por un visor. La densidad
es alta en titulares y etiquetas (mayúsculas, espaciado de letras amplio) y
baja en superficies (nada de sombras, nada de radios, nada de rellenos
decorativos). El rojo sangre nunca pinta áreas grandes: aparece en primeras
letras, hairlines, hovers y líneas de acento — un acento que se gana su lugar.

El sistema habla un solo idioma tipográfico (Poppins, sin versalitas de
contraste) y reserva el peso 800 y el tracking amplio para las palabras que
deben martillar. Confirmado como anti-referencia: nada de Halloween festivo,
nada de calabazas, nada de gore caricaturesco; el tono es cine de terror serio.

**Key Characteristics:**
- Esquinas y formas 100% rectas (radio 0) — la geometría es un marco de trabajo.
- Monocromo tinta + sangre: Cinema Black, Celluloid Cream y una familia de
  rojos (reposo, activo y texto accesible).
- Textura de película global: grano difuso (opacidad 0.55) + viñeta radial negra.
- Tipografía única (Poppins) donde el peso, el tracking y las mayúsculas hacen toda la jerarquía.
- Profundidad sin sombras: hairline borders, capas tonales por `color-mix()`, blur y recuadros internos.
- El rojo aparece en primeras letras, foco, hover y líneas que se dibujan solas.

## Colors

Paleta de cuarto oscuro: dos neutros de "tinta sobre papel de proyección" y
una familia de sangre (dried resting / arterial activa / flash de texto)
que se reserva para los momentos de presión.

### Primary
- **Arterial Red** (#c41e1e): el acento vivo para texto grande y marcas de
  alto impacto. Hovers de tarjetas y enlaces en tamaño título, focus de
  inputs (borde + anillo de 1px), primeras letras de titulares, barra de
  progreso del preloader, línea que se dibuja bajo los títulos de tarjeta,
  iconos de acordeón, marcos internos de hover y `::first-letter`.
- **Arterial Flash** (#da4040): el rojo de **texto pequeño accesible**
  (4.8:1 sobre Cinema Black). Estados de nav (activo/hover), hovers de
  badges, meta de filmografía, obra, firma de nosotros, kickers, botón de
  contacto, mensajes de estado y errores de formulario, leyendas de sonido
  y lightbox, enlaces del footer y contador del preloader.

### Secondary
- **Dried Blood** (#8a0303): el acento en reposo. Bordes de botones outline,
  separador superior del reel/footer/marquee de bandas, outline de hover en
  obras y fotos del equipo, mix de fondo en el hover de botones
  (`color-mix` al 22–30%).

### Neutral
- **Cinema Black** (#0a0a0a): superficie global y fondo de trabajo. Body
  background, barras letterbox del hero, fondo de preloader/lightbox,
  sustracción del relleno tipográfico en el efecto máscara del título.
- **Celluloid Cream** (#e8e5e0): texto primario y luz. Cuerpo, titulares,
  etiquetas y base de todos los borders translúcidos vía `color-mix()`.
- **Muted Graphite** (#9a9a9a): texto secundario en reposo. Enlaces de la nav
  superior; al hover o activo saltan a Arterial Flash.

**The Blood Rarity Rule.** El rojo nunca llena una superficie. Aparece solo
como hairlines, marcas tipográficas y estados de hover/foco; si un componente
tiene más de un rojo visible en reposo, sobran. Su rareza es el punto.

## Typography

**Display Font:** Poppins (con `sans-serif` de respaldo)
**Body Font:** Poppins (con `sans-serif` de respaldo)

Una sola familia donde el peso (600–800), el tracking y las mayúsculas hacen
toda la jerarquía; no existe un display serif de contraste. Los grandes
titulares usan mayúsculas con peso 800, tracking apretado (0.02em) y
line-height menor a 1; las etiquetas pequeñas usan mayúsculas al 0.7rem con
tracking muy amplio (0.3–0.4em). En los títulos de sección se aplica un
relleno con ruido SVG (`feTurbulence`) + gradiente que tira a sangre,
recortado al texto (`background-clip: text`), simulando celuloide gastado.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 8vw, 5.5rem)`, 0.95): títulos de sección
  (Proyectos, Nosotros, Contacto) y marca del preloader; siempre mayúsculas.
  Variantes: marca del preloader y título del reel a `clamp(2.5rem, 8–9vw,
  5–5.5rem)`, título compacto de la página Contacto a
  `clamp(2.25rem, 6vw, 3.75rem)`.
- **Headline** (800, `clamp(1.6rem, 4.5vw, 3.25rem)`, 1.1): lead de "sobre
  nosotros".
- **Sub-headline** (800, `clamp(1.4rem, 4vw, 2.4rem)`, 1.05): título del
  lightbox. Subtítulos de bloque a `clamp(1.4rem, 3vw, 2rem)` (700) y
  wordmark del footer a `clamp(1.8rem, 4vw, 2.6rem)` (800).
- **Card Title** (600, `clamp(1rem, 1.6vw, 1.25rem)`, 1.2): nombres de
  proyectos, obras (`clamp(0.95rem, 1.8vw, 1.15rem)`), miembros y filas del
  acordeón (`clamp(1.05rem, 2.4vw, 1.6rem)`); mayúsculas con tracking
  0.04–0.05em. El marquee de bandas usa el mismo rango ancho (700).
- **Body** (400, `clamp(1rem, 2vw, 1.15rem)`, 1.75): texto institucional y
  descripciones; ancho máximo ~52–56ch. Opacidades 0.7–0.75 sobre cream.
- **Label** (600, 0.7rem, tracking 0.3–0.4em): kickers, badges, meta, labels
  de formulario, leyendas de sonido y del lightbox; siempre mayúsculas.
- **Micro scale** (600, 0.6–0.85rem): la escala real de etiquetas es más fina
  que el paso único de label. Pasos deliberados del sistema: 0.6 (badge de
  tarjeta), 0.65 (índices y kickers del lightbox), 0.68 (labels de datos y
  duración), 0.72 (meta de tarjeta y lightbox), 0.75 (kickers y enlaces-CTA),
  0.78 (labels de formulario y errores), 0.8 (mensajes de estado), 0.85
  (contador del preloader, enlaces del footer). 0.9–0.95 rem para taglines y
  descripciones de obra (400), y los inputs del formulario a 1.05rem.
- **Numeral** (800, `clamp(2.25rem, 5vw, 3.5rem)`, 1): número grande de
  "sobre nosotros" (arterial); la cuenta regresiva del preloader crece
  líquida hasta 200px según el viewport. El icono `+` del acordeón se apoya
  en 1.35rem (600).

**The Weight-Is-Voice Rule.** No se añade una segunda familia para "dar
personalidad". La jerarquía se resuelve con peso (600/700/800), tamaño
clamp y tracking; si algo necesita serruchar más fuerte, se sube el peso, no
se cambia la tipografía.

## Layout

Sitio SPA con secciones a página completa (`#inicio`, `#proyectos`,
`#sobre-nosotros`, `#contacto`), ruteo por hash y scroll suave con Lenis.
El padding de página es `clamp(1.5rem, 5vw, 4rem)` horizontal y
`clamp(5rem, 10vw, 8rem)` vertical; los encabezados de sección nacen con un
hairline superior (`cream al 15%`) y margen inferior de
`clamp(2.5rem, 6vw, 4.5rem)`.

La grilla de proyectos es asimétrica y densa:
- **Base (móvil):** 1 columna. Tarjetas featured/horizontal/widescreen en
  formato ancho (16/9), verticales en 4/5.
- **≥640px:** 2 columnas; horizontales, featured y widescreen ocupan todo el
  ancho (`grid-column: 1 / -1`), verticales en `aspect-ratio: 3 / 4`.
- **≥1024px:** 12-columnas virtual (6 tracks de base): verticales span 2,
  horizontales span 3, featured span 4, widescreen span 6 completo.

`aspect-ratio` es el motor de toda la retícula de medios: 4/5 (tarjetas y
fotos de equipo), 16/9 (featured/horizontal/texto), 21/9 (widescreen), 4/3
(media del contacto). El layout de contacto pasa a dos columnas a ≥900px y
ajusta la sección al alto del viewport; la sección nosotros usa grillas de
2→4 columnas para stats y equipo.

## Elevation & Depth

**Flat-by-default, texturizado por película.** Sin jerarquía de sombras: las
superficies son planas y la profundidad se construye con grano de película
(fullscreen, opacidad 0.55, `image-rendering: pixelated`), viñeta radial
negra en los bordes del viewport (`body::after`, `transparent 55% →
rgba(0,0,0,.55) 100%`), capas tonales con `color-mix()` (fondos tinta al 4%,
texto sobre imagen al 55–85%) y `backdrop-filter: blur()` puntual (badges de
tarjeta y fondo del lightbox).

El único `box-shadow` del sistema es sombra de texto — para legibilidad, no
para elevación: `text-shadow: 0 2px 14px rgb(0 0 0 / 0.85)` bajo capas
oscuras de títulos sobre imagen (hover de tarjeta y capa del lightbox).

**The No-Elevation Rule.** Si un estado necesita profundidad, se consigue con
una línea (hairline), una capa tonal o blur — nunca con una sombra
de caída flotando. El mundo es luz proyectada, no objetos apilados.

## Shapes

Geometría estrictamente angular: radio 0 en todo el sistema (los inputs
declaran `border-radius: 0` explícitamente). La forma del sistema es el
recuadro: marcos de hairline de 1px contra los bordes (`outline-offset: -1px`
en medios y obra; `-1rem` en el marco interno del hover de tarjeta), como
enmarques de un proyector. La única curva del sistema es decorativa: el
núcleo del cursor personalizado (4px, radio 50%).

**The Sharp-Edged Rule.** Nada de radios ni redondeos funcionales. Un
redondeo de más y el sistema pasa de "cine de terror serio" a "app
amigable"; el borde filoso es la barrera que mantiene el tono.

## Components

### Buttons
- **Shape:** rectangulares, radio 0, outline de 1px, sin relleno en reposo.
- **Primary (outline):** texto Celluloid Cream en Poppins 700, 0.3em de
  tracking, mayúsculas; borde `1px solid Dried Blood #8a0303`; padding
  `1rem 2.25rem` (variante reel: `1.1rem 2.4rem`).
- **Hover / Focus:** el borde salta a Arterial Red y aparece un tinte de
  fondo `color-mix(Dried Blood 22–30%, transparent)`; la animación es de
  0.3s `ease` sobre color de texto, color de borde y fondo. La variante de
  sonido del hero añade una sublínea que también se enciende.
- **No hay variantes rellenas:** ninguna acción principal pinta la superficie
  de sangre; el outline es la voz del sistema.

### Inputs / Fields
- **Style:** radio 0, fondo `color-mix(Celluloid Cream 4%, Cinema Black)`,
  borde hairline `cream 18%`, padding `1.05rem 1.2rem`, texto cream 1.05rem.
- **Labels:** etiquetas Poppins 600 a 0.78rem, tracking 0.3em, mayúsculas,
  opacidad 0.55, sobre el campo con gap 0.75rem.
- **Focus:** borde a Arterial Red + anillo `box-shadow: 0 0 0 1px Arterial Red`.
- **Error:** cada campo obligatorio lleva marcador `*`; el error inline
  (`.contacto__error`) es Arterial Flash 0.78rem, se conecta al campo con
  `aria-describedby` + `aria-invalid`, el campo se marca `.is-invalid`
  (borde a Arterial Flash) y al enviar el foco salta al primer error. El
  estado de envío es Arterial Flash 0.8rem.

### Navigation
- **Style:** columna fija arriba a la derecha (`top: 2rem; right: 2rem`),
  gap 1.5rem, links en mayúsculas Poppins (600/1rem), tracking 0.15em.
- **Default:** Muted Graphite #9a9a9a, sin subrayado.
- **Hover / Active:** Arterial Flash + `text-decoration: underline` con
  `text-underline-offset: 6px`. El estado activo comparte el color.

### Accordion (Formatos y encargos)
- Filas apiladas con separadores hairline (`cream 12%`); disparador en grid
  `index / nombre / icono +`. Número de índice opacidad 0.5 (el 01 se pinta
  de Arterial Red), nombre en Title mayúsculas con tracking 0.04em.
- Las filas se vuelven sangre al hover: borde `Dried Blood 60%` + nombre
  Arterial Red. El icono `+` es Arterial Red y rota 135° (a "×") al abrir.
- El panel se despliega animando `grid-template-rows` 0→1fr en 0.55s
  (`cubic-bezier(0.22, 1, 0.36, 1)`).

### Cards / Tarjetas de proyecto
- **Corner Style:** radio 0, marco hairline `cream 12%` con `outline-offset: -1px`.
- **Background:** fondo tinta (`cream 4% / black`) bajo el still; el medio
  se recorta por `aspect-ratio` (4/5, 16/9, 3/4, 21/9 según orientación).
- **Contenido:** índice "01" arriba a la izquierda (opacidad 0.5) y badge
  abajo a la derecha (fondo `Cinema Black 72%` + `blur(4px)`, hairline
  `cream 25%`, mayúsculas 0.6rem tracking 0.25em).
- **Hover:** zoom cinematográfico suave del still (scale 1.03 en 1.2s),
  crossfade al video preview, título con subrayado rojo que se dibuja de
  izquierda a derecha (scaleX 0→1, 0.6s), meta que sube de opacidad 0.5→1 con
  el último span en Arterial Flash, y una capa de hover con otro still + título
  sobre tinte `Cinema Black 55%` y marco interno `Dried Blood 65%` a -1rem.
- **Focus-visible:** outline de 1px Arterial Red con offset de 4px.

### [Signature Component] Cursor cinematográfico
Mira de visor: dos ticks Arterial Red cruzados (12px×1px y 1px×12px) con un
núcleo de 4px redondo. Al pasar sobre interactivos, el núcleo se apaga y la
mira se expande (escala animada por JS para no pisar el seguimiento);
`cursor: none` solo en dispositivos de puntero fino.

### Logo 3D de apertura
Tras el preloader aparece el wordmark PÁNICO en una placa 3D (Three.js)
girando 360° en el eje Y a velocidad media y constante (~0.7 rad/s, ≈9s por
vuelta), enmarcado por hairlines de sangre; se funde hacia la home y
desmonta la escena. Placeholder hasta el asset real de Pánico; con
`prefers-reduced-motion` no interviene.

## Do's and Don'ts

### Do:
- **Do** mantener todo angular: radio 0 por sistema; el borde filoso conserva
  el tono de cine de terror.
- **Do** reservar el rojo para hairlines, marcas y hovers — una superficie
  sangrada a lo sumo en el hover de un botón outline.
- **Do** usar los tokens de `src/styles/variables.css` (`--color-bg`,
  `--color-text`, `--color-muted`, `--color-blood`, `--color-blood-bright`,
  `--color-blood-text`) y nunca hardcodear `#0a0a0a`, `#e8e5e0`, `#9a9a9a`,
  `#8a0303`, `#c41e1e` ni `#da4040`.
- **Do** construir jerarquía con peso y tracking de Poppins en mayúsculas:
  kickers 0.7rem + tracking 0.35em, titulares 800 + tracking 0.02em.
- **Do** conseguir la profundidad con hairlines, `color-mix()` y `blur()`,
  no con sombras de caída.
- **Do** enmarcar los medios con recuadros de hairline
  (`outline-offset: -1px`) y respetar los `aspect-ratio` de la retícula.
- **Do** respetar `prefers-reduced-motion` (el sistema ya lo hace en todas
  las piezas: transiciones, marquee, preloader, cursor, reveal).

### Don't:
- **Don't** usar esquinas redondeadas en componentes funcionales; el radio 0
  es una invariante del sistema.
- **Don't** pintar fondos grandes con rojo sangre; el Rojo es acento, no
  superficie.
- **Don't** añadir una segunda familia tipográfica de contraste — el peso y
  el tracking de Poppins ya sostienen la jerarquía.
- **Don't** elevar elementos con box-shadows flotantes; usa capas tonales y
  hairlines.
- **Don't** caer en clichés de Halloween (calabazas, murciélagos, gore
  comic) — el referente es el cine de terror serio.
- **Don't** tratar los placeholders de contenido (obras, descripciones,
  stats, equipo) como material final de Pánico mientras los assets reales no
  existan.