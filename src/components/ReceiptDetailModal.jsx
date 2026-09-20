import React from 'react';
import { X, Tag, ArrowUpRight } from 'lucide-react';
import { typeIcons } from './ReceiptCard';

export default function ReceiptDetailModal({ 
  receipt, 
  allReceipts, 
  onClose, 
  onExploreConnections 
}) {
  if (!receipt) return null;

  const IconComponent = typeIcons[receipt.type] || Tag;
  const connectedItems = (receipt.connectedReceiptIds || [])
    .map(id => allReceipts.find(r => r.id === id))
    .filter(Boolean);

  const formattedDate = new Date(receipt.timestamp).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = new Date(receipt.timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--bg-surface-border)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge badge-${receipt.type}`}>
                <IconComponent size={14} />
                <span>{receipt.type}</span>
              </span>
              <span style={{ 
                background: 'rgba(0, 0, 0, 0.05)', 
                padding: '2px 8px', 
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)'
              }}>
                ID: {receipt.id}
              </span>
            </div>

            <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)', fontWeight: 800 }}>
              {receipt.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--bg-surface-border)',
              borderRadius: '50%',
              padding: '8px',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Forensic Metadata Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          background: 'var(--bg-surface-elevated)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--bg-surface-border)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Timestamp</div>
            <div className="tabular-nums" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '2px' }}>
              {formattedDate}
            </div>
            <div className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
              {formattedTime}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Financial Outlay</div>
            <div className="tabular-nums" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 800, marginTop: '2px' }}>
              {receipt.amount > 0 ? `₹${receipt.amount.toLocaleString('en-IN')}` : '₹0.00 (Non-Financial)'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '2px', textTransform: 'capitalize' }}>
              {receipt.category}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Emotional State</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'capitalize', marginTop: '2px' }}>
              {receipt.mood}
            </div>
          </div>
        </div>

        {/* Detailed Content / Breakdown */}
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Forensic Significance
          </h3>
          <p style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1rem', 
            lineHeight: 1.6,
            background: 'var(--bg-surface-elevated)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--accent-amber)',
            border: '1px solid var(--bg-surface-border)',
            borderLeftWidth: '4px'
          }}>
            "{receipt.significance}"
          </p>
        </div>

        {/* Technical Properties */}
        {receipt.details && (
          <div>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Raw Activity Parameters
            </h3>
            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--bg-surface-border)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              {Object.entries(receipt.details).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{Array.isArray(v) ? v.join(', ') : String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interconnected Ripple Network */}
        {connectedItems.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Correlated Life Fragments ({connectedItems.length})
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onExploreConnections(receipt);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--accent-amber)',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                <span>Open in Matrix</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {connectedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onExploreConnections(item)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff',
                    border: '1px solid var(--bg-surface-border)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                    transition: 'all 150ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge badge-${item.type}`} style={{ padding: '2px 6px' }}>
                      {item.type}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {item.title}
                    </span>
                  </div>
                  <span className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {item.amount > 0 ? `₹${item.amount}` : item.timeOfDay}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
