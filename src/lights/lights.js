import * as THREE from 'three';

export function initLights(scene){


    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(2,2,5)
    scene.add(light);


}