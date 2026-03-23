import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { PHOTO_VIBES, scanHerProfile, getChaosRating, getHerCommunicationStrategy } from '../utils/herProfileScanner.js';

export default function HerScanner({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const activeProfile = useStore(s => s.getActiveProfile());
  const setHerScan = useStore(s => s.setHerScan);
  const setActive = useStore(s => s.setActiveProfile);

  const [selectedProfile, setSelectedProfile] = useState(activeProfile?.id || '');
  const [photoVibe, setPhotoVibe] = useState(activeProfile?.herScan?.photoVibe || '');
  const [herBio, setHerBio] = useState(activeProfile?.herScan?.bio || '');
  const [herPrompts, setHerPrompts] = useState(activeProfile?.herScan?.prompts || ['', '', '']);
  const [hasKids, setHasKids] = useState(activeProfile?.herScan?.hasKids || false);
  const [kidCount, setKidCount] = useState(activeProfile?.herScan?.kidCount || 0);
  const [scanned, setScanned] = useState(!!activeProfile?.herScan?.results);

  // Run scan
  const profileScan = scanHerProfile(herBio, herPrompts.filter(Boolean));
  const chaosData = {
    ...profileScan,
    photoVibe,
    hasKids,
    kidCount: parseInt(kidCount) || 0,
    age: profiles.find(p => p.id === selectedProfile)?.age,
    mentionsDrama: profileScan.redFlags.some(f => f.flag.includes('drama')),
    socialMediaRedirect: profileScan.redFlags.some(f => f.flag.includes('Social media')),
    recentlyDivorced: profileScan.redFlags.some(f => f.flag.includes('Recently')),
  };
  const chaos = getChaosRating(chaosData);
  const strategy = getHerCommunicationStrategy(photoVibe, profileScan, chaos);

  const handleScan = () => {
    if (selectedProfile) {
      setHerScan(selectedProfile, {
        photoVibe,
        bio: herBio,
        prompts: herPrompts,
        hasKids,
        kidCount,
        results: { scan: profileScan, chaos, strategy },
        scannedAt: new Date().toISOString(),
      });
    }
    setScanned(true);
  };

  const activeProfiles = profiles.filter(p => p.relationshipStage !== 'Archived');
  const vibeInfo = PHOTO_VIBES.find(v => v.id === photoVibe);

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Her Profile Scanner</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Scan her dating profile. Get a chaos rating, vibe assessment, and communication strategy.
        </p>

        {/* Profile selector */}
        <div className="form-group">
          <label>Which girl?</label>
          <select className="select" value={selectedProfile}
            onChange={e => {
              setSelectedProfile(e.target.value);
              const p = profiles.find(pr => pr.id === e.target.value);
              if (p?.herScan) {
                setPhotoVibe(p.herScan.photoVibe || '');
                setHerBio(p.herScan.bio || '');
                setHerPrompts(p.herScan.prompts || ['', '', '']);
                setHasKids(p.herScan.hasKids || false);
                setKidCount(p.herScan.kidCount || 0);
                setScanned(!!p.herScan.results);
              } else {
                setPhotoVibe(''); setHerBio(''); setHerPrompts(['', '', '']);
                setHasKids(false); setKidCount(0); setScanned(false);
              }
            }}>
            <option value="">New / standalone scan</option>
            {activeProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        {/* Photo Vibe */}
        <div className="form-group">
          <label>Her photo vibe — what do her pictures convey?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {PHOTO_VIBES.map(v => (
              <div key={v.id}
                className="card"
                style={{
                  margin: 0, padding: '10px', cursor: 'pointer', fontSize: 13,
                  borderColor: photoVibe === v.id ? 'var(--accent)' : 'var(--border)',
                  background: photoVibe === v.id ? 'var(--bg-hover)' : undefined,
                }}
                onClick={() => setPhotoVibe(v.id)}>
                <div>{v.emoji} <strong>{v.label}</strong></div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{v.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Her bio */}
        <div className="form-group">
          <label>Her bio / about me</label>
          <textarea className="textarea" value={herBio}
            placeholder="Paste her bio here..."
            onChange={e => setHerBio(e.target.value)} />
        </div>

        {/* Her prompts */}
        <div className="form-group">
          <label>Her prompt answers (if any)</label>
          {[0, 1, 2].map(i => (
            <input key={i} className="input" value={herPrompts[i]}
              placeholder={`Prompt answer ${i + 1}`}
              style={{ marginBottom: 6 }}
              onChange={e => {
                const updated = [...herPrompts];
                updated[i] = e.target.value;
                setHerPrompts(updated);
              }} />
          ))}
        </div>

        {/* Extra signals */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
            <input type="checkbox" checked={hasKids} onChange={() => setHasKids(!hasKids)}
              style={{ accentColor: 'var(--accent)' }} />
            Has kids
          </label>
          {hasKids && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>How many?</span>
              <input className="input" type="number" value={kidCount} min={1} max={10}
                style={{ width: 60, padding: '6px 8px' }}
                onChange={e => setKidCount(e.target.value)} />
            </div>
          )}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginBottom: 20 }}
          onClick={handleScan}>
          Scan Her Profile
        </button>

        {/* ── RESULTS ── */}
        {scanned && (
          <div>
            {/* Chaos Rating */}
            <div style={{
              textAlign: 'center', padding: 20, marginBottom: 16,
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              borderColor: chaos.level === 'Red' ? 'var(--danger)' : chaos.level === 'Orange' ? '#e67e22' :
                           chaos.level === 'Yellow' ? 'var(--warning)' : chaos.level === 'Green' ? 'var(--success)' : 'var(--border)',
            }}>
              <div style={{
                fontSize: 48, fontWeight: 800,
                color: chaos.level === 'Red' ? 'var(--danger)' : chaos.level === 'Orange' ? '#e67e22' :
                       chaos.level === 'Yellow' ? 'var(--warning)' : 'var(--success)',
              }}>
                {chaos.rating}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Chaos Rating — {chaos.level}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>{chaos.assessment}</p>
              <p style={{ fontSize: 13, color: 'var(--text-primary)', marginTop: 4, fontWeight: 600 }}>{chaos.advice}</p>
            </div>

            {/* Photo Strategy */}
            {vibeInfo && (
              <div className="playbook-card" style={{ marginBottom: 10 }}>
                <h4>{vibeInfo.emoji} {vibeInfo.label} Vibe</h4>
                <p>{vibeInfo.strategy}</p>
              </div>
            )}

            {/* Red Flags */}
            {profileScan.redFlags.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div className="section-title" style={{ color: 'var(--danger)' }}>Red Flags Detected</div>
                {profileScan.redFlags.map((f, i) => (
                  <div key={i} className="playbook-card" style={{
                    borderLeft: `3px solid ${f.severity === 'high' ? 'var(--danger)' : f.severity === 'medium' ? 'var(--warning)' : 'var(--text-muted)'}`,
                  }}>
                    <h4>{f.flag}</h4>
                    <p>{f.note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Green Flags */}
            {profileScan.greenFlags.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div className="section-title" style={{ color: 'var(--success)' }}>Green Flags</div>
                {profileScan.greenFlags.map((f, i) => (
                  <div key={i} className="playbook-card" style={{ borderLeft: '3px solid var(--success)' }}>
                    <h4>{f.flag}</h4>
                    <p>{f.note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Communication Strategy */}
            <div style={{ marginBottom: 12 }}>
              <div className="section-title">How to Approach Her</div>
              <div className="playbook-card">
                <h4>Opening Angle</h4>
                <p>{strategy.openingAngle}</p>
              </div>
              <div className="playbook-card">
                <h4>Tone</h4>
                <p>{strategy.toneSuggestion}</p>
              </div>
              <div className="playbook-card">
                <h4>What She Probably Wants</h4>
                <ul style={{ margin: 0 }}>
                  {strategy.whatSheWants.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
              <div className="playbook-card">
                <h4>Investment Level: {strategy.investmentLevel}</h4>
                <p>
                  {strategy.investmentLevel === 'Invest' && 'She presents well. Worth your time and energy.'}
                  {strategy.investmentLevel === 'Moderate' && 'Some mixed signals. Keep it light until you learn more in person.'}
                  {strategy.investmentLevel === 'Minimal until proven' && 'Too many flags to go all-in. Coffee date. Public place. See who she really is.'}
                </p>
              </div>
            </div>

            {/* Profile effort level */}
            <div className="playbook-card" style={{ marginBottom: 12 }}>
              <h4>Profile Effort: {profileScan.effortLevel}</h4>
              <p>
                {profileScan.effortLevel === 'high' && 'She put real work into her profile. She\'s serious about this. Match her effort.'}
                {profileScan.effortLevel === 'medium' && 'Standard effort. She\'s on the apps but not obsessing over them.'}
                {profileScan.effortLevel === 'low' && 'Minimal effort bio. Could mean she doesn\'t care, could mean she\'s relying on looks. Ask engaging questions.'}
                {profileScan.effortLevel === 'minimal' && 'Basically no bio. She might be new, bored, or just swiping. Keep expectations calibrated.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
