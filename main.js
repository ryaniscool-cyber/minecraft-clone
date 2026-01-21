import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { generateWorld, blocks } from "./world.js";
import { updatePlayer } from "./player.js";

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87ceeb, 20, 200);


const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* Lights */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(50, 100, 50);
scene.add(sun);

/* Cube */

const testCube = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
testCube.position.set(0,2,0);
scene.add(testCube);


/* Controls */
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

controls.getObject().position.set(0, 2, 10);



/* World */
generateWorld(scene);

/* Raycasting */
const raycaster = new THREE.Raycaster();
document.addEventListener("mousedown", e => {
  if (!controls.isLocked) return;

  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const hits = raycaster.intersectObjects(blocks);

  if (!hits.length) return;
  const hit = hits[0];

  if (e.button === 2) {
    scene.remove(hit.object);
    blocks.splice(blocks.indexOf(hit.object), 1);
  }

  if (e.button === 0) {
    const pos = hit.object.position.clone().add(hit.face.normal);
    generateWorld(scene, pos.x, pos.y, pos.z, true);
  }
});

document.addEventListener("contextmenu", e => e.preventDefault());

/* Loop */
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  updatePlayer(controls, clock.getDelta());
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

