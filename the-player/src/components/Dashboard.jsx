import React from 'react';
import useStore from '../hooks/useStore.js';
import { RELATIONSHIP_STAGES, ZODIAC_ELEMENTS, ZODIAC_COMPATIBILITY } from '../models/schemas.js';
import { getCycleInfo } from '../utils/cycleTracker.js';

export default function Dashboard({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const setActive = useStore(s => s.setActiveProfile);

  const stageCounts = RELATIONSHIP_STAGES.reduce((acc, s) => {
    acc[s] = profiles.filter(p => p.relationshipStage === s).length;
    return acc;
  }, {});

  const active = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));

  // Find profiles in ovulatory phase (peak window)
  const peakWindow = active.filter(p => {
    if (!p.lastPeriodStart) return false;
    const info = getCycleInfo(p.lastPeriodStart, p.cycleLength);
    return info?.phase?.id === 'ovulatory';
  });

  return (
    <div>
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="number">{active.length}</div>
          <div className="label">Active</div>
        </div>
        <div className="stat-box">
          <div className="number">{stageCounts.Dating || 0}</div>
          <div className="label">Dating</div>
        </div>
        <div className="stat-box">
          <div className="number">{peakWindow.length}</div>
          <div className="label">Peak Window</div>
        </div>
      </div>

      {/* Peak window alerts */}
      {peakWindow.length > 0 && (
        <div className="section">
          <div className="section-title">Peak Window — Make Your Move</div>
          {peakWindow.map(p => {
            const info = getCycleInfo(p.lastPeriodStart, p.cycleLength);
            return (
              <div key={p.id} className="card" onClick={() => { setActive(p.id); onNavigate('detail'); }}
                style={{ borderColor: info.phase.color, cursor: 'pointer' }}>
                <div className="card-header">
                  <div className="avatar">{p.name?.[0] || '?'}</div>
                  <div>
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: 12, color: 'var(--success)' }}>
                      Day {info.cycleDay} — Ovulatory phase
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pipeline by stage */}
      <div className="section">
        <div className="section-title">Pipeline</div>
        {RELATIONSHIP_STAGES.filter(s => s !== 'Archived').map(stage => {
          const stageProfiles = profiles.filter(p => p.relationshipStage === stage);
          if (!stageProfiles.length) return null;
          return (
            <div key={stage} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>
                {stage.toUpperCase()} ({stageProfiles.length})
              </div>
              {stageProfiles.map(p => (
                <div key={p.id} className="card" style={{ cursor: 'pointer' }}
                  onClick={() => { setActive(p.id); onNavigate('detail'); }}>
                  <div className="card-header">
                    <div className="avatar">{p.name?.[0] || '?'}</div>
                    <div style={{ flex: 1 }}>
                      <strong>{p.name}</strong>
                      {p.nickname && <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: 13 }}>"{p.nickname}"</span>}
                      <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                        {p.zodiacSign && <span className="tag tag-outline">{p.zodiacSign}</span>}
                        {p.attachmentStyle && <span className="tag tag-outline">{p.attachmentStyle}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {profiles.length === 0 && (
        <div className="empty-state">
          <div className="icon">♟</div>
          <p>Your roster is empty. Add someone to get started.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('form')}>Add First Profile</button>
        </div>
      )}
    </div>
  );
}
