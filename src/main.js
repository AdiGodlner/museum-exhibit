import * as THREE from 'three';
import { initControls, updateControls } from './controls/controlsManager';
import { initLoader } from './loader/glbLoader';
import { createAndInitCamera } from './camera/camera';
import { createRenderer } from './renderer/renderer';
import { initListeners } from './event-listners/listeners'
import { initLights } from './lights/lights';

const clock = new THREE.Clock();
const scene = new THREE.Scene();
initLights(scene);
initLoader(scene);
const camera = createAndInitCamera(scene);

const canvas = document.getElementById("experience-canvas");
const renderer = createRenderer(canvas);

initControls(camera, canvas);
initListeners(camera);

function animate(){
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); 
  updateControls(delta);
  renderer.render(scene, camera);

}

animate();
