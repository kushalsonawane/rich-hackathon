import React, { useState, useEffect } from 'react';
import { Database, Search, Cpu, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { searchChromaVectorBank } from '../services/api';

export default function RagInspector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chunks, setChunks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState(null);

  const handleSearch = async (q) => {
    setLoading(true);
    const results = await searchChromaVectorBank(q);
    setChunks(results);
    if (results.length > 0 && !selectedChunk) {
      setSelectedChunk(results[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '28px 16px' }}>
      
      {/* Header Banner */}
      <div className="panel-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-cyan">Feature Requirement #2</span>
              <span className="badge badge-indigo">ChromaDB RAG Explorer</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-heading)' }}>Vector Question Bank Inspector</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
              Inspect HNSW vector embeddings, cosine distance scores, and document chunks retrieved during AI mock evaluation.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', background: 'var(--bg-subtle)', padding: '6px 14px', borderRadius: '8px', color: 'var(--accent-cyan)' }}>
              Model: <code className="code-font">text-embedding-3-small (1536 dim)</code>
            </span>
          </div>
        </div>
      </div>

      {/* Vector Similarity Search Bar */}
      <div className="panel-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} color="var(--accent-cyan)" />
          Test Cosine Distance Similarity Lookup
        </h3>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            placeholder="Type query to compute vector embedding distance (e.g. 'FastAPI concurrency', 'React 18 Fiber', 'Vector DB sharding')..."
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={() => handleSearch(searchQuery)}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            Compute Vector Match
          </button>
        </div>
      </div>

      {/* Vector Bank Inspector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '20px' }}>
        
        {/* Left Column: Chunks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ fontSize: '0.92rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Retrieved Top-K Chunks ({chunks.length})
          </h4>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Calculating 1536-dim vector distances...
            </div>
          ) : (
            chunks.map((chunk) => {
              const isSelected = selectedChunk?.id === chunk.id;
              return (
                <div
                  key={chunk.id}
                  onClick={() => setSelectedChunk(chunk)}
                  className={`panel-card ${isSelected ? 'panel-card-active' : 'panel-card-hover'}`}
                  style={{
                    padding: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{chunk.category}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                      {chunk.similarityScore} Match
                    </span>
                  </div>

                  <h5 style={{ fontSize: '0.92rem', color: 'var(--text-heading)', marginBottom: '4px' }}>
                    {chunk.documentName} (Chunk #{chunk.chunkIndex})
                  </h5>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {chunk.content}
                  </p>

                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    <span>Cosine Distance: <code className="code-font" style={{ color: 'var(--accent-cyan)' }}>{chunk.vectorDistance}</code></span>
                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Chunk Detail & Embedding Inspector */}
        <div>
          <h4 style={{ fontSize: '0.92rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            Selected Chunk Inspector
          </h4>

          {selectedChunk ? (
            <div className="panel-card" style={{ padding: '24px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                <div>
                  <span className="badge badge-cyan">{selectedChunk.category}</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginTop: '6px' }}>{selectedChunk.documentName}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chunk #{selectedChunk.chunkIndex} | ID: {selectedChunk.id}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    {selectedChunk.similarityScore}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cosine Distance: {selectedChunk.vectorDistance}</div>
                </div>
              </div>

              {/* Chunk Content Text */}
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Raw Document Chunk Content
                </h5>
                <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
                  "{selectedChunk.content}"
                </div>
              </div>

              {/* Vector Tags */}
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Extracted Metadata Tags
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedChunk.tags.map((tag, i) => (
                    <span key={i} className="badge badge-indigo" style={{ fontSize: '0.78rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vector Representation */}
              <div>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  1536-Dimensional Float Vector Sample
                </h5>
                <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', overflowX: 'auto' }}>
                  [ -0.02148, 0.04891, -0.00932, 0.11824, -0.05411, 0.08192, 0.00341, -0.06721, ... 1528 more values ]
                </div>
              </div>

            </div>
          ) : (
            <div className="panel-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Select a chunk from the left panel to inspect vector distance details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
