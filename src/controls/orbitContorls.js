import { OrbitControls } from 'three/examples/jsm/Addons.js';


export function createOrbitalControls(camera, canvas){
    
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableRotate = true;
    
    controls.enabled = false;

    return controls
    
}