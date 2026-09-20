// ============================================================================
// PAPERTRAIL SOOTHING AMBIENT SOUND ENGINE (WEB AUDIO API)
// Pure, warm, calming harmonic sine waves & soft lo-fi frequencies.
// Very gentle background levels (never harsh, never buzzy).
// ============================================================================

class SoothingAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Start muted by default
    this.currentChapterId = null;
    this.activeNodes = [];
    this.masterGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      // Very soft, gentle ambient volume (5% master)
      this.masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  toggleMute() {
    if (!this.isInitialized) this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetVolume = this.isMuted ? 0 : 0.06;
      this.masterGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  stopAmbient() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    });
    this.activeNodes = [];
  }

  // Play very soft, meditative ambient chords tailored to each chapter
  playChapterAmbiance(chapterId) {
    if (!this.isInitialized) this.init();
    if (!this.ctx || this.currentChapterId === chapterId) return;
    this.currentChapterId = chapterId;
    this.stopAmbient();

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Harmonic chord palettes (gentle pentatonic frequencies for deep calm)
    const chordPresets = {
      // Chapter 1 (Midnight): Soft F Major 9th (Dreamy, nocturnal, ambient)
      'ch-1': [174.61, 220.00, 261.63, 329.63], 
      // Chapter 2 (Commute): Warm D Major (Gentle morning sunrise)
      'ch-2': [146.83, 220.00, 293.66, 369.99], 
      // Chapter 3 (Homecoming): Pure C Major (Grounded, meditative chimes)
      'ch-3': [130.81, 196.00, 261.63, 329.63], 
      // Chapter 4 (Escapism): E Minor 7th (Warm twilight relaxation)
      'ch-4': [164.81, 196.00, 246.94, 293.66] 
    };

    const frequencies = chordPresets[chapterId] || chordPresets['ch-1'];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Pure gentle sine waves (no harsh edges)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to ensure silky, smooth sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);

      // Gentle fade in
      const baseGain = 0.012 / (idx + 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(baseGain, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      this.activeNodes.push(osc, gain, filter);
    });
  }

  // Soft tactile click for UI buttons
  playClickSound() {
    if (!this.isInitialized || !this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {}
  }

  // Very gentle whisper for thermal paper feed
  playPrinterMotorSound() {
    if (!this.isInitialized || !this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {}
  }

  // Soft paper rustle
  playPaperTearSound() {
    if (!this.isInitialized || !this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, now);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch {}
  }
}

export const soundEngine = new SoothingAudioSynthesizer();
