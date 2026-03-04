class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.enabled = true;
        this.musicPlaying = false;
        
        this.initAudioContext();
    }
    
    initAudioContext() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }
    
    createSound(frequency, duration, type = 'sine', volume = 0.3, modulation = null) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        // Modulation for richer sounds
        if (modulation) {
            const modulator = this.audioContext.createOscillator();
            const modGain = this.audioContext.createGain();
            
            modulator.frequency.value = modulation.frequency;
            modulator.connect(modGain);
            modGain.connect(oscillator.frequency);
            modGain.gain.value = modulation.amount;
            
            modulator.start(this.audioContext.currentTime);
            modulator.stop(this.audioContext.currentTime + duration);
        }
        
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playClick() {
        this.createSound(800, 0.05, 'square', 0.2);
    }
    
    playBuy() {
        this.createSound(600, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.3), 50);
        setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.3), 100);
    }
    
    playSell() {
        this.createSound(1000, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.3), 50);
        setTimeout(() => this.createSound(600, 0.1, 'sine', 0.3), 100);
    }
    
    playTravel() {
        this.createSound(200, 0.2, 'sawtooth', 0.2);
        setTimeout(() => this.createSound(300, 0.2, 'sawtooth', 0.2), 100);
        setTimeout(() => this.createSound(400, 0.2, 'sawtooth', 0.2), 200);
    }
    
    playArrival() {
        this.createSound(400, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(600, 0.1, 'sine', 0.3), 100);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.3), 200);
    }
    
    playRepair() {
        this.createSound(150, 0.15, 'square', 0.2);
        setTimeout(() => this.createSound(200, 0.15, 'square', 0.2), 100);
    }
    
    playRefuel() {
        this.createSound(100, 0.1, 'sawtooth', 0.2, { frequency: 5, amount: 20 });
    }
    
    playUpgrade() {
        this.createSound(400, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(600, 0.1, 'sine', 0.3), 50);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.3), 100);
        setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.3), 150);
    }
    
    playHire() {
        this.createSound(500, 0.1, 'triangle', 0.3);
        setTimeout(() => this.createSound(700, 0.1, 'triangle', 0.3), 50);
    }
    
    playFire() {
        this.createSound(300, 0.2, 'sawtooth', 0.2);
        setTimeout(() => this.createSound(200, 0.2, 'sawtooth', 0.2), 100);
    }
    
    playTrain() {
        this.createSound(600, 0.1, 'sine', 0.2);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.2), 50);
    }
    
    playBonus() {
        this.createSound(800, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.3), 50);
        setTimeout(() => this.createSound(1200, 0.1, 'sine', 0.3), 100);
    }
    
    playLevelUp() {
        this.createSound(400, 0.15, 'sine', 0.3);
        setTimeout(() => this.createSound(600, 0.15, 'sine', 0.3), 100);
        setTimeout(() => this.createSound(800, 0.15, 'sine', 0.3), 200);
        setTimeout(() => this.createSound(1000, 0.15, 'sine', 0.3), 300);
        setTimeout(() => this.createSound(1200, 0.15, 'sine', 0.3), 400);
    }
    
    playError() {
        this.createSound(200, 0.2, 'sawtooth', 0.3);
    }
    
    playSuccess() {
        this.createSound(600, 0.1, 'sine', 0.3);
        setTimeout(() => this.createSound(800, 0.1, 'sine', 0.3), 50);
        setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.3), 100);
    }
    
    playCashRegister() {
        this.createSound(800, 0.05, 'square', 0.2);
        setTimeout(() => this.createSound(1000, 0.05, 'square', 0.2), 50);
        setTimeout(() => this.createSound(1200, 0.05, 'square', 0.2), 100);
    }
    
    playEngineStart() {
        this.createSound(100, 0.3, 'sawtooth', 0.2, { frequency: 2, amount: 10 });
        setTimeout(() => this.createSound(150, 0.3, 'sawtooth', 0.2, { frequency: 3, amount: 15 }), 200);
        setTimeout(() => this.createSound(200, 0.3, 'sawtooth', 0.2, { frequency: 4, amount: 20 }), 400);
    }
    
    playNotification() {
        this.createSound(800, 0.1, 'sine', 0.2);
        setTimeout(() => this.createSound(1000, 0.1, 'sine', 0.2), 100);
    }
    
    playBackgroundMusic() {
        if (!this.enabled || !this.audioContext || this.musicPlaying) return;
        
        this.musicPlaying = true;
        const playNote = (frequency, startTime, duration) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.05, startTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        
        // Simple background melody
        const melody = [
            { note: 261.63, duration: 0.5 }, // C
            { note: 293.66, duration: 0.5 }, // D
            { note: 329.63, duration: 0.5 }, // E
            { note: 349.23, duration: 0.5 }, // F
            { note: 392.00, duration: 1.0 }, // G
            { note: 349.23, duration: 0.5 }, // F
            { note: 329.63, duration: 0.5 }, // E
            { note: 293.66, duration: 1.0 }, // D
        ];
        
        const currentTime = this.audioContext.currentTime;
        let time = currentTime;
        
        // Play melody in a loop
        const playMelody = () => {
            if (!this.musicPlaying) return;
            
            melody.forEach(({ note, duration }) => {
                playNote(note, time, duration);
                time += duration;
            });
            
            // Schedule next loop
            setTimeout(() => {
                if (this.musicPlaying) {
                    time = this.audioContext.currentTime;
                    playMelody();
                }
            }, time - this.audioContext.currentTime + 1000);
        };
        
        playMelody();
    }
    
    stopBackgroundMusic() {
        this.musicPlaying = false;
    }
    
    resumeContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopBackgroundMusic();
        }
        return this.enabled;
    }
}
