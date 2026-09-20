import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

export default function AudioControl() {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const handleToggle = () => {
    soundEngine.init();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className="audio-control-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: 'var(--radius-md)',
        background: isMuted ? 'rgba(255,255,255,0.04)' : 'rgba(245, 158, 11, 0.12)',
        border: `1px solid ${isMuted ? 'var(--bg-surface-border)' : 'rgba(245, 158, 11, 0.3)'}`,
        color: isMuted ? 'var(--text-muted)' : 'var(--accent-amber)',
        fontSize: '0.8rem',
        fontWeight: 600,
        transition: 'all 200ms ease'
      }}
      title={isMuted ? 'Unmute procedural soundscapes' : 'Mute procedural soundscapes'}
    >
      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      
      {/* Animated Sound Waveform Bars */}
      {!isMuted ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
          <span className="audio-bar bar-1" />
          <span className="audio-bar bar-2" />
          <span className="audio-bar bar-3" />
        </div>
      ) : (
        <span>Sound Off</span>
      )}
    </button>
  );
}
