import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { PHOTO_CRITERIA, BIO_CRITERIA, PROMPT_CRITERIA } from '../models/schemas.js';
import { gradePhotos, gradeBio, gradePrompts, getOverallGrade } from '../utils/profileGrader.js';

export default function ProfileGrader({ onNavigate }) {
  const profileGrades = useStore(s => s.profileGrades);
  const setProfileGrade = useStore(s => s.setProfileGrade);
  const [section, setSection] = useState('photos');

  // Photo grading state
  const [photoChecks, setPhotoChecks] = useState(() => {
    const saved = profileGrades.photos?.checks || {};
    return PHOTO_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: saved[c.id] || false }), {});
  });

  // Bio grading state
  const [bioChecks, setBioChecks] = useState(() => {
    const saved = profileGrades.bio?.checks || {};
    return BIO_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: saved[c.id] || false }), {});
  });
  const [bioText, setBioText] = useState(profileGrades.bio?.text || '');

  // Prompt grading state
  const [promptChecks, setPromptChecks] = useState(() => {
    const saved = profileGrades.prompts?.checks || {};
    return PROMPT_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: saved[c.id] || false }), {});
  });
  const [promptTexts, setPromptTexts] = useState(profileGrades.prompts?.texts || ['', '', '']);

  // Live grades
  const photoGrade = gradePhotos(photoChecks);
  const bioGrade = gradeBio(bioChecks, bioText);
  const promptGrade = gradePrompts(promptChecks, promptTexts.filter(Boolean));
  const overall = getOverallGrade(photoGrade.score, bioGrade.score, promptGrade.score);

  const saveGrades = () => {
    setProfileGrade('photos', { ...photoGrade, checks: photoChecks });
    setProfileGrade('bio', { ...bioGrade, checks: bioChecks, text: bioText });
    setProfileGrade('prompts', { ...promptGrade, checks: promptChecks, texts: promptTexts });
  };

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Profile Grader</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Grade your dating app profile. Be honest — it only works if you are.
        </p>

        {/* Overall Score */}
        <div style={{
          textAlign: 'center', padding: 20, marginBottom: 16,
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        }}>
          <div style={{
            fontSize: 56, fontWeight: 800,
            color: overall.grade === 'A' ? 'var(--success)' : overall.grade === 'B' ? 'var(--accent-light)' : overall.grade === 'C' ? 'var(--warning)' : 'var(--danger)',
          }}>{overall.grade}</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{overall.score}/100</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>{overall.verdict}</p>
        </div>

        {/* Section scores */}
        <div className="stats-row" style={{ margin: '0 0 16px' }}>
          <div className="stat-box" style={{ cursor: 'pointer', borderColor: section === 'photos' ? 'var(--accent)' : undefined }}
            onClick={() => setSection('photos')}>
            <div className="number" style={{ fontSize: 18 }}>{photoGrade.grade}</div>
            <div className="label">Photos</div>
          </div>
          <div className="stat-box" style={{ cursor: 'pointer', borderColor: section === 'bio' ? 'var(--accent)' : undefined }}
            onClick={() => setSection('bio')}>
            <div className="number" style={{ fontSize: 18 }}>{bioGrade.grade}</div>
            <div className="label">Bio</div>
          </div>
          <div className="stat-box" style={{ cursor: 'pointer', borderColor: section === 'prompts' ? 'var(--accent)' : undefined }}
            onClick={() => setSection('prompts')}>
            <div className="number" style={{ fontSize: 18 }}>{promptGrade.grade}</div>
            <div className="label">Prompts</div>
          </div>
        </div>

        {/* Photo Section */}
        {section === 'photos' && (
          <div>
            <div className="section-title">Photo Checklist — {photoGrade.score}/100</div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              Check each one that's true about your current photos.
            </p>
            {PHOTO_CRITERIA.map(c => (
              <label key={c.id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0',
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
              }}>
                <input type="checkbox" checked={photoChecks[c.id]}
                  onChange={() => setPhotoChecks(p => ({ ...p, [c.id]: !p[c.id] }))}
                  style={{ marginTop: 2, accentColor: 'var(--accent)' }} />
                <div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{c.label}</div>
                  {!photoChecks[c.id] && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{c.tip}</div>
                  )}
                </div>
              </label>
            ))}
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, fontStyle: 'italic' }}>
              {photoGrade.summary}
            </p>
          </div>
        )}

        {/* Bio Section */}
        {section === 'bio' && (
          <div>
            <div className="section-title">Bio Grade — {bioGrade.score}/100</div>
            <div className="form-group">
              <label>Paste your bio here for analysis</label>
              <textarea className="textarea" value={bioText} placeholder="Paste your dating app bio..."
                style={{ minHeight: 100 }}
                onChange={e => setBioText(e.target.value)} />
              {bioText && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  {bioGrade.wordCount} words
                </div>
              )}
            </div>

            {bioGrade.textAnalysis?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div className="section-title" style={{ color: 'var(--danger)' }}>Issues Found</div>
                {bioGrade.textAnalysis.map((a, i) => (
                  <div key={i} className="playbook-card" style={{ borderLeft: '3px solid var(--danger)' }}>
                    <h4>{a.issue}</h4>
                    <p>{a.tip}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="section-title">Checklist</div>
            {BIO_CRITERIA.map(c => (
              <label key={c.id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0',
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
              }}>
                <input type="checkbox" checked={bioChecks[c.id]}
                  onChange={() => setBioChecks(p => ({ ...p, [c.id]: !p[c.id] }))}
                  style={{ marginTop: 2, accentColor: 'var(--accent)' }} />
                <div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{c.label}</div>
                  {!bioChecks[c.id] && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{c.tip}</div>
                  )}
                </div>
              </label>
            ))}
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, fontStyle: 'italic' }}>
              {bioGrade.summary}
            </p>
          </div>
        )}

        {/* Prompts Section */}
        {section === 'prompts' && (
          <div>
            <div className="section-title">Prompt Answers — {promptGrade.score}/100</div>
            {[0, 1, 2].map(i => (
              <div key={i} className="form-group">
                <label>Prompt Answer {i + 1}</label>
                <textarea className="textarea" value={promptTexts[i]}
                  placeholder={`Paste your ${i === 0 ? 'first' : i === 1 ? 'second' : 'third'} prompt answer...`}
                  style={{ minHeight: 60 }}
                  onChange={e => {
                    const updated = [...promptTexts];
                    updated[i] = e.target.value;
                    setPromptTexts(updated);
                  }} />
              </div>
            ))}

            {promptGrade.textAnalysis?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                {promptGrade.textAnalysis.map((a, i) => (
                  <div key={i} className="playbook-card" style={{ borderLeft: '3px solid var(--warning)' }}>
                    <h4>{a.issue}</h4>
                    <p>{a.tip}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="section-title">Checklist</div>
            {PROMPT_CRITERIA.map(c => (
              <label key={c.id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0',
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
              }}>
                <input type="checkbox" checked={promptChecks[c.id]}
                  onChange={() => setPromptChecks(p => ({ ...p, [c.id]: !p[c.id] }))}
                  style={{ marginTop: 2, accentColor: 'var(--accent)' }} />
                <div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{c.label}</div>
                  {!promptChecks[c.id] && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{c.tip}</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}
          onClick={saveGrades}>Save Grades</button>
      </div>
    </div>
  );
}
