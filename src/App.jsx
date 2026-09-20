import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StoryReel from './components/StoryReel';
import ReceiptVault from './components/ReceiptVault';
import ConnectionMatrix from './components/ConnectionMatrix';
import ReceiptPrinter from './components/ReceiptPrinter';
import ReceiptDetailModal from './components/ReceiptDetailModal';

// Import curated datasets
import allReceipts from './data/life_receipts.json';
import chapters from './data/chapters.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'vault', 'matrix'
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
      <main className="main-content">
        {activeTab === 'story' && (
          <StoryReel
            chapters={chapters}
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

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'var(--space-6) var(--space-6)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>PaperTrail</strong> — Your Life, In Receipts
          </div>
          <div>
            WebRush 6-Hour Frontend Challenge • Built with React & GSAP • 100% Client-Side
          </div>
        </div>
      </footer>
    </div>
  );
}
