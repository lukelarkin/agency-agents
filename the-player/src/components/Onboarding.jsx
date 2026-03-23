import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { ZODIAC_SIGNS, ATTACHMENT_STYLES } from '../models/schemas.js';

export default function Onboarding() {
  const updateUser = useStore(s => s.updateUser);
  const completeOnboarding = useStore(s => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', zodiacSign: '', attachmentStyle: '' });

  const handleFinish = () => {
    updateUser(form);
    completeOnboarding();
  };

  return (
    <div className="app">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
        {step === 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 36, fontWeight: 800, marginBottom: 8,
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>THE PLAYER</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
              Your dating command center.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>
              Track who you're seeing. Know what to text. Never forget a detail.
              Understand her patterns so you can show up right.
            </p>
            <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16 }}
              onClick={() => setStep(1)}>Let's go</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Step 1 of 3</div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>What's your name, king?</h2>
            <div className="form-group">
              <input className="input" value={form.name} placeholder="Your first name"
                style={{ fontSize: 18, padding: 14 }}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: 14 }}
              disabled={!form.name.trim()}
              onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Step 2 of 3</div>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>Your sign?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
              For compatibility scoring. Tap yours.
            </p>
            <div className="chip-grid" style={{ marginBottom: 20 }}>
              {ZODIAC_SIGNS.map(z => (
                <span key={z} className={`chip ${form.zodiacSign === z ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, zodiacSign: z })}>{z}</span>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: 14 }}
              onClick={() => setStep(3)}>
              {form.zodiacSign ? 'Next' : 'Skip'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Step 3 of 3</div>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>Your attachment style?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
              This shapes how you connect. Be honest with yourself.
            </p>
            {ATTACHMENT_STYLES.map(a => (
              <div key={a.id}
                className={`card ${form.attachmentStyle === a.id ? '' : ''}`}
                style={{
                  cursor: 'pointer', margin: '0 0 10px',
                  borderColor: form.attachmentStyle === a.id ? 'var(--accent)' : 'var(--border)',
                  background: form.attachmentStyle === a.id ? 'var(--bg-hover)' : 'var(--bg-card)',
                }}
                onClick={() => setForm({ ...form, attachmentStyle: a.id })}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{a.emoji}</span>
                  <div>
                    <strong style={{ fontSize: 15 }}>{a.label}</strong>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.description}</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', padding: 14, marginTop: 12 }}
              onClick={handleFinish}>
              Enter The Player
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
