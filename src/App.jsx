import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InterviewHub from './components/InterviewHub';
import SessionLogs from './components/SessionLogs';
import RagInspector from './components/RagInspector';
import AnalyticsView from './components/AnalyticsView';
import SettingsModal from './components/SettingsModal';
import { API_CONFIG } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('interview');
  const [apiConfig, setApiConfig] = useState(API_CONFIG);
  const [localSessions, setLocalSessions] = useState([]);
  
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rss_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rss_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSessionComplete = (newSession) => {
    setLocalSessions((prev) => [newSession, ...prev]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
      
      {/* Top Professional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiConfig={apiConfig}
        setApiConfig={setApiConfig}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'interview' && (
          <InterviewHub
            onSessionComplete={handleSessionComplete}
            apiConfig={apiConfig}
          />
        )}

        {activeTab === 'session-logs' && (
          <SessionLogs localSessions={localSessions} />
        )}

        {activeTab === 'rag-inspector' && (
          <RagInspector />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}

        {activeTab === 'settings' && (
          <SettingsModal
            apiConfig={apiConfig}
            setApiConfig={setApiConfig}
            theme={theme}
            toggleTheme={toggleTheme}
            onClose={() => setActiveTab('interview')}
          />
        )}
      </main>

      {/* Clean Vercel-Style Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        fontSize: '0.8rem',
        color: 'var(--text-dim)',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>G24</span>
            <span style={{ color: 'var(--text-muted)' }}><strong>RSS HackMode ON | Rich System Solution Pvt Ltd</strong> &bull; Level 3 — Full RAG</span>
          </div>
          <div className="code-font" style={{ fontSize: '0.78rem' }}>
            React &bull; FastAPI &bull; Node/Express &bull; MongoDB &bull; ChromaDB
          </div>
        </div>
      </footer>

    </div>
  );
}
