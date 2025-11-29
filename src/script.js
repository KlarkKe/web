import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Background from "three/src/renderers/common/Background.js";
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
let geometry = new THREE.BoxGeometry(1,1,1);
const geometry2 = new THREE.PlaneGeometry(1,1);

const sphereParameters = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16
}

const paneFolder = pane.addFolder({
  title: "UI Edit"
})

paneFolder
  .addBinding(sphereParameters, 'radius', {
  min: 1,
  max: 20,
  step: 0.1,
  label: 'Radius'
})
.on('change', ()=>{
  geometry = new THREE.SphereGeometry(sphereParameters.radius, sphereParameters.widthSegments, sphereParameters.heightSegments);
  geometryMesh.geometry = geometry;
})

paneFolder
  .addBinding(sphereParameters, 'widthSegments', {
  min: 1,
  max: 60,
  step: 0.1,
  label: 'widthSegments'
})
.on('change', ()=>{
  geometry = new THREE.SphereGeometry(sphereParameters.radius, sphereParameters.widthSegments, sphereParameters.heightSegments);
  geometryMesh.geometry = geometry;
})



const mat1 = new THREE.MeshLambertMaterial();
// mat1.color = new THREE.Color('deeppink')
// // mat1.transparent = true;
// // mat1.opacity = 0.1;
mat1.side = THREE.DoubleSide;

// const fog = new THREE.Fog(0x000000, 1, 10);
// scene.fog = fog;
// scene.background = new THREE.Color('black')
//const mat2 = new THREE.MeshBasicMaterial({ color: "deeppink"});

const geometryMesh = new THREE.Mesh(geometry, mat1);

const geometryMesh2 = new THREE.Mesh(geometry, mat1);
geometryMesh2.position.x = 1.5;

const geometryMesh3 = new THREE.Mesh(geometry2, mat1);
geometryMesh3.position.x = -1.5;

//const geometryMesh2 = new THREE.Mesh(geometry, mat2);

scene.add(geometryMesh);
scene.add(geometryMesh2);
scene.add(geometryMesh3);

const light = new THREE.AmbientLight('black', 0.5)
scene.add(light)

const pointLight = new THREE.PointLight('deeppink', 1)
pointLight.position.set(2,2,2)
scene.add(pointLight)

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
