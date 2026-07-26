import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Download, Sparkles, Database, FileText, Printer, Volume2, VolumeX } from 'lucide-react';

export default function FeedbackView({ evaluation, role, candidateName, onRestart }) {
  const [speakingIdx, setSpeakingIdx] = useState(null);

  if (!evaluation) return null;

  const { overallScore, breakdown, questionsAnswered, totalDuration, fillerWordsCount, averageWPM } = evaluation;

  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--accent-emerald)';
    if (score >= 75) return 'var(--accent-indigo)';
    if (score >= 60) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(evaluation, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `RSS_RAG_Interview_Report_${evaluation.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleSpeakFeedback = (qEval, idx) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `Question ${idx + 1}: ${qEval.questionText}. Your score is ${qEval.score} out of 100. Strengths: ${qEval.keyStrengths?.join('. ')}. Improvements: ${qEval.improvements?.join('. ')}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;

    utterance.onstart = () => setSpeakingIdx(idx);
    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Header Banner */}
      <div className="hero-banner" style={{ padding: '28px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-emerald">RAG Evaluation Completed</span>
              <span className="badge badge-indigo">{role.title}</span>
            </div>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--text-heading)', fontWeight: 800 }}>RAG Benchmark Performance Feedback</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Candidate: <strong style={{ color: 'var(--text-heading)' }}>{candidateName}</strong> | Interview Duration: <strong style={{ color: 'var(--accent-cyan)' }}>{totalDuration}</strong>
            </p>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={handlePrintPdf} className="btn-secondary">
              <Printer size={18} /> Print / Export PDF
            </button>
            <button onClick={handleExportJson} className="btn-secondary">
              <Download size={18} /> Export JSON Report
            </button>
            <button onClick={onRestart} className="btn-primary">
              <RotateCcw size={18} /> Start New Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Scorecard & Breakdown Grid */}
      <div className="feedback-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', marginBottom: '28px' }}>
        
        {/* Left Column: Overall Score Card */}
        <div className="panel-card" style={{ padding: '28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Overall RAG Benchmark Score
          </span>

          <div style={{
            fontSize: '4.2rem',
            fontWeight: 800,
            color: getScoreColor(overallScore),
            margin: '12px 0',
            lineHeight: 1
          }}>
            {overallScore}
            <span style={{ fontSize: '1.6rem', color: 'var(--text-muted)' }}>/100</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <Award size={18} color={getScoreColor(overallScore)} />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)' }}>
              {overallScore >= 90 ? 'High Mastery' : overallScore >= 75 ? 'Strong Senior Level' : 'Needs Practice'}
            </span>
          </div>

          <div style={{ marginTop: '20px', width: '100%', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>
              <div style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1.1rem' }}>{fillerWordsCount}</div>
              <div>Filler Words</div>
            </div>
            <div>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '1.1rem' }}>{averageWPM}</div>
              <div>Words/Min Rate</div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Metric Meters */}
        <div className="panel-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '20px', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent-indigo)" />
            RAG Evaluation Metric Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Technical Accuracy */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Technical Accuracy & Concept Depth</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{breakdown.technicalAccuracy}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${breakdown.technicalAccuracy}%`, height: '100%', background: 'var(--accent-emerald)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* RAG Vector Match */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>ChromaDB Vector Similarity</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{breakdown.ragSimilarityMatch}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${breakdown.ragSimilarityMatch}%`, height: '100%', background: 'var(--accent-cyan)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* STAR Structure */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>STAR Framework Structure</span>
                <span style={{ color: 'var(--accent-indigo)', fontWeight: 700 }}>{breakdown.starStructure}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${breakdown.starStructure}%`, height: '100%', background: 'var(--accent-indigo)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Clarity & Pacing */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Communication & Speech Pacing</span>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{breakdown.clarityAndPacing}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${breakdown.clarityAndPacing}%`, height: '100%', background: 'var(--accent-amber)', borderRadius: '4px' }} />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Question-by-Question Section */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileText size={20} color="var(--accent-cyan)" />
        Question-by-Question RAG Benchmark Comparison
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {questionsAnswered.map((qEval, idx) => (
          <div key={idx} className="panel-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-indigo">Question #{idx + 1}</span>
                <button
                  onClick={() => handleSpeakFeedback(qEval, idx)}
                  className="no-print"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    fontSize: '0.78rem',
                    borderRadius: '12px',
                    border: speakingIdx === idx ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    background: speakingIdx === idx ? 'var(--accent-emerald-subtle)' : 'var(--bg-subtle)',
                    color: speakingIdx === idx ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {speakingIdx === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  {speakingIdx === idx ? 'Stop Audio' : '🔊 Listen to AI Feedback'}
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Vector Distance: {qEval.ragContextMatch}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: getScoreColor(qEval.score) }}>
                  Score: {qEval.score} / 100
                </span>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '16px', lineHeight: '1.4', fontWeight: 700 }}>
              "{qEval.questionText}"
            </h4>

            {/* Side-by-side Answer Diff */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              
              {/* Candidate Answer */}
              <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Your Submitted Response
                </span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5', fontStyle: 'italic' }}>
                  "{qEval.userAnswerText}"
                </p>
              </div>

              {/* RAG Ideal Answer */}
              <div style={{ background: 'var(--accent-indigo-subtle)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Database size={14} color="var(--accent-indigo)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    Vector DB Ideal Answer ({qEval.ragBenchmark?.sourceDoc})
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5' }}>
                  {qEval.ragBenchmark?.idealAnswerSummary}
                </p>
              </div>

            </div>

            {/* Strengths & Improvements */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </span>
                <ul style={{ marginTop: '6px', paddingLeft: '20px', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                  {qEval.keyStrengths?.map((str, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{str}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-amber)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} /> Suggested Improvements
                </span>
                <ul style={{ marginTop: '6px', paddingLeft: '20px', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                  {qEval.improvements?.map((imp, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
