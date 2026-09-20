import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StoryReel from './components/StoryReel';
import JourneyMap from './components/JourneyMap';
import ReceiptVault from './components/ReceiptVault';
import ConnectionMatrix from './components/ConnectionMatrix';
import ReceiptPrinter from './components/ReceiptPrinter';
import ReceiptDetailModal from './components/ReceiptDetailModal';

// Import curated datasets
import allReceipts from './data/life_receipts.json';
import chapters from './data/chapters.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'journey', 'vault', 'matrix'
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedAnchor, setSelectedAnchor] = useState(null);
  const [isPrinterOpen, setIsPrinterOpen] = useState(false);

  // Switch to Connection Matrix with the clicked receipt as anchor
  const handleExploreConnections = (receipt) => {
    setSelectedAnchor(receipt);
    setActiveTab('matrix');
    setSelectedReceipt(null);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrinter={() => setIsPrinterOpen(true)}
        receiptCount={allReceipts.length}
      />

      {/* Main View Area */}
      <main className="main-content" role="main">
        {activeTab === 'story' && (
          <StoryReel
            chapters={chapters}
            allReceipts={allReceipts}
            onSelectReceipt={(receipt) => setSelectedReceipt(receipt)}
            onExploreConnections={handleExploreConnections}
          />
        )}

        {activeTab === 'journey' && (
          <JourneyMap
            allReceipts={allReceipts}
            onSelectReceipt={(receipt) => setSelectedReceipt(receipt)}
            onExploreConnections={handleExploreConnections}
          />
        )}

        {activeTab === 'vault' && (
          <ReceiptVault
            receipts={allReceipts}
            onSelectReceipt={(receipt) => setSelectedReceipt(receipt)}
            onExploreConnections={handleExploreConnections}
          />
        )}

        {activeTab === 'matrix' && (
          <ConnectionMatrix
            allReceipts={allReceipts}
            selectedAnchor={selectedAnchor}
            onSelectAnchor={(receipt) => setSelectedAnchor(receipt)}
            onSelectReceipt={(receipt) => setSelectedReceipt(receipt)}
          />
        )}
      </main>

      {/* Forensic Detail Modal */}
      {selectedReceipt && (
        <ReceiptDetailModal
          receipt={selectedReceipt}
          allReceipts={allReceipts}
          onClose={() => setSelectedReceipt(null)}
          onExploreConnections={handleExploreConnections}
        />
      )}

      {/* Thermal Receipt Printer Simulation */}
      <ReceiptPrinter
        isOpen={isPrinterOpen}
        onClose={() => setIsPrinterOpen(false)}
        allReceipts={allReceipts}
      />

      {/* Compact Slim Footer — Never Cut Off */}
      <footer className="app-footer" role="contentinfo">
        <div className="app-footer-inner">
          <div>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>PaperTrail</strong> — Your Life, In Receipts
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            WebRush 6-Hour Challenge • React &amp; GSAP • 100% Client-Side
          </div>
        </div>
      </footer>
    </div>
  );
}
