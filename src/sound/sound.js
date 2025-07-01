export class SoundManager {

    constructor(audioUrl) {
        this.audioUrl = audioUrl;
        this.audioContext = null;
        this.buffer = null;
        this.source = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.loadSound();
    }

    async loadSound() {
        
        if (!window.AudioContext) {
            console.warn("Web Audio API is not supported in this browser.");
            return;
        }

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);

        try {
            const response = await fetch(this.audioUrl);
            const arrayBuffer = await response.arrayBuffer();
            this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
            console.log("Audio loaded successfully.");

        } catch (e) {
            console.error("Failed to load audio:", e);
        }
    }

    startMusic() {
        if (!this.buffer || this.isPlaying) return;

            this.source = this.audioContext.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.gainNode); // connect to gainNode
            this.source.loop = true;
            this.source.start(0);

            this.isPlaying = true;
    }

    stopMusic() {
        if (this.source && this.isPlaying) {
            this.source.stop();
            this.source.disconnect();
            this.source = null;
            this.isPlaying = false;
        }
    }

    setVolume(percent) {
        if (this.gainNode) {
            const volume = percent / 100;
            this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }


    setSoundPlaying(playSound){
        if(playSound){
            this.startMusic();
        }else{
            this.stopMusic()
        }
    }
}




