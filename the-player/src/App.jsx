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
      default: return <ActionCenter onNavigate={navigate} />;
    }
  };

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
        <button className={`nav-item ${view === 'journal' ? 'active' : ''}`}
          onClick={() => navigate('journal')}>
          <span className="nav-icon">&#9998;</span>Journal
        </button>
        <button className={`nav-item ${view === 'insights' ? 'active' : ''}`}
          onClick={() => navigate('insights')}>
          <span className="nav-icon">&#9670;</span>Intel
        </button>
      </nav>
    </div>
  );
}
