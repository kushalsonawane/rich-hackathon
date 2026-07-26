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
    id: "software-engineer",
    title: "Software Engineer",
    icon: "Code",
    category: "General Tech",
    description: "Data Structures, OOP, Web APIs, Databases & Problem Solving",
    popularQuestionsCount: 45,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["Google", "Microsoft", "Amazon", "Tech Startups"],
    topics: ["Object-Oriented Programming", "Arrays vs Linked Lists", "REST APIs", "Debugging", "Algorithms"]
  },
  {
    id: "game-developer",
    title: "Game Developer",
    icon: "Gamepad2",
    category: "Game Dev",
    description: "Unity, Unreal Engine, C++, Game Physics, 3D Rendering & Game Logic",
    popularQuestionsCount: 38,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["EA Games", "Ubisoft", "Epic Games", "Indie Game Studios"],
    topics: ["Game Loop", "Collision Detection", "Unity & C#", "Unreal Engine", "Physics Engine"]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    icon: "Layout",
    category: "Frontend",
    description: "HTML, CSS, JavaScript, React, Responsive Layouts & Web UI",
    popularQuestionsCount: 40,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["Vercel", "Meta", "Airbnb", "Uber"],
    topics: ["HTML & CSS", "JavaScript ES6", "React State & Props", "Responsive UI", "Web Performance"]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    icon: "Server",
    category: "Backend",
    description: "Node.js, Python, Databases, REST APIs, Security & Server Logic",
    popularQuestionsCount: 36,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["Amazon AWS", "Stripe", "FastAPI", "MongoDB"],
    topics: ["Node.js / Express", "Python & FastAPI", "SQL & MongoDB", "Authentication (JWT)", "API Endpoints"]
  },
  {
    id: "ai-ml-engineer",
    title: "AI & ML Engineer",
    icon: "Cpu",
    category: "AI & ML",
    description: "Python, Machine Learning, LLMs, RAG & Vector Embeddings",
    popularQuestionsCount: 30,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["OpenAI", "Anthropic", "Google AI", "Hugging Face"],
    topics: ["RAG Architecture", "Vector Databases", "Prompt Engineering", "Python ML", "LLM APIs"]
  },
  {
    id: "behavioral-hr",
    title: "Behavioral & HR STAR",
    icon: "Users",
    category: "Behavioral",
    description: "STAR Method, Teamwork, Communication, Problem Solving & Stories",
    popularQuestionsCount: 25,
    difficultyLevels: ["Junior", "Mid-Level", "Senior"],
    defaultDifficulty: "Mid-Level",
    targetCompanies: ["All IT & Tech Companies"],
    topics: ["STAR Framework", "Team Collaboration", "Project Story", "Handling Pressure", "Strengths"]
  }
];

export const INITIAL_QUESTION_BANK = [
  // ── Software Engineer Track ───────────────────────────────────────────
  {
    id: "q-se-01",
    roleId: "software-engineer",
    difficulty: "Junior",
    question: "What is Object-Oriented Programming (OOP) and what are its core principles like Encapsulation and Inheritance?",
    category: "OOP Basics",
    expectedKeywords: ["OOP", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    ragBenchmark: {
      sourceDoc: "Software_Engineering_Fundamentals.pdf (Chunk #01)",
      similarityScore: 0.950,
      idealAnswerSummary: "Object-Oriented Programming organizes code into classes and objects. Its core principles are Encapsulation (bundling data), Inheritance (reusing code), Polymorphism (multiple forms), and Abstraction (hiding implementation details).",
      starGuide: {
        situation: "Designing a clean software system.",
        task: "Structure code for easy maintenance and reuse.",
        action: "Used OOP classes and inheritance patterns.",
        result: "Reduced duplicated code and improved system maintainability."
      }
    }
  },
  {
    id: "q-se-02",
    roleId: "software-engineer",
    difficulty: "Mid-Level",
    question: "What is the difference between an Array and a Linked List, and when would you choose one over the other?",
    category: "Data Structures",
    expectedKeywords: ["Array", "Linked List", "Memory", "Index Lookup", "Insertion"],
    ragBenchmark: {
      sourceDoc: "Data_Structures_Guide.pdf (Chunk #04)",
      similarityScore: 0.940,
      idealAnswerSummary: "Arrays store elements in contiguous memory allowing fast O(1) index access. Linked Lists store elements in nodes with pointers, making insertions and deletions fast O(1) without needing memory reallocation.",
      starGuide: {
        situation: "Building a data queue with frequent insertions.",
        task: "Choose optimal data structure for speed.",
        action: "Selected a Linked List structure to avoid array resize overhead.",
        result: "Achieved fast O(1) insertions."
      }
    }
  },

  // ── Game Developer Track ──────────────────────────────────────────────
  {
    id: "q-gd-01",
    roleId: "game-developer",
    difficulty: "Junior",
    question: "What is the Game Loop in game engines like Unity or Unreal, and what happens during the Update vs FixedUpdate functions?",
    category: "Game Dev Basics",
    expectedKeywords: ["Game Loop", "Update", "FixedUpdate", "Frame Rate", "Physics"],
    ragBenchmark: {
      sourceDoc: "Game_Development_Fundamentals.pdf (Chunk #01)",
      similarityScore: 0.960,
      idealAnswerSummary: "The Game Loop runs continuously every frame. Update() is called every visual frame for user input and rendering. FixedUpdate() runs at a fixed time interval for consistent physics calculations.",
      starGuide: {
        situation: "Character movement felt jittery on different monitors.",
        task: "Fix frame-rate dependent movement.",
        action: "Moved physics movement calculations into FixedUpdate using Time.fixedDeltaTime.",
        result: "Smooth physics movement across all screen frame rates."
      }
    }
  },
  {
    id: "q-gd-02",
    roleId: "game-developer",
    difficulty: "Mid-Level",
    question: "How does collision detection work in 2D or 3D games, and what is the difference between a Collider and a Trigger?",
    category: "Game Physics",
    expectedKeywords: ["Collision", "Collider", "Trigger", "RigidBody", "Physics Engine"],
    ragBenchmark: {
      sourceDoc: "Unity_Physics_Guide.pdf (Chunk #03)",
      similarityScore: 0.940,
      idealAnswerSummary: "Colliders block objects from passing through each other using physical collision boundaries. Triggers detect when an object enters an area without causing a physical bounce, useful for picking up items or activating checkpoints.",
      starGuide: {
        situation: "Creating item pickups in a game level.",
        task: "Detect player touching item without stopping player movement.",
        action: "Configured item colliders as Triggers and handled OnTriangleEnter events.",
        result: "Items picked up smoothly without blocking player motion."
      }
    }
  },

  // ── Frontend Developer Track ──────────────────────────────────────────
  {
    id: "q-fe-01",
    roleId: "frontend-developer",
    difficulty: "Junior",
    question: "What is the difference between HTML, CSS, and JavaScript when building web pages?",
    category: "Web Basics",
    expectedKeywords: ["HTML", "CSS", "JavaScript", "DOM", "Styling"],
    ragBenchmark: {
      sourceDoc: "Web_Development_Intro.pdf (Chunk #01)",
      similarityScore: 0.950,
      idealAnswerSummary: "HTML provides structure (headings, text, buttons). CSS provides visual layout and styling (colors, fonts, flexbox). JavaScript adds interactivity and dynamic logic.",
      starGuide: {
        situation: "Building a interactive website form.",
        task: "Structure, style, and add dynamic form validation.",
        action: "Wrote HTML elements, styled with CSS, and validated fields with JavaScript.",
        result: "Created an attractive, interactive web page."
      }
    }
  },
  {
    id: "q-fe-02",
    roleId: "frontend-developer",
    difficulty: "Mid-Level",
    question: "What is React state, and how do you update component state when a user interacts with a button?",
    category: "React Basics",
    expectedKeywords: ["State", "useState", "Handler", "Re-render", "Event"],
    ragBenchmark: {
      sourceDoc: "React_State_Management.pdf (Chunk #02)",
      similarityScore: 0.940,
      idealAnswerSummary: "State is dynamic data managed by useState. When an onClick event fires, calling the state setter function updates the value and triggers React to re-render the component.",
      starGuide: {
        situation: "Building a shopping cart item counter.",
        task: "Update quantity dynamically when user clicks '+' button.",
        action: "Created a count state with useState and updated it in the button click handler.",
        result: "UI updated instantly showing new item count."
      }
    }
  },

  // ── Backend Developer Track ───────────────────────────────────────────
  {
    id: "q-be-01",
    roleId: "backend-developer",
    difficulty: "Junior",
    question: "How do REST APIs work and what are the common HTTP request methods like GET, POST, and DELETE?",
    category: "API Basics",
    expectedKeywords: ["REST API", "GET", "POST", "DELETE", "HTTP", "JSON"],
    ragBenchmark: {
      sourceDoc: "REST_API_Fundamentals.pdf (Chunk #01)",
      similarityScore: 0.950,
      idealAnswerSummary: "REST APIs use HTTP protocols to exchange JSON data. GET retrieves data, POST creates new data, PUT updates data, and DELETE removes data.",
      starGuide: {
        situation: "Building backend API endpoints for a task app.",
        task: "Create RESTful routes for tasks.",
        action: "Defined GET /tasks, POST /tasks, and DELETE /tasks endpoints.",
        result: "Clean REST API integration between frontend and backend."
      }
    }
  },
  {
    id: "q-be-02",
    roleId: "backend-developer",
    difficulty: "Mid-Level",
    question: "What is a database index, and how does it speed up queries in SQL or MongoDB databases?",
    category: "Databases",
    expectedKeywords: ["Index", "Query Speed", "B-Tree", "MongoDB", "Performance"],
    ragBenchmark: {
      sourceDoc: "Database_Indexing.pdf (Chunk #03)",
      similarityScore: 0.930,
      idealAnswerSummary: "An index is a data structure (like a B-Tree) that allows the database to look up rows directly without scanning every document in a collection.",
      starGuide: {
        situation: "User lookup query taking over 2 seconds on large database.",
        task: "Optimize query execution speed.",
        action: "Added an index on the user email field in MongoDB.",
        result: "Query response time dropped to under 10 milliseconds."
      }
    }
  },

  // ── AI & ML Engineer Track ────────────────────────────────────────────
  {
    id: "q-ai-01",
    roleId: "ai-ml-engineer",
    difficulty: "Mid-Level",
    question: "What is Retrieval-Augmented Generation (RAG) and how does it help Large Language Models answer questions accurately?",
    category: "RAG & LLMs",
    expectedKeywords: ["RAG", "LLM", "Vector DB", "Embeddings", "Context"],
    ragBenchmark: {
      sourceDoc: "RAG_Overview.pdf (Chunk #01)",
      similarityScore: 0.960,
      idealAnswerSummary: "RAG retrieves relevant document chunks from a vector database and feeds them into the LLM system prompt so the model generates accurate factual answers.",
      starGuide: {
        situation: "AI chatbot hallucinating non-existent company policies.",
        task: "Provide accurate ground-truth answers.",
        action: "Implemented ChromaDB vector retrieval to inject relevant policy context into the LLM.",
        result: "Achieved accurate, verifiable answers backed by company PDFs."
      }
    }
  },

  // ── Behavioral Track ──────────────────────────────────────────────────
  {
    id: "q-hr-01",
    roleId: "behavioral-hr",
    difficulty: "Junior",
    question: "Tell me about a project you recently built. What was your role, what challenges did you face, and how did you solve them?",
    category: "Project Story",
    expectedKeywords: ["Project", "Challenges", "Problem Solving", "Teamwork", "Result"],
    ragBenchmark: {
      sourceDoc: "STAR_Behavioral_Guide.pdf (Chunk #01)",
      similarityScore: 0.950,
      idealAnswerSummary: "A great STAR answer outlines: Situation (project background), Task (your goal), Action (how you built or debugged), and Result (the successful final output).",
      starGuide: {
        situation: "Building an AI application for a hackathon.",
        task: "Deliver a working demo within a tight deadline.",
        action: "Divided tasks cleanly, used modern web tools, and tested user flows.",
        result: "Completed the project on time with strong team collaboration."
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
