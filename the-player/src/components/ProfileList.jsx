import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { RELATIONSHIP_STAGES, PLATFORMS } from '../models/schemas.js';
import { getCycleInfo } from '../utils/cycleTracker.js';

export default function ProfileList({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const setActive = useStore(s => s.setActiveProfile);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? profiles : profiles.filter(p => p.relationshipStage === filter);

  return (
    <div>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 20 }}>Roster</h2>
          <button className="btn btn-sm btn-primary" onClick={() => onNavigate('form')}>+ Add</button>
        </div>

        {/* Filter chips */}
        <div className="chip-grid" style={{ marginBottom: 4 }}>
          <span className={`chip ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>
            All ({profiles.length})
          </span>
          {RELATIONSHIP_STAGES.map(s => {
            const count = profiles.filter(p => p.relationshipStage === s).length;
            if (!count) return null;
            return (
              <span key={s} className={`chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                {s} ({count})
              </span>
            );
          })}
        </div>
      </div>

      {/* Profile cards */}
      {filtered.map(p => {
        const cycle = p.lastPeriodStart ? getCycleInfo(p.lastPeriodStart, p.cycleLength) : null;
        const contacts = p.contactLog || [];
        const lastContact = contacts.length > 0 ? contacts[contacts.length - 1] : null;
        const lastType = lastContact?.type;
        const herTurn = lastType === 'text_sent' || lastType === 'you_initiated';

        let timeSince = '';
        if (lastContact) {
          const diff = (Date.now() - new Date(lastContact.timestamp).getTime()) / (1000 * 60 * 60);
          if (diff < 1) timeSince = 'Just now';
          else if (diff < 24) timeSince = `${Math.floor(diff)}h ago`;
          else timeSince = `${Math.floor(diff / 24)}d ago`;
        }

        return (
          <div key={p.id} className="card" style={{ cursor: 'pointer' }}
            onClick={() => { setActive(p.id); onNavigate('detail'); }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar" style={{
                width: 44, height: 44, fontSize: 16,
                background: cycle ? cycle.phase.color : undefined,
              }}>
                {p.name?.[0] || '?'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 15 }}>{p.name}</strong>
                    {p.age && <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>, {p.age}</span>}
                  </div>
                  <span className="tag tag-outline" style={{ fontSize: 10 }}>{p.relationshipStage}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                  {cycle && (
                    <span style={{ fontSize: 11, display: 'flex', alignItems: 'center' }}>
                      <span className="phase-dot" style={{ background: cycle.phase.color }} />
                      {cycle.phase.label} D{cycle.cycleDay}
                    </span>
                  )}
                  {p.zodiacSign && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.zodiacSign}</span>}
                  {p.attachmentStyle && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.attachmentStyle}</span>}
                </div>
                {lastContact && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {herTurn ? 'Waiting on her' : 'Your move'} · {timeSince}
                    {lastContact.platform && (() => {
                      const plat = PLATFORMS.find(pl => pl.id === lastContact.platform);
                      return plat ? ` · ${plat.icon} ${plat.label}` : '';
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>{profiles.length === 0 ? 'No one on the roster yet.' : 'No profiles match this filter.'}</p>
          {profiles.length === 0 && (
            <button className="btn btn-primary" onClick={() => onNavigate('form')}>Add Someone</button>
          )}
        </div>
      )}
    </div>
  );
}
