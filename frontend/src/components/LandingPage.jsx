import React from 'react';
import { Play, Database, Mic, Sparkles, Award, ShieldCheck, FileText, ArrowRight, Zap, Code, Gamepad2, Layout, Server, Cpu, Users } from 'lucide-react';

export default function LandingPage({ onStartInterview, onExploreRag }) {
  const tracks = [
    { title: "Software Engineer", icon: Code, color: "var(--accent-indigo)", desc: "OOP, Data Structures, REST APIs & Algorithm Logic" },
    { title: "Game Developer", icon: Gamepad2, color: "var(--accent-cyan)", desc: "Unity, Unreal Engine, Game Loop, Physics & C++" },
    { title: "Frontend Developer", icon: Layout, color: "var(--accent-emerald)", desc: "HTML/CSS, JavaScript ES6, React State & UI Performance" },
    { title: "Backend Developer", icon: Server, color: "var(--accent-amber)", desc: "Node.js, FastAPI, SQL/MongoDB Indexing & Security" },
    { title: "AI & ML Engineer", icon: Cpu, color: "var(--accent-indigo)", desc: "Python, Machine Learning, RAG Pipelines & Vector DBs" },
    { title: "Behavioral & HR", icon: Users, color: "var(--accent-rose)", desc: "STAR Framework, Leadership, Conflict & Project Stories" }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      
      {/* 🚀 Hero Section */}
      <div className="panel-card" style={{
        padding: '48px 32px',
        marginBottom: '36px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: 'var(--accent-indigo-subtle)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <Sparkles size={16} color="var(--accent-indigo)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-indigo)' }}>RSS HackMode ON &bull; Team G24 Level 3 Full RAG</span>
        </div>

        <h1 style={{
          fontSize: 'calc(1.8rem + 1.5vw)',
          fontWeight: 800,
          color: 'var(--text-heading)',
          lineHeight: '1.2',
          maxWidth: '900px',
          margin: '0 auto 16px auto',
          letterSpacing: '-0.02em'
        }}>
          Master Technical Interviews with <span style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Vector RAG</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '740px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          Practice real-world technical interview questions with live voice dictation, ChromaDB HNSW vector similarity evaluation, and instant STAR scorecard feedback.
        </p>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <button
            onClick={onStartInterview}
            className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '12px' }}
          >
            <Play size={20} />
            Start AI Interview Session
          </button>

          <button
            onClick={onExploreRag}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-heading)',
              padding: '16px 28px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <Database size={18} color="var(--accent-cyan)" />
            Explore RAG Vector Engine
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-heading)' }}>6+ Tracks</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Specialized Career Roles</div>
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>100% Vector RAG</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ChromaDB Indexing</div>
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Sub-Second</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Evaluation Latency</div>
          </div>
        </div>
      </div>

      {/* 💡 Feature Cards Grid */}
      <h2 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '20px', fontWeight: 700, textAlign: 'center' }}>
        Why Candidates Choose Our AI Mock Interviewer
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px', marginBottom: '44px' }}>
        
        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-indigo-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Mic size={22} color="var(--accent-indigo)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: '8px' }}>
            Voice Dictation & WPM Meter
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Speak naturally into Microsoft Edge or Chrome. Features live talking pace telemetry (WPM) and mic input visualization.
          </p>
        </div>

        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-cyan-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Database size={22} color="var(--accent-cyan)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: '8px' }}>
            ChromaDB RAG Benchmarks
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Computes HNSW cosine vector distance between candidate speech and technical document chunks stored in ChromaDB.
          </p>
        </div>

        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-emerald-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Award size={22} color="var(--accent-emerald)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: '8px' }}>
            STAR Scorecard & Audio Readout
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Receive structured 4-metric scorecards (Technical, Vector, STAR, Clarity) with text-to-speech audio feedback.
          </p>
        </div>

        <div className="panel-card" style={{ padding: '24px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-amber-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <FileText size={22} color="var(--accent-amber)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 700, marginBottom: '8px' }}>
            1-Click Printable PDF Export
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Export clean, beautifully styled PDF interview reports formatted specifically for hiring managers, judges, and mentors.
          </p>
        </div>

      </div>

      {/* 🎯 Specialization Tracks Grid */}
      <div className="panel-card" style={{ padding: '32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)', fontWeight: 700 }}>Career Specialization Tracks</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>Pick your domain and start practicing with tailored question banks.</p>
          </div>
          <button onClick={onStartInterview} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Select Track <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {tracks.map((t, idx) => {
            const IconComponent = t.icon;
            return (
              <div key={idx} style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                transition: 'transform 0.15s ease, border-color 0.15s ease'
              }} className="panel-card-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <IconComponent size={20} color={t.color} />
                  <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-heading)' }}>{t.title}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🏁 Bottom Call to Action */}
      <div className="hero-banner" style={{ padding: '32px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '8px' }}>
          Ready to Ace Your Next Interview?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Start a 5-minute AI voice mock session and get instant vector-benchmarked feedback.
        </p>
        <button onClick={onStartInterview} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 700, margin: '0 auto' }}>
          <Play size={18} />
          Launch AI Mock Interview Now
        </button>
      </div>

    </div>
  );
}
