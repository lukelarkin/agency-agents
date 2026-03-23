import React from 'react';
import useStore from '../hooks/useStore.js';

export default function Insights({ onNavigate }) {
  const analytics = useStore(s => s.getAnalytics());
  const depthLevel = useStore(s => s.getDepthLevel());
  const profiles = useStore(s => s.profiles);
  const journal = useStore(s => s.journal);

  const active = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));

  // Pattern analysis
  const bestDates = [];
  const worstDates = [];
  profiles.forEach(p => {
    (p.dateLog || []).forEach(d => {
      const entry = { ...d, profileName: p.name, profileId: p.id };
      if (d.howItWent >= 4) bestDates.push(entry);
      if (d.howItWent <= 2) worstDates.push(entry);
    });
  });

  // Attachment style distribution
  const attachmentCounts = {};
  profiles.forEach(p => {
    if (p.attachmentStyle) {
      attachmentCounts[p.attachmentStyle] = (attachmentCounts[p.attachmentStyle] || 0) + 1;
    }
  });
  const topAttachment = Object.entries(attachmentCounts).sort((a, b) => b[1] - a[1])[0];

  // Most common zodiac
  const zodiacCounts = {};
  profiles.forEach(p => {
    if (p.zodiacSign) {
      zodiacCounts[p.zodiacSign] = (zodiacCounts[p.zodiacSign] || 0) + 1;
    }
  });
  const topZodiac = Object.entries(zodiacCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      <div className="section">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Intel</h2>

        {/* Connection Score — the big number */}
        <div style={{
          textAlign: 'center', padding: 24, marginBottom: 16,
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent-light)' }}>
            {analytics.connectionScore}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Connection Score</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Based on date quality, her engagement, and your depth of reflection
          </div>
        </div>

        {/* Core Stats */}
        <div className="stats-row" style={{ margin: '0 0 16px' }}>
          <div className="stat-box">
            <div className="number">{analytics.activeCount}</div>
            <div className="label">Active</div>
          </div>
          <div className="stat-box">
            <div className="number">{analytics.totalDates}</div>
            <div className="label">Dates</div>
          </div>
          <div className="stat-box">
            <div className="number">{analytics.avgDateRating}</div>
            <div className="label">Avg Rating</div>
          </div>
        </div>

        <div className="stats-row" style={{ margin: '0 0 16px' }}>
          <div className="stat-box">
            <div className="number">{analytics.totalContacts}</div>
            <div className="label">Contacts</div>
          </div>
          <div className="stat-box">
            <div className="number">{analytics.initiationRatio}</div>
            <div className="label">Her:You Ratio</div>
          </div>
          <div className="stat-box">
            <div className="number">{analytics.journalEntries}</div>
            <div className="label">Journal</div>
          </div>
        </div>

        {/* Initiation Ratio Insight */}
        {analytics.totalContacts > 5 && (
          <div className="playbook-card" style={{ marginBottom: 12 }}>
            <h4>Initiation Balance</h4>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <div style={{ flex: analytics.youInitiated, height: 8, background: 'var(--accent)', borderRadius: 4 }} />
              <div style={{ flex: analytics.sheInitiated || 1, height: 8, background: 'var(--success)', borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 12 }}>
              You: {analytics.youInitiated} · Her: {analytics.sheInitiated}
              {parseFloat(analytics.initiationRatio) > 1.2 && ' — She\'s chasing. Good position.'}
              {parseFloat(analytics.initiationRatio) < 0.5 && ' — You\'re doing most of the work. Pull back and see who notices.'}
              {parseFloat(analytics.initiationRatio) >= 0.5 && parseFloat(analytics.initiationRatio) <= 1.2 && ' — Balanced. Healthy dynamic.'}
            </p>
          </div>
        )}

        {/* Pipeline */}
        <div className="playbook-card" style={{ marginBottom: 12 }}>
          <h4>Pipeline</h4>
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {Object.entries(analytics.stages).map(([stage, count]) => (
              count > 0 && (
                <div key={stage} style={{
                  flex: count, padding: '6px 8px', borderRadius: 6,
                  background: stage === 'Exclusive' ? 'var(--success)' : stage === 'Dating' ? 'var(--accent)' : stage === 'Talking' ? 'var(--warning)' : 'var(--text-muted)',
                  color: 'white', fontSize: 11, fontWeight: 600, textAlign: 'center',
                }}>
                  {stage} {count}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Pattern Recognition */}
        {(topAttachment || topZodiac) && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title">Your Patterns</div>
            {topAttachment && (
              <div className="playbook-card">
                <h4>You're Drawn To: {topAttachment[0]} attachment ({topAttachment[1]}x)</h4>
                <p>
                  {topAttachment[0] === 'anxious' && 'Anxious women feel intense fast. It can feel like passion, but it\'s often fear. Worth questioning.'}
                  {topAttachment[0] === 'avoidant' && 'Avoidant women are a challenge. Chasing someone who runs can feel like a game. Ask yourself if you want to win or connect.'}
                  {topAttachment[0] === 'secure' && 'You\'re attracted to secure women. That\'s a sign your own attachment is healthy — or healing.'}
                  {topAttachment[0] === 'fearful' && 'Fearful-avoidant women are complicated. The hot-cold cycle can be addictive. Be honest about whether you\'re helping or being pulled in.'}
                </p>
              </div>
            )}
            {topZodiac && (
              <div className="playbook-card">
                <h4>Most Common Sign: {topZodiac[0]} ({topZodiac[1]}x)</h4>
                <p>You keep finding {topZodiac[0]}s. Coincidence or pattern? Think about what draws you to that energy.</p>
              </div>
            )}
          </div>
        )}

        {/* Best Dates */}
        {bestDates.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title">Best Dates</div>
            {bestDates.slice(0, 3).map((d, i) => (
              <div key={i} className="playbook-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4>{d.profileName} — {d.activity || 'Date'}</h4>
                  <span style={{ fontSize: 12, color: 'var(--warning)' }}>{'★'.repeat(d.howItWent)}</span>
                </div>
                {d.notes && <p>{d.notes}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Depth nudge in insights — gets deeper over time */}
        {depthLevel >= 2 && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ color: 'var(--accent-light)' }}>Deeper Intel</div>
            <div className="playbook-card" style={{ borderLeft: '3px solid var(--accent)' }}>
              {depthLevel === 2 && (
                <p style={{ fontStyle: 'italic' }}>
                  You've been at this for a while. The numbers tell one story. But the pattern underneath — who you choose, how you show up, what you avoid — that's the real data.
                </p>
              )}
              {depthLevel >= 3 && (
                <>
                  <h4>Honest Question</h4>
                  <p style={{ fontStyle: 'italic' }}>
                    {analytics.archivedCount > analytics.activeCount
                      ? 'You\'ve archived more women than you\'re actively seeing. The revolving door isn\'t the game — it\'s the symptom. What are you actually looking for?'
                      : analytics.connectionScore < 30
                        ? 'Your connection score is low. Lots of activity, not much depth. That\'s a choice. Is it the right one?'
                        : 'You\'re building real connections. The score reflects it. The question is: are you brave enough to go all-in on one of them?'}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Empty states */}
        {profiles.length === 0 && (
          <div className="empty-state" style={{ padding: 24 }}>
            <p>Add people to your roster to start seeing patterns.</p>
          </div>
        )}
      </div>
    </div>
  );
}
