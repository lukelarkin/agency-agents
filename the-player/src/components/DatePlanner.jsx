import React, { useState } from 'react';
import useStore from '../hooks/useStore.js';
import { DATE_TYPES, BUDGET_TIERS } from '../models/schemas.js';
import { getBudgetReport, generateDatePlan, getDateCostEstimate } from '../utils/datePlanner.js';
import { suggestDateType, getMidpoint, getDistanceMiles, rankVenues, createVenue } from '../utils/spotFinder.js';
import { getCycleInfo } from '../utils/cycleTracker.js';

export default function DatePlanner({ onNavigate }) {
  const profiles = useStore(s => s.profiles);
  const user = useStore(s => s.user);
  const updateUser = useStore(s => s.updateUser);
  const venues = useStore(s => s.venues);
  const addVenue = useStore(s => s.addVenue);
  const removeVenue = useStore(s => s.removeVenue);
  const setActive = useStore(s => s.setActiveProfile);
  const [tab, setTab] = useState('plan');
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [venueForm, setVenueForm] = useState({ name: '', type: 'drinks', cost: '$$', neighborhood: '', vibe: '', notes: '' });
  const [midpointCalc, setMidpointCalc] = useState({ herArea: '', yourArea: '' });

  const budgetSettings = { tier: user.budgetTier || 'comfortable', customMonthly: user.customMonthlyBudget };
  const budget = getBudgetReport(budgetSettings, profiles);
  const datePlan = generateDatePlan(profiles, budget, { maxDatesPerWeek: user.maxDatesPerWeek || 3 });

  const handleAddVenue = () => {
    if (!venueForm.name.trim()) return;
    addVenue(venueForm);
    setVenueForm({ name: '', type: 'drinks', cost: '$$', neighborhood: '', vibe: '', notes: '' });
    setShowAddVenue(false);
  };

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Date Planner</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Who to see, where to go, what you can afford.
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {['plan', 'budget', 'spots', 'find'].map(t => (
            <span key={t} className={`chip ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}>
              {t === 'plan' ? 'This Week' : t === 'budget' ? 'Budget' : t === 'spots' ? 'My Spots' : 'Spot Finder'}
            </span>
          ))}
        </div>

        {/* ── This Week's Plan ── */}
        {tab === 'plan' && (
          <div>
            <div className="section-title">Priority Schedule</div>
            {datePlan.length === 0 && (
              <div className="empty-state" style={{ padding: 24 }}>
                <p>No active profiles to plan dates for.</p>
              </div>
            )}
            {datePlan.map((item, idx) => {
              const cycle = item.cycle;
              return (
                <div key={idx} className="card" style={{
                  margin: '0 0 10px',
                  borderLeft: `3px solid ${item.rank === 1 ? 'var(--success)' : item.rank === 2 ? 'var(--accent)' : 'var(--text-muted)'}`,
                  cursor: 'pointer',
                }} onClick={() => { setActive(item.profileId); onNavigate('detail'); }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: item.rank === 1 ? 'var(--success)' : 'var(--bg-hover)', color: 'white', fontSize: 12, fontWeight: 700,
                      }}>
                        {item.rank}
                      </div>
                      <strong style={{ fontSize: 15 }}>{item.profile.name}</strong>
                    </div>
                    <span className="tag tag-outline" style={{ fontSize: 10 }}>{item.profile.relationshipStage}</span>
                  </div>

                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{item.reasoning}</div>

                  {cycle && (
                    <div style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                      <span className="phase-dot" style={{ background: cycle.phase.color }} />
                      {cycle.phase.label} — Day {cycle.cycleDay}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {item.suggestedDateTypes.map(dt => (
                      <span key={dt.id} className="tag tag-outline" style={{ fontSize: 10 }}>
                        {dt.label} ({dt.cost}) ~{dt.time}min
                      </span>
                    ))}
                  </div>

                  {!item.canAfford && (
                    <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>
                      {item.budgetAdvice}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Budget ── */}
        {tab === 'budget' && (
          <div>
            {/* Budget Status */}
            <div style={{
              textAlign: 'center', padding: 20, marginBottom: 16,
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              borderColor: budget.statusLevel === 'over' ? 'var(--danger)' : budget.statusLevel === 'tight' ? 'var(--warning)' : 'var(--border)',
            }}>
              <div style={{
                fontSize: 36, fontWeight: 800,
                color: budget.statusLevel === 'over' ? 'var(--danger)' : budget.statusLevel === 'tight' ? 'var(--warning)' : 'var(--success)',
              }}>
                ${budget.remaining}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>remaining this month</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                ${budget.monthSpend} spent · {budget.datesThisMonth} dates · ~${budget.perDateAvg}/date avg
              </div>
            </div>

            <div className="playbook-card">
              <p>{budget.statusMessage}</p>
            </div>

            {/* Spend by person */}
            {Object.keys(budget.spendByPerson).length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">Spend by Person</div>
                {Object.entries(budget.spendByPerson).sort((a, b) => b[1] - a[1]).map(([name, amount]) => (
                  <div key={name} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                    borderBottom: '1px solid var(--border)', fontSize: 14,
                  }}>
                    <span>{name}</span>
                    <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>${Math.round(amount)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Budget tier selector */}
            <div style={{ marginTop: 16 }}>
              <div className="section-title">Your Budget</div>
              {BUDGET_TIERS.map(t => (
                <div key={t.id} className="card" style={{
                  margin: '0 0 8px', cursor: 'pointer',
                  borderColor: user.budgetTier === t.id ? 'var(--accent)' : 'var(--border)',
                }} onClick={() => updateUser({ budgetTier: t.id })}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 14 }}>{t.label}</strong>
                    <span style={{ fontSize: 13, color: 'var(--accent-light)' }}>${t.monthly}/mo</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{t.strategy}</p>
                </div>
              ))}
            </div>

            {/* Date type costs */}
            <div style={{ marginTop: 16 }}>
              <div className="section-title">What Dates Actually Cost</div>
              {DATE_TYPES.map(dt => {
                const cost = getDateCostEstimate(dt.id);
                return (
                  <div key={dt.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <div>
                      <div style={{ fontSize: 14 }}>{dt.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dt.vibe}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: 'var(--accent-light)' }}>${cost.low}–${cost.high}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>avg ${cost.avg}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="playbook-card" style={{ marginTop: 16, borderLeft: '3px solid var(--accent)' }}>
              <h4>The Rule</h4>
              <p>Coffee or a walk for first dates. Always. You don't owe a stranger a $70 dinner. If there's chemistry over a $5 latte, she'll remember the conversation — not the price tag.</p>
            </div>
          </div>
        )}

        {/* ── My Spots ── */}
        {tab === 'spots' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="section-title" style={{ margin: 0 }}>Saved Spots ({venues.length})</div>
              <button className="btn btn-sm btn-primary" onClick={() => setShowAddVenue(!showAddVenue)}>
                {showAddVenue ? 'Cancel' : '+ Add Spot'}
              </button>
            </div>

            {showAddVenue && (
              <div className="card" style={{ margin: '0 0 12px' }}>
                <div className="form-group">
                  <label>Name</label>
                  <input className="input" value={venueForm.name} placeholder="Spot name"
                    onChange={e => setVenueForm({ ...venueForm, name: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div className="form-group">
                    <label>Type</label>
                    <select className="select" value={venueForm.type}
                      onChange={e => setVenueForm({ ...venueForm, type: e.target.value })}>
                      {DATE_TYPES.map(dt => <option key={dt.id} value={dt.id}>{dt.label}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Cost</label>
                    <select className="select" value={venueForm.cost}
                      onChange={e => setVenueForm({ ...venueForm, cost: e.target.value })}>
                      {['Free', '$', '$$', '$$$', '$$$$'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Neighborhood / Area</label>
                  <input className="input" value={venueForm.neighborhood} placeholder="Downtown, East Side, etc."
                    onChange={e => setVenueForm({ ...venueForm, neighborhood: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Vibe</label>
                  <div className="chip-grid">
                    {['romantic', 'casual', 'energetic', 'chill', 'upscale', 'dive'].map(v => (
                      <span key={v} className={`chip ${venueForm.vibe === v ? 'active' : ''}`}
                        onClick={() => setVenueForm({ ...venueForm, vibe: v })}>{v}</span>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <input className="input" value={venueForm.notes} placeholder="Good cocktails, outdoor patio, etc."
                    onChange={e => setVenueForm({ ...venueForm, notes: e.target.value })} />
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddVenue}>Save Spot</button>
              </div>
            )}

            {venues.length === 0 && !showAddVenue && (
              <div className="empty-state" style={{ padding: 24 }}>
                <p>No spots saved yet. Build your date spot arsenal — know a go-to spot for every vibe.</p>
              </div>
            )}

            {venues.map(v => (
              <div key={v.id} className="card" style={{ margin: '0 0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 14 }}>{v.name}</strong>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>{DATE_TYPES.find(d => d.id === v.type)?.label || v.type}</span>
                      <span>·</span>
                      <span>{v.cost}</span>
                      {v.neighborhood && <><span>·</span><span>{v.neighborhood}</span></>}
                      {v.vibe && <><span>·</span><span>{v.vibe}</span></>}
                    </div>
                  </div>
                  <button className="btn-icon" style={{ width: 24, height: 24, fontSize: 12 }}
                    onClick={() => removeVenue(v.id)}>×</button>
                </div>
                {v.notes && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{v.notes}</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── Spot Finder (Midpoint) ── */}
        {tab === 'find' && (
          <div>
            <div className="section-title">Meet in the Middle</div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              When she says "what part of town are you in?" — find equidistant spots between you.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              <div className="form-group">
                <label>Your area</label>
                <input className="input" value={midpointCalc.yourArea} placeholder="Your neighborhood"
                  onChange={e => setMidpointCalc({ ...midpointCalc, yourArea: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Her area</label>
                <input className="input" value={midpointCalc.herArea} placeholder="Her neighborhood"
                  onChange={e => setMidpointCalc({ ...midpointCalc, herArea: e.target.value })} />
              </div>
            </div>

            {/* Saved spots filtered by neighborhood proximity */}
            {venues.length > 0 && (midpointCalc.yourArea || midpointCalc.herArea) && (
              <div>
                <div className="section-title">Your Spots Nearby</div>
                {venues
                  .filter(v => {
                    if (!v.neighborhood) return true;
                    const search = `${midpointCalc.yourArea} ${midpointCalc.herArea}`.toLowerCase();
                    return v.neighborhood.toLowerCase().split(/\s+/).some(word => search.includes(word));
                  })
                  .map(v => (
                    <div key={v.id} className="card" style={{ margin: '0 0 8px' }}>
                      <strong style={{ fontSize: 14 }}>{v.name}</strong>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {v.neighborhood} · {v.cost} · {v.vibe || DATE_TYPES.find(d => d.id === v.type)?.label}
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            <div className="playbook-card" style={{ marginTop: 16, borderLeft: '3px solid var(--accent)' }}>
              <h4>The Move</h4>
              <p>When she says "What part of town are you in?" she's asking: "How far are you from me and is this worth the drive?" Always suggest a spot that splits the distance. It shows you're considerate AND decisive.</p>
            </div>

            <div className="playbook-card">
              <h4>Build Your Spot Arsenal</h4>
              <p>Save at least 3 spots per vibe: one casual (coffee), one fun (activity/drinks), one romantic (dinner). Know them well enough to describe why they're good. "I know a spot" is the most attractive sentence in dating.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
