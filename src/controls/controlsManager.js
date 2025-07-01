import { FPCameraControl } from "./FirstPersonControls";
import { createOrbitalControls } from "./orbitContorls";


export class ControlsManager{

    constructor(camera, canvas){

        this.orbitControls;
        this.fpControls;
        this.activeControls = null;
        this.camera = camera;
        this.canvas = canvas;
        this.initControls();

    };

    initControls(){

        this.orbitControls = createOrbitalControls(this.camera, this.canvas);
        this.fpControls =  new FPCameraControl(this.camera, this.canvas);
        this.activeControls = this.fpControls;

    }

    setMode(mode){

        this.activeControls.enabled = false;

        switch(mode){

            case "orbit":
                console.log("orbit");
                this.orbitControls.enabled = true;
                this.activeControls = this.orbitControls;
                break;

            case "fp":
                console.log("fp");
                this.fpControls.enabled = true;
                this.activeControls = this.fpControls;
                break;

            default:
                console.warn(`unknown control scheme: ${mode}` );
                break;

        }

        this.updateControls(0)

    } 

    stop(){
        this.activeControls.enabled = false;
    }

    start(){
        this.activeControls.enabled = true;
    }

    setMouseSensitivity(val){
        this.fpControls.setMouseSensitivity( (val / 100));
    }

    setMovementSpeed(val){
        this.fpControls.setMoveSpeed(val);
    }



    updateControls(delta){

        this.activeControls.update(delta);

    }


}
