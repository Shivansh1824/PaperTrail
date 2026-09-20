import React, { useState } from 'react';
import { Compass, Activity } from 'lucide-react';
import ReceiptCard from './ReceiptCard';

export default function JourneyMap({ allReceipts, onSelectReceipt, onExploreConnections }) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const journeyMilestones = [
    {
      period: "Jan — Mar 2018",
      phase: "Phase I: The Incubation & Startup Dreams",
      headline: "Silent foundations laid in cold mornings.",
      vibe: "Quiet Ambition",
      intensity: 65,
      color: "hsl(200, 85%, 55%)",
      receiptCount: 38,
      keyMoments: ["rec-101", "rec-105"],
      narrative: "Early 2018 began with quiet study and exploratory coding. Initial Spotify loops were focused on classical and low-tempo indie. Financial logs show basic sustenance: daily milk deliveries, tea stall snacks, and quiet weekend planning."
    },
    {
      period: "Apr — Jun 2018",
      phase: "Phase II: The Daily Local Commute",
      headline: "24.5 km of steel tracks, cutting chai, and morning idlis.",
      vibe: "Relentless Persistence",
      intensity: 82,
      color: "hsl(265, 80%, 65%)",
      receiptCount: 52,
      keyMoments: ["rec-201", "rec-202", "rec-203"],
      narrative: "The middle of the year saw intense physical mobility. Hundreds of train ticket receipts between Place 5 and Place 0. Music taste hardened to brooding Arctic Monkeys guitar riffs. Breakfast was bought 53 seconds before boarding."
    },
    {
      period: "Jul — Sep 2018",
      phase: "Phase III: The Midnight Burnout & Monsoon",
      headline: "2 AM emergency data recharges and searching for balance.",
      vibe: "Insomniac Grit",
      intensity: 95,
      color: "hsl(340, 85%, 60%)",
      receiptCount: 64,
      keyMoments: ["rec-102", "rec-103", "rec-104"],
      narrative: "Peak intensity of the year. When home Wi-Fi throttled at 11:41 PM, emergency ₹19 data booster packs were bought. The music history recorded 42 consecutive midnight hours of M83 and MGMT loops. Private notes revealed vulnerability."
    },
    {
      period: "Oct — Dec 2018",
      phase: "Phase IV: The Festive Reunion & Renewal",
      headline: "Marigolds, family transfers, and learning to let go.",
      vibe: "Grounded Warmth",
      intensity: 70,
      color: "hsl(35, 95%, 55%)",
      receiptCount: 30,
      keyMoments: ["rec-301", "rec-302", "rec-304"],
      narrative: "The screen turned off as autumn arrived. The Ganesh Pujan idol purchase marked a dramatic emotional shift. Classical acoustic playlists replaced indie synthesizers, and family support arrived to reset the foundation."
    }
  ];

  const activePhase = journeyMilestones[activePhaseIndex];
  const phaseReceipts = activePhase.keyMoments
    .map(id => allReceipts.find(r => r.id === id))
    .filter(Boolean);

  return (
    <div data-testid="journey-map-section" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-surface-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
          <Compass size={18} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
            DIGITAL JOURNEY ATLAS • 2018 MACRO TIMELINE
          </span>
        </div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#fff' }}>
          The Emotional Trajectory of a Year
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '720px' }}>
          A visual representation of how this person evolved over 12 months. Watch how physical commutes, late-night insomnia, and family rituals formed distinct life eras.
        </p>

        {/* Milestone Progression Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginTop: '12px'
        }}>
          {journeyMilestones.map((ms, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={ms.period}
                onClick={() => setActivePhaseIndex(idx)}
                style={{
                  background: isSelected ? ms.color : 'var(--bg-surface-elevated)',
                  color: isSelected ? '#080a0f' : 'var(--text-primary)',
                  border: `1px solid ${isSelected ? ms.color : 'var(--bg-surface-border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 16px',
                  textAlign: 'left',
                  transition: 'all 200ms ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 700,
                  opacity: isSelected ? 0.9 : 0.6 
                }}>
                  {ms.period}
                </div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 800, 
                  marginTop: '4px',
                  lineHeight: 1.25 
                }}>
                  {ms.phase.split(':')[1]}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  marginTop: '6px',
                  opacity: isSelected ? 0.9 : 0.7 
                }}>
                  Intensity: {ms.intensity}% • {ms.receiptCount} Fragments
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Intensity Curve (SVG Graph) */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-surface-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} style={{ color: activePhase.color }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              Digital Activity & Emotional Velocity Curve
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Aggregated across 184 cross-modal receipts
          </span>
        </div>

        {/* SVG Curve */}
        <div style={{ width: '100%', height: '140px', position: 'relative' }}>
          <svg viewBox="0 0 800 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(200, 85%, 55%)" />
                <stop offset="35%" stopColor="hsl(265, 80%, 65%)" />
                <stop offset="70%" stopColor="hsl(340, 85%, 60%)" />
                <stop offset="100%" stopColor="hsl(35, 95%, 55%)" />
              </linearGradient>
            </defs>

            {/* Grid horizontal guidelines */}
            <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="70" x2="800" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="110" x2="800" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

            {/* The Smooth Life Journey Curve */}
            <path
              d="M 20 85 C 150 90, 250 45, 380 35 C 500 25, 620 15, 700 30 C 740 45, 770 70, 780 75"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Active Marker Dot */}
            <circle
              cx={activePhaseIndex === 0 ? 100 : activePhaseIndex === 1 ? 300 : activePhaseIndex === 2 ? 550 : 720}
              cy={activePhaseIndex === 0 ? 82 : activePhaseIndex === 1 ? 40 : activePhaseIndex === 2 ? 20 : 50}
              r="7"
              fill={activePhase.color}
              stroke="#080a0f"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {/* Detailed Era Spotlight */}
      <div style={{
        background: `radial-gradient(ellipse at top right, ${activePhase.color}22 0%, var(--bg-surface) 75%)`,
        border: `1px solid ${activePhase.color}44`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ 
              color: activePhase.color, 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700, 
              fontSize: '0.85rem' 
            }}>
              {activePhase.period} • {activePhase.vibe}
            </span>
            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
              {activePhase.headline}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '8px', maxWidth: '750px', lineHeight: 1.65 }}>
              {activePhase.narrative}
            </p>
          </div>
        </div>

        {/* Highlighted Receipts of This Era */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            Signature Receipts of this Phase
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 'var(--space-6)' 
          }}>
            {phaseReceipts.map(receipt => (
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
    </div>
  );
}
