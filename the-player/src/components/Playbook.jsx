import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_ELEMENTS, ZODIAC_COMPATIBILITY } from '../models/schemas.js';
import { getCycleInfo, getDateRecommendation } from '../utils/cycleTracker.js';
import { generateTextSuggestions, getCommunicationPlaybook } from '../utils/messagingEngine.js';

export default function Playbook({ onNavigate }) {
  const profile = useStore(s => s.getActiveProfile());
  const [copied, setCopied] = useState(null);

  if (!profile) {
    return (
      <div className="empty-state">
        <div className="icon">⚡</div>
        <p>Select someone from the roster first.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('roster')}>Go to Roster</button>
      </div>
    );
  }

  const cycle = profile.lastPeriodStart ? getCycleInfo(profile.lastPeriodStart, profile.cycleLength) : null;
  const dateRec = cycle ? getDateRecommendation(cycle.phase) : null;
  const playbook = getCommunicationPlaybook({
    attachmentStyle: profile.attachmentStyle,
    cyclePhase: cycle?.phase,
    stage: profile.relationshipStage,
  });
  const suggestions = generateTextSuggestions({
    name: profile.name,
    stage: profile.relationshipStage,
    attachmentStyle: profile.attachmentStyle,
    loveLanguages: profile.loveLanguages,
    interests: profile.interests,
    cyclePhase: cycle?.phase,
  });

  // Zodiac compatibility (user's sign would be configurable, default Aries for now)
  const userSign = 'Aries'; // TODO: make configurable in settings
  const userElement = ZODIAC_ELEMENTS[userSign];
  const herElement = profile.zodiacSign ? ZODIAC_ELEMENTS[profile.zodiacSign] : null;
  const compat = herElement ? ZODIAC_COMPATIBILITY[userElement]?.[herElement] : null;

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>PLAYBOOK FOR</div>
        <h2 style={{ fontSize: 20 }}>{profile.name}</h2>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6 }}>
          <span className="tag tag-accent">{profile.relationshipStage}</span>
          {cycle && (
            <span className="tag" style={{ background: cycle.phase.color, color: 'white' }}>
              Day {cycle.cycleDay} — {cycle.phase.label}
            </span>
          )}
          {compat && (
            <span className={`compat-badge compat-${compat}`}>
              {compat === 'high' ? '★' : compat === 'medium' ? '◐' : '○'} {compat} compatibility
            </span>
          )}
        </div>
      </div>

      <div className="section">
        {/* Current Phase Strategy */}
        {cycle && dateRec && (
          <div style={{ marginBottom: 20 }}>
            <div className="section-title">Current Phase Strategy</div>
            <div className="cycle-banner" style={{ borderColor: cycle.phase.color, background: `${cycle.phase.color}10` }}>
              <div className="cycle-day" style={{ color: cycle.phase.color }}>D{cycle.cycleDay}</div>
              <div className="cycle-info">
                <div className="cycle-phase" style={{ color: cycle.phase.color }}>
                  {cycle.phase.label}
                  {cycle.fertile && <span className="tag tag-warning" style={{ marginLeft: 8, fontSize: 10 }}>Fertile</span>}
                </div>
                <div className="cycle-mood">{cycle.phase.mood}</div>
              </div>
            </div>
            <div className="playbook-card">
              <h4>Ideal Date Right Now</h4>
              <p>{dateRec.ideal}</p>
            </div>
            <div className="playbook-card">
              <h4>Texting Approach</h4>
              <p>{dateRec.texting}</p>
            </div>
            <div className="playbook-card" style={{ borderLeft: `3px solid ${cycle.phase.color}` }}>
              <h4>Pro Move</h4>
              <p>{dateRec.tip}</p>
            </div>
          </div>
        )}

        {/* Attachment Playbook */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Communication Playbook</div>
          <div className="playbook-card">
            <h4>Her Vibe: <span style={{ textTransform: 'capitalize' }}>{playbook.tone}</span></h4>
            <p>{playbook.responseTimeAdvice}</p>
          </div>
          <div className="playbook-card">
            <h4>What Works</h4>
            <ul>
              {playbook.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--danger)' }}>
            <h4>Avoid</h4>
            <p>{playbook.avoid}</p>
          </div>
        </div>

        {/* Text Templates */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Ready-to-Send Texts — Tap to Copy</div>
          {suggestions.map((s, i) => (
            <div key={i} className="text-suggestion" onClick={() => copy(s.text, i)}>
              <div className="category">{s.category}</div>
              <div>{copied === i ? '✓ Copied!' : s.text}</div>
            </div>
          ))}
        </div>

        {/* Quick Intel */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Quick Intel</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {profile.loveLanguages?.length > 0 && (
              <div className="playbook-card">
                <h4>Love Languages</h4>
                <p>{profile.loveLanguages.join(', ')}</p>
              </div>
            )}
            {profile.interests?.length > 0 && (
              <div className="playbook-card">
                <h4>Interests</h4>
                <p>{profile.interests.slice(0, 4).join(', ')}</p>
              </div>
            )}
            {profile.values?.length > 0 && (
              <div className="playbook-card">
                <h4>Values</h4>
                <p>{profile.values.slice(0, 4).join(', ')}</p>
              </div>
            )}
            {profile.birthControl && (
              <div className="playbook-card">
                <h4>Birth Control</h4>
                <p>{profile.birthControl}</p>
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-ghost" style={{ width: '100%' }}
          onClick={() => onNavigate('detail')}>
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}
