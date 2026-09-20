import React from 'react';
import { 
  Music, MapPin, ShoppingBag, Tv, Search, FileText, 
  Image as ImageIcon, MessageSquare, Calendar, Link2, Clock 
} from 'lucide-react';

// Icon mapping per activity type
export const typeIcons = {
  music: Music,
  places: MapPin,
  purchases: ShoppingBag,
  entertainment: Tv,
  searches: Search,
  notes: FileText,
  photos: ImageIcon,
  messages: MessageSquare,
  events: Calendar
};

export default function ReceiptCard({ 
  receipt, 
  onSelect, 
  onExploreConnections,
  isHighlighted = false 
}) {
  const IconComponent = typeIcons[receipt.type] || FileText;
  const formattedDate = new Date(receipt.timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = new Date(receipt.timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      className={`receipt-card ${isHighlighted ? 'highlighted' : ''}`}
      onClick={() => onSelect(receipt)}
      style={{
        cursor: 'pointer',
        border: isHighlighted ? '2px solid var(--accent-amber)' : '1px solid var(--paper-border)',
        transform: isHighlighted ? 'scale(1.02)' : 'none'
      }}
    >
      {/* Top perforated edge */}
      <div className="receipt-tear-top" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span className={`badge badge-${receipt.type}`}>
          <IconComponent size={12} />
          <span>{receipt.type}</span>
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--paper-ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={11} />
          <span>{formattedDate} {formattedTime}</span>
        </span>
      </div>

      {/* Title */}
      <h3 style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '1rem', 
        fontWeight: 700, 
        color: 'var(--paper-ink)',
        margin: '6px 0',
        lineHeight: 1.3
      }}>
        {receipt.title}
      </h3>

      {/* Amount or Value */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'baseline',
        marginTop: '8px',
        marginBottom: '6px'
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--paper-ink-muted)', textTransform: 'uppercase' }}>
          {receipt.category}
        </span>
        <span className="tabular-nums" style={{ 
          fontSize: '1.15rem', 
          fontWeight: 700, 
          color: receipt.amount > 0 ? 'var(--paper-ink)' : 'var(--paper-ink-muted)'
        }}>
          {receipt.amount > 0 ? `₹${receipt.amount.toLocaleString('en-IN')}` : 'DIGITAL LOG'}
        </span>
      </div>

      <div className="receipt-divider-dotted" />

      {/* Emotional Insight / Significance */}
      <p style={{ 
        fontSize: '0.8rem', 
        color: 'var(--paper-ink-muted)', 
        fontStyle: 'italic', 
        margin: '8px 0',
        lineHeight: 1.4
      }}>
        "{receipt.significance}"
      </p>

      {/* Simulated Barcode */}
      <div className="receipt-barcode" aria-hidden="true">
        <div className="barcode-bar thick" />
        <div className="barcode-bar thin" />
        <div className="barcode-bar spacer" />
        <div className="barcode-bar medium" />
        <div className="barcode-bar thin" />
        <div className="barcode-bar thick" />
        <div className="barcode-bar spacer" />
        <div className="barcode-bar medium" />
        <div className="barcode-bar thick" />
        <div className="barcode-bar thin" />
        <div className="barcode-bar spacer" />
        <div className="barcode-bar medium" />
        <div className="barcode-bar thick" />
      </div>

      {/* Footer / Connection Indicator */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '6px',
        fontSize: '0.75rem' 
      }}>
        <span style={{ 
          background: 'rgba(0,0,0,0.06)', 
          padding: '2px 6px', 
          borderRadius: '4px',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {receipt.mood}
        </span>

        {receipt.connectedReceiptIds && receipt.connectedReceiptIds.length > 0 && (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--paper-ink)',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderRadius: '4px',
              background: 'rgba(0,0,0,0.05)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onExploreConnections(receipt);
            }}
            title="Explore interconnected moments"
          >
            <Link2 size={13} />
            <span>{receipt.connectedReceiptIds.length} Connected</span>
          </button>
        )}
      </div>

      {/* Bottom perforated edge */}
      <div className="receipt-tear-bottom" />
    </div>
  );
}
