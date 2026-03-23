import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_ELEMENTS, ZODIAC_COMPATIBILITY, ATTACHMENT_STYLES, CYCLE_PHASES } from '../models/schemas.js';
import { getCycleInfo, getDateRecommendation } from '../utils/cycleTracker.js';
import { generateTextSuggestions, getCommunicationPlaybook } from '../utils/messagingEngine.js';

export default function ProfileDetail({ onNavigate }) {
  const profile = useStore(s => s.getActiveProfile());
  const updateProfile = useStore(s => s.updateProfile);
  const deleteProfile = useStore(s => s.deleteProfile);
  const addDateEntry = useStore(s => s.addDateEntry);
  const [tab, setTab] = useState('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!profile) {
    return (
      <div className="empty-state">
        <p>Select a profile from the roster.</p>
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
  const textSuggestions = generateTextSuggestions({
    name: profile.name,
    stage: profile.relationshipStage,
    attachmentStyle: profile.attachmentStyle,
    loveLanguages: profile.loveLanguages,
    interests: profile.interests,
    cyclePhase: cycle?.phase,
  });

  const handleDelete = () => {
    deleteProfile(profile.id);
    onNavigate('roster');
  };

  return (
    <div>
      {/* Profile header */}
      <div style={{ padding: '20px 16px', textAlign: 'center' }}>
        <div className="avatar avatar-lg" style={{ margin: '0 auto 12px' }}>
          {profile.name?.[0] || '?'}
        </div>
        <h2 style={{ fontSize: 22 }}>{profile.name}{profile.age ? `, ${profile.age}` : ''}</h2>
        {profile.nickname && <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>"{profile.nickname}"</div>}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
          <span className="tag tag-accent">{profile.relationshipStage}</span>
          {profile.zodiacSign && <span className="tag tag-outline">{profile.zodiacSign}</span>}
          {profile.attachmentStyle && <span className="tag tag-outline">{profile.attachmentStyle}</span>}
          {profile.birthControl && profile.birthControl !== 'None' && (
            <span className="tag tag-outline">{profile.birthControl}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('form', { editId: profile.id })}>Edit</button>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('playbook')}>Playbook</button>
          {!showDeleteConfirm ? (
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}
              onClick={() => setShowDeleteConfirm(true)}>Delete</button>
          ) : (
            <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white' }}
              onClick={handleDelete}>Confirm Delete</button>
          )}
        </div>
      </div>

      {/* Cycle banner */}
      {cycle && (
        <div className="cycle-banner" style={{ borderColor: cycle.phase.color, background: `${cycle.phase.color}10` }}>
          <div className="cycle-day" style={{ color: cycle.phase.color }}>D{cycle.cycleDay}</div>
          <div className="cycle-info">
            <div className="cycle-phase" style={{ color: cycle.phase.color }}>
              {cycle.phase.label} Phase
              {cycle.fertile && <span className="tag tag-warning" style={{ marginLeft: 8 }}>Fertile Window</span>}
            </div>
            <div className="cycle-mood">{cycle.phase.mood}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              {cycle.daysLeftInPhase}d left · Next period ~{cycle.nextPeriodDate}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', margin: '0 16px' }}>
        {['overview', 'intel', 'texts', 'dates'].map(t => (
          <button key={t} className={`nav-item ${tab === t ? 'active' : ''}`}
            style={{ borderBottom: tab === t ? '2px solid var(--accent)' : 'none', fontSize: 12 }}
            onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="section">
        {tab === 'overview' && <OverviewTab profile={profile} cycle={cycle} dateRec={dateRec} />}
        {tab === 'intel' && <IntelTab profile={profile} playbook={playbook} />}
        {tab === 'texts' && <TextsTab suggestions={textSuggestions} playbook={playbook} />}
        {tab === 'dates' && <DatesTab profile={profile} addDateEntry={addDateEntry} />}
      </div>
    </div>
  );
}

function OverviewTab({ profile, cycle, dateRec }) {
  return (
    <>
      {/* Values */}
      {profile.values?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Core Values</div>
          <div className="chip-grid">
            {profile.values.map(v => <span key={v} className="chip active">{v}</span>)}
          </div>
        </div>
      )}

      {/* Interests */}
      {profile.interests?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Interests</div>
          <div className="chip-grid">
            {profile.interests.map(i => <span key={i} className="chip">{i}</span>)}
          </div>
        </div>
      )}

      {/* Love Languages */}
      {profile.loveLanguages?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Love Languages</div>
          <div className="chip-grid">
            {profile.loveLanguages.map(l => <span key={l} className="chip active">{l}</span>)}
          </div>
        </div>
      )}

      {/* Family Dynamics */}
      {profile.familyDynamics?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Family Dynamics</div>
          <div className="chip-grid">
            {profile.familyDynamics.map(f => <span key={f} className="chip">{f}</span>)}
          </div>
        </div>
      )}

      {/* Date recommendation based on cycle */}
      {dateRec && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Recommended Date Plan</div>
          <div className="playbook-card">
            <h4>Ideal Date</h4>
            <p>{dateRec.ideal}</p>
          </div>
          <div className="playbook-card">
            <h4>Pro Tip</h4>
            <p>{dateRec.tip}</p>
          </div>
        </div>
      )}

      {/* Notes */}
      {profile.notes && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Notes</div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{profile.notes}</p>
        </div>
      )}

      {profile.metOn && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Met on: {profile.metOn}
        </div>
      )}
    </>
  );
}

function IntelTab({ profile, playbook }) {
  const attachmentInfo = ATTACHMENT_STYLES.find(a => a.id === profile.attachmentStyle);

  return (
    <>
      {/* Attachment style deep dive */}
      {attachmentInfo && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Attachment Style — {attachmentInfo.label}</div>
          <div className="playbook-card">
            <p>{attachmentInfo.description}</p>
          </div>
          <div className="playbook-card">
            <h4>Communication Tone</h4>
            <p style={{ textTransform: 'capitalize' }}>{playbook.tone}</p>
          </div>
          <div className="playbook-card">
            <h4>What Works</h4>
            <ul>
              {playbook.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="playbook-card">
            <h4>What to Avoid</h4>
            <p>{playbook.avoid}</p>
          </div>
          <div className="playbook-card">
            <h4>Response Time</h4>
            <p>{playbook.responseTimeAdvice}</p>
          </div>
        </div>
      )}

      {/* Zodiac */}
      {profile.zodiacSign && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Astrology</div>
          <div className="playbook-card">
            <h4>{profile.zodiacSign}</h4>
            <p>Element: {ZODIAC_ELEMENTS[profile.zodiacSign]}</p>
          </div>
        </div>
      )}

      {/* Birth control */}
      {profile.birthControl && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Birth Control</div>
          <div className="playbook-card">
            <p>{profile.birthControl}</p>
          </div>
        </div>
      )}

      {/* Phase guidance */}
      {playbook.phaseGuidance && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Current Phase Guidance</div>
          <div className="playbook-card">
            <p>{playbook.phaseGuidance}</p>
          </div>
        </div>
      )}
    </>
  );
}

function TextsTab({ suggestions, playbook }) {
  const [copied, setCopied] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div className="section-title">Phase Texting Guide</div>
        <div className="playbook-card">
          <p>{playbook.phaseGuidance}</p>
        </div>
      </div>

      <div className="section-title">Text Suggestions — Tap to Copy</div>
      {suggestions.map((s, i) => (
        <div key={i} className="text-suggestion" onClick={() => copy(s.text, i)}>
          <div className="category">{s.category}</div>
          <div>{copied === i ? '✓ Copied!' : s.text}</div>
        </div>
      ))}
    </>
  );
}

function DatesTab({ profile, addDateEntry }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: '', location: '', activity: '', howItWent: 3, notes: '', nextMoveNote: '' });

  const handleAdd = () => {
    addDateEntry(profile.id, form);
    setForm({ date: '', location: '', activity: '', howItWent: 3, notes: '', nextMoveNote: '' });
    setAdding(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="section-title" style={{ margin: 0 }}>Date Log ({profile.dateLog?.length || 0})</div>
        <button className="btn btn-sm btn-primary" onClick={() => setAdding(!adding)}>
          {adding ? 'Cancel' : '+ Log Date'}
        </button>
      </div>

      {adding && (
        <div className="card" style={{ margin: '0 0 12px' }}>
          <div className="form-group">
            <label>Date</label>
            <input className="input" type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="input" value={form.location} placeholder="Where?"
              onChange={e => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Activity</label>
            <input className="input" value={form.activity} placeholder="What did you do?"
              onChange={e => setForm({ ...form, activity: e.target.value })} />
          </div>
          <div className="form-group">
            <label>How It Went</label>
            <div className="rating">
              {[1,2,3,4,5].map(n => (
                <span key={n} className={`star ${n <= form.howItWent ? 'filled' : ''}`}
                  onClick={() => setForm({ ...form, howItWent: n })}>★</span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea className="textarea" value={form.notes} placeholder="How did it go? Key moments?"
              onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Next Move</label>
            <input className="input" value={form.nextMoveNote} placeholder="What's the plan next?"
              onChange={e => setForm({ ...form, nextMoveNote: e.target.value })} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAdd}>Save Date</button>
        </div>
      )}

      {(profile.dateLog || []).slice().reverse().map(d => (
        <div key={d.id} className="card" style={{ margin: '0 0 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <strong style={{ fontSize: 14 }}>{d.activity || 'Date'}</strong>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.date}</span>
          </div>
          {d.location && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.location}</div>}
          <div className="rating" style={{ margin: '4px 0' }}>
            {[1,2,3,4,5].map(n => (
              <span key={n} className={`star ${n <= d.howItWent ? 'filled' : ''}`} style={{ fontSize: 14, cursor: 'default' }}>★</span>
            ))}
          </div>
          {d.notes && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{d.notes}</div>}
          {d.nextMoveNote && (
            <div style={{ fontSize: 12, color: 'var(--accent-light)', marginTop: 4 }}>
              Next: {d.nextMoveNote}
            </div>
          )}
        </div>
      ))}

      {(!profile.dateLog || profile.dateLog.length === 0) && !adding && (
        <div className="empty-state" style={{ padding: 24 }}>
          <p>No dates logged yet.</p>
        </div>
      )}
    </>
  );
}
