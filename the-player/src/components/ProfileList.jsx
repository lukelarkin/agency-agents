import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { RELATIONSHIP_STAGES } from '../models/schemas.js';
import { getCycleInfo } from '../utils/cycleTracker.js';

export default function ProfileList({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const setActive = useStore(s => s.setActiveProfile);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? profiles : profiles.filter(p => p.relationshipStage === filter);

  return (
    <div>
      {/* Filter chips */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="chip-grid">
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
        return (
          <div key={p.id} className="card" style={{ cursor: 'pointer' }}
            onClick={() => { setActive(p.id); onNavigate('detail'); }}>
            <div className="card-header">
              <div className="avatar">{p.name?.[0] || '?'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{p.name}{p.age ? `, ${p.age}` : ''}</strong>
                  <span className="tag tag-accent">{p.relationshipStage}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  {p.zodiacSign && <span className="tag tag-outline">{p.zodiacSign}</span>}
                  {p.attachmentStyle && <span className="tag tag-outline">{p.attachmentStyle}</span>}
                  {cycle && (
                    <span style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
                      <span className="phase-dot" style={{ background: cycle.phase.color }} />
                      Day {cycle.cycleDay}
                    </span>
                  )}
                </div>
                {p.interests?.length > 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    {p.interests.slice(0, 3).join(' · ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No profiles found.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('form')}>Add Someone</button>
        </div>
      )}
    </div>
  );
}
