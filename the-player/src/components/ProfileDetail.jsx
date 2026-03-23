import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_ELEMENTS, ZODIAC_COMPATIBILITY, ZODIAC_TRAITS, ATTACHMENT_STYLES, CONTACT_TYPES, PLATFORMS } from '../models/schemas.js';
import { getCycleInfo, getDateRecommendation } from '../utils/cycleTracker.js';
import { generateTextSuggestions, getCommunicationPlaybook, getPreDateBriefing } from '../utils/messagingEngine.js';

export default function ProfileDetail({ onNavigate }) {
  const profile = useStore(s => s.getActiveProfile());
  const user = useStore(s => s.user);
  const updateProfile = useStore(s => s.updateProfile);
  const deleteProfile = useStore(s => s.deleteProfile);
  const logContact = useStore(s => s.logContact);
  const addDateEntry = useStore(s => s.addDateEntry);
  const addDetail = useStore(s => s.addDetail);
  const removeDetail = useStore(s => s.removeDetail);
  const [tab, setTab] = useState('actions');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [logPlatform, setLogPlatform] = useState('');

  if (!profile) {
    return (
      <div className="empty-state">
        <p>Select a profile from the roster.</p>
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

  // Zodiac compatibility
  const userElement = user.zodiacSign ? ZODIAC_ELEMENTS[user.zodiacSign] : null;
  const herElement = profile.zodiacSign ? ZODIAC_ELEMENTS[profile.zodiacSign] : null;
  const compat = userElement && herElement ? ZODIAC_COMPATIBILITY[userElement]?.[herElement] : null;

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '20px 16px 12px', textAlign: 'center' }}>
        <div className="avatar avatar-lg" style={{ margin: '0 auto 10px' }}>
          {profile.name?.[0] || '?'}
        </div>
        <h2 style={{ fontSize: 22 }}>{profile.name}{profile.age ? `, ${profile.age}` : ''}</h2>
        {profile.nickname && <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>"{profile.nickname}"</div>}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
          <span className="tag tag-accent">{profile.relationshipStage}</span>
          {profile.zodiacSign && <span className="tag tag-outline">{profile.zodiacSign}</span>}
          {profile.attachmentStyle && (
            <span className="tag tag-outline">
              {ATTACHMENT_STYLES.find(a => a.id === profile.attachmentStyle)?.emoji} {profile.attachmentStyle}
            </span>
          )}
          {compat && <span className={`compat-badge compat-${compat}`}>{compat} match</span>}
        </div>
        {/* Platform badges */}
        {profile.activePlatforms?.length > 0 && (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
            {profile.activePlatforms.map(pid => {
              const plat = PLATFORMS.find(p => p.id === pid);
              if (!plat) return null;
              const isPrimary = profile.primaryPlatform === pid;
              return (
                <span key={pid} style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 10,
                  background: isPrimary ? 'var(--accent)' : 'var(--bg-hover)',
                  color: isPrimary ? 'white' : 'var(--text-secondary)',
                  border: isPrimary ? 'none' : '1px solid var(--border)',
                }}>
                  {plat.icon} {plat.label}{isPrimary ? ' (main)' : ''}
                </span>
              );
            })}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('form', { editId: profile.id })}>Edit</button>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('playbook')}>Playbook</button>
          {!showDeleteConfirm ? (
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}
              onClick={() => setShowDeleteConfirm(true)}>Archive</button>
          ) : (
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white' }}
                onClick={() => { updateProfile(profile.id, { relationshipStage: 'Archived' }); onNavigate('roster'); }}>Archive</button>
              <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white' }}
                onClick={() => { deleteProfile(profile.id); onNavigate('roster'); }}>Delete</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Cycle Banner */}
      {cycle && (
        <div className="cycle-banner" style={{ borderColor: cycle.phase.color, background: `${cycle.phase.color}10` }}>
          <div className="cycle-day" style={{ color: cycle.phase.color }}>D{cycle.cycleDay}</div>
          <div className="cycle-info">
            <div className="cycle-phase" style={{ color: cycle.phase.color }}>
              {cycle.phase.emoji} {cycle.phase.label} Phase
              {cycle.fertile && <span className="tag tag-warning" style={{ marginLeft: 6 }}>Fertile</span>}
            </div>
            <div className="cycle-mood">{cycle.phase.mood}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              {cycle.daysLeftInPhase}d left · Next period ~{cycle.nextPeriodDate}
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact Log */}
      <div className="section" style={{ paddingBottom: 8 }}>
        <div className="section-title">Quick Log</div>
        {/* Platform select for logging */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {(profile.activePlatforms?.length > 0
            ? PLATFORMS.filter(p => profile.activePlatforms.includes(p.id))
            : PLATFORMS.filter(p => ['imessage', 'snapchat', 'instagram'].includes(p.id))
          ).map(plat => (
            <span key={plat.id} className={`chip ${logPlatform === plat.id ? 'active' : ''}`}
              style={{ fontSize: 11, padding: '2px 8px' }}
              onClick={() => setLogPlatform(logPlatform === plat.id ? '' : plat.id)}>
              {plat.icon} {plat.label}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CONTACT_TYPES.map(ct => (
            <button key={ct.id} className="btn btn-ghost btn-sm"
              style={{ fontSize: 12 }}
              onClick={() => logContact(profile.id, ct.id, '', logPlatform || profile.primaryPlatform || '')}>
              {ct.icon} {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', margin: '0 16px', overflowX: 'auto' }}>
        {['actions', 'intel', 'texts', 'dates', 'details'].map(t => (
          <button key={t} className={`nav-item ${tab === t ? 'active' : ''}`}
            style={{ borderBottom: tab === t ? '2px solid var(--accent)' : 'none', fontSize: 11, whiteSpace: 'nowrap' }}
            onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="section">
        {tab === 'actions' && <ActionsTab profile={profile} cycle={cycle} playbook={playbook} user={user} onNavigate={onNavigate} />}
        {tab === 'intel' && <IntelTab profile={profile} playbook={playbook} compat={compat} user={user} />}
        {tab === 'texts' && <TextsTab profile={profile} cycle={cycle} user={user} />}
        {tab === 'dates' && <DatesTab profile={profile} addDateEntry={addDateEntry} />}
        {tab === 'details' && <DetailsTab profile={profile} addDetail={addDetail} removeDetail={removeDetail} />}
      </div>
    </div>
  );
}

function ActionsTab({ profile, cycle, playbook, user, onNavigate }) {
  const briefing = getPreDateBriefing(profile, cycle ? { phase: cycle.phase, cycleDay: cycle.cycleDay } : null);
  const contacts = profile.contactLog || [];
  const recentContacts = contacts.slice(-10).reverse();

  return (
    <>
      {/* Pre-date cheat sheet */}
      <div style={{ marginBottom: 16 }}>
        <div className="section-title">Before-Date Cheat Sheet</div>
        <div className="playbook-card" style={{ borderLeft: '3px solid var(--accent)' }}>
          {briefing.quickFacts.map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>• {f}</div>
          ))}
          {briefing.remember.length > 0 && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--accent-light)', fontWeight: 700, marginBottom: 4 }}>REMEMBER</div>
              {briefing.remember.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: 'var(--text-primary)' }}>• {r}</div>
              ))}
            </div>
          )}
        </div>
        {briefing.dateVibe && (
          <div className="playbook-card">
            <h4>Ideal Date Right Now</h4>
            <p>{briefing.dateVibe}</p>
          </div>
        )}
        <div className="playbook-card">
          <h4>Communication Approach</h4>
          <p>{playbook.phaseTextStyle || 'Be genuine and present.'}</p>
        </div>
      </div>

      {/* Recent Activity */}
      {recentContacts.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Recent Activity</div>
          {recentContacts.map((c, i) => {
            const ct = { text_sent: '→ You texted', text_received: '← She texted', call: '📞 Call',
              date: '📍 Date', hookup: '🔥 Hookup', she_initiated: '⭐ She initiated',
              you_initiated: '🎯 You initiated', left_on_read: '👻 Left on read', ghosted: '💀 Ghosted' };
            const timeAgo = getTimeAgo(c.timestamp);
            const plat = c.platform ? PLATFORMS.find(p => p.id === c.platform) : null;
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13 }}>
                  {ct[c.type] || c.type}
                  {plat && <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>on {plat.icon} {plat.label}</span>}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{timeAgo}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick interests/values */}
      {profile.interests?.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div className="section-title">Her Interests</div>
          <div className="chip-grid">
            {profile.interests.map(i => <span key={i} className="chip" style={{ fontSize: 12 }}>{i}</span>)}
          </div>
        </div>
      )}
      {profile.values?.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div className="section-title">Her Values</div>
          <div className="chip-grid">
            {profile.values.map(v => <span key={v} className="chip active" style={{ fontSize: 12 }}>{v}</span>)}
          </div>
        </div>
      )}

      {profile.notes && (
        <div style={{ marginBottom: 12 }}>
          <div className="section-title">Notes</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{profile.notes}</p>
        </div>
      )}
    </>
  );
}

function IntelTab({ profile, playbook, compat, user }) {
  const attachmentInfo = ATTACHMENT_STYLES.find(a => a.id === profile.attachmentStyle);
  const zodiacTraits = profile.zodiacSign ? ZODIAC_TRAITS[profile.zodiacSign] : null;

  return (
    <>
      {/* Attachment Deep Dive */}
      {attachmentInfo && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">{attachmentInfo.emoji} {attachmentInfo.label} Attachment</div>
          <div className="playbook-card">
            <h4>How She's Wired</h4>
            <p>{attachmentInfo.description}</p>
          </div>
          <div className="playbook-card">
            <h4>Your Tone</h4>
            <p>{playbook.tone}</p>
          </div>
          <div className="playbook-card">
            <h4>Response Timing</h4>
            <p>{playbook.responseTime}</p>
          </div>
          <div className="playbook-card">
            <h4>What Works</h4>
            <ul style={{ margin: 0 }}>
              {playbook.principles.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="playbook-card">
            <h4>How to Escalate</h4>
            <p>{playbook.escalation}</p>
          </div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--danger)' }}>
            <h4>Avoid</h4>
            <p>{playbook.avoid}</p>
          </div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--warning)' }}>
            <h4>Red Flags to Watch</h4>
            <p>{playbook.redFlags}</p>
          </div>
        </div>
      )}

      {/* Zodiac Intel */}
      {zodiacTraits && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">{profile.zodiacSign} ({ZODIAC_ELEMENTS[profile.zodiacSign]})</div>
          <div className="playbook-card">
            <h4>Strengths</h4>
            <p>{zodiacTraits.strengths}</p>
          </div>
          <div className="playbook-card">
            <h4>Watch Out For</h4>
            <p>{zodiacTraits.weaknesses}</p>
          </div>
          <div className="playbook-card" style={{ borderLeft: '3px solid var(--success)' }}>
            <h4>She's Attracted To</h4>
            <p>{zodiacTraits.attracted_to}</p>
          </div>
          {compat && (
            <div className="playbook-card">
              <h4>Your Compatibility ({user.zodiacSign} × {profile.zodiacSign})</h4>
              <p>
                <span className={`compat-badge compat-${compat}`} style={{ marginRight: 8 }}>{compat}</span>
                {compat === 'high' ? 'Natural chemistry. Your elements feed each other.' :
                 compat === 'medium' ? 'Workable. Different energies that can balance or clash.' :
                 'Challenging pairing. Takes intentional effort to bridge the gap.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Family Dynamics */}
      {profile.familyDynamics?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Family Intel</div>
          <div className="chip-grid">
            {profile.familyDynamics.map(f => <span key={f} className="chip">{f}</span>)}
          </div>
        </div>
      )}

      {/* Birth Control */}
      {profile.birthControl && profile.birthControl !== 'None' && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Birth Control</div>
          <div className="playbook-card"><p>{profile.birthControl}</p></div>
        </div>
      )}

      {/* Phase intel */}
      {playbook.phaseProtip && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Current Phase Intel</div>
          <div className="playbook-card">
            <h4>Energy Level: {playbook.phaseEnergy}</h4>
            <p>{playbook.phaseProtip}</p>
          </div>
        </div>
      )}
    </>
  );
}

function TextsTab({ profile, cycle, user }) {
  const [copied, setCopied] = useState(null);

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

  const copy = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  // Group by category
  const grouped = {};
  suggestions.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Texts are context-aware: her attachment style, current cycle phase, your contact history, and her love languages. Tap to copy.
        </p>
      </div>

      {Object.entries(grouped).map(([category, texts]) => (
        <div key={category} style={{ marginBottom: 16 }}>
          <div className="section-title">{category}</div>
          {texts.map((s, i) => {
            const globalIdx = suggestions.indexOf(s);
            return (
              <div key={i} className="text-suggestion" onClick={() => copy(s.text, globalIdx)}>
                {s.tone && <div className="category">{s.tone}</div>}
                <div>{copied === globalIdx ? '✓ Copied!' : s.text}</div>
              </div>
            );
          })}
        </div>
      ))}

      {suggestions.length === 0 && (
        <div className="empty-state" style={{ padding: 24 }}>
          <p>Add more profile details to unlock personalized texts.</p>
        </div>
      )}
    </>
  );
}

function DatesTab({ profile, addDateEntry }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: '', location: '', activity: '', howItWent: 3, vibe: 3, notes: '', nextMoveNote: '' });

  const handleAdd = () => {
    if (!form.date) return;
    addDateEntry(profile.id, form);
    setForm({ date: '', location: '', activity: '', howItWent: 3, vibe: 3, notes: '', nextMoveNote: '' });
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
            <label>What'd you do?</label>
            <input className="input" value={form.activity} placeholder="Dinner, drinks, hike..."
              onChange={e => setForm({ ...form, activity: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Where?</label>
            <input className="input" value={form.location} placeholder="Location"
              onChange={e => setForm({ ...form, location: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>How it went</label>
              <div className="rating">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={`star ${n <= form.howItWent ? 'filled' : ''}`}
                    onClick={() => setForm({ ...form, howItWent: n })}>★</span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Connection vibe</label>
              <div className="rating">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={`star ${n <= form.vibe ? 'filled' : ''}`}
                    style={{ color: n <= form.vibe ? 'var(--accent-light)' : undefined }}
                    onClick={() => setForm({ ...form, vibe: n })}>◆</span>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea className="textarea" value={form.notes} placeholder="Key moments, what worked, what didn't..."
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <strong style={{ fontSize: 14 }}>{d.activity || 'Date'}</strong>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.date}</span>
          </div>
          {d.location && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.location}</div>}
          <div style={{ display: 'flex', gap: 12, margin: '6px 0' }}>
            <div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Quality </span>
              {[1,2,3,4,5].map(n => (
                <span key={n} style={{ fontSize: 12, color: n <= d.howItWent ? 'var(--warning)' : 'var(--text-muted)' }}>★</span>
              ))}
            </div>
            {d.vibe && (
              <div>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Vibe </span>
                {[1,2,3,4,5].map(n => (
                  <span key={n} style={{ fontSize: 12, color: n <= d.vibe ? 'var(--accent-light)' : 'var(--text-muted)' }}>◆</span>
                ))}
              </div>
            )}
          </div>
          {d.notes && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{d.notes}</div>}
          {d.nextMoveNote && (
            <div style={{ fontSize: 12, color: 'var(--accent-light)', marginTop: 4 }}>Next: {d.nextMoveNote}</div>
          )}
        </div>
      ))}

      {(!profile.dateLog || profile.dateLog.length === 0) && !adding && (
        <div className="empty-state" style={{ padding: 24 }}>
          <p>No dates logged yet. After you see her, log it here.</p>
        </div>
      )}
    </>
  );
}

function DetailsTab({ profile, addDetail, removeDetail }) {
  const [newDetail, setNewDetail] = useState('');

  const handleAdd = () => {
    if (!newDetail.trim()) return;
    addDetail(profile.id, newDetail.trim());
    setNewDetail('');
  };

  const details = profile.importantDetails || [];

  return (
    <>
      <div className="section-title">Important Details</div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
        Her dog's name. Her favorite drink. The inside joke. Things that make you look like you actually listen.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input className="input" value={newDetail} placeholder="Add a detail..."
          style={{ flex: 1 }}
          onChange={e => setNewDetail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button>
      </div>

      {details.map(d => (
        <div key={d.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 12px', marginBottom: 6,
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
        }}>
          <span style={{ fontSize: 14 }}>{d.text}</span>
          <button className="btn-icon" style={{ width: 24, height: 24, fontSize: 12, flexShrink: 0 }}
            onClick={() => removeDetail(profile.id, d.id)}>×</button>
        </div>
      ))}

      {details.length === 0 && (
        <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13 }}>
          No details yet. The little things win the big games.
        </div>
      )}

      {/* Love languages */}
      {profile.loveLanguages?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="section-title">Her Love Languages</div>
          <div className="chip-grid">
            {profile.loveLanguages.map(l => <span key={l} className="chip active">{l}</span>)}
          </div>
        </div>
      )}

      {profile.metOn && (
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Met on: {profile.metOn}
          {profile.metDetails && ` — ${profile.metDetails}`}
        </div>
      )}
    </>
  );
}

function getTimeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
