import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Background from "three/src/renderers/common/Background.js";
import {Pane} from 'tweakpane';

const pane = new Pane();
const canvas = document.querySelector(".threejs");
const scene = new THREE.Scene();

//Initialize loader
const textureLoader = new THREE.TextureLoader();

//create a custom geometry
// const vertices = new Float32Array (
//   [
//     0, 0, 0, //xyz
//     0, 2, 0,
//     2, 0, 0
//   ]
// )

// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute)

// GEOMETRY
let boxGeometry = new THREE.BoxGeometry(1,1,1);
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16);
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);

const textureTest = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')

const material_1 = new THREE.MeshBasicMaterial();
material_1.map = textureTest;

material_1.side = THREE.DoubleSide;
const groupMesh = new THREE.Group();


//GEOMETRY PARAMS CHANGE
// const sphereParameters = {
//   radius: 1,
//   widthSegments: 16,
//   heightSegments: 16
// }

const paneFolder = pane.addFolder({
  title: "UI Edit"
})
// paneFolder
//   .addBinding(sphereParameters, 'widthSegments', {
//   min: 1,
//   max: 60,
//   step: 0.1,
//   label: 'widthSegments'
// })
// .on('change', ()=>{
//   boxGeometry = new THREE.SphereGeometry(sphereParameters.radius, sphereParameters.widthSegments, sphereParameters.heightSegments);
//   boxMesh.geometry = boxGeometry;
// })



// const fog = new THREE.Fog(0x000000, 1, 10);
// scene.fog = fog;
// scene.background = new THREE.Color('black')
//const mat2 = new THREE.MeshBasicMaterial({ color: "deeppink"});

//MESHS

const boxMesh = new THREE.Mesh(boxGeometry, material_1);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material_1);
torusKnotMesh.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, material_1);
planeMesh.position.x = -1.5;

const sphereMesh = new THREE.Mesh();
sphereMesh.geometry = sphereGeometry;
sphereMesh.material = material_1;
sphereMesh.position.y = 1.5;

const cylinderMesh = new THREE.Mesh();
cylinderMesh.geometry = cylinderGeometry;
cylinderMesh.material = material_1;
cylinderMesh.position.y = -1.5;

groupMesh.add(boxMesh, torusKnotMesh, planeMesh, sphereMesh, cylinderMesh)
scene.add(groupMesh);
//Ambient Light
const light = new THREE.AmbientLight('white', 0.6)
// pane.addBinding(light, 'intensity', {
//   min: 0,
//   max: 1,
//   step: 0.01,
//   label: 'Ambient'
// })
// pane.addBinding(light, 'color', {
//   min: 0,
//   max: 100,
//   step: 0.1,
//   label: 'ambientColor'
// })
scene.add(light)

//Point Light
const pointLight = new THREE.PointLight('white', 0.9)
// pane.addBinding(pointLight, 'intensity', {
//   min: 0,
//   max: 100,
//   step: 0.1,
//   label: 'pointLight'
// })
// pane.addBinding(pointLight, 'color', {
//   min: 0,
//   max: 100,
//   step: 0.1,
//   label: 'pointColor'
// })
pointLight.position.set(1,1,1)
scene.add(pointLight)

const axel = new THREE.AxesHelper(2);
scene.add(axel);

// camera
const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  200
);
camera.position.z = 7;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = false;

// resize
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

// clock
const clock = new THREE.Clock();
let previosTime = 0;


console.log(scene.children)

// renderloop
const renderloop = () => {

  groupMesh.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.y += 0.01;
    }
  })

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previosTime;
  previosTime = currentTime;

  // geometryMesh.scale.x = Math.sin(currentTime * 10) * 0.5 + 1;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderloop);
};

renderloop();
