import { FPCameraControl } from "./FirstPersonControls";
import { createOrbitalControls } from "./orbitContorls";


let orbitControls;
let fpControls;
let activeControls = null;

export function initControls(camera, canvas){

    orbitControls = createOrbitalControls(camera, canvas);
    fpControls =  new FPCameraControl(camera, canvas);
    activeControls = orbitControls;
    setMode("fp");
    // setMode("orbit");

}


export function setMode(mode){

    activeControls.enabled = false;

    switch(mode){

        case "orbit":
            orbitControls.enabled = true;
            activeControls = orbitControls;
            break;
        case "fp":
            fpControls.enabled = true;
            activeControls = fpControls;
            break;
        default:
            console.warn(`unknown control scheme: ${mode}` );
            break;

    }

    updateControls(0)

} 


export function updateControls(delta){

    activeControls.update(delta);

}
