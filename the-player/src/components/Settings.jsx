import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_SIGNS, ATTACHMENT_STYLES } from '../models/schemas.js';

export default function Settings({ onNavigate }) {
  const user = useStore(s => s.user);
  const updateUser = useStore(s => s.updateUser);
  const profiles = useStore(s => s.profiles);
  const analytics = useStore(s => s.getAnalytics());
  const depthLevel = useStore(s => s.getDepthLevel());
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSave = () => {
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Settings</h2>

        {/* Your profile */}
        <div className="form-group">
          <label>Your Name</label>
          <input className="input" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Your Zodiac Sign</label>
          <div className="chip-grid">
            {ZODIAC_SIGNS.map(z => (
              <span key={z} className={`chip ${form.zodiacSign === z ? 'active' : ''}`}
                onClick={() => setForm({ ...form, zodiacSign: z })}>{z}</span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Your Attachment Style</label>
          <div className="chip-grid">
            {ATTACHMENT_STYLES.map(a => (
              <span key={a.id} className={`chip ${form.attachmentStyle === a.id ? 'active' : ''}`}
                onClick={() => setForm({ ...form, attachmentStyle: a.id })}>
                {a.emoji} {a.label}
              </span>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginBottom: 16 }}
          onClick={handleSave}>
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>

        {/* Stats summary */}
        <div style={{ marginTop: 16 }}>
          <div className="section-title">Your Stats</div>
          <div className="playbook-card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Profiles:</span> {profiles.length}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Active:</span> {analytics.activeCount}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Total Dates:</span> {analytics.totalDates}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Score:</span> {analytics.connectionScore}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Journal:</span> {analytics.journalEntries}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Depth:</span> Level {depthLevel}</div>
            </div>
          </div>
        </div>

        {/* Depth level explanation */}
        <div style={{ marginTop: 16 }}>
          <div className="section-title">Your Depth Level: {depthLevel}</div>
          <div className="playbook-card">
            {depthLevel === 1 && (
              <p>You're new here. The app is focused on helping you track and optimize. As you use it more, deeper features unlock — not because they're hidden, but because they won't make sense until you have the data.</p>
            )}
            {depthLevel === 2 && (
              <p>You've been at this. Patterns are forming. The journal prompts are getting more personal because you're ready for them. The game is evolving from "what works" to "what matters."</p>
            )}
            {depthLevel >= 3 && (
              <p>You've seen enough. The roster, the dates, the patterns — you have the data now. The question the app is nudging you toward: what do you actually want? Not what looks good. What feels right. That answer changes everything.</p>
            )}
          </div>
        </div>

        {/* Data management */}
        <div style={{ marginTop: 24 }}>
          <div className="section-title" style={{ color: 'var(--danger)' }}>Danger Zone</div>
          {!showReset ? (
            <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--danger)' }}
              onClick={() => setShowReset(true)}>
              Reset All Data
            </button>
          ) : (
            <div className="card" style={{ margin: 0, borderColor: 'var(--danger)' }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
                This deletes everything — all profiles, journal entries, and settings. Can't undo this.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white' }}
                  onClick={() => {
                    localStorage.removeItem('the-player-storage');
                    window.location.reload();
                  }}>
                  Confirm Reset
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowReset(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 11, color: 'var(--text-muted)' }}>
          The Player v1.0 · Built for the modern dating world
        </div>
      </div>
    </div>
  );
}
