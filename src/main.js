import * as THREE from 'three';
import { ControlsManager } from './controls/controlsManager';
import { initLoader } from './loader/glbLoader';
import { createAndInitCamera } from './camera/camera';
import { createRenderer } from './renderer/renderer';
import { EventManager } from './event-listners/listeners'
import { initLights } from './lights/lights';
import { ModalManager } from './modal/modalManager';
import { SoundManager } from './sound/sound';

const clock = new THREE.Clock();
const scene = new THREE.Scene();

const camera = createAndInitCamera(scene);

const canvas = document.getElementById("experience-canvas");
const renderer = createRenderer(canvas);

const controlsManager = new  ControlsManager(camera, canvas);
const soundManager =  new SoundManager("/background.mp3");
const modalManager = new ModalManager();
const eventManager = new EventManager(camera,
  renderer,
  controlsManager,
  modalManager,
  soundManager);
eventManager.initListeners();

initLoader(scene);
initLights(scene, renderer);


function animate(){
  
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); 
  controlsManager.updateControls(delta);
  renderer.render(scene, camera);

}

animate();
