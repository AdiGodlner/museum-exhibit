import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { PMREMGenerator } from 'three';

export function initLights(scene, renderer){


    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
        .setPath('/')
        .load('my_hdr.hdr', function (hdrEquirect) {
            const envMap = pmremGenerator.fromEquirectangular(hdrEquirect).texture;

            scene.environment = envMap;
            scene.background = envMap;

            hdrEquirect.dispose();
            pmremGenerator.dispose();
        });

     // Add shadow-casting directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;

    scene.add(dirLight);

}



