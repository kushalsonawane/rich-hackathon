# RSS HackMode ON | Rich System Solution Pvt Ltd (G24)

## AI Mock Interview System — Level 3 Full RAG

**Team G24 Hackathon Project** · React + Node/Express + FastAPI + ChromaDB + MongoDB Atlas + Gemini

---

## 📁 Repository Structure

```text
RICH HACKATHON/
├── frontend/                   # ⚡ React + Vite Frontend Application
│   ├── src/
│   │   ├── components/         # InterviewHub, LiveSession, FeedbackView, SessionLogs, RagInspector
│   │   ├── data/               # RAG Question Banks & Role Presets
│   │   ├── services/           # Unified API Layer (toggleable real/mock backend)
│   │   ├── App.jsx
│   │   └── index.css           # High-Contrast Vercel/Linear Design System
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server/                 # 🟢 Node.js + Express REST API
│   │   ├── index.js            # App entry — MongoDB Atlas + Express routes
│   │   ├── routes/
│   │   │   └── sessions.js     # POST/GET/DELETE /api/sessions
│   │   ├── models/
│   │   │   └── Session.js      # Mongoose session schema
│   │   ├── .env.example        # Copy to .env and fill in your values
│   │   └── package.json
│   │
│   └── rag_engine/             # 🐍 Python FastAPI + RAG Pipeline
│       ├── main.py             # FastAPI app — questions, evaluate, vector-search endpoints
│       ├── rag/
│       │   ├── vectorstore.py  # ChromaDB init, seeding & cosine similarity search
│       │   └── evaluator.py    # Gemini 1.5 Flash LLM answer evaluation
│       ├── models/
│       │   └── schemas.py      # Pydantic request/response models
│       ├── data/
│       │   └── questions.json  # Question bank seed data
│       ├── .env.example        # Copy to .env and fill in your Gemini API key
│       └── requirements.txt
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 2. Node/Express Server

```bash
cd backend/server
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env: set MONGODB_URI to your MongoDB Atlas connection string

npm run dev
# → http://localhost:5000/api/health
```

### 3. FastAPI RAG Engine

```bash
cd backend/rag_engine

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env: set GEMINI_API_KEY to your Google Gemini API key

# Start the server
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs  (Swagger UI)
```

### 4. Enable Real Backend in Frontend

In `frontend/src/services/api.js`, set:
```js
useRealBackend: true
```

---

## ✨ Features

### Feature #1: Role Select + Session Logs
- 5 Role Tracks with difficulty levels and target companies
- Custom JD / Resume RAG Context Uploader
- Filterable session log table & full transcript replay modal
- Sessions persisted to **MongoDB Atlas** via Node/Express

### Feature #2: RAG on Question Bank — LLM Answer Feedback
- Questions embedded into **ChromaDB** using `sentence-transformers`
- Cosine similarity HNSW search to retrieve benchmark context
- **Gemini 1.5 Flash** LLM evaluates answers against RAG benchmark
- Score breakdown: Technical Accuracy · RAG Match · STAR Structure · Clarity
- Side-by-side ideal answer comparison in Feedback View

---

## 🔗 API Endpoints

| Server | Method | Endpoint | Description |
|---|---|---|---|
| Express :5000 | GET | `/api/health` | Server health check |
| Express :5000 | POST | `/api/sessions` | Save completed session |
| Express :5000 | GET | `/api/sessions` | List all sessions |
| Express :5000 | GET | `/api/sessions/:id` | Get session with full transcript |
| FastAPI :8000 | GET | `/api/health` | RAG engine health check |
| FastAPI :8000 | POST | `/api/questions` | Get role-filtered questions from ChromaDB |
| FastAPI :8000 | POST | `/api/evaluate` | Evaluate answer with Gemini + RAG |
| FastAPI :8000 | POST | `/api/vector-search` | ChromaDB similarity search |
| FastAPI :8000 | GET | `/docs` | Interactive Swagger UI |
