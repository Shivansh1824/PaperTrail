// ============================================================================
// PAPERTRAIL PROCEDURAL AUDIO SYNTHESIZER (WEB AUDIO API)
// 100% Code-based, zero external dependencies, works offline and reliably.
// ============================================================================

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentChapterId = null;
    this.ambientNodes = [];
    this.masterGain = null;
    this.isInitialized = false;
  }

  // Initialize on first user interaction to comply with browser autoplay policy
  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : 0.15,
        this.ctx.currentTime,
        0.05
      );
    }
    return this.isMuted;
  }

  stopAmbient() {
    this.ambientNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.ambientNodes = [];
  }

  // Chapter-specific procedural soundscapes
  playChapterAmbiance(chapterId) {
    if (!this.isInitialized) this.init();
    if (!this.ctx || this.currentChapterId === chapterId) return;
    this.currentChapterId = chapterId;
    this.stopAmbient();

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Chapter 1: The Midnight Hustler (Low-pass ambient drone + midnight rain hiss)
    if (chapterId === 'ch-1') {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now); // A1 note
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(110, now); // A2 note

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      gain.gain.setValueAtTime(0.04, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      this.ambientNodes.push(osc1, osc2, filter, gain);
    }

    // Chapter 2: The Daily Commute (Rhythmic subtle train pulse & low rumble)
    else if (chapterId === 'ch-2') {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(73.42, now); // D2 note
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      // LFO for rhythmic train-track cadence
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(1.8, now); // 1.8 Hz click-clack rhythm
      lfoGain.gain.setValueAtTime(0.03, now);

      lfo.connect(gain.gain);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      lfo.start(now);
      this.ambientNodes.push(osc, filter, gain, lfo, lfoGain);
    }

    // Chapter 3: The Festival Homecoming (Resonant acoustic bell chimes)
    else if (chapterId === 'ch-3') {
      const freqs = [261.63, 329.63, 392.00, 523.25]; // C major harmonic chime
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.015 / (idx + 1), now);
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        this.ambientNodes.push(osc, gain);
      });
    }

    // Chapter 4: The Digital Escapism (Warm lo-fi tape pad)
    else if (chapterId === 'ch-4') {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(130.81, now); // C3
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now);

      gain.gain.setValueAtTime(0.035, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      this.ambientNodes.push(osc, filter, gain);
    }
  }

  // Tactile SFX: Mechanical thermal printer stepping sound
  playPrinterMotorSound() {
    if (!this.isInitialized) this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Tactile SFX: Receipt tear sound (white noise burst)
  playPaperTearSound() {
    if (!this.isInitialized) this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  // Tactile SFX: Micro UI click
  playClickSound() {
    if (!this.isInitialized) this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const soundEngine = new AudioSynthesizer();
