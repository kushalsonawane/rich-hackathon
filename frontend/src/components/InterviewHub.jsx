import React, { useState } from 'react';
import { ROLES_CONFIG } from '../data/mockData';
import { Cpu, Layout, Server, Network, Users, Sparkles, Upload, Play, Check, ShieldCheck, FileText } from 'lucide-react';
import LiveSession from './LiveSession';
import FeedbackView from './FeedbackView';

const ICON_MAP = {
  Cpu: Cpu,
  Layout: Layout,
  Server: Server,
  Network: Network,
  Users: Users
};

export default function InterviewHub({ onSessionComplete, apiConfig }) {
  const [step, setStep] = useState('setup');
  
  // Setup State
  const [selectedRole, setSelectedRole] = useState(ROLES_CONFIG[0]);
  const [difficulty, setDifficulty] = useState(ROLES_CONFIG[0].defaultDifficulty);
  const [targetCompany, setTargetCompany] = useState(ROLES_CONFIG[0].targetCompanies[0]);
  const [mode, setMode] = useState('video');
  const [customJd, setCustomJd] = useState('');
  const [candidateName, setCandidateName] = useState('Kushal Sonawane');
  const [isJdUploaded, setIsJdUploaded] = useState(false);

  // Active Session State
  const [completedEvaluation, setCompletedEvaluation] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setDifficulty(role.defaultDifficulty);
    setTargetCompany(role.targetCompanies[0]);
  };

  const handleJdDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      setCustomJd(`Job Description uploaded: ${file.name}. Vector targets: RAG similarity search, FastAPI async routes, MongoDB aggregation, React state management.`);
      setIsJdUploaded(true);
    }
  };

  const handleStartInterview = () => {
    setStep('live');
  };

  const handleFinishSession = (evaluationData) => {
    setCompletedEvaluation(evaluationData);
    setStep('feedback');
    if (onSessionComplete) {
      onSessionComplete(evaluationData);
    }
  };

  const handleRestart = () => {
    setCompletedEvaluation(null);
    setStep('setup');
  };

  if (step === 'live') {
    return (
      <LiveSession
        role={selectedRole}
        difficulty={difficulty}
        targetCompany={targetCompany}
        mode={mode}
        customJd={customJd}
        candidateName={candidateName}
        apiConfig={apiConfig}
        onComplete={handleFinishSession}
        onCancel={() => setStep('setup')}
      />
    );
  }

  if (step === 'feedback') {
    return (
      <FeedbackView
        evaluation={completedEvaluation}
        role={selectedRole}
        candidateName={candidateName}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Hero Banner */}
      <div className="hero-banner" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className="badge badge-indigo">AI Mock Interview Engine</span>
              <span className="badge badge-emerald">ChromaDB RAG Powered</span>
            </div>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-heading)', fontWeight: 800 }}>Configure Your AI Mock Interview</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px', maxWidth: '720px', fontSize: '1rem', lineHeight: '1.6' }}>
              Select a specialized technical track or upload your custom Job Description (JD) to generate vector-indexed mock questions benchmarked against top tech companies.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button onClick={handleStartInterview} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600 }}>
              <Play size={20} />
              Launch AI Mock Interview
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px' }}>
        
        {/* Left Column: Role Track Selection Grid */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-heading)' }}>
            <Sparkles size={20} color="var(--accent-indigo)" />
            Step 1: Choose Your Specialization Track
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px', marginBottom: '32px' }}>
            {ROLES_CONFIG.map((role) => {
              const IconComp = ICON_MAP[role.icon] || Cpu;
              const isSelected = selectedRole.id === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`panel-card ${isSelected ? 'panel-card-active' : 'panel-card-hover'}`}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'var(--accent-indigo)',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Check size={14} />
                    </div>
                  )}

                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isSelected ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconComp size={24} color={isSelected ? 'var(--accent-indigo)' : 'var(--text-muted)'} />
                  </div>

                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-heading)', fontWeight: 700 }}>{role.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', minHeight: '44px', lineHeight: '1.5' }}>
                    {role.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {role.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} style={{
                        fontSize: '0.74rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        color: 'var(--text-muted)'
                      }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Job Description Custom RAG Context Uploader */}
          <div className="panel-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-heading)' }}>
              <Upload size={20} color="var(--accent-cyan)" />
              Custom RAG Context (Target JD or Resume)
            </h3>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleJdDrop}
              style={{
                border: '2px dashed var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'center',
                background: 'var(--bg-panel)',
                cursor: 'pointer'
              }}
            >
              <FileText size={34} color="var(--accent-cyan)" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '0.95rem', color: 'var(--text-heading)', fontWeight: 600 }}>
                Drag & Drop Target Job Description (PDF / TXT) or paste text below
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                The RAG engine embeds your custom requirements into ChromaDB for personalized questioning.
              </p>

              <textarea
                value={customJd}
                onChange={(e) => setCustomJd(e.target.value)}
                placeholder="Paste Job Description text here (e.g. Seeking Senior React / Python Engineer with RAG vector search experience)..."
                style={{
                  width: '100%',
                  height: '90px',
                  marginTop: '14px',
                  padding: '12px',
                  fontSize: '0.88rem',
                  resize: 'none'
                }}
              />
              {isJdUploaded && (
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.88rem', fontWeight: 600 }}>
                  <ShieldCheck size={18} /> Custom RAG Embeddings Indexed Successfully!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Mode Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Candidate Profile Box */}
          <div className="panel-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-heading)', fontWeight: 700 }}>Candidate Profile</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Candidate Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Target Seniority Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '0.92rem'
                }}
              >
                {selectedRole.difficultyLevels.map((lvl, i) => (
                  <option key={i} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Target Company Benchmark</label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '0.92rem'
                }}
              >
                {selectedRole.targetCompanies.map((comp, i) => (
                  <option key={i} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Selector Box */}
          <div className="panel-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-heading)', fontWeight: 700 }}>Interview Mode</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: mode === 'video' ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                border: `1px solid ${mode === 'video' ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}>
                <input type="radio" name="interviewMode" checked={mode === 'video'} onChange={() => setMode('video')} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-heading)' }}>🎥 Webcam + AI Voice</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Full camera viewport & voice synthesis</div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: mode === 'voice' ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                border: `1px solid ${mode === 'voice' ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}>
                <input type="radio" name="interviewMode" checked={mode === 'voice'} onChange={() => setMode('voice')} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-heading)' }}>🎙️ Voice Only</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time audio waveform & speech TTS</div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: mode === 'text' ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                border: `1px solid ${mode === 'text' ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}>
                <input type="radio" name="interviewMode" checked={mode === 'text'} onChange={() => setMode('text')} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-heading)' }}>💬 Text Chat</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Written response input</div>
                </div>
              </label>
            </div>
          </div>

          {/* Quick Launch CTA */}
          <button onClick={handleStartInterview} className="btn-primary" style={{ width: '100%', padding: '16px', justifyContent: 'center', fontSize: '1.05rem', fontWeight: 700 }}>
            <Play size={20} />
            Launch AI Mock Interview
          </button>

        </div>

      </div>

    </div>
  );
}
