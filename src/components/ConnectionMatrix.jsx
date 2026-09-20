import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link2, Activity, BrainCircuit } from 'lucide-react';
import ReceiptCard from './ReceiptCard';
import { soundEngine } from '../utils/audioSynthesizer';

export default function ConnectionMatrix({ 
  allReceipts, 
  selectedAnchor, 
  onSelectAnchor, 
  onSelectReceipt 
}) {
  const containerRef = useRef(null);

  // Default to a rich anchor receipt if none is currently selected
  const activeAnchor = selectedAnchor || allReceipts.find(r => r.id === 'rec-101') || allReceipts[0];

  // Find all connected receipts
  const connectedReceipts = (activeAnchor?.connectedReceiptIds || [])
    .map(id => allReceipts.find(r => r.id === id))
    .filter(Boolean);

  // Animate nodes and connection lines when anchor changes
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.matrix-node'),
        { scale: 0.92, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'back.out(1.4)' }
      );

      // Animate SVG path drawing
      const paths = containerRef.current.querySelectorAll('.synapse-line');
      paths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 300;
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.7, duration: 0.8, ease: 'power2.out' }
        );
      });
    }
  }, [activeAnchor?.id]);

  const handleSelectAnchor = (receipt) => {
    soundEngine.playClickSound();
    onSelectAnchor(receipt);
  };

  // Featured anchor presets to invite exploration
  const featuredAnchors = [
    { id: 'rec-101', label: '2:14 AM Insomnia Loop', tag: 'Night Owl' },
    { id: 'rec-201', label: 'Monsoon Train Commute', tag: 'Transit' },
    { id: 'rec-301', label: 'Ganesh Pujan Festival', tag: 'Family' },
    { id: 'rec-401', label: 'Netflix & Escapism', tag: 'Leisure' }
  ];

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Header & Quick Anchor Picker */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-surface-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', marginBottom: '6px' }}>
              <BrainCircuit size={18} />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                THE RIPPLE CANVAS • SYNAPSE DISCOVERY ENGINE
              </span>
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
              The Anatomy of Coincidence
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
              A song played at 2 AM, a ₹19 data recharge, and a frantic search query might appear unrelated. Click any node to reveal the invisible thread connecting them.
            </p>
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Curated Synapses:</span>
            {featuredAnchors.map((preset) => {
              const r = allReceipts.find(item => item.id === preset.id);
              const isActive = activeAnchor?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectAnchor(r)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: isActive ? 'var(--accent-amber)' : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    border: `1px solid ${isActive ? 'var(--accent-amber)' : 'var(--bg-surface-border)'}`,
                    boxShadow: isActive ? '0 2px 6px rgba(217, 119, 6, 0.2)' : '0 1px 2px rgba(15, 23, 42, 0.04)',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{preset.label}</span>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    opacity: 0.85, 
                    background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)',
                    padding: '1px 6px',
                    borderRadius: '4px'
                  }}>
                    {preset.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Synthesis Card (Explaining the Correlation) */}
      <div className="matrix-node" style={{
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, var(--bg-surface) 100%)',
        border: '1px solid rgba(217, 119, 6, 0.28)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-6)',
        boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.06)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', marginBottom: '8px' }}>
            <Activity size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Story Synthesis
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            "{activeAnchor?.title}"
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {activeAnchor?.significance}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--bg-surface-border)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Temporal Proximity:</span>
            <span className="tabular-nums" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              Within co-occurring 45 min window
            </span>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--bg-surface-border)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emotional State:</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'capitalize' }}>
              {activeAnchor?.mood}
            </span>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--bg-surface-border)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Synapse Cluster:</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 800 }}>
              {connectedReceipts.length} Cross-Modal Breadcrumbs
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Hub & Spoke Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: 'var(--space-8)',
        alignItems: 'start'
      }}>
        {/* Central Anchor Receipt */}
        <div className="matrix-node" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'var(--bg-surface)', 
            padding: '8px 16px', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--bg-surface-border)'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
              ★ Active Anchor Node
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {connectedReceipts.length} Radiating Lines
            </span>
          </div>

          <ReceiptCard
            receipt={activeAnchor}
            onSelect={onSelectReceipt}
            onExploreConnections={() => {}}
            isHighlighted={true}
          />
        </div>

        {/* Connected Fragments Cluster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--bg-surface-border)',
            paddingBottom: '12px'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link2 size={18} style={{ color: 'var(--accent-amber)' }} />
              <span>Correlated Fragments in This Moment</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click any card to re-center the universe
            </span>
          </div>

          {connectedReceipts.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 'var(--space-6)' 
            }}>
              {connectedReceipts.map((receipt) => (
                <div key={receipt.id} className="matrix-node">
                  <ReceiptCard
                    receipt={receipt}
                    onSelect={onSelectReceipt}
                    onExploreConnections={() => handleSelectAnchor(receipt)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <p>No directly linked receipts found for this item. Try one of the preset anchors above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
