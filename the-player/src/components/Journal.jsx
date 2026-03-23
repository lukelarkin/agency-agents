import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { JOURNAL_PROMPTS } from '../models/schemas.js';

export default function Journal({ onNavigate }) {
  const journal = useStore(s => s.journal);
  const profiles = useStore(s => s.profiles);
  const addJournalEntry = useStore(s => s.addJournalEntry);
  const updateJournalEntry = useStore(s => s.updateJournalEntry);
  const depthLevel = useStore(s => s.getDepthLevel());
  const [activeEntry, setActiveEntry] = useState(null);
  const [response, setResponse] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [promptCategory, setPromptCategory] = useState('after_date');

  const activeProfiles = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));

  const startPrompt = (prompt, category) => {
    const id = addJournalEntry({
      prompt: prompt.prompt,
      category: prompt.category,
      level: prompt.level,
    });
    setActiveEntry(id);
    setResponse('');
    setShowPrompts(false);
  };

  const saveEntry = () => {
    if (!response.trim()) return;
    updateJournalEntry(activeEntry, { response: response.trim() });
    setActiveEntry(null);
    setResponse('');
  };

  // Get prompts appropriate for user's depth level
  const getAvailablePrompts = (category) => {
    const all = JOURNAL_PROMPTS[category] || [];
    // Show current level and one below — never skip ahead
    return all.filter(p => p.level <= depthLevel);
  };

  const categories = [
    { id: 'after_date', label: 'After a Date' },
    { id: 'after_hookup', label: 'After Hooking Up' },
    { id: 'after_ghosted', label: 'Got Ghosted' },
    { id: 'weekly', label: 'Weekly Check-In' },
    { id: 'milestone', label: 'Big Picture' },
  ];

  const recentEntries = [...journal].reverse().slice(0, 20);

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Journal</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          {depthLevel === 1
            ? 'Track what works. Review your game. Get sharper.'
            : depthLevel === 2
              ? 'Patterns show up here first. What are yours?'
              : 'The real game is knowing yourself. This is where that happens.'}
        </p>

        {/* Active writing */}
        {activeEntry && (
          <div className="card" style={{ margin: '0 0 16px', borderColor: 'var(--accent)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-light)' }}>
              {journal.find(j => j.id === activeEntry)?.prompt}
            </div>
            <textarea className="textarea" value={response}
              placeholder="Be honest with yourself..."
              style={{ minHeight: 120, fontSize: 15, lineHeight: 1.7 }}
              onChange={e => setResponse(e.target.value)}
              autoFocus />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveEntry}
                disabled={!response.trim()}>Save</button>
              <button className="btn btn-ghost" onClick={() => { setActiveEntry(null); setResponse(''); }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Prompt selector */}
        {!activeEntry && (
          <>
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: 16 }}
              onClick={() => setShowPrompts(!showPrompts)}>
              {showPrompts ? 'Close' : 'New Entry'}
            </button>

            {showPrompts && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {categories.map(c => (
                    <span key={c.id}
                      className={`chip ${promptCategory === c.id ? 'active' : ''}`}
                      onClick={() => setPromptCategory(c.id)}>
                      {c.label}
                    </span>
                  ))}
                </div>

                {getAvailablePrompts(promptCategory).map((p, i) => (
                  <div key={i} className="text-suggestion"
                    onClick={() => startPrompt(p, promptCategory)}
                    style={{ borderLeft: `3px solid ${p.level === 1 ? 'var(--accent)' : p.level === 2 ? 'var(--warning)' : 'var(--success)'}` }}>
                    <div className="category">
                      {p.level === 1 ? 'tactical' : p.level === 2 ? 'awareness' : 'depth'}
                    </div>
                    <div>{p.prompt}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Free write */}
        {!activeEntry && !showPrompts && (
          <div style={{ marginBottom: 16 }}>
            <button className="btn btn-ghost" style={{ width: '100%' }}
              onClick={() => {
                const id = addJournalEntry({ prompt: 'Free write', category: 'free', level: depthLevel });
                setActiveEntry(id);
                setResponse('');
              }}>
              Free Write
            </button>
          </div>
        )}

        {/* Past entries */}
        {recentEntries.length > 0 && (
          <div>
            <div className="section-title">Past Entries</div>
            {recentEntries.map(j => (
              <div key={j.id} className="card" style={{ margin: '0 0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="category" style={{ fontSize: 10, color: 'var(--accent-light)' }}>
                    {j.category}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {new Date(j.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 4 }}>
                  {j.prompt}
                </div>
                {j.response && (
                  <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {j.response}
                  </div>
                )}
                {!j.response && (
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 4 }}
                    onClick={() => { setActiveEntry(j.id); setResponse(''); }}>
                    Answer this
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {recentEntries.length === 0 && !showPrompts && !activeEntry && (
          <div className="empty-state" style={{ padding: 24 }}>
            <p style={{ fontSize: 14 }}>
              {depthLevel === 1
                ? 'No entries yet. After your next date, come back here and review what worked.'
                : 'Your journal is empty. The unexamined life isn\'t worth dating in.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
