import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export function initLoader(scene) {
    const loader = new GLTFLoader();
    const foo = "/sukha_v8.glb";
    
    loader.load(foo,
        function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Optionally improve performance
                    child.frustumCulled = true;
                }
            });

            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.warn("error loading sukha");
            console.warn(error);
        });
}
