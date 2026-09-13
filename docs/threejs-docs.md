# Three.js

## Qué es

Three.js es una librería de JavaScript para crear gráficos 3D en el
navegador usando WebGL. Es la librería 3D más usada del ecosistema web.

## Para qué la usamos acá

Para el logo "Panico" que gira en 3D dentro del preloader/opening sequence.
La idea técnica es:

1. Crear una **escena** (`Scene`), una **cámara** (`Camera`) y un
   **renderer** que dibuja todo dentro de un `<canvas>`.
2. Convertir el logo (idealmente un SVG) en una **geometría 3D extruida**
   (`ExtrudeGeometry`) — le da profundidad/volumen a un logo que originalmente
   es plano.
3. Aplicarle un material con algo de brillo o reflejo (`MeshStandardMaterial`)
   y una o dos luces (`DirectionalLight`, `AmbientLight`) para que se vea el
   volumen.
4. Animar la rotación en un loop (`requestAnimationFrame`), incrementando
   `mesh.rotation.y` en cada frame para lograr el giro de 360° a velocidad
   constante.

## Piezas mínimas necesarias

```js
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
renderer.setSize(width, height)

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.5))
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(2, 2, 5)
scene.add(dirLight)

// Loop de animación
function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.y += 0.012 // velocidad media de giro
  renderer.render(scene, camera)
}
animate()
```

## Orden recomendado para pedírselo a la IA

No le pidas el logo extruido de entrada — anda por pasos:

1. Primero un `<canvas>` con una escena vacía que renderiza (fondo
   transparente, se ve negro sólido detrás).
2. Después una geometría simple (un cubo rojo, por ejemplo) que gira, para
   confirmar que el loop de animación y las luces andan bien.
3. Recién ahí reemplazás el cubo por el logo real extruido desde el SVG.

Esto evita que, si algo falla, tengas que debuggear el SVGLoader, las luces
y el loop de animación todos juntos.

## Nota sobre el logo

Necesitás el logo de Pánico en formato **SVG** (vectorial) para poder
extruirlo. Si por ahora no lo tenés, se puede generar un placeholder con
texto usando `TextGeometry` + una fuente cargada en formato `.json` de
Three.js, y después reemplazarlo por el SVG real sin tocar el resto de la
lógica.