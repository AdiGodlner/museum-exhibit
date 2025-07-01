import * as THREE from 'three';




export class FpCamera extends THREE.PerspectiveCamera{


    
    constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.01, far = 1000) {
        super(fov, aspect, near, far);

        this.pitchObject = new THREE.Object3D();
        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);
        this.pitchObject.add(this);


    }


    setPosition(x, y, z) {
        console.log("setting position")
        this.yawObject.position.set(x, y, z);
    }

    get controlObject() {
        return this.yawObject;
    }

    rotateY(angle){
        this.yawObject.rotation.y -= angle;
    }

    rotateX(angle){

    const newX = THREE.MathUtils.clamp(
        this.pitchObject.rotation.x - angle,
        -Math.PI / 2,
        Math.PI / 2
    );
    this.pitchObject.rotation.x = newX;
    }

}

export function createAndInitCamera(scene){

    const camera = new FpCamera(74, 
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    camera.setPosition(0,1.7,-5);
    camera.rotateY(Math.PI);
    scene.add(camera.controlObject);
    return camera;
}