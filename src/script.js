import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//import { label } from "three/tsl";
import {Pane} from 'tweakpane';

const pane = new Pane();

// canvas сначала!
const canvas = document.querySelector(".threejs");

// initialize the scene
const scene = new THREE.Scene();

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

// objects
let geometry = new THREE.SphereGeometry(1,16,16);

const sphereParameters = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16
}

pane
  .addBinding(sphereParameters, 'radius', {
  min: 1,
  max: 20,
  step: 0.1,
  label: 'Radius'
})
.on('change', (ev)=>{
  geometry = new THREE.SphereGeometry(ev.value, sphereParameters.widthSegments, sphereParameters.heightSegments);
  geometryMesh.geometry = geometry;
})



const mat1 = new THREE.MeshBasicMaterial({ color: "deeppink", wireframe: true });
//const mat2 = new THREE.MeshBasicMaterial({ color: "deeppink"});

const geometryMesh = new THREE.Mesh(geometry, mat1);
//const geometryMesh2 = new THREE.Mesh(geometry, mat2);

scene.add(geometryMesh);

// pane.addBinding(geometryMesh.scale, 'x', {
//   min: 0,
//   max: 10,
//   step: 0.1,
//   label: 'Scale X'
// })

// pane.addBinding(geometryMesh.scale, 'y', {
//   min: 0,
//   max: 10,
//   step: 0.1,
//   label: 'Scale Y'
// })

const axel = new THREE.AxesHelper(2);
scene.add(axel);

// camera
const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  200
);
camera.position.z = 5;

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
controls.autoRotate = true;

// resize
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

// clock
const clock = new THREE.Clock();
let previosTime = 0;

// renderloop
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previosTime;
  previosTime = currentTime;

  // geometryMesh.scale.x = Math.sin(currentTime * 10) * 0.5 + 1;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderloop);
};

renderloop();
