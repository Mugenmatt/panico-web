# Vite

## Qué es

Vite es una herramienta de build para proyectos web frontend. Hace dos cosas
principales:

1. **Servidor de desarrollo** ultra rápido con Hot Module Replacement (HMR):
   guardás un archivo y el navegador se actualiza solo, sin recargar toda la
   página ni perder el estado del scroll.
2. **Build de producción**: empaqueta, minifica y optimiza todo el proyecto
   en una carpeta `dist/` lista para subir a un hosting.

## Por qué lo usamos acá

Reemplaza al viejo método de "linkear librerías por CDN en el `<head>`".
Con Vite, las librerías (Three.js, Lenis, GSAP) se instalan con `npm install`,
quedan versionadas en `package.json`, y se importan directamente en el
JavaScript con `import`. Esto es exactamente cómo se arma un proyecto
frontend real en una agencia o estudio hoy en día.

## Comandos básicos

```bash
npm install          # instala las dependencias del proyecto
npm run dev           # levanta el servidor de desarrollo (localhost)
npm run build          # genera el build de producción en /dist
npm run preview        # sirve /dist localmente para probar el build final
```

## Estructura que impone Vite

- `index.html` en la raíz: es el punto de entrada real (no es solo un
  archivo estático, Vite lo procesa).
- `src/`: todo el código que se importa desde JS/CSS. Vite lo procesa,
  optimiza y versiona automáticamente (cache-busting).
- `public/`: archivos que se sirven tal cual, sin procesar. Ideal para
  videos pesados, favicon, robots.txt. Se referencian con ruta absoluta
  desde la raíz, ej: un archivo en `public/video/intro.mp4` se usa en el
  código como `/video/intro.mp4`.

## Ejemplo de import de una librería instalada

```js
// src/main.js
import Lenis from 'lenis'
import { gsap } from 'gsap'
import * as THREE from 'three'
```

## Nota sobre videos pesados

Los videos de la intro y del portfolio pueden pesar varios MB. Como van en
`public/`, Vite no los procesa ni optimiza — la compresión del video hay
que hacerla vos antes (con HandBrake o ffmpeg) para no perjudicar el tiempo
de carga del sitio.