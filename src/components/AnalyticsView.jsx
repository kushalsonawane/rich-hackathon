import React from 'react';
import { SYSTEM_STATS_MOCK } from '../data/mockData';
import { BarChart3, Award, TrendingUp, Zap, Target, CheckCircle2 } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Header Banner */}
      <div className="panel-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-indigo">Candidate Insights</span>
              <span className="badge badge-emerald">RAG Analytics Engine</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-heading)' }}>Performance Analytics</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
              Aggregate analytics across all mock interviews, evaluating technical competence and speech structure.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
              Top Track: {SYSTEM_STATS_MOCK.favoriteRole}
            </span>
          </div>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        <div className="panel-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sessions Completed</span>
            <div style={{ background: 'var(--accent-indigo-subtle)', padding: '8px', borderRadius: '8px', color: 'var(--accent-indigo)' }}>
              <Target size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)' }}>{SYSTEM_STATS_MOCK.totalSessionsCompleted}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +4 sessions this week
          </div>
        </div>

        <div className="panel-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg RAG Match Score</span>
            <div style={{ background: 'var(--accent-emerald-subtle)', padding: '8px', borderRadius: '8px', color: 'var(--accent-emerald)' }}>
              <Award size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{SYSTEM_STATS_MOCK.averageRAGAccuracy}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Vector similarity top-k benchmark
          </div>
        </div>

        <div className="panel-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Speech Pacing WPM</span>
            <div style={{ background: 'var(--accent-cyan-subtle)', padding: '8px', borderRadius: '8px', color: 'var(--accent-cyan)' }}>
              <Zap size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>142 WPM</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            Optimal conversational rhythm
          </div>
        </div>

      </div>

      {/* Competency Ratings & Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Skills Competency Progress Bars */}
        <div className="panel-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color="var(--accent-indigo)" />
            Competency Radar Ratings
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SYSTEM_STATS_MOCK.skillsRadar.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-heading)', fontWeight: 500 }}>{item.skill}</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{item.score} / 100</span>
                </div>
                <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${item.score}%`,
                    height: '100%',
                    background: idx % 2 === 0 ? 'var(--accent-indigo)' : 'var(--accent-emerald)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations Box */}
        <div className="panel-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="var(--accent-emerald)" />
            AI Preparation Recommendations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--accent-indigo-subtle)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '4px' }}>1. RAG & Vector DB Terminology</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Your responses hit 94%+ vector similarity. Focus on specifying exact index structures (HNSW vs IVF-Flat) to impress senior interviewers.
              </p>
            </div>

            <div style={{ background: 'var(--accent-cyan-subtle)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '4px' }}>2. STAR Framework Consistency</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                State explicit numerical outcomes in your STAR answers (e.g., "Reduced p99 latency by 45%" instead of "Made it faster").
              </p>
            </div>

            <div style={{ background: 'var(--accent-emerald-subtle)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '4px' }}>3. Pacing & Pause Control</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Your average filler word count per session is only 4 words. Maintain this deliberate 140-150 WPM cadence.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
