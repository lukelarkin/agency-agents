import React, { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import ProfileList from './components/ProfileList.jsx';
import ProfileDetail from './components/ProfileDetail.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import Playbook from './components/Playbook.jsx';
import useStore from './hooks/useStore.js';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  const activeProfileId = useStore(s => s.activeProfileId);

  const navigate = (v, opts = {}) => {
    if (opts.editId) setEditingId(opts.editId);
    else setEditingId(null);
    setView(v);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'roster': return <ProfileList onNavigate={navigate} />;
      case 'detail': return <ProfileDetail onNavigate={navigate} />;
      case 'form': return <ProfileForm editingId={editingId} onNavigate={navigate} />;
      case 'playbook': return <Playbook onNavigate={navigate} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>THE PLAYER</h1>
        <div className="header-actions">
          <button className="btn-icon" onClick={() => navigate('form')} title="Add new">+</button>
        </div>
      </header>
      <div className="content">
        {renderView()}
      </div>
      <nav className="bottom-nav">
        <button className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('dashboard')}>
          <span className="nav-icon">◉</span>HQ
        </button>
        <button className={`nav-item ${view === 'roster' ? 'active' : ''}`} onClick={() => navigate('roster')}>
          <span className="nav-icon">♟</span>Roster
        </button>
        <button className={`nav-item ${view === 'playbook' && activeProfileId ? 'active' : ''}`}
          onClick={() => activeProfileId && navigate('playbook')}>
          <span className="nav-icon">⚡</span>Playbook
        </button>
      </nav>
    </div>
  );
}
