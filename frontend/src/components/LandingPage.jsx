import React from 'react';
import { ArrowRight, Terminal, Database, Mic, Shield, FileText, Code, Gamepad2, Layout, Server, Cpu, Users } from 'lucide-react';

export default function LandingPage({ onStartInterview, onExploreRag }) {
  const tracks = [
    { title: "Software Engineer", icon: Code, topics: "OOP • Data Structures • REST APIs" },
    { title: "Game Developer", icon: Gamepad2, topics: "Unity • Unreal Engine • Physics" },
    { title: "Frontend Developer", icon: Layout, topics: "React 18 • Hooks • Performance" },
    { title: "Backend Developer", icon: Server, topics: "FastAPI • Node.js • Databases" },
    { title: "AI & ML Engineer", icon: Cpu, topics: "RAG • Vector Search • LLM APIs" },
    { title: "Behavioral & HR", icon: Users, topics: "STAR Method • Team Stories" }
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '40px 16px' }}>
      
      {/* ── Sleek Minimalist Hero Section ─────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '20px' }}>
        
        {/* Monospace Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', padding: '5px 14px', borderRadius: '20px' }}>
          <span className="code-font" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            RSS HACKMODE ON &bull; G24 LEVEL 3 FULL RAG
          </span>
        </div>

        {/* Clean Heading */}
        <h1 style={{
          fontSize: 'calc(2.2rem + 1.2vw)',
          fontWeight: 800,
          color: 'var(--text-heading)',
          lineHeight: '1.15',
          letterSpacing: '-0.03em',
          maxWidth: '840px',
          margin: '0 auto 20px auto'
        }}>
          AI Mock Interviewer for Technical Engineers
        </h1>

        {/* Crisp Description */}
        <p style={{
          fontSize: '1.08rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto 36px auto',
          lineHeight: '1.6'
        }}>
          Practice real technical interviews using voice dictation, evaluated against ChromaDB vector embeddings with instant STAR scorecard benchmarks.
        </p>

        {/* Primary Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <button
            onClick={onStartInterview}
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 600, borderRadius: '8px' }}
          >
            Start Interview <ArrowRight size={18} />
          </button>

          <button
            onClick={onExploreRag}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-heading)',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <Database size={16} color="var(--accent-cyan)" />
            Inspect RAG Vector Bank
          </button>
        </div>
      </div>

      {/* ── Monospace Technical Architecture Card ───────────────────────── */}
      <div className="panel-card" style={{
        padding: '24px',
        marginBottom: '48px',
        background: '#09090b',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #18181b', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} color="#06b6d4" />
            <span className="code-font" style={{ fontSize: '0.82rem', color: '#a1a1aa', fontWeight: 600 }}>
              rag_evaluation_telemetry.json
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', background: '#18181b', padding: '3px 8px', borderRadius: '4px', color: '#10b981', fontFamily: 'monospace' }}>
            ● System Active (100% Standalone)
          </span>
        </div>

        <pre className="code-font" style={{
          fontSize: '0.84rem',
          color: '#e4e4e7',
          lineHeight: '1.7',
          margin: 0,
          overflowX: 'auto'
        }}>
          {`{
  "project": "AI Mock Interview System (G24)",
  "vector_store": "ChromaDB Persistent Client (HNSW Cosine Space)",
  "embedding_function": "sentence-transformers (all-MiniLM-L6-v2)",
  "speech_dictation": "Web Speech API (Chrome / Edge Engine)",
  "evaluation_metrics": ["Technical Depth", "Vector Distance", "STAR Structure", "Pacing WPM"],
  "export_formats": ["Printable PDF Scorecard", "JSON Transcript Log"]
}`}
        </pre>
      </div>

      {/* ── 3-Column Core Capabilities ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '56px' }}>
        
        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Mic size={20} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>Voice Dictation & WPM Meter</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Speak answers directly into the browser. Captures real-time audio waveforms, microphone levels, and words-per-minute pacing metrics.
          </p>
        </div>

        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Database size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>ChromaDB Vector Matching</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Computes exact HNSW cosine distance between spoken candidate answers and technical question bank embeddings stored in ChromaDB.
          </p>
        </div>

        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <FileText size={20} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>Printable PDF Scorecards</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Generates 1-click printable PDF scorecards with STAR metric breakdowns, audio read-aloud feedback, and transcript logs.
          </p>
        </div>

      </div>

      {/* ── Specialization Tracks ───────────────────────────────────────── */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', fontWeight: 700 }}>
            Specialization Tracks
          </h2>
          <button onClick={onStartInterview} style={{ background: 'none', border: 'none', color: 'var(--accent-indigo)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Launch Session <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {tracks.map((t, i) => {
            const IconComp = t.icon;
            return (
              <div
                key={i}
                onClick={onStartInterview}
                className="panel-card panel-card-hover"
                style={{ padding: '20px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <IconComp size={18} color="var(--accent-indigo)" />
                  <span style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)' }}>{t.title}</span>
                </div>
                <span className="code-font" style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                  {t.topics}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div className="panel-card" style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-panel)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
          Start Your AI Voice Mock Session
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Select a role track and receive instant vector-benchmarked feedback.
        </p>
        <button onClick={onStartInterview} className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, margin: '0 auto' }}>
          Launch Mock Session <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
