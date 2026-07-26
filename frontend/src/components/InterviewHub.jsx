import React, { useState } from 'react';
import { ROLES_CONFIG } from '../data/mockData';
import { Cpu, Layout, Server, Network, Users, Gamepad2, Code, Sparkles, Upload, Play, Check, ShieldCheck, FileText } from 'lucide-react';
import LiveSession from './LiveSession';
import FeedbackView from './FeedbackView';

const ICON_MAP = {
  Cpu: Cpu,
  Code: Code,
  Gamepad2: Gamepad2,
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
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Hero Banner */}
      <div className="hero-banner" style={{ padding: '28px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-indigo">AI Mock Interview</span>
              <span className="badge badge-emerald">ChromaDB RAG Powered</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', fontWeight: 800 }}>Choose Your Interview Track</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.95rem' }}>
              Select a role track below and launch your voice-guided AI mock interview session.
            </p>
          </div>

          <button onClick={handleStartInterview} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600 }}>
            <Play size={20} />
            Start Interview Now
          </button>
        </div>
      </div>

      <div className="setup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        
        {/* Left Column: Role Track Selection Grid */}
        <div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)' }}>
            <Sparkles size={18} color="var(--accent-indigo)" />
            Select Specialization Track
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {ROLES_CONFIG.map((role) => {
              const IconComp = ICON_MAP[role.icon] || Cpu;
              const isSelected = selectedRole.id === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`panel-card ${isSelected ? 'panel-card-active' : 'panel-card-hover'}`}
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'var(--accent-indigo)',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Check size={14} />
                    </div>
                  )}

                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isSelected ? 'var(--accent-indigo-subtle)' : 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <IconComp size={22} color={isSelected ? 'var(--accent-indigo)' : 'var(--text-muted)'} />
                  </div>

                  <h4 style={{ fontSize: '1.05rem', marginBottom: '4px', color: 'var(--text-heading)', fontWeight: 700 }}>{role.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', minHeight: '38px', lineHeight: '1.4' }}>
                    {role.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {role.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} style={{
                        fontSize: '0.72rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        padding: '2px 8px',
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
        </div>

        {/* Right Column: Configuration & Launch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="panel-card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-heading)', fontWeight: 700 }}>Interview Settings</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Candidate Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Target Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem'
                }}
              >
                {selectedRole.difficultyLevels.map((lvl, i) => (
                  <option key={i} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Interview Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.9rem'
                }}
              >
                <option value="video">Voice & Video Feed</option>
                <option value="voice">Voice Only</option>
                <option value="text">Text Workspace</option>
              </select>
            </div>

            <button onClick={handleStartInterview} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
              <Play size={18} />
              Launch Session ({selectedRole.title})
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
