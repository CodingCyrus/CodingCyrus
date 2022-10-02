import './style.css'
import * as THREE from 'three'
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xFFFFF7, 0.5)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0x001eff, 0.3)
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)

// const hemisphereLight = new THREE.HemisphereLight(0xffd300, 0x0000ff, 1)
// scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xF4E99B, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Scene Background
 */
scene.background = new THREE.CubeTextureLoader()
    .setPath('textures/matcaps/')
    .load([
    'space_background.jpg',
    'space_background.jpg',
    'space_background.jpg',
    'space_background.jpg',
    'space_background.jpg',
    'space_background.jpg'
]);

/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
//  const matcapTexture = textureLoader.load('/textures/matcaps/9.png')
const earthTexture = textureLoader.load('/textures/matcaps/sphere_textures/EarthWebGL.jpg')
const moonTexture = textureLoader.load('/textures/matcaps/sphere_textures/moon.jpg')

/**
 * Fonts
 */
 const fontLoader = new FontLoader()

 fontLoader.load(
    //  '/fonts/helvetiker_bold.typeface.json',
    // '/fonts/CyberFont Black_Regular.json',
    // '/fonts/Blade Runner Movie Font_Regular.json',
    // '/fonts/Cyberpunk_Regular.json',
    // '/fonts/HACKED_Regular.json',
    // '/fonts/Bugfast_Regular.json',
    '/fonts/Digital Dare_Regular.json',
     (font) => 
     {
         console.log("loaded")
         const textGeometry = new TextGeometry(
             'CODINGCYRUS',
             {
                 font: font,
                 size: 0.5,
                 height: 0.2,
                 curveSegments: 12,
                 bevelEnabled: true,
                 bevelThickness: 0.03,
                 bevelSize: 0.02,
                 bevelOffset: 0,
                 bevelSegments: 5
             }
         )

         const textGeometry2 = new TextGeometry(
            'Welcome To',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
 
         textGeometry.center()
         textGeometry2.center()
 
         const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})
         //Create and add to Scene CodingCyrus Text Mesh
         const text = new THREE.Mesh(textGeometry, material);
         text.position.y = 2.5;
         scene.add(text)
         //Create and add to scene Welcome To Text Mesh
         const text2 = new THREE.Mesh(textGeometry2, material);
         text2.position.y = 3.5;
         scene.add(text2)
     }
 )

/**
 * Objects
 */
// Materials
const earthMaterial = new THREE.MeshStandardMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshBasicMaterial({map: sphereTexture})
// const material = new THREE.MeshStandardMaterial()
earthMaterial.metalness = 0.20
earthMaterial.roughness = 0.50
earthMaterial.map = earthTexture

const moonMaterial = new THREE.MeshStandardMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshBasicMaterial({map: sphereTexture})
// const material = new THREE.MeshStandardMaterial()
moonMaterial.metalness = 0.20
moonMaterial.roughness = 0.50
moonMaterial.map = moonTexture

// Objects
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    earthMaterial
)

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    moonMaterial
)
moon.position.x = -4

const moonObj = new THREE.Object3D();
moonObj.add(moon)
scene.add(moonObj)

// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(0.75, 0.75, 0.75),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 32, 64),
//     material
// )
// torus.position.x = 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     material
// )
// plane.rotation.x = - Math.PI * 0.5
// plane.position.y = - 0.65

scene.add(earth)
// scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2.5
camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    earth.rotation.y = 0.2 * elapsedTime
    moon.rotateY(0.005);
    moonObj.rotateY(0.02);

    // cube.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // cube.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    
}

tick()