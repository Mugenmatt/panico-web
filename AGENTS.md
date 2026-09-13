# AGENTS.md — Reglas del proyecto Panico Web

Este archivo define las reglas fijas del proyecto. Leelo siempre antes de
generar o modificar código. El objetivo es mantener consistencia sin tener
que repetir estas instrucciones en cada prompt.

## Qué es este proyecto

Sitio web portfolio para "Pánico", una productora audiovisual especializada
en terror y videos musicales para bandas. Objetivos del sitio:
1. Mostrar el trabajo de la productora como portfolio.
2. Permitir que potenciales clientes los contacten por email.
Estética general: **terror / horror**, oscura y editorial — no un sitio de
Halloween con calabazas, sino algo más cercano al cine de terror serio
(referencias: Boulderlight Pictures, XYZ Films, Hammer Films).

## Stack tecnológico (no cambiar sin confirmarlo conmigo)

- **Vite** como build tool y servidor de desarrollo.
- **HTML + CSS + JavaScript vanilla** — NO usar React, Vue, Svelte ni ningún
  framework de UI. NO usar TypeScript, este proyecto es JS plano.
- Librerías permitidas (instaladas por npm, importadas con `import`, nunca
  por CDN): `three`, `lenis`, `gsap`.
- Formulario de contacto: Formspree o EmailJS (sin backend propio).
- Deploy: Vercel.

Ver `docs/stack-overview.md` y los archivos individuales en `docs/` para el
detalle de cada tecnología.

## Estructura de carpetas (respetar siempre)

```
panico-web/
├── index.html
├── package.json
├── vite.config.js
├── AGENTS.md
├── docs/           → documentación del proyecto, no se despliega
├── public/         → archivos estáticos sin procesar (videos, favicon)
│   └── video/
└── src/
    ├── main.js         → punto de entrada, importa e inicializa los módulos
    ├── style.css       → estilos globales, importa variables.css
    ├── styles/
    │   └── variables.css
    └── modules/        → un archivo por funcionalidad (ver abajo)
        ├── preloader.js
        ├── logo3d.js
        ├── smoothScroll.js
        └── contactForm.js
```

Regla: **una funcionalidad = un módulo en `src/modules/`**, importado y
llamado desde `main.js`. No mezclar lógica de distintas funcionalidades en
un mismo archivo.

## Diseño — tokens fijos

Usar siempre estas variables CSS (definidas en `src/styles/variables.css`),
nunca hardcodear estos valores directamente en otros archivos:

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #e8e5e0;
  --color-blood: #8a0303;
  --color-blood-bright: #c41e1e;
  --font-display: 'Poppins', 'Anton', sans-serif;
  --font-body: 'Poppins', 'Inter', sans-serif;
}
```

- Títulos y elementos destacados: `--font-display`, generalmente en
  mayúsculas.
- Cuerpo de texto: `--font-body`.
- Rojo sangre (`--color-blood` / `--color-blood-bright`) se usa como acento
  puntual (hovers, bordes, detalles) — no como color de fondo grande.

## Secciones del sitio (fijas, no agregar ni quitar sin confirmarlo)

1. `#inicio` — home / hero
2. `#proyectos` — grilla de trabajos
3. `#sobre-nosotros` — información institucional
4. `#contacto` — formulario de contacto

## Convenciones de código

- Nombres de archivos y carpetas en **kebab-case** (`smooth-scroll.js`, no
  `smoothScroll.js` para archivos; dentro del código sí usar camelCase para
  variables y funciones).
- IDs y clases HTML en **kebab-case** (`proyecto-card`, `logo-3d-canvas`).
- Comentarios en español.
- JavaScript en módulos ES (`import`/`export`), no usar `require`.
- Preferir funciones puras y módulos que exporten una función de
  inicialización (`export function initX() {...}`), llamada explícitamente
  desde `main.js`. Evitar código que se ejecuta automáticamente al importar
  el archivo, salvo que sea necesario.

## Comportamientos específicos ya definidos (no reinterpretar)

- **Preloader/intro**: video de presentación a pantalla completa →
  al terminar, fade out → aparece el logo "Panico" en 3D (Three.js) girando
  360° en el eje Y a velocidad media y constante → fade hacia el contenido
  real de la home.
- **Scroll**: suave en todo el sitio, con Lenis.
- **Contacto**: el formulario debe enviar el email real a Pánico sin
  depender de un servidor propio (Formspree o EmailJS).

## Cómo trabajar conmigo (para el agente)

- Cambios de a un módulo/archivo por vez cuando la tarea sea compleja
  (preloader, logo 3D). No mezclar varias funcionalidades en un mismo paso.
- Si falta un asset real (video, logo en SVG, fotos), usar un placeholder
  claramente identificable como tal (ej. un comentario `// TODO: reemplazar
  por asset real de Pánico`) y avisar en la respuesta, no inventar contenido
  final como si fuera definitivo.
- Explicar brevemente qué se hizo y por qué después de cada cambio grande.