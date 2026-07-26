require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const Session = require('./models/Session');

const app = express();
const DEFAULT_PORT = process.env.PORT || 5000;

// Local JSON fallback store file path
const LOCAL_STORE_FILE = path.join(__dirname, 'local_sessions_store.json');

let dbConnected = false;

// ── Local File Store Helper Functions ─────────────────────────────────────────
function readLocalStore() {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const data = fs.readFileSync(LOCAL_STORE_FILE, 'utf8');
      return JSON.parse(data || '[]');
    }
  } catch (err) {
    console.warn('[LocalStore] Read error:', err.message);
  }
  return [];
}

function writeLocalStore(sessions) {
  try {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(sessions, null, 2), 'utf8');
  } catch (err) {
    console.warn('[LocalStore] Write error:', err.message);
  }
}

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

// ── Routes ──────────────────────────────────────────────────────────────────

// POST /api/sessions — Save a completed interview session
app.post('/api/sessions', async (req, res) => {
  try {
    const sessionData = req.body;

    if (!sessionData.id || !sessionData.roleTitle) {
      return res.status(400).json({ error: 'Session must include id and roleTitle.' });
    }

    if (dbConnected) {
      const session = await Session.findOneAndUpdate(
        { id: sessionData.id },
        { ...sessionData, timestamp: sessionData.timestamp || new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.status(201).json({ success: true, storage: 'MongoDB Atlas', session });
    } else {
      let sessions = readLocalStore();
      const existingIdx = sessions.findIndex((s) => s.id === sessionData.id);
      if (existingIdx >= 0) {
        sessions[existingIdx] = { ...sessions[existingIdx], ...sessionData };
      } else {
        sessions.unshift({ ...sessionData, timestamp: sessionData.timestamp || new Date().toISOString() });
      }
      writeLocalStore(sessions);
      return res.status(201).json({ success: true, storage: 'Local File Store (Fallback)', session: sessionData });
    }
  } catch (err) {
    console.error('[sessions] POST error:', err.message);
    res.status(500).json({ error: 'Failed to save session.', details: err.message });
  }
});

// GET /api/sessions — List all sessions
app.get('/api/sessions', async (req, res) => {
  try {
    if (dbConnected) {
      const filter = {};
      if (req.query.candidateName) filter.candidateName = { $regex: req.query.candidateName, $options: 'i' };
      if (req.query.roleId) filter.roleId = req.query.roleId;

      const sessions = await Session.find(filter)
        .select('-questionsAnswered')
        .sort({ timestamp: -1 })
        .limit(50);

      return res.json({ success: true, storage: 'MongoDB Atlas', count: sessions.length, sessions });
    } else {
      let sessions = readLocalStore();
      if (req.query.candidateName) {
        const q = req.query.candidateName.toLowerCase();
        sessions = sessions.filter(s => (s.candidateName || '').toLowerCase().includes(q));
      }
      if (req.query.roleId) {
        sessions = sessions.filter(s => s.roleId === req.query.roleId);
      }
      const sanitized = sessions.map(({ questionsAnswered, ...rest }) => rest);
      return res.json({ success: true, storage: 'Local File Store (Fallback)', count: sanitized.length, sessions: sanitized });
    }
  } catch (err) {
    console.error('[sessions] GET error:', err.message);
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
});

// GET /api/sessions/:id — Get full session with transcript
app.get('/api/sessions/:id', async (req, res) => {
  try {
    if (dbConnected) {
      const session = await Session.findOne({ id: req.params.id });
      if (!session) return res.status(404).json({ error: 'Session not found.' });
      return res.json({ success: true, storage: 'MongoDB Atlas', session });
    } else {
      const sessions = readLocalStore();
      const session = sessions.find(s => s.id === req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found.' });
      return res.json({ success: true, storage: 'Local File Store (Fallback)', session });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'AI Mock Interview — Node/Express API',
    version: '1.0.0',
    db: dbConnected ? 'Connected to MongoDB Atlas' : 'Local File Store Fallback (Online)',
    timestamp: new Date().toISOString()
  });
});

// ── MongoDB Connection Attempt ────────────────────────────────────────────────
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI missing in .env. Using Local File Store.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000
    });
    dbConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.warn(`⚠️  MongoDB Atlas Connection Notice: ${err.message}`);
    console.warn('ℹ️  Express API will run using High-Availability Local File Storage.');
    dbConnected = false;
  }
};

// ── Start Server with Port Retry ─────────────────────────────────────────────
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`\n🚀 Node/Express API Server running at http://localhost:${port}`);
    console.log(`   Health Check: http://localhost:${port}/api/health`);
    console.log(`   Sessions Endpoint: http://localhost:${port}/api/sessions\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} in use, retrying on port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

connectDB().finally(() => {
  startServer(Number(DEFAULT_PORT));
});
