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
        padding: '8px 13px',
        borderRadius: 'var(--radius-md)',
        background: isMuted ? 'var(--bg-surface)' : 'rgba(217, 119, 6, 0.1)',
        border: `1px solid ${isMuted ? 'var(--bg-surface-border)' : 'rgba(217, 119, 6, 0.35)'}`,
        color: isMuted ? 'var(--text-secondary)' : 'var(--accent-amber)',
        fontSize: '0.8rem',
        fontWeight: 600,
        boxShadow: isMuted ? '0 1px 2px rgba(15, 23, 42, 0.04)' : '0 2px 6px rgba(217, 119, 6, 0.15)',
        transition: 'all 200ms ease'
      }}
      title={isMuted ? 'Unmute procedural soundscapes' : 'Mute procedural soundscapes'}
    >
      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      
      {/* Animated Sound Waveform Bars */}
      {!isMuted ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '12px' }}>
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
