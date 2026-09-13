# GSAP (GreenSock Animation Platform)

## Qué es

GSAP es la librería de animación JavaScript más usada en la industria para
animaciones de alta calidad y control preciso (mucho más potente y prolijo
que animar a mano con CSS transitions para casos complejos).

## Para qué la usamos acá

- Las transiciones del **preloader**: fade del video, aparición/desaparición
  del canvas 3D, fade hacia el contenido real de la home.
- **Reveals** de texto e imágenes a medida que aparecen en el scroll
  (con el plugin `ScrollTrigger`).
- Transiciones de hover/click en la sección de Proyectos (por ejemplo, al
  abrir el modal de un video).

## Instalación

```bash
npm install gsap
```

## Uso mínimo — animación simple

```js
import { gsap } from 'gsap'

gsap.to('.preloader', {
  opacity: 0,
  duration: 0.8,
  onComplete: () => {
    document.querySelector('.preloader').style.display = 'none'
  }
})
```

## Uso con ScrollTrigger (reveals al hacer scroll)

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.from('.proyecto-card', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.proyectos-grid',
    start: 'top 80%',
  }
})
```

## Timeline (para secuencias, como el preloader)

Cuando una animación tiene varios pasos encadenados (video termina → fade a
negro → aparece el logo 3D → el logo se desvanece → aparece el contenido),
conviene usar un `gsap.timeline()` en vez de animaciones sueltas, porque
ordena la secuencia de forma clara:

```js
const tl = gsap.timeline()
tl.to('.preloader-video', { opacity: 0, duration: 0.6 })
  .to('.logo-3d-canvas', { opacity: 1, duration: 0.6 }, '-=0.2')
  .to('.logo-3d-canvas', { opacity: 0, duration: 0.6, delay: 1.5 })
  .to('.preloader', { display: 'none', duration: 0 })
```

## Nota

GSAP core es gratis y no requiere licencia para este tipo de proyecto.
`ScrollTrigger` es un plugin oficial, también gratuito, pero hay que
registrarlo (`gsap.registerPlugin(...)`) antes de usarlo.