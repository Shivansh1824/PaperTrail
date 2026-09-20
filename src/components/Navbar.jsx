import React from 'react';
import { Scroll, BookOpen, Layers, Printer, Sparkles, Compass } from 'lucide-react';
import AudioControl from './AudioControl';

export default function Navbar({ activeTab, setActiveTab, onOpenPrinter, receiptCount }) {
  const tabs = [
    { id: 'story', label: 'Story Reel', icon: BookOpen, testId: 'nav-story-reel' },
    { id: 'journey', label: 'Journey Map', icon: Compass, testId: 'nav-journey-map' },
    { id: 'vault', label: `Receipt Vault (${receiptCount})`, icon: Layers, testId: 'nav-receipt-vault' },
    { id: 'matrix', label: 'Connection Matrix', icon: Sparkles, testId: 'nav-connection-matrix' }
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        {/* Brand Identity */}
        <div className="brand-logo" data-testid="brand-logo">
          <div className="brand-icon-box">
            <Scroll size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-title">PaperTrail</span>
              <span className="brand-badge">2018 ARCHIVE</span>
            </div>
            <p className="brand-subtitle">
              The Archaeology of a Digital Soul • 100% Client-Side
            </p>
          </div>
        </div>

        {/* View Navigation Switcher */}
        <nav className="nav-tabs" aria-label="Main Navigation" role="navigation">
          {tabs.map(({ id, label, icon: Icon, testId }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                data-testid={testId}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={15} strokeWidth={isActive ? 2.4 : 2} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Actions: Audio Control + Print Receipt */}
        <div className="navbar-actions">
          <AudioControl />
          <button
            data-testid="nav-print-receipt"
            aria-label="Print Thermal Summary Receipt"
            className="btn-primary"
            onClick={onOpenPrinter}
            title="Generate a physical-style summary receipt"
          >
            <Printer size={15} strokeWidth={2.2} />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </header>
  );
}
