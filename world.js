import * as THREE from "three";

export const blocks = [];

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x55aa55 });

export function generateWorld(scene, x, y, z, single = false) {
  if (single) {
    const block = new THREE.Mesh(geometry, material.clone());
    block.position.set(Math.round(x), Math.round(y), Math.round(z));
    scene.add(block);
    blocks.push(block);
    return;
  }

  for (let i = -10; i <= 10; i++) {
    for (let k = -10; k <= 10; k++) {
      const block = new THREE.Mesh(geometry, material.clone());
      block.position.set(i, 0, k);
      scene.add(block);
      blocks.push(block);
    }
  }
}

