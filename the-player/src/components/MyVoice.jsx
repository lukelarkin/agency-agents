import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { analyzeVoice, describeVoice, transformToVoice } from '../utils/voiceLearner.js';

export default function MyVoice({ onNavigate }) {
  const voiceSamples = useStore(s => s.voiceSamples);
  const addVoiceSample = useStore(s => s.addVoiceSample);
  const clearVoiceSamples = useStore(s => s.clearVoiceSamples);
  const profiles = useStore(s => s.profiles);
  const user = useStore(s => s.user);
  const [newSample, setNewSample] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [testText, setTestText] = useState('Hey, I had a great time last night. Want to do it again soon?');

  const voice = analyzeVoice(voiceSamples.map(s => s.text));
  const voiceDescription = describeVoice(voice);
  const transformedTest = transformToVoice(testText, voice, 'her');

  const handleAddSample = () => {
    if (!newSample.trim()) return;
    addVoiceSample(newSample);
    setNewSample('');
  };

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    // Split by newlines, treating each line as a separate message
    const lines = bulkText.split('\n').filter(l => l.trim().length > 0);
    lines.forEach(line => addVoiceSample(line));
    setBulkText('');
    setBulkMode(false);
  };

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>My Voice</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Teach the app how you text so it can generate messages that sound like YOU — not some generic dating coach.
        </p>

        {/* Voice Profile */}
        {voice.sampleCount > 0 && (
          <div className="card" style={{ margin: '0 0 16px', borderColor: 'var(--accent)' }}>
            <div className="section-title" style={{ margin: '0 0 8px' }}>Your Voice Profile</div>
            <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {voiceDescription}
            </p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>{voice.metrics.avgWordsPerMessage}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Avg words</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>{voice.metrics.emojiPerMessage}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Emoji/msg</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>{voice.sampleCount}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Samples</div>
              </div>
            </div>

            {voice.signaturePhrases.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Your phrases:</div>
                <div style={{ fontSize: 13, color: 'var(--accent-light)' }}>
                  {voice.signaturePhrases.map((p, i) => `"${p}"`).join(', ')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Transform Test */}
        {voice.sampleCount >= 5 && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title">Live Test — See It In Your Voice</div>
            <div className="form-group">
              <label>Template text</label>
              <input className="input" value={testText}
                onChange={e => setTestText(e.target.value)} />
            </div>
            <div className="playbook-card" style={{ borderLeft: '3px solid var(--accent)' }}>
              <h4>In your voice:</h4>
              <p style={{ fontSize: 15, color: 'var(--text-primary)' }}>{transformedTest}</p>
            </div>
          </div>
        )}

        {/* Add samples */}
        <div style={{ marginBottom: 16 }}>
          <div className="section-title">
            Add Text Samples ({voiceSamples.length}/20 minimum for accuracy)
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
            Paste real texts you've sent to women. The more samples, the more accurate your voice profile.
            Go to your messages, copy texts you've actually sent, and paste them here.
          </p>

          {!bulkMode ? (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input className="input" value={newSample}
                  placeholder="Paste a text you've sent..."
                  style={{ flex: 1 }}
                  onChange={e => setNewSample(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddSample()} />
                <button className="btn btn-primary btn-sm" onClick={handleAddSample}>Add</button>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ width: '100%' }}
                onClick={() => setBulkMode(true)}>
                Bulk add (paste multiple texts)
              </button>
            </>
          ) : (
            <>
              <textarea className="textarea" value={bulkText}
                placeholder="Paste multiple texts here — one per line. Each line becomes a separate sample."
                style={{ minHeight: 150 }}
                onChange={e => setBulkText(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}
                  onClick={handleBulkAdd}>Add All</button>
                <button className="btn btn-ghost" onClick={() => setBulkMode(false)}>Cancel</button>
              </div>
            </>
          )}
        </div>

        {/* Recent samples */}
        {voiceSamples.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title">Recent Samples</div>
            {voiceSamples.slice(-8).reverse().map((s, i) => (
              <div key={i} style={{
                padding: '8px 12px', marginBottom: 4,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-secondary)',
              }}>
                "{s.text}"
              </div>
            ))}
            {voiceSamples.length > 8 && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                +{voiceSamples.length - 8} more samples
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="playbook-card" style={{ marginBottom: 16 }}>
          <h4>Tips for Better Results</h4>
          <ul style={{ margin: 0 }}>
            <li>Add at least 20 samples for a good voice profile</li>
            <li>Include different types: openers, replies, flirty texts, casual check-ins</li>
            <li>The more variety, the better the app understands your range</li>
            <li>Once trained, all text suggestions will be adapted to your style</li>
          </ul>
        </div>

        {voiceSamples.length > 0 && (
          <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--danger)' }}
            onClick={() => { if (confirm('Delete all voice samples?')) clearVoiceSamples(); }}>
            Clear All Samples
          </button>
        )}
      </div>
    </div>
  );
}
