import React from 'react';
import { Settings, Server, Zap, Globe, Sliders, X, Sun, Moon } from 'lucide-react';
import { API_CONFIG } from '../services/api';

export default function SettingsModal({ apiConfig, setApiConfig, theme, toggleTheme, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={22} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)' }}>System & API Configuration</h3>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Theme Preference Option */}
          <div className="panel-box" style={{ padding: '16px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Color Theme Mode
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={toggleTheme}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {theme === 'dark' ? <Sun size={16} color="var(--accent-amber)" /> : <Moon size={16} color="var(--accent-indigo)" />}
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
              </button>
            </div>
          </div>

          {/* Execution Mode */}
          <div className="panel-box" style={{ padding: '16px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Execution Mode
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setApiConfig(prev => ({ ...prev, useRealBackend: false }))}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${!apiConfig.useRealBackend ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                  background: !apiConfig.useRealBackend ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                  color: !apiConfig.useRealBackend ? 'var(--accent-indigo)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                ⚡ Standalone RAG Mock Engine
              </button>

              <button
                onClick={() => setApiConfig(prev => ({ ...prev, useRealBackend: true }))}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${apiConfig.useRealBackend ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                  background: apiConfig.useRealBackend ? 'var(--accent-emerald-subtle)' : 'var(--bg-subtle)',
                  color: apiConfig.useRealBackend ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                🌐 Connect Live Backend API
              </button>
            </div>
          </div>

          {/* FastAPI Endpoint */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              FastAPI RAG & ChromaDB Base URL
            </label>
            <input
              type="text"
              value={apiConfig.fastapiRagUrl}
              onChange={(e) => setApiConfig({ ...apiConfig, fastapiRagUrl: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Express Endpoint */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Node/Express Session Storage Base URL
            </label>
            <input
              type="text"
              value={apiConfig.expressBaseUrl}
              onChange={(e) => setApiConfig({ ...apiConfig, expressBaseUrl: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* LLM Model Preset */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              RAG LLM Engine Benchmark Model
            </label>
            <select
              value={apiConfig.llmModel}
              onChange={(e) => setApiConfig({ ...apiConfig, llmModel: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.9rem'
              }}
            >
              <option value="Gemini / GPT-4o RAG Pipeline">Gemini 1.5 / GPT-4o RAG Pipeline</option>
              <option value="Local Llama 3 8B Vector Engine">Local Ollama / Llama-3 (Offline Vector)</option>
              <option value="Claude 3.5 Sonnet RAG">Claude 3.5 Sonnet RAG Benchmark</option>
            </select>
          </div>

          <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            Save & Apply Configurations
          </button>

        </div>

      </div>
    </div>
  );
}
