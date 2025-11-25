import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

const axel = new THREE.AxesHelper(2)
scene.add(axel)

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

//initialize the clock
const clock = new THREE.Clock();
let previosTime = 0

// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previosTime
  previosTime = currentTime

  //cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20
  cubeMesh.scale.x = Math.sin(currentTime * 10) * 0.5 + 1

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
