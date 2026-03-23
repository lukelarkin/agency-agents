import React, { useState, useEffect } from 'react';
import useStore from '../hooks/useStore.js';
import {
  ZODIAC_SIGNS, ATTACHMENT_STYLES, BIRTH_CONTROL_TYPES,
  LOVE_LANGUAGES, RELATIONSHIP_STAGES, INTEREST_CATEGORIES,
  FAMILY_DYNAMICS, VALUES,
} from '../models/schemas.js';

export default function ProfileForm({ editingId, onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const addProfile = useStore(s => s.addProfile);
  const updateProfile = useStore(s => s.updateProfile);
  const setActive = useStore(s => s.setActiveProfile);

  const existing = editingId ? profiles.find(p => p.id === editingId) : null;

  const [form, setForm] = useState({
    name: '', nickname: '', age: '', zodiacSign: '', attachmentStyle: '',
    loveLanguages: [], birthControl: '', cycleLength: 28, lastPeriodStart: '',
    interests: [], values: [], familyDynamics: [], relationshipStage: 'Prospect',
    metOn: '', notes: '',
  });

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        nickname: existing.nickname || '',
        age: existing.age || '',
        zodiacSign: existing.zodiacSign || '',
        attachmentStyle: existing.attachmentStyle || '',
        loveLanguages: existing.loveLanguages || [],
        birthControl: existing.birthControl || '',
        cycleLength: existing.cycleLength || 28,
        lastPeriodStart: existing.lastPeriodStart || '',
        interests: existing.interests || [],
        values: existing.values || [],
        familyDynamics: existing.familyDynamics || [],
        relationshipStage: existing.relationshipStage || 'Prospect',
        metOn: existing.metOn || '',
        notes: existing.notes || '',
      });
    }
  }, [existing]);

  const toggleChip = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    const data = {
      ...form,
      age: form.age ? parseInt(form.age, 10) : null,
      cycleLength: parseInt(form.cycleLength, 10) || 28,
      lastPeriodStart: form.lastPeriodStart || null,
    };

    if (editingId) {
      updateProfile(editingId, data);
      setActive(editingId);
      onNavigate('detail');
    } else {
      const id = addProfile(data);
      setActive(id);
      onNavigate('detail');
    }
  };

  return (
    <div className="section">
      <h2 style={{ marginBottom: 20, fontSize: 18 }}>
        {editingId ? 'Edit Profile' : 'New Profile'}
      </h2>

      {/* Basic Info */}
      <div className="form-group">
        <label>Name *</label>
        <input className="input" value={form.name} placeholder="Her name"
          onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="form-group">
          <label>Nickname</label>
          <input className="input" value={form.nickname} placeholder="Your name for her"
            onChange={e => setForm({ ...form, nickname: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input className="input" type="number" value={form.age} placeholder="Age"
            onChange={e => setForm({ ...form, age: e.target.value })} />
        </div>
      </div>

      <div className="form-group">
        <label>Where You Met</label>
        <input className="input" value={form.metOn} placeholder="Hinge, bar, gym, friend intro..."
          onChange={e => setForm({ ...form, metOn: e.target.value })} />
      </div>

      {/* Stage */}
      <div className="form-group">
        <label>Relationship Stage</label>
        <select className="select" value={form.relationshipStage}
          onChange={e => setForm({ ...form, relationshipStage: e.target.value })}>
          {RELATIONSHIP_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Zodiac */}
      <div className="form-group">
        <label>Zodiac Sign</label>
        <div className="chip-grid">
          {ZODIAC_SIGNS.map(z => (
            <span key={z} className={`chip ${form.zodiacSign === z ? 'active' : ''}`}
              onClick={() => setForm({ ...form, zodiacSign: z })}>{z}</span>
          ))}
        </div>
      </div>

      {/* Attachment Style */}
      <div className="form-group">
        <label>Attachment Style</label>
        <div className="chip-grid">
          {ATTACHMENT_STYLES.map(a => (
            <span key={a.id} className={`chip ${form.attachmentStyle === a.id ? 'active' : ''}`}
              onClick={() => setForm({ ...form, attachmentStyle: a.id })}
              title={a.description}>{a.label}</span>
          ))}
        </div>
      </div>

      {/* Love Languages */}
      <div className="form-group">
        <label>Love Languages (select top 2)</label>
        <div className="chip-grid">
          {LOVE_LANGUAGES.map(l => (
            <span key={l} className={`chip ${form.loveLanguages.includes(l) ? 'active' : ''}`}
              onClick={() => toggleChip('loveLanguages', l)}>{l}</span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="form-group">
        <label>Interests</label>
        <div className="chip-grid">
          {INTEREST_CATEGORIES.map(i => (
            <span key={i} className={`chip ${form.interests.includes(i) ? 'active' : ''}`}
              onClick={() => toggleChip('interests', i)}>{i}</span>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="form-group">
        <label>Core Values</label>
        <div className="chip-grid">
          {VALUES.map(v => (
            <span key={v} className={`chip ${form.values.includes(v) ? 'active' : ''}`}
              onClick={() => toggleChip('values', v)}>{v}</span>
          ))}
        </div>
      </div>

      {/* Family Dynamics */}
      <div className="form-group">
        <label>Family Dynamics</label>
        <div className="chip-grid">
          {FAMILY_DYNAMICS.map(f => (
            <span key={f} className={`chip ${form.familyDynamics.includes(f) ? 'active' : ''}`}
              onClick={() => toggleChip('familyDynamics', f)}>{f}</span>
          ))}
        </div>
      </div>

      {/* Birth Control */}
      <div className="form-group">
        <label>Birth Control</label>
        <select className="select" value={form.birthControl}
          onChange={e => setForm({ ...form, birthControl: e.target.value })}>
          <option value="">Unknown</option>
          {BIRTH_CONTROL_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Cycle Tracking */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="form-group">
          <label>Last Period Start</label>
          <input className="input" type="date" value={form.lastPeriodStart}
            onChange={e => setForm({ ...form, lastPeriodStart: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Cycle Length (days)</label>
          <input className="input" type="number" value={form.cycleLength}
            onChange={e => setForm({ ...form, cycleLength: e.target.value })} />
        </div>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label>Notes</label>
        <textarea className="textarea" value={form.notes}
          placeholder="Anything worth remembering... her dog's name, favorite drink, inside jokes..."
          onChange={e => setForm({ ...form, notes: e.target.value })} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
          {editingId ? 'Save Changes' : 'Add to Roster'}
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate(editingId ? 'detail' : 'roster')}>
          Cancel
        </button>
      </div>
    </div>
  );
}
