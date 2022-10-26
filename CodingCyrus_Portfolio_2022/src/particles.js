import * as THREE from 'three'

/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const particleTexture = textureLoader.load('/textures/particles/8.png')




/**
 * Particles
 */
//Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 1000

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30
}

//Array of each particle XYZ position
particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

//Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.3
particlesMaterial.sizeAttenuation = true;
particlesMaterial.color = new THREE.Color("white")
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particleTexture.alphaTest = 0.001

//Points
export const particles = new THREE.Points(particlesGeometry, particlesMaterial)


/**
 * Scene Background
 */
// scene.background = new THREE.CubeTextureLoader()
//     .setPath('textures/matcaps/')
//     .load([
//     'space_background.jpg',
//     'space_background.jpg',
//     'space_background.jpg',
//     'space_background.jpg',
//     'space_background.jpg',
//     'space_background.jpg'
// ]);