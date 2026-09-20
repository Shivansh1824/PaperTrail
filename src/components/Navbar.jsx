import React from 'react';
import { Scroll, BookOpen, Layers, Printer, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPrinter, receiptCount }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-logo">
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#080a0f',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
          }}>
            <Scroll size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, letterSpacing: '-0.03em', fontSize: '1.25rem' }}>
                PaperTrail
              </span>
              <span className="brand-badge">2018 ARCHIVE</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              The Archaeology of a Digital Soul
            </p>
          </div>
        </div>

        {/* Mode Navigation */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            className={`nav-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            <BookOpen size={16} />
            <span>Story Reel</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'vault' ? 'active' : ''}`}
            onClick={() => setActiveTab('vault')}
          >
            <Layers size={16} />
            <span>Receipt Vault ({receiptCount})</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            <Sparkles size={16} />
            <span>Connection Matrix</span>
          </button>
        </nav>

        {/* Print Life Receipt CTA */}
        <div>
          <button
            className="btn-primary"
            onClick={onOpenPrinter}
            title="Generate a physical-style summary receipt"
          >
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </header>
  );
}
