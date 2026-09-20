import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Sparkles, Link2, ArrowRight, Compass, Share2, 
  Layers, Zap, Clock, Info 
} from 'lucide-react';
import ReceiptCard, { typeIcons } from './ReceiptCard';

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

  // Animate nodes when anchor changes
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.matrix-node'),
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.5)' }
      );
    }
  }, [activeAnchor?.id]);

  // Featured anchor presets to invite exploration
  const featuredAnchors = [
    { id: 'rec-101', label: '2:14 AM Insomnia Loop' },
    { id: 'rec-201', label: 'Monsoon Train Commute' },
    { id: 'rec-301', label: 'Ganesh Pujan Festival' },
    { id: 'rec-401', label: 'Netflix & Escapism' }
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
              <Sparkles size={18} />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                PATTERN WEAVER & DISCOVERY ENGINE
              </span>
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#fff' }}>
              The Ripple Network
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
              Select any receipt to uncover what else was happening in this person's life at that exact moment.
            </p>
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explore Presets:</span>
            {featuredAnchors.map((preset) => {
              const r = allReceipts.find(item => item.id === preset.id);
              const isActive = activeAnchor?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectAnchor(r)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: isActive ? 'var(--accent-amber)' : 'var(--bg-surface-elevated)',
                    color: isActive ? '#080a0f' : 'var(--text-primary)',
                    border: '1px solid var(--bg-surface-border)',
                    transition: 'all 150ms ease'
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
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
              ★ Central Anchor Moment
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {connectedReceipts.length} Associated Fragments
            </span>
          </div>

          <ReceiptCard
            receipt={activeAnchor}
            onSelect={onSelectReceipt}
            onExploreConnections={() => {}}
            isHighlighted={true}
          />

          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px dashed rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              Why this anchor matters:
            </div>
            {activeAnchor?.significance}
          </div>
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link2 size={18} style={{ color: 'var(--accent-amber)' }} />
              <span>Correlated Moments in the Same Time Horizon</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click any card to re-center the matrix
            </span>
          </div>

          {connectedReceipts.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 'var(--space-4)' 
            }}>
              {connectedReceipts.map((receipt) => (
                <div key={receipt.id} className="matrix-node">
                  <ReceiptCard
                    receipt={receipt}
                    onSelect={onSelectReceipt}
                    onExploreConnections={() => onSelectAnchor(receipt)}
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
