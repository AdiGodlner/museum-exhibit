import * as THREE from 'three';


export class FPCameraControl {

    constructor(camera, canvas = document.body) {
    
        this.camera = camera;
        this.canvas = canvas;
        this.enabled = false;
        this.maxPitch = Math.PI / 2;

        // Movement config
        this.moveSpeed = 5;
        this.mouseSensitivity = 0.002;

        // Internals
        this.keys = {};

        this._bindEventListeners();
    }


    _bindEventListeners() {
        this.canvas.addEventListener('click', () => {

            if (!this.enabled) return;
            this.canvas.requestPointerLock?.();

        });

        document.addEventListener('pointerlockchange', () => {
            this.enabled = document.pointerLockElement === this.canvas;
        });

        document.addEventListener('mousemove', (event) => {
            if (!this.enabled) return;

            this.camera.rotateY( event.movementX * this.mouseSensitivity);
            this.camera.rotateX(event.movementY * this.mouseSensitivity);

        });

        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    update(delta) {
        
        if (!this.enabled) return;

        const move = new THREE.Vector3();
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();
        // Forward direction (includes pitch + yaw)
        this.camera.getWorldDirection(direction).normalize();
        
        // Right vector: perpendicular to direction & up vector
        right.crossVectors(direction, this.camera.up).normalize();

        // Movement input
        if (this.keys['w']) move.add(direction);
        if (this.keys['s']) move.sub(direction);
        if (this.keys['a']) move.sub(right);
        if (this.keys['d']) move.add(right);
        
        
        if (move.lengthSq() > 0) {
            move.normalize().multiplyScalar(this.moveSpeed * delta);
            this.camera.controlObject.position.add(move);
        }
    }

}
