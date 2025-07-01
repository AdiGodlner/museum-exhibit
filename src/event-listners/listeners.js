

export class EventManager{

    constructor(camera, render, controlsManager, modalManager, soundManager){

        this.camera = camera;
        this.render = render;
        this.controlsManager = controlsManager;
        this.modalManager = modalManager;
        this.soundManager = soundManager;
        this.initListeners();
    
    }

     initListeners(){

        this.resizeListener();
        this.modalListener();
        this.escListener();
        this.sliderListeners();
        this.soundListeners();

    }


    resizeListener(){


        window.addEventListener("resize", () => {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            
            this.render.setSize(window.innerWidth, window.innerHeight);


        });

    }


    modalListener(){

        const closeButton = document.getElementById("close-modal");

        closeButton.addEventListener("click", () => {
            
            this.modalManager.onClose(this.controlsManager);
            this.controlsManager.start();

        });

    }


    escListener(){

        window.addEventListener('keydown', (event) => {
            
            //TODO maybe move key listners here;
            // TODO find out why this does not trigger when curser is 
            // highjacked but triggers twice after that 

            if (event.key === 'Escape') {
                this.modalManager.onOpen();
                this.controlsManager.stop();
            }

        });


    }

    sliderListeners(){

        this.linkSliderToValueDisplay(
            'fov-slider',
            'fov-value', (val) => {

                this.camera.fov = val;
                this.camera.updateProjectionMatrix();
        
            });

        this.linkSliderToValueDisplay(
            'sensitivity-slider',
            'sensitivity-value', (val) =>{
                this.controlsManager.setMouseSensitivity(val);
            }
        );

        this.linkSliderToValueDisplay(
            'speed-slider',
            'speed-value',
            (val) =>{
                this.controlsManager.setMovementSpeed(val);
            }
        );

    }

    soundListeners(){

        const soundToggle = document.getElementById("sound-toggle");
        const soundState = document.getElementById("sound-state");

        soundToggle.addEventListener("change", () => {
            const isOn = soundToggle.checked;
            soundState.textContent = isOn ? "On" : "Off";
            this.soundManager.setSoundPlaying(isOn);
        });

        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');

        volumeSlider.addEventListener('input', () => {
            const vol = parseInt(volumeSlider.value, 10);
            volumeValue.textContent = `${vol}%`;
            this.soundManager.setVolume(vol);
        });

    }

    linkSliderToValueDisplay(sliderId, valueSpanId, callback = null) {
        
        const slider = document.getElementById(sliderId);
        const valueSpan = document.getElementById(valueSpanId);

        if (!slider || !valueSpan) return;

        slider.addEventListener('input', () => {
            
            console.log(`slide.value ${slider.value}`);
            valueSpan.textContent = slider.value;
            
            if (typeof callback === 'function') {
                callback(parseFloat(slider.value));
            }

        });

    }

}



