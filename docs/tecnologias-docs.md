# Stack tecnológico — Panico Web

Este documento resume qué tecnologías usa el proyecto y por qué. Sirve como
referencia rápida para vos y como contexto para el agente de IA (OpenCode).

## Resumen

| Tecnología | Para qué se usa acá | Tipo |
|---|---|---|
| **Vite** | Servidor de desarrollo + build de producción | Build tool |
| **HTML / CSS / JS vanilla** | Estructura, estilos y lógica del sitio | Base |
| **Three.js** | Logo 3D girando en el preloader | Librería 3D |
| **Lenis** | Scroll suave (smooth scroll) | Librería de scroll |
| **GSAP** | Animaciones (preloader, reveals, transiciones) | Librería de animación |
| **Formspree o EmailJS** | Envío del formulario de contacto sin backend propio | Servicio externo |
| **Vercel** | Hosting y deploy automático | Hosting |

## Por qué este stack y no un framework (React/Vue/etc.)

Panico Web es un sitio **estático** (no tiene lógica de aplicación compleja,
ni estados que cambien constantemente, ni rutas dinámicas). Para este tipo de
sitio, un framework de UI agrega complejidad sin agregar beneficio real, y
además hace que trabajar con modelos de IA gratuitos/más débiles sea más
propenso a errores (JSX, hooks, compilación). HTML/CSS/JS + Vite da:

- Curva de aprendizaje mucho más baja (estás aprendiendo web, no un framework).
- Menos "magia": lo que ves en el código es lo que corre en el navegador.
- Build final más liviano y rápido de cargar (importante para un portfolio
  audiovisual con videos pesados).

## Flujo de trabajo

1. `npm run dev` → levanta el servidor local con recarga en caliente.
2. Se edita en `src/` (JS, CSS) y `index.html`.
3. Los archivos pesados (videos, favicon) van en `public/` y se referencian
   por ruta absoluta, ej: `/video/intro.mp4`.
4. `npm run build` → genera la carpeta `dist/` lista para producción.
5. Deploy automático a Vercel en cada push a `main`.

## Documentos relacionados

- `docs/vite.md` — comandos y configuración de Vite.
- `docs/threejs.md` — cómo armamos el logo 3D.
- `docs/lenis.md` — configuración del smooth scroll.
- `docs/gsap.md` — animaciones del preloader y reveals.
- `AGENTS.md` — reglas fijas del proyecto para el agente de IA.