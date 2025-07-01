import * as THREE from 'three';



export function createRenderer(canvas){

  const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    antialias:true
  
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  return renderer;

}