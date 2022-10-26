import * as THREE from 'three'

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
particlesMaterial.size = 0.05
particlesMaterial.sizeAttenuation = true;

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