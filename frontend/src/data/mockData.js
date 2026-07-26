// Comprehensive Mock Data & Presets for RSS HackMode ON - Level 3 Full RAG

export const HACKATHON_INFO = {
  headerBadge: "RSS HackMode ON | Rich System Solution Pvt Ltd",
  teamCode: "G24",
  level: "Level 3 — Full RAG",
  appName: "AI Mock Interview System",
  stack: "React + Node/Express + MongoDB + FastAPI + RAG (ChromaDB)",
  features: [
    "Role select + session log",
    "RAG on question bank — LLM answer feedback"
  ]
};

export const ROLES_CONFIG = [
  {
    id: "fullstack-rag",
    title: "Fullstack & AI/RAG Engineer",
    icon: "Cpu",
    category: "Engineering",
    description: "React, Node.js, FastAPI, Vector DBs (ChromaDB), Embeddings & Prompting",
    popularQuestionsCount: 42,
    difficultyLevels: ["Junior", "Mid-Level", "Senior", "Principal Lead"],
    defaultDifficulty: "Senior",
    targetCompanies: ["OpenAI", "Anthropic", "Google", "Rich Systems Solution", "Stripe"],
    topics: ["RAG Architecture", "Vector Embeddings", "React State Management", "FastAPI Endpoints", "MongoDB Indexing"]
  },
  {
    id: "react-frontend",
    title: "Senior Frontend Developer",
    icon: "Layout",
    category: "Frontend",
    description: "Modern React 18/19, Custom Hooks, Performance Optimization, WebSockets & Accessibility",
    popularQuestionsCount: 38,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Senior",
    targetCompanies: ["Vercel", "Meta", "Airbnb", "Microsoft", "Uber"],
    topics: ["Virtual DOM & Reconciliation", "React Fiber", "Custom Hooks & Context", "CSS Glassmorphism & Animations", "Web Vitals"]
  },
  {
    id: "fastapi-backend",
    title: "FastAPI & Python Backend Specialist",
    icon: "Server",
    category: "Backend",
    description: "Async Python, Pydantic, Microservices, MongoDB aggregation, & ChromaDB RAG pipelines",
    popularQuestionsCount: 35,
    difficultyLevels: ["Mid-Level", "Senior", "Lead"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["FastAPI Inc", "Databricks", "Amazon AWS", "Snowflake"],
    topics: ["AsyncIO Event Loop", "Dependency Injection", "ChromaDB Similarity Search", "JWT Authentication", "Database Indexing"]
  },
  {
    id: "system-design",
    title: "Distributed System Design Architect",
    icon: "Network",
    category: "Architecture",
    description: "High Availability, Cache Invalidation, Vector Search Scaling, Load Balancing & Sharding",
    popularQuestionsCount: 29,
    difficultyLevels: ["Senior", "Staff Architect"],
    defaultDifficulty: "Senior",
    targetCompanies: ["Netflix", "Meta", "Google Cloud", "Amazon"],
    topics: ["Vector Database Sharding", "RAG Pipeline Latency", "Consistent Hashing", "Message Queues (Kafka)", "CQRS Pattern"]
  },
  {
    id: "behavioral-hr",
    title: "Leadership & Behavioral STAR Method",
    icon: "Users",
    category: "Behavioral",
    description: "STAR Technique, Conflict Resolution, Technical Leadership, and Stakeholder Management",
    popularQuestionsCount: 25,
    difficultyLevels: ["Any Level"],
    defaultDifficulty: "Senior",
    targetCompanies: ["All Fortune 500 Companies"],
    topics: ["STAR Framework", "Handling Disagreements", "Deadlines Under Pressure", "Mentoring Juniors", "Prioritization"]
  }
];

export const INITIAL_QUESTION_BANK = [
  {
    id: "q-rag-01",
    roleId: "fullstack-rag",
    difficulty: "Senior",
    question: "Explain how you would architect a real-time Retrieval-Augmented Generation (RAG) pipeline using FastAPI, ChromaDB, and OpenAI embeddings, ensuring low-latency retrieval for technical interviews.",
    category: "RAG Architecture",
    expectedKeywords: ["Embedding", "Cosine Similarity", "ChromaDB", "Chunking", "Top-K Retrieval", "Latency Optimization", "Prompt Injection Defense"],
    ragBenchmark: {
      sourceDoc: "ChromaDB_RAG_Best_Practices_2026.pdf (Chunk #42)",
      similarityScore: 0.964,
      idealAnswerSummary: "A optimal low-latency RAG pipeline utilizes smart document chunking (256-512 tokens with 50-token overlap), pre-computed sentence-transformer embeddings cached in Redis, and asynchronous retrieval via FastAPI background tasks. ChromaDB executes HNSW vector search with cosine distance, returning top-k relevant chunks to prepend into the LLM system prompt.",
      starGuide: {
        situation: "Building a high-throughput mock interview platform with sub-second RAG response times.",
        task: "Reduce retrieval latency from 1.2s to under 150ms while improving context accuracy.",
        action: "Implemented semantic caching in Redis, configured HNSW vector indexing in ChromaDB, and parallelized chunk fetching using Python asyncio.",
        result: "Achieved 120ms average vector lookup latency with 94.8% response accuracy."
      }
    }
  },
  {
    id: "q-rag-02",
    roleId: "fullstack-rag",
    difficulty: "Senior",
    question: "How do you handle context window limits and chunk overlapping when storing technical question banks in ChromaDB?",
    category: "Vector Databases",
    expectedKeywords: ["Chunking Strategy", "Token Overlap", "Context Window", "HNSW", "Metadata Filtering", "Reranking"],
    ragBenchmark: {
      sourceDoc: "Vector_DB_Indexing_Standards.md (Chunk #18)",
      similarityScore: 0.938,
      idealAnswerSummary: "Questions and model answers should be split using recursive character text splitters with overlap (e.g. 10% overlap). Metadata filtering (role, difficulty, domain tags) narrows candidate sets before vector distance computation, maximizing context relevance within the 4k-8k LLM prompt window.",
      starGuide: {
        situation: "Long technical case studies exceeded LLM context windows during evaluation.",
        task: "Chunk source documents without severing code snippets or step-by-step math reasoning.",
        action: "Designed semantic splitter that preserves code block boundaries and adds 15% sliding window overlap.",
        result: "Eliminated context truncation errors while improving answer relevance scores by 28%."
      }
    }
  },
  {
    id: "q-fe-01",
    roleId: "react-frontend",
    difficulty: "Senior",
    question: "What is the difference between React 18 Concurrent Rendering and legacy synchronous rendering, and how does `useTransition` help maintain 60fps UI responsiveness during expensive live search operations?",
    category: "React Core",
    expectedKeywords: ["Concurrent Mode", "useTransition", "Fiber Reconciler", "Interruption", "Time Slicing", "Non-blocking UI"],
    ragBenchmark: {
      sourceDoc: "React18_Concurrent_Patterns.pdf (Chunk #07)",
      similarityScore: 0.952,
      idealAnswerSummary: "React 18 Concurrent Rendering allows React to pause, yield, and resume component rendering. `useTransition` marks updates as non-urgent transitions, allowing urgent user inputs (like typing or voice waveform renders) to take priority, preventing UI jank.",
      starGuide: {
        situation: "Live search in a 10,000 question database caused typing lag in candidate input fields.",
        task: "Ensure keystrokes register instantaneously while background filter updates render asynchronously.",
        action: "Wrapped vector similarity filter state inside `startTransition`, allowing input events to interrupt filter renders.",
        result: "Maintained consistent 60 FPS frame rates without needing artificial debouncing."
      }
    }
  },
  {
    id: "q-be-01",
    roleId: "fastapi-backend",
    difficulty: "Mid-Level",
    question: "How does async/await work under the hood in FastAPI with Uvicorn, and when should you use `def` vs `async def` route handlers?",
    category: "FastAPI",
    expectedKeywords: ["Event Loop", "GIL", "Thread Pool", "AsyncIO", "Uvicorn", "Non-blocking I/O"],
    ragBenchmark: {
      sourceDoc: "FastAPI_Internal_Architecture.md (Chunk #12)",
      similarityScore: 0.941,
      idealAnswerSummary: "FastAPI runs on an ASGI event loop (uvicorn). Use `async def` for non-blocking I/O operations (HTTP requests, vector DB queries, MongoDB async drivers). Regular `def` routes run inside an external thread pool managed by Starlette to prevent blocking the main event loop.",
      starGuide: {
        situation: "Blocking MongoDB calls reduced FastAPI server throughput to 50 requests/sec.",
        task: "Migrate sync database calls to async motor/beanie drivers.",
        action: "Converted all route handlers to `async def` and replaced synchronous PyMongo operations with Motor async awaitable calls.",
        result: "Boosted API throughput by 420% under concurrent stress testing."
      }
    }
  },
  {
    id: "q-sd-01",
    roleId: "system-design",
    difficulty: "Senior",
    question: "Design a high-scale Vector Search system serving 100M embeddings with sub-50ms p99 latency for AI mock interview benchmarking.",
    category: "Distributed Systems",
    expectedKeywords: ["Vector Sharding", "HNSW Index", "Quantization (PQ/SQ)", "Read Replicas", "Consistent Hashing", "Cache Layer"],
    ragBenchmark: {
      sourceDoc: "High_Scale_Vector_Engine.pdf (Chunk #89)",
      similarityScore: 0.971,
      idealAnswerSummary: "Architect a multi-tiered vector search using Product Quantization (PQ) for memory reduction, HNSW indexes partitioned across nodes via consistent hashing, and an in-memory Redis similarity cache for frequent interview prompt queries.",
      starGuide: {
        situation: "Embedding storage scaled past 50GB RAM, increasing latency to >800ms.",
        task: "Reduce memory footprint and maintain sub-50ms p99 retrieval for global users.",
        action: "Implemented scalar quantization (SQ8) to shrink embeddings by 75% and deployed 4 read-replica vector clusters behind round-robin load balancers.",
        result: "p99 retrieval dropped to 38ms with 70% lower infrastructure memory cost."
      }
    }
  },
  {
    id: "q-hr-01",
    roleId: "behavioral-hr",
    difficulty: "Senior",
    question: "Describe a situation where a critical backend dependency (e.g. ChromaDB or LLM API) failed right before a production hackathon demo. How did you handle it?",
    category: "STAR Behavioral",
    expectedKeywords: ["Fallback Mechanism", "Graceful Degradation", "Crisis Communication", "Root Cause Analysis", "Resilience"],
    ragBenchmark: {
      sourceDoc: "Leadership_Behavioral_Matrix.pdf (Chunk #03)",
      similarityScore: 0.915,
      idealAnswerSummary: "The ideal STAR answer details: Situation (LLM API rate limited during live demo), Task (Maintain seamless user experience without crashing), Action (Implemented dynamic client-side mock fallback & circuit breaker pattern), Result (Demo succeeded with 100% uptime and judge praise).",
      starGuide: {
        situation: "Third-party LLM service threw 429 Rate Limit errors 10 minutes before final project presentation.",
        task: "Prevent application crashes and provide continuous evaluation metrics for judges.",
        action: "Quickly enabled local fallback heuristic evaluation engine with pre-cached RAG embeddings and toast status notice.",
        result: "Judges awarded top scores for system resilience, error handling, and high-availability design."
      }
    }
  }
];

export const SAMPLE_SESSION_LOGS = [
  {
    id: "sess-2026-0726-01",
    timestamp: "2026-07-26T10:15:00Z",
    roleTitle: "Fullstack & AI/RAG Engineer",
    roleId: "fullstack-rag",
    difficulty: "Senior",
    candidateName: "Kushal Sonawane",
    mode: "Voice & Video",
    totalDuration: "14m 32s",
    overallScore: 92,
    breakdown: {
      technicalAccuracy: 95,
      ragSimilarityMatch: 94,
      starStructure: 88,
      clarityAndPacing: 91
    },
    fillerWordsCount: 4,
    averageWPM: 145,
    summary: "Exceptional mastery of RAG concepts, ChromaDB embedding indexes, and React 18 state management. Clear articulation using STAR framework.",
    questionsAnswered: [
      {
        questionId: "q-rag-01",
        questionText: "Explain how you would architect a real-time Retrieval-Augmented Generation (RAG) pipeline using FastAPI, ChromaDB, and OpenAI embeddings.",
        userAnswerText: "I architect RAG pipelines by first chunking incoming documents into 500-token blocks with a 50-token sliding overlap. We compute embeddings using OpenAI text-embedding-3-small and store them in ChromaDB with HNSW vector index. On query, FastAPI performs an async cosine similarity search, retrieves the top 3 chunks, and injects them as prompt context into the LLM system prompt.",
        score: 95,
        feedback: "Spot-on explanation of chunking, overlap, HNSW indexing, and async FastAPI execution. Excellent alignment with RAG benchmark guidelines.",
        ragContextMatch: 0.964,
        keyStrengths: ["Clear step-by-step vector workflow", "Mentioned sliding token overlap", "Understood HNSW index advantages"],
        improvements: ["Could mention semantic caching with Redis for recurring queries"]
      },
      {
        questionId: "q-rag-02",
        questionText: "How do you handle context window limits and chunk overlapping when storing technical question banks in ChromaDB?",
        userAnswerText: "We set maximum token limits per chunk and use recursive text splitters so code blocks aren't truncated mid-function. We also attach metadata like role, category, and difficulty to perform pre-filtering in ChromaDB before distance calculation.",
        score: 89,
        feedback: "Strong grasp of metadata pre-filtering and recursive text splitting.",
        ragContextMatch: 0.938,
        keyStrengths: ["Preserving code snippet integrity", "Metadata pre-filtering mention"],
        improvements: ["Add reranking models (e.g., Cohere Rerank) to further optimize top-k precision"]
      }
    ]
  },
  {
    id: "sess-2026-0725-02",
    timestamp: "2026-07-25T16:40:00Z",
    roleTitle: "Senior Frontend Developer",
    roleId: "react-frontend",
    difficulty: "Senior",
    candidateName: "Kushal Sonawane",
    mode: "Voice Only",
    totalDuration: "11m 10s",
    overallScore: 86,
    breakdown: {
      technicalAccuracy: 88,
      ragSimilarityMatch: 85,
      starStructure: 84,
      clarityAndPacing: 87
    },
    fillerWordsCount: 7,
    averageWPM: 132,
    summary: "Solid frontend React principles. Great explanation of Concurrent Mode and time slicing.",
    questionsAnswered: [
      {
        questionId: "q-fe-01",
        questionText: "What is the difference between React 18 Concurrent Rendering and legacy synchronous rendering, and how does useTransition help maintain 60fps UI responsiveness?",
        userAnswerText: "Concurrent React can pause rendering to handle urgent events. useTransition allows us to mark state updates as non-urgent so keystrokes remain smooth while background data filters complete.",
        score: 86,
        feedback: "Good core concept coverage. High similarity to vector benchmark source.",
        ragContextMatch: 0.952,
        keyStrengths: ["Correct use of useTransition concept", "User experience focus"],
        improvements: ["Elaborate on how React Fiber scheduler prioritizes lane priorities"]
      }
    ]
  }
];

export const CHROMADB_CHUNKS_MOCK = [
  {
    id: "vec-chk-001",
    documentName: "RAG_System_Architecture_V3.pdf",
    chunkIndex: 42,
    vectorDistance: 0.036,
    similarityScore: "96.4%",
    category: "RAG Architecture",
    tags: ["ChromaDB", "FastAPI", "Cosine", "Embeddings"],
    content: "Vector storage in ChromaDB utilizes Hierarchical Navigable Small World (HNSW) graphs. When processing interview queries, FastAPI routes query text through text-embedding-3-small to produce 1536-dimensional float vectors. Top-k lookup returns nearest question-answer pairs within 18ms."
  },
  {
    id: "vec-chk-002",
    documentName: "React18_Concurrent_Patterns.pdf",
    chunkIndex: 7,
    vectorDistance: 0.048,
    similarityScore: "95.2%",
    category: "Frontend Architecture",
    tags: ["React 18", "useTransition", "Fiber", "Virtual DOM"],
    content: "React 18 introduces Time Slicing via Fiber architecture. Concurrent tasks break rendering work into 5ms frames. `useTransition` allows developers to defer expensive matrix or graph computations without blocking the UI thread."
  },
  {
    id: "vec-chk-003",
    documentName: "FastAPI_Internal_Architecture.md",
    chunkIndex: 12,
    vectorDistance: 0.059,
    similarityScore: "94.1%",
    category: "Backend Microservices",
    tags: ["FastAPI", "Uvicorn", "AsyncIO", "Python"],
    content: "FastAPI utilizes Starlette for web routing and Pydantic for data validation. Asynchronous endpoint definitions execute directly on the uvloop event loop, handling thousands of concurrent non-blocking vector DB I/O queries per second."
  },
  {
    id: "vec-chk-004",
    documentName: "High_Scale_Vector_Engine.pdf",
    chunkIndex: 89,
    vectorDistance: 0.029,
    similarityScore: "97.1%",
    category: "Distributed Systems",
    tags: ["Scaling", "Sharding", "Product Quantization", "HNSW"],
    content: "High-scale vector engines deploy Product Quantization (PQ) to compress high-dimensional vector representations by 4x to 8x while preserving distance relationships, keeping 100 million embeddings resident in node memory."
  }
];

export const SYSTEM_STATS_MOCK = {
  totalSessionsCompleted: 24,
  averageRAGAccuracy: "91.8%",
  favoriteRole: "Fullstack & AI/RAG Engineer",
  skillsRadar: [
    { skill: "Technical Depth", score: 94 },
    { skill: "RAG & Vector DB", score: 96 },
    { skill: "System Architecture", score: 88 },
    { skill: "STAR Communication", score: 86 },
    { skill: "Code Execution", score: 92 },
    { skill: "Pacing & Clarity", score: 90 }
  ]
};
