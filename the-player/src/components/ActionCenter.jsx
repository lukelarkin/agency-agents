import React from 'react';
import useStore from '../hooks/useStore.js';
import { RELATIONSHIP_STAGES } from '../models/schemas.js';
import { getCycleInfo } from '../utils/cycleTracker.js';

export default function ActionCenter({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const user = useStore(s => s.user);
  const setActive = useStore(s => s.setActiveProfile);
  const actionItems = useStore(s => s.getActionItems());
  const analytics = useStore(s => s.getAnalytics());
  const depthLevel = useStore(s => s.getDepthLevel());

  const active = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));

  // Peak window: women in ovulatory phase
  const peakWindow = active.filter(p => {
    if (!p.lastPeriodStart) return false;
    const info = getCycleInfo(p.lastPeriodStart, p.cycleLength);
    return info?.phase?.id === 'ovulatory';
  });

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';

  const goToProfile = (id) => {
    setActive(id);
    onNavigate('detail');
  };

  return (
    <div>
      {/* Greeting */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{greeting}, {user.name || 'King'}</div>
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>
          {actionItems.length > 0
            ? `${actionItems.length} thing${actionItems.length > 1 ? 's' : ''} need${actionItems.length === 1 ? 's' : ''} your attention`
            : active.length > 0
              ? 'All clear. Go live your life.'
              : 'Your roster is empty. Time to change that.'}
        </h2>
      </div>

      {/* Quick Stats */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="number">{active.length}</div>
          <div className="label">Active</div>
        </div>
        <div className="stat-box">
          <div className="number">{analytics.totalDates}</div>
          <div className="label">Dates</div>
        </div>
        <div className="stat-box">
          <div className="number">{analytics.connectionScore}</div>
          <div className="label">Score</div>
        </div>
      </div>

      {/* Action Items — The reason to open the app */}
      {actionItems.length > 0 && (
        <div className="section">
          <div className="section-title">Do This Now</div>
          {actionItems.map((item, i) => (
            <div key={i} className="card" style={{
              cursor: 'pointer',
              borderLeft: `3px solid ${item.urgency === 'high' ? 'var(--danger)' : item.urgency === 'medium' ? 'var(--warning)' : 'var(--accent)'}`,
              margin: '0 0 8px',
            }} onClick={() => goToProfile(item.profileId)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 36, height: 36, fontSize: 14 }}>
                  {item.profile.name?.[0] || '?'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.message}</div>
                  <div style={{ fontSize: 12, color: 'var(--accent-light)' }}>{item.action}</div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: item.urgency === 'high' ? 'var(--danger)' : item.urgency === 'medium' ? 'var(--warning)' : 'var(--text-muted)',
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Peak Window */}
      {peakWindow.length > 0 && (
        <div className="section">
          <div className="section-title" style={{ color: 'var(--success)' }}>Peak Window — She's Most Receptive</div>
          {peakWindow.map(p => {
            const info = getCycleInfo(p.lastPeriodStart, p.cycleLength);
            return (
              <div key={p.id} className="card" onClick={() => goToProfile(p.id)}
                style={{ cursor: 'pointer', margin: '0 0 8px', borderColor: info.phase.color }}>
                <div className="card-header" style={{ marginBottom: 0 }}>
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 14, background: info.phase.color }}>
                    {p.name?.[0]}
                  </div>
                  <div>
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: 12, color: info.phase.color }}>
                      Day {info.cycleDay} — Ovulatory · {info.daysLeftInPhase}d left in window
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Roster Quick View */}
      {active.length > 0 && (
        <div className="section">
          <div className="section-title">Active Roster</div>
          {active.map(p => {
            const cycle = p.lastPeriodStart ? getCycleInfo(p.lastPeriodStart, p.cycleLength) : null;
            const contacts = p.contactLog || [];
            const lastContact = contacts.length > 0 ? contacts[contacts.length - 1] : null;
            const lastType = lastContact?.type;
            const herTurn = lastType === 'text_sent' || lastType === 'you_initiated';

            return (
              <div key={p.id} className="card" style={{ cursor: 'pointer', margin: '0 0 8px' }}
                onClick={() => goToProfile(p.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: 15 }}>
                    {p.name?.[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 14 }}>{p.name}</strong>
                      <span className="tag tag-outline" style={{ fontSize: 10 }}>{p.relationshipStage}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center', fontSize: 12 }}>
                      {cycle && (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="phase-dot" style={{ background: cycle.phase.color }} />
                          {cycle.phase.label}
                        </span>
                      )}
                      {lastContact && (
                        <span style={{ color: 'var(--text-muted)' }}>
                          {herTurn ? '· Waiting on her' : '· Your move'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Depth nudge — subtle, never preachy */}
      {depthLevel >= 2 && active.length >= 3 && (
        <div className="section">
          <div className="card" style={{ margin: 0, borderColor: 'var(--accent)', background: 'rgba(108,92,231,0.05)' }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
              {depthLevel >= 3
                ? '"The quality of your life is determined by the depth of your relationships, not the quantity." — Something to sit with.'
                : 'Quick thought: The best players eventually realize the real game isn\'t collecting matches — it\'s finding the one that makes you want to delete this app.'}
            </p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, fontSize: 11 }}
              onClick={() => onNavigate('journal')}>
              Open journal
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {profiles.length === 0 && (
        <div className="empty-state">
          <div className="icon" style={{ fontSize: 48 }}>&#9823;</div>
          <p>No one on your roster yet.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('form')}>Add Someone</button>
        </div>
      )}
    </div>
  );
}
