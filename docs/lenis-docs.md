# Lenis

## Qué es

Lenis es una librería chica y moderna para implementar smooth scroll
(scroll suave/con inercia) en un sitio web. Es la que hoy usan la mayoría de
los sitios de agencias/estudios con este tipo de scroll "premium" — incluidas
webs como las de referencia que analizamos (Boulderlight, XYZ Films, Hammer
suelen usar este tipo de librerías o equivalentes).

## Para qué la usamos acá

Para que el scroll de toda la página tenga esa sensación fluida con leve
inercia, en vez del scroll seco por defecto del navegador — pedido explícito
del proyecto.

## Instalación

```bash
npm install lenis
```

## Uso mínimo

```js
// src/modules/smoothScroll.js
import Lenis from 'lenis'

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,       // qué tan "lento"/suave es el scroll
    smoothWheel: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}
```

Y en `main.js`:

```js
import { initSmoothScroll } from './modules/smoothScroll.js'
initSmoothScroll()
```

## Cosas a las que prestar atención

- **Anclas del menú** (`<a href="#proyectos">`): con Lenis a veces hay que
  usar su método `lenis.scrollTo('#proyectos')` en vez del comportamiento
  nativo del navegador para que el scroll a esa sección también sea suave.
- **GSAP ScrollTrigger**: si más adelante usamos animaciones ligadas al
  scroll (reveals al aparecer una sección), Lenis y GSAP ScrollTrigger
  necesitan sincronizarse (Lenis tiene una integración oficial documentada
  para esto). Lo vemos cuando lleguemos a esa fase.
- Probar siempre en mobile: en algunos casos el smooth scroll se desactiva
  o se ajusta distinto en touch devices — es una decisión de diseño, no un bug.