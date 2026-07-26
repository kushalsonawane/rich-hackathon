// Unified API & AI Service Layer for RSS HackMode ON - Level 3 Full RAG
import { INITIAL_QUESTION_BANK, SAMPLE_SESSION_LOGS, CHROMADB_CHUNKS_MOCK } from '../data/mockData';

// Configurable API Endpoints
export const API_CONFIG = {
  expressBaseUrl: "http://localhost:5000/api",
  fastapiRagUrl: "http://localhost:8000/api",
  useRealBackend: false, // Toggled dynamically in UI
  llmModel: "Gemini / GPT-4o RAG Pipeline",
  temperature: 0.7
};

/**
 * Fetch Questions from RAG Engine
 */
export async function fetchQuestionsByRole(roleId, difficulty = "Senior", customJd = "") {
  if (API_CONFIG.useRealBackend) {
    try {
      const res = await fetch(`${API_CONFIG.fastapiRagUrl}/questions?role=${roleId}&difficulty=${difficulty}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customJd })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Backend unavailable, using RAG Mock Engine", err);
    }
  }

  // Fallback to local RAG mock engine
  await new Promise((resolve) => setTimeout(resolve, 600)); // Realistic network latency simulation
  let filtered = INITIAL_QUESTION_BANK.filter((q) => q.roleId === roleId || roleId === "all");
  
  if (filtered.length === 0) {
    filtered = INITIAL_QUESTION_BANK;
  }

  if (customJd && customJd.trim().length > 10) {
    // Generate a tailored RAG question based on custom JD text!
    const customQuestion = {
      id: `q-custom-${Date.now()}`,
      roleId: roleId,
      difficulty: difficulty,
      question: `[Custom JD RAG Match] Based on your target JD: How would you address real-time concurrency, vector database latency, and failover strategy for "${customJd.slice(0, 60)}..."?`,
      category: "Target JD Custom Focus",
      expectedKeywords: ["Concurrency", "Vector DB", "Failover", "Latency", "Caching"],
      ragBenchmark: {
        sourceDoc: "Parsed_Custom_Job_Description.pdf (Chunk #01)",
        similarityScore: 0.978,
        idealAnswerSummary: "An optimal answer aligns directly with the target requirements: high concurrency with async routes, low-latency vector similarity lookup, and automated failover circuits.",
        starGuide: {
          situation: "High traffic requirement specified in candidate's uploaded Job Description.",
          task: "Architect system to withstand spike demands without service disruption.",
          action: "Utilized asynchronous job queues, vector indexing, and fallback caching.",
          result: "Exceeded SLA requirements with 99.99% uptime."
        }
      }
    };
    return [customQuestion, ...filtered];
  }

  return filtered;
}

/**
 * Evaluate Candidate Answer via LLM + RAG Benchmark Engine
 */
export async function evaluateAnswer(question, userAnswer, audioMetrics = {}) {
  if (API_CONFIG.useRealBackend) {
    try {
      const res = await fetch(`${API_CONFIG.fastapiRagUrl}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, userAnswer, audioMetrics })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Real backend evaluation failed, using intelligent client-side RAG evaluator.", err);
    }
  }

  // Intelligent client-side RAG evaluation algorithm
  await new Promise((resolve) => setTimeout(resolve, 1400)); // Simulate LLM processing

  const userText = userAnswer.toLowerCase();
  const keywords = question.expectedKeywords || [];
  
  // Calculate keyword coverage
  let matchedCount = 0;
  keywords.forEach(kw => {
    if (userText.includes(kw.toLowerCase())) matchedCount++;
  });
  
  const keywordRatio = keywords.length > 0 ? matchedCount / keywords.length : 0.7;
  const wordCount = userAnswer.trim().split(/\s+/).length;
  
  // Scoring Math
  let techScore = Math.min(98, Math.max(65, Math.round(70 + keywordRatio * 25 + Math.min(10, wordCount / 15))));
  let ragMatch = Math.min(99, Math.max(78, Math.round(82 + keywordRatio * 15)));
  let starScore = wordCount > 40 ? Math.min(96, Math.round(75 + (wordCount / 100) * 15)) : 70;
  let clarityScore = Math.min(95, Math.max(75, 90 - (audioMetrics.fillerCount || 0) * 3));
  
  let overall = Math.round((techScore * 0.4) + (ragMatch * 0.25) + (starScore * 0.2) + (clarityScore * 0.15));

  // Dynamic feedback synthesis
  const strengths = [];
  const improvements = [];

  if (matchedCount > 0) {
    strengths.push(`Mentioned key technical concepts: ${keywords.filter(k => userText.includes(k.toLowerCase())).join(", ") || "core architecture terminology"}.`);
  } else {
    strengths.push("Good attempt at explaining high-level system flow.");
  }

  if (wordCount > 50) {
    strengths.push("Detailed response with sufficient depth and structural context.");
  } else {
    improvements.push("Expand answer detail. Aim for 80-120 words using the STAR (Situation, Task, Action, Result) method.");
  }

  if (keywords.some(k => !userText.includes(k.toLowerCase()))) {
    const missing = keywords.filter(k => !userText.includes(k.toLowerCase())).slice(0, 3);
    improvements.push(`Include specific terminology benchmarked in vector DB: ${missing.join(", ")}.`);
  }

  return {
    score: overall,
    breakdown: {
      technicalAccuracy: techScore,
      ragSimilarityMatch: ragMatch,
      starStructure: starScore,
      clarityAndPacing: clarityScore
    },
    ragContextMatch: (ragMatch / 100).toFixed(3),
    ragBenchmark: question.ragBenchmark,
    feedback: overall >= 85 
      ? "Outstanding response! Excellent technical precision and strong alignment with vector-indexed benchmarks."
      : "Good foundational response. Incorporating explicit metrics and benchmark terminology will boost your score.",
    keyStrengths: strengths,
    improvements: improvements.length > 0 ? improvements : ["Incorporate specific quantitative performance benchmarks (e.g. latency numbers or throughput metrics)."]
  };
}

/**
 * Save Completed Session
 */
export async function saveSessionLog(sessionData) {
  if (API_CONFIG.useRealBackend) {
    try {
      await fetch(`${API_CONFIG.expressBaseUrl}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData)
      });
    } catch (err) {
      console.warn("Backend save failed, saved to local state.", err);
    }
  }
  return sessionData;
}

/**
 * ChromaDB Similarity Vector Search Inspector
 */
export async function searchChromaVectorBank(queryText) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!queryText || queryText.trim() === "") return CHROMADB_CHUNKS_MOCK;

  const qLower = queryText.toLowerCase();
  return CHROMADB_CHUNKS_MOCK.map((chunk) => {
    const textLower = chunk.content.toLowerCase() + " " + chunk.tags.join(" ").toLowerCase();
    let score = 0.85;
    if (textLower.includes(qLower)) score = 0.975;
    else if (qLower.split(" ").some(w => textLower.includes(w) && w.length > 3)) score = 0.912;
    
    return {
      ...chunk,
      vectorDistance: (1 - score).toFixed(3),
      similarityScore: `${(score * 100).toFixed(1)}%`
    };
  }).sort((a, b) => parseFloat(b.similarityScore) - parseFloat(a.similarityScore));
}
