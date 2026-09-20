import React, { useState, useMemo } from 'react';
import { Search, Moon, Sun, Filter, X, Sparkles } from 'lucide-react';
import ReceiptCard, { typeIcons } from './ReceiptCard';

const ALL_TYPES = [
  'all', 'music', 'places', 'purchases', 'entertainment', 
  'searches', 'notes', 'photos', 'messages', 'events'
];

export default function ReceiptVault({ 
  receipts, 
  onSelectReceipt, 
  onExploreConnections 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'night', 'day'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'amount-high'

  // Filter and sort logic
  const filteredReceipts = useMemo(() => {
    return receipts.filter((r) => {
      // 1. Type match
      if (selectedType !== 'all' && r.type !== selectedType) {
        return false;
      }

      // 2. Time match
      if (timeFilter === 'night' && r.timeOfDay !== 'midnight') {
        return false;
      }
      if (timeFilter === 'day' && r.timeOfDay === 'midnight') {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(query);
        const matchesCat = r.category.toLowerCase().includes(query);
        const matchesSig = r.significance.toLowerCase().includes(query);
        const matchesMood = r.mood.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCat && !matchesSig && !matchesMood) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      if (sortBy === 'oldest') {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      if (sortBy === 'amount-high') {
        return (b.amount || 0) - (a.amount || 0);
      }
      return 0;
    });
  }, [receipts, selectedType, timeFilter, searchQuery, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Search & Filter Control Bar */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-surface-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{
            flex: 1,
            minWidth: '280px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            <input
              data-testid="search-input"
              aria-label="Search receipts by keyword"
              type="text"
              placeholder="Search receipts by track, note, station, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid var(--bg-surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px 10px 42px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button 
                data-testid="clear-search-btn"
                aria-label="Clear search input"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Night Owl / Time of Day Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '3px', border: '1px solid var(--bg-surface-border)' }}>
            <button
              data-testid="filter-all-hours"
              aria-label="Filter all hours"
              onClick={() => setTimeFilter('all')}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: timeFilter === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: timeFilter === 'all' ? '#ffffff' : 'transparent',
                boxShadow: timeFilter === 'all' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none'
              }}
            >
              All Hours
            </button>
            <button
              data-testid="filter-night-owl"
              aria-label="Filter Night Owl hours (11 PM to 5 AM)"
              onClick={() => setTimeFilter('night')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: timeFilter === 'night' ? '#7e22ce' : 'var(--text-secondary)',
                background: timeFilter === 'night' ? '#f3e8ff' : 'transparent',
                boxShadow: timeFilter === 'night' ? '0 1px 3px rgba(126, 34, 206, 0.12)' : 'none'
              }}
              title="Filter moments between 11 PM and 5 AM"
            >
              <Moon size={14} />
              <span>Night Owl (2 AM)</span>
            </button>
            <button
              data-testid="filter-daylight"
              aria-label="Filter daylight hours"
              onClick={() => setTimeFilter('day')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: timeFilter === 'day' ? '#b45309' : 'var(--text-secondary)',
                background: timeFilter === 'day' ? '#fef3c7' : 'transparent',
                boxShadow: timeFilter === 'day' ? '0 1px 3px rgba(180, 83, 9, 0.12)' : 'none'
              }}
            >
              <Sun size={14} />
              <span>Daylight</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              data-testid="sort-selector"
              aria-label="Sort receipts"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--bg-surface-border)',
                color: 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="amount-high">Sort: Highest Amount</option>
            </select>
          </div>
        </div>

        {/* Activity Category Filter Pills */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          paddingBottom: '4px' 
        }}>
          {ALL_TYPES.map((type) => {
            const Icon = typeIcons[type] || Filter;
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                data-testid={`filter-category-${type}`}
                aria-label={`Filter by ${type}`}
                onClick={() => setSelectedType(type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease',
                  background: isSelected ? 'var(--text-primary)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--text-primary)' : '1px solid var(--bg-surface-border)',
                  boxShadow: isSelected ? '0 2px 6px rgba(15, 23, 42, 0.12)' : '0 1px 2px rgba(15, 23, 42, 0.04)'
                }}
              >
                {type !== 'all' && <Icon size={12} />}
                <span>{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Displaying <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{filteredReceipts.length}</span> receipts
          {selectedType !== 'all' && <span> in <strong style={{ textTransform: 'capitalize' }}>{selectedType}</strong></span>}
          {timeFilter === 'night' && <span> (Night Owl hours only)</span>}
        </p>

        {(selectedType !== 'all' || timeFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedType('all');
              setTimeFilter('all');
              setSearchQuery('');
            }}
            style={{
              fontSize: '0.8rem',
              color: 'var(--accent-amber)',
              fontWeight: 700,
              textDecoration: 'underline'
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Receipt Masonry Grid */}
      {filteredReceipts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {filteredReceipts.map((receipt) => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onSelect={onSelectReceipt}
              onExploreConnections={onExploreConnections}
            />
          ))}
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px dashed var(--bg-surface-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-12) var(--space-6)',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <Sparkles size={36} style={{ margin: '0 auto 16px', opacity: 0.5, color: 'var(--accent-amber)' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>No matching receipts found</h3>
          <p style={{ maxWidth: '400px', margin: '0 auto 16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Try clearing your search query or switching category filters to uncover more digital moments.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedType('all');
              setTimeFilter('all');
              setSearchQuery('');
            }}
          >
            Show All Receipts
          </button>
        </div>
      )}
    </div>
  );
}
