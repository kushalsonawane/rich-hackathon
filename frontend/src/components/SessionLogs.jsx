import React, { useState } from 'react';
import { SAMPLE_SESSION_LOGS } from '../data/mockData';
import { History, Search, Filter, Calendar, Award, Eye, Download, FileText, ChevronRight, X } from 'lucide-react';

export default function SessionLogs({ localSessions = [] }) {
  const allLogs = [...localSessions, ...SAMPLE_SESSION_LOGS];

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedSessionModal, setSelectedSessionModal] = useState(null);

  const filteredLogs = allLogs.filter((log) => {
    const matchesSearch = 
      log.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || log.roleId === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getScoreBadgeClass = (score) => {
    if (score >= 90) return 'badge-emerald';
    if (score >= 75) return 'badge-indigo';
    if (score >= 60) return 'badge-amber';
    return 'badge-cyan';
  };

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Header Banner */}
      <div className="panel-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-indigo">Feature Requirement #1</span>
              <span className="badge badge-cyan">Session Logs & History</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-heading)' }}>Interview Session Logs</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
              Review past candidate interview transcripts, RAG context matches, and detailed performance scores.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Total Logs Recorded: <strong style={{ color: 'var(--text-heading)' }}>{allLogs.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="panel-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, role title, or session ID..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              fontSize: '0.88rem'
            }}
          />
        </div>

        {/* Role Filter Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Roles</option>
            <option value="fullstack-rag">Fullstack & RAG Engineer</option>
            <option value="react-frontend">Senior Frontend</option>
            <option value="fastapi-backend">FastAPI Backend</option>
            <option value="system-design">System Design</option>
            <option value="behavioral-hr">STAR Behavioral</option>
          </select>
        </div>

      </div>

      {/* Logs Table */}
      <div className="panel-card" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '14px 20px' }}>Session ID & Date</th>
              <th style={{ padding: '14px 20px' }}>Candidate Name</th>
              <th style={{ padding: '14px 20px' }}>Role Track</th>
              <th style={{ padding: '14px 20px' }}>Mode</th>
              <th style={{ padding: '14px 20px' }}>Duration</th>
              <th style={{ padding: '14px 20px' }}>RAG Score</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No interview session logs matched your search filters.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s ease' }}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{log.id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Calendar size={12} /> {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px', color: 'var(--text-heading)', fontWeight: 500 }}>
                    {log.candidateName}
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ color: 'var(--text-main)' }}>{log.roleTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.difficulty}</div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: '0.78rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', padding: '3px 8px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                      {log.mode}
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                    {log.totalDuration}
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span className={`badge ${getScoreBadgeClass(log.overallScore)}`} style={{ fontSize: '0.82rem' }}>
                      <Award size={12} /> {log.overallScore} / 100
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedSessionModal(log)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <Eye size={14} /> View Transcript
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transcript Detail Modal */}
      {selectedSessionModal && (
        <div className="modal-overlay" onClick={() => setSelectedSessionModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '4px' }}>Session Log Transcript</span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)' }}>{selectedSessionModal.roleTitle} ({selectedSessionModal.difficulty})</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Candidate: {selectedSessionModal.candidateName} | Log ID: {selectedSessionModal.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedSessionModal(null)}
                style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Overall Metrics Bar */}
            <div className="panel-box" style={{ padding: '16px', marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{selectedSessionModal.overallScore}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overall Score</div>
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{selectedSessionModal.breakdown.technicalAccuracy}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tech Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>{selectedSessionModal.breakdown.ragSimilarityMatch}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RAG Match</div>
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-amber)' }}>{selectedSessionModal.fillerWordsCount}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filler Words</div>
              </div>
            </div>

            {/* Questions Transcript Replay */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-heading)' }}>Question & Answer Replay</h4>
              <button
                onClick={() => window.print()}
                className="btn-secondary no-print"
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              >
                Print Log Report
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedSessionModal.questionsAnswered?.map((q, idx) => (
                <div key={idx} className="panel-box" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      Question #{idx + 1} (Score: {q.score}/100)
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>
                      Vector Distance: {q.ragContextMatch || '0.850'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.95rem', color: 'var(--text-heading)', fontWeight: 600, marginBottom: '8px' }}>
                    "{q.questionText}"
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--bg-subtle)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid var(--accent-indigo)', marginBottom: '8px' }}>
                    "{q.userAnswerText}"
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--text-heading)' }}>RAG Feedback:</strong> {q.feedback}
                  </p>

                  {q.keyStrengths && q.keyStrengths.length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
                      ✓ Strengths: {q.keyStrengths.join(' | ')}
                    </div>
                  )}

                  {q.improvements && q.improvements.length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', marginTop: '2px' }}>
                      ⚠ Improvements: {q.improvements.join(' | ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
