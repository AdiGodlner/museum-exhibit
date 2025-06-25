import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export function initLoader(scene){

    
    const loader = new GLTFLoader();
    loader.load("/foo.glb", 
    function(gltf){
        scene.add(gltf.scene);
    },
    undefined,
    function (error){
        console.warn("error loading example")
        console.warn(error);
    }
    );

    loader.load("/sukha.glb", 
    function(gltf){
        scene.add(gltf.scene);
    },
    undefined,
    function (error){
        console.warn("error loading sukha")
        console.warn(error);
    }
    );


}