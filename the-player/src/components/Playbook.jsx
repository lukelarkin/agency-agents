import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_ELEMENTS, ZODIAC_COMPATIBILITY, ZODIAC_TRAITS } from '../models/schemas.js';
import { getCycleInfo } from '../utils/cycleTracker.js';
import { generateTextSuggestions, getCommunicationPlaybook, getPreDateBriefing } from '../utils/messagingEngine.js';

export default function Playbook({ onNavigate }) {
  const profile = useStore(s => s.getActiveProfile());
  const user = useStore(s => s.user);
  const [copied, setCopied] = useState(null);

  if (!profile) {
    return (
      <div className="empty-state">
        <p>Select someone from the roster first.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('roster')}>Go to Roster</button>
      </div>
    );
  }

  const cycle = profile.lastPeriodStart ? getCycleInfo(profile.lastPeriodStart, profile.cycleLength) : null;
  const playbook = getCommunicationPlaybook({
    attachmentStyle: profile.attachmentStyle,
    cyclePhase: cycle?.phase,
    stage: profile.relationshipStage,
    contactHistory: profile.contactLog,
  });
  const briefing = getPreDateBriefing(profile, cycle ? { phase: cycle.phase, cycleDay: cycle.cycleDay } : null);
  const suggestions = generateTextSuggestions({
    name: profile.name,
    userName: user.name,
    stage: profile.relationshipStage,
    attachmentStyle: profile.attachmentStyle,
    loveLanguages: profile.loveLanguages,
    interests: profile.interests,
    cyclePhase: cycle?.phase,
    contactHistory: profile.contactLog,
    importantDetails: profile.importantDetails,
  });

  const userElement = user.zodiacSign ? ZODIAC_ELEMENTS[user.zodiacSign] : null;
  const herElement = profile.zodiacSign ? ZODIAC_ELEMENTS[profile.zodiacSign] : null;
  const compat = userElement && herElement ? ZODIAC_COMPATIBILITY[userElement]?.[herElement] : null;
  const zodiacTraits = profile.zodiacSign ? ZODIAC_TRAITS[profile.zodiacSign] : null;

  const copy = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Game Plan</div>
        <h2 style={{ fontSize: 22 }}>{profile.name}</h2>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
          <span className="tag tag-accent">{profile.relationshipStage}</span>
          {cycle && (
            <span className="tag" style={{ background: cycle.phase.color, color: 'white' }}>
              {cycle.phase.emoji} Day {cycle.cycleDay}
            </span>
          )}
          {compat && <span className={`compat-badge compat-${compat}`}>{compat} match</span>}
        </div>
      </div>

      <div className="section">
        {/* Quick Brief */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Quick Brief</div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--accent)' }}>
            {briefing.quickFacts.map((f, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 3 }}>• {f}</div>
            ))}
            {briefing.remember.length > 0 && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 700 }}>DON'T FORGET</div>
                {briefing.remember.map((r, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--text-primary)' }}>• {r}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phase Strategy */}
        {cycle && (
          <div style={{ marginBottom: 20 }}>
            <div className="section-title">Phase Strategy — {cycle.phase.label}</div>
            <div className="cycle-banner" style={{ borderColor: cycle.phase.color, background: `${cycle.phase.color}10`, margin: '0 0 10px' }}>
              <div className="cycle-day" style={{ color: cycle.phase.color }}>D{cycle.cycleDay}</div>
              <div className="cycle-info">
                <div className="cycle-phase" style={{ color: cycle.phase.color }}>{cycle.phase.label}</div>
                <div className="cycle-mood">{cycle.phase.mood}</div>
              </div>
            </div>
            <div className="playbook-card">
              <h4>Date Approach</h4>
              <p>{playbook.phaseDateMove}</p>
            </div>
            <div className="playbook-card">
              <h4>Texting Style</h4>
              <p>{playbook.phaseTextStyle}</p>
            </div>
            <div className="playbook-card" style={{ borderLeft: `3px solid ${cycle.phase.color}` }}>
              <h4>Pro Move</h4>
              <p>{playbook.phaseProtip}</p>
            </div>
          </div>
        )}

        {/* Communication Playbook */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Communication</div>
          <div className="playbook-card">
            <h4>Her Vibe: {playbook.tone}</h4>
            <p>{playbook.responseTime}</p>
          </div>
          <div className="playbook-card">
            <h4>What Works</h4>
            <ul style={{ margin: 0 }}>
              {playbook.principles.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="playbook-card">
            <h4>How to Escalate</h4>
            <p>{playbook.escalation}</p>
          </div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--danger)' }}>
            <h4>Don't Do This</h4>
            <p>{playbook.avoid}</p>
          </div>
        </div>

        {/* What She's Attracted To (zodiac) */}
        {zodiacTraits && (
          <div style={{ marginBottom: 20 }}>
            <div className="section-title">{profile.zodiacSign} — What She Wants</div>
            <div className="playbook-card" style={{ borderLeft: '3px solid var(--success)' }}>
              <h4>Attracted To</h4>
              <p>{zodiacTraits.attracted_to}</p>
            </div>
            <div className="playbook-card">
              <h4>Her Strengths</h4>
              <p>{zodiacTraits.strengths}</p>
            </div>
            <div className="playbook-card">
              <h4>Watch For</h4>
              <p>{zodiacTraits.weaknesses}</p>
            </div>
          </div>
        )}

        {/* Ready Texts */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">Ready to Send — Tap to Copy</div>
          {suggestions.slice(0, 12).map((s, i) => (
            <div key={i} className="text-suggestion" onClick={() => copy(s.text, i)}>
              <div className="category">{s.category}{s.tone ? ` · ${s.tone}` : ''}</div>
              <div>{copied === i ? '✓ Copied!' : s.text}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => onNavigate('detail')}>
          Back to {profile.name}
        </button>
      </div>
    </div>
  );
}
