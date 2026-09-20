import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Printer, Check, Download, Share2, Sparkles, 
  X, RefreshCw, Heart, Music, Coffee, MapPin 
} from 'lucide-react';

export default function ReceiptPrinter({ isOpen, onClose, allReceipts }) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const receiptPaperRef = useRef(null);

  // Aggregated life stats for 2018
  const totalAmount = allReceipts.reduce((acc, r) => acc + (r.amount || 0), 0);
  const totalMusic = allReceipts.filter(r => r.type === 'music').length;
  const totalPurchases = allReceipts.filter(r => r.type === 'purchases').length;
  const totalPlaces = allReceipts.filter(r => r.type === 'places').length;
  const totalSearches = allReceipts.filter(r => r.type === 'searches').length;
  const totalNotes = allReceipts.filter(r => r.type === 'notes').length;

  const handlePrint = () => {
    setIsPrinting(true);
    setHasPrinted(false);

    if (receiptPaperRef.current) {
      // Reset height
      gsap.set(receiptPaperRef.current, { height: 0, opacity: 1 });

      // GSAP thermal paper feed animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsPrinting(false);
          setHasPrinted(true);
          // Trigger celebration confetti
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      });

      tl.to(receiptPaperRef.current, {
        height: 'auto',
        duration: 2.2,
        ease: 'power1.inOut'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      handlePrint();
    } else {
      setHasPrinted(false);
      setIsPrinting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          background: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            alignSelf: 'flex-end',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '8px',
            color: '#fff',
            marginBottom: '12px',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Thermal Printer Hardware Slot */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(180deg, #1e2533 0%, #0d1117 100%)',
          border: '2px solid #2e384d',
          borderRadius: '16px 16px 4px 4px',
          padding: '16px 20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} style={{ color: 'var(--accent-amber)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
                PAPERTRAIL THERMAL EMULATOR
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isPrinting ? '#f59e0b' : '#10b981',
                boxShadow: isPrinting ? '0 0 10px #f59e0b' : '0 0 8px #10b981'
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {isPrinting ? 'FEEDING PAPER...' : 'READY'}
              </span>
            </div>
          </div>

          {/* Paper Output Slot */}
          <div style={{
            height: '6px',
            background: '#05070a',
            borderRadius: '4px',
            marginTop: '12px',
            border: '1px solid #1a2232'
          }} />
        </div>

        {/* The Animated Feeding Paper */}
        <div 
          ref={receiptPaperRef}
          style={{
            width: '92%',
            overflow: 'hidden',
            marginTop: '-4px',
            position: 'relative'
          }}
        >
          <div className="receipt-card" style={{ padding: '24px 20px', margin: '0 auto', width: '100%' }}>
            {/* Perforations */}
            <div className="receipt-tear-top" />

            {/* Receipt Header */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                PAPERTRAIL ARCHIVE
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--paper-ink-muted)', marginTop: '2px' }}>
                DIGITAL LIFE RECEIPT • 2018 AUDIT
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--paper-ink-muted)' }}>
                TIMESTAMP: 2018-12-31 23:59:59
              </p>
            </div>

            <div className="receipt-divider-solid" />

            {/* Itemized Breakdown */}
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>MUSIC LOGGED (SPOTIFY)</span>
                <span className="tabular-nums" style={{ fontWeight: 700 }}>{totalMusic} TRACKS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>DAILY PURCHASES</span>
                <span className="tabular-nums" style={{ fontWeight: 700 }}>{totalPurchases} ITEMS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>TRANSIT & COMMUTE RIDES</span>
                <span className="tabular-nums" style={{ fontWeight: 700 }}>{totalPlaces} TRIPS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>MIDNIGHT SEARCHES</span>
                <span className="tabular-nums" style={{ fontWeight: 700 }}>{totalSearches} QUERIES</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>PRIVATE NOTES & THOUGHTS</span>
                <span className="tabular-nums" style={{ fontWeight: 700 }}>{totalNotes} NOTES</span>
              </div>
            </div>

            <div className="receipt-divider-dotted" />

            {/* Financial & Emotional Totals */}
            <div style={{ margin: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>TOTAL FINANCIAL OUTLAY</span>
                <span className="tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--paper-ink-muted)', marginTop: '4px' }}>
                <span>LIFE BALANCE INDEX</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>78 / 100 (HIGH GRIT)</span>
              </div>
            </div>

            <div className="receipt-divider-dotted" />

            {/* Human Insights */}
            <div style={{ fontSize: '0.8rem', color: 'var(--paper-ink-muted)', fontStyle: 'italic', margin: '12px 0' }}>
              <p style={{ margin: '4px 0' }}>• Most repeated 2 AM track: <strong>Midnight City (M83)</strong></p>
              <p style={{ margin: '4px 0' }}>• Core daily route: <strong>Place 5 ↔ Place 0</strong></p>
              <p style={{ margin: '4px 0' }}>• Core emotional polarity: <strong>Ambition vs. Exhaustion</strong></p>
            </div>

            {/* Simulated Barcode */}
            <div className="receipt-barcode" aria-hidden="true">
              <div className="barcode-bar thick" />
              <div className="barcode-bar medium" />
              <div className="barcode-bar thin" />
              <div className="barcode-bar spacer" />
              <div className="barcode-bar thick" />
              <div className="barcode-bar thin" />
              <div className="barcode-bar medium" />
              <div className="barcode-bar spacer" />
              <div className="barcode-bar thick" />
              <div className="barcode-bar medium" />
              <div className="barcode-bar thin" />
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--paper-ink-muted)', margin: '8px 0 0' }}>
              *** THANK YOU FOR AUDITING YOUR HUMAN EXISTENCE ***
            </p>

            <div className="receipt-tear-bottom" />
          </div>
        </div>

        {/* Action Buttons */}
        {hasPrinted && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', zIndex: 20 }}>
            <button
              className="btn-primary"
              onClick={() => window.print()}
            >
              <Download size={16} />
              <span>Save / Print</span>
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <RefreshCw size={14} />
              <span>Reprint</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
