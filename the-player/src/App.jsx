import React, { useState } from 'react';
import Onboarding from './components/Onboarding.jsx';
import ActionCenter from './components/ActionCenter.jsx';
import ProfileList from './components/ProfileList.jsx';
import ProfileDetail from './components/ProfileDetail.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import Playbook from './components/Playbook.jsx';
import Insights from './components/Insights.jsx';
import Journal from './components/Journal.jsx';
import Settings from './components/Settings.jsx';
import ProfileGrader from './components/ProfileGrader.jsx';
import MyVoice from './components/MyVoice.jsx';
import DatePlanner from './components/DatePlanner.jsx';
import HerScanner from './components/HerScanner.jsx';
import useStore from './hooks/useStore.js';

export default function App() {
  const [view, setView] = useState('action');
  const [editingId, setEditingId] = useState(null);
  const user = useStore(s => s.user);
  const activeProfileId = useStore(s => s.activeProfileId);

  if (!user.onboarded) {
    return <Onboarding />;
  }

  const navigate = (v, opts = {}) => {
    if (opts.editId) setEditingId(opts.editId);
    else setEditingId(null);
    setView(v);
  };

  const renderView = () => {
    switch (view) {
      case 'action': return <ActionCenter onNavigate={navigate} />;
      case 'roster': return <ProfileList onNavigate={navigate} />;
      case 'detail': return <ProfileDetail onNavigate={navigate} />;
      case 'form': return <ProfileForm editingId={editingId} onNavigate={navigate} />;
      case 'playbook': return <Playbook onNavigate={navigate} />;
      case 'insights': return <Insights onNavigate={navigate} />;
      case 'journal': return <Journal onNavigate={navigate} />;
      case 'settings': return <Settings onNavigate={navigate} />;
      case 'grader': return <ProfileGrader onNavigate={navigate} />;
      case 'voice': return <MyVoice onNavigate={navigate} />;
      case 'planner': return <DatePlanner onNavigate={navigate} />;
      case 'scanner': return <HerScanner onNavigate={navigate} />;
      default: return <ActionCenter onNavigate={navigate} />;
    }
  };

  // Tools menu for secondary nav items
  const [showTools, setShowTools] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => navigate('action')} style={{ cursor: 'pointer' }}>THE PLAYER</h1>
        <div className="header-actions">
          <button className="btn-icon" onClick={() => navigate('settings')} title="Settings"
            style={{ fontSize: 14 }}>
            {user.name?.[0]?.toUpperCase() || '?'}
          </button>
          <button className="btn-icon" onClick={() => navigate('form')} title="Add new">+</button>
        </div>
      </header>
      <div className="content">
        {renderView()}
      </div>
      <nav className="bottom-nav">
        <button className={`nav-item ${view === 'action' ? 'active' : ''}`}
          onClick={() => navigate('action')}>
          <span className="nav-icon">&#9889;</span>Action
        </button>
        <button className={`nav-item ${view === 'roster' ? 'active' : ''}`}
          onClick={() => navigate('roster')}>
          <span className="nav-icon">&#9823;</span>Roster
        </button>
        <button className={`nav-item ${view === 'planner' ? 'active' : ''}`}
          onClick={() => navigate('planner')}>
          <span className="nav-icon">&#9734;</span>Plan
        </button>
        <button className={`nav-item ${view === 'journal' ? 'active' : ''}`}
          onClick={() => navigate('journal')}>
          <span className="nav-icon">&#9998;</span>Journal
        </button>
        <button className={`nav-item ${showTools ? 'active' : ''}`}
          onClick={() => setShowTools(!showTools)}>
          <span className="nav-icon">&#9776;</span>More
        </button>
      </nav>

      {/* Tools overlay */}
      {showTools && (
        <div style={{
          position: 'fixed', bottom: 56, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 480, background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
          padding: 16, zIndex: 99,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { id: 'grader', icon: '&#127942;', label: 'Profile Grader', desc: 'Grade your dating profile' },
              { id: 'scanner', icon: '&#128270;', label: 'Her Scanner', desc: 'Scan her profile + chaos rating' },
              { id: 'voice', icon: '&#127908;', label: 'My Voice', desc: 'Teach app your texting style' },
              { id: 'insights', icon: '&#9670;', label: 'Intel', desc: 'Analytics and patterns' },
            ].map(tool => (
              <button key={tool.id}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  padding: 12, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  color: 'var(--text-primary)',
                }}
                onClick={() => { navigate(tool.id); setShowTools(false); }}>
                <div dangerouslySetInnerHTML={{ __html: tool.icon }} style={{ fontSize: 20, marginBottom: 4 }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>{tool.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tool.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
