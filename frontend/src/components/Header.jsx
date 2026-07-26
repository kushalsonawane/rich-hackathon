import React from 'react';
import { Mic, Database, BarChart3, History, Settings, Zap, CheckCircle2, Cpu, Sun, Moon } from 'lucide-react';
import { HACKATHON_INFO } from '../data/mockData';

export default function Header({ activeTab, setActiveTab, apiConfig, setApiConfig, theme, toggleTheme }) {
  return (
    <header style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'var(--accent-indigo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Zap size={18} />
          </div>

          <div>
            <h1 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, lineHeight: 1.2 }}>
              AI Mock Interview
            </h1>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              G24 — Level 3 Full RAG
            </span>
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
        </nav>

        {/* Right Action: Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
        </div>

      </div>
    </header>
  );
}
