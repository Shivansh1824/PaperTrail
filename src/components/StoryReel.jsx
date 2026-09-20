import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Sparkles, ArrowRight, ArrowLeft, Clock, TrendingUp, 
  Heart, Zap, Compass, CheckCircle2, Play, Volume2 
} from 'lucide-react';
import ReceiptCard from './ReceiptCard';
import { soundEngine } from '../utils/audioSynthesizer';

export default function StoryReel({ 
  chapters, 
  allReceipts, 
  onSelectReceipt, 
  onExploreConnections 
}) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapterContainerRef = useRef(null);
  const currentChapter = chapters[currentChapterIndex];

  // Get full receipt objects for the key moments of this chapter
  const chapterReceipts = (currentChapter.keyMoments || [])
    .map(id => allReceipts.find(r => r.id === id))
    .filter(Boolean);

  // GSAP transition & Audio Ambiance when chapter changes
  useEffect(() => {
    // Play chapter soundscape
    soundEngine.playChapterAmbiance(currentChapter.id);

    if (chapterContainerRef.current) {
      gsap.fromTo(
        chapterContainerRef.current.querySelectorAll('.animate-fade'),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [currentChapterIndex]);

  const handleNext = () => {
    setCurrentChapterIndex((prev) => (prev + 1) % chapters.length);
  };

  const handlePrev = () => {
    setCurrentChapterIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  return (
    <div ref={chapterContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Chapter Stepper / Timeline Header */}
      <div className="animate-fade" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-surface-border)',
        padding: 'var(--space-4) var(--space-6)',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', overflowX: 'auto' }}>
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setCurrentChapterIndex(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                background: idx === currentChapterIndex ? ch.themeColor : 'transparent',
                color: idx === currentChapterIndex ? '#080a0f' : 'var(--text-secondary)',
                fontWeight: idx === currentChapterIndex ? 700 : 500,
                fontSize: '0.85rem',
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{ch.number}</span>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrev}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--bg-surface-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Previous Chapter"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--bg-surface-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Next Chapter"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Hero Chapter Narrative Card */}
      <div 
        className="animate-fade"
        style={{
          position: 'relative',
          background: `radial-gradient(ellipse at top right, ${currentChapter.themeColor}22 0%, var(--bg-surface) 70%)`,
          border: `1px solid ${currentChapter.themeColor}44`,
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8) var(--space-8)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-8)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ 
              color: currentChapter.themeColor, 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700, 
              fontSize: '1rem',
              letterSpacing: '0.1em'
            }}>
              CHAPTER {currentChapter.number}
            </span>
            <span style={{ color: 'var(--text-faint)' }}>•</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} />
              {currentChapter.subtitle}
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 800, 
            color: '#fff', 
            marginBottom: '12px',
            lineHeight: 1.15
          }}>
            {currentChapter.title}
          </h1>

          <p style={{ 
            fontSize: 'var(--text-lg)', 
            color: currentChapter.themeColor, 
            fontWeight: 500,
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            "{currentChapter.tagline}"
          </p>

          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.05rem', 
            lineHeight: 1.7,
            maxWidth: '620px'
          }}>
            {currentChapter.description}
          </p>
        </div>

        {/* Chapter Forensic Insights */}
        <div style={{ 
          background: 'rgba(8, 10, 15, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-4)'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '0.85rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              color: 'var(--text-muted)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <TrendingUp size={16} style={{ color: currentChapter.themeColor }} />
              Forensic Pattern Markers
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {Object.entries(currentChapter.stats || {}).map(([key, val]) => (
                <div key={key} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            borderTop: '1px dashed rgba(255,255,255,0.1)', 
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <Sparkles size={14} style={{ color: currentChapter.themeColor }} />
            <span>{chapterReceipts.length} fragments synthesized into this life narrative.</span>
          </div>
        </div>
      </div>

      {/* The Connected Receipts Stream */}
      <div className="animate-fade">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: '#fff' }}>
              The Anatomy of This Chapter
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              How seemingly unrelated receipts (music, food, transit, and searches) formed a single human moment.
            </p>
          </div>
        </div>

        {/* Masonry / Grid of interconnected receipt cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {chapterReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onSelect={onSelectReceipt}
              onExploreConnections={onExploreConnections}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
