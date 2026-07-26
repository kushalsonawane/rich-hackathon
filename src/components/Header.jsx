import React from 'react';
import { Mic, Database, BarChart3, History, Settings, Zap, CheckCircle2, Cpu, Sun, Moon } from 'lucide-react';
import { HACKATHON_INFO } from '../data/mockData';

export default function Header({ activeTab, setActiveTab, apiConfig, setApiConfig, theme, toggleTheme }) {
  return (
    <header style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px',
      transition: 'background-color 0.2s ease, border-color 0.2s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        
        {/* Left Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'var(--accent-indigo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Zap size={20} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-indigo" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                {HACKATHON_INFO.headerBadge}
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                {HACKATHON_INFO.teamCode}
              </span>
            </div>
            
            <h1 style={{ fontSize: '1.15rem', marginTop: '1px', color: 'var(--text-heading)', fontWeight: 700 }}>
              {HACKATHON_INFO.appName}
            </h1>
          </div>
        </div>

        {/* Center Nav: Segmented Pill Controls */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          background: 'var(--bg-subtle)',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('interview')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 500,
              background: activeTab === 'interview' ? 'var(--accent-indigo)' : 'transparent',
              color: activeTab === 'interview' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Mic size={14} />
            Mock Interview
          </button>

          <button
            onClick={() => setActiveTab('session-logs')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 500,
              background: activeTab === 'session-logs' ? 'var(--accent-indigo)' : 'transparent',
              color: activeTab === 'session-logs' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <History size={14} />
            Session Logs
          </button>

          <button
            onClick={() => setActiveTab('rag-inspector')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 500,
              background: activeTab === 'rag-inspector' ? 'var(--accent-indigo)' : 'transparent',
              color: activeTab === 'rag-inspector' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Database size={14} />
            RAG Vector Bank
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 500,
              background: activeTab === 'analytics' ? 'var(--accent-indigo)' : 'transparent',
              color: activeTab === 'analytics' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <BarChart3 size={14} />
            Analytics
          </button>
        </nav>

        {/* Right Actions: Theme Toggle, API Pill & Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={15} color="var(--accent-amber)" /> : <Moon size={15} color="var(--accent-indigo)" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Backend API Toggle */}
          <button
            onClick={() => setApiConfig(prev => ({ ...prev, useRealBackend: !prev.useRealBackend }))}
            style={{
              background: apiConfig.useRealBackend ? 'var(--accent-emerald-subtle)' : 'var(--accent-indigo-subtle)',
              border: `1px solid ${apiConfig.useRealBackend ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
              color: apiConfig.useRealBackend ? 'var(--accent-emerald)' : 'var(--accent-indigo)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Toggle between Standalone RAG Client & Live FastAPI Backend"
          >
            {apiConfig.useRealBackend ? <CheckCircle2 size={13} /> : <Cpu size={13} />}
            {apiConfig.useRealBackend ? "Live Backend API" : "RAG Client Engine"}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="System Settings"
          >
            <Settings size={16} />
          </button>
        </div>

      </div>
    </header>
  );
}
