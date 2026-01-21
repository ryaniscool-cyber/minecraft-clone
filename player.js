import * as THREE from "three";

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

export function updatePlayer(controls, delta) {
  velocity.x -= velocity.x * 10 * delta;
  velocity.z -= velocity.z * 10 * delta;

  direction.z = Number(keys.KeyW) - Number(keys.KeyS);
  direction.x = Number(keys.KeyD) - Number(keys.KeyA);
  direction.normalize();

  const speed = 10;
  velocity.z -= direction.z * speed * delta;
  velocity.x -= direction.x * speed * delta;

  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);
}

