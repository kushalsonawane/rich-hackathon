const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// POST /api/sessions — Save a completed interview session
router.post('/', async (req, res) => {
  try {
    const sessionData = req.body;

    if (!sessionData.id || !sessionData.roleTitle) {
      return res.status(400).json({ error: 'Session must include id and roleTitle.' });
    }

    // Upsert: update if exists, create if not (handles re-submissions)
    const session = await Session.findOneAndUpdate(
      { id: sessionData.id },
      { ...sessionData, timestamp: sessionData.timestamp || new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ success: true, session });
  } catch (err) {
    console.error('[sessions] POST error:', err.message);
    res.status(500).json({ error: 'Failed to save session.', details: err.message });
  }
});

// GET /api/sessions — List all sessions, optional ?candidateName= filter
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.candidateName) {
      filter.candidateName = { $regex: req.query.candidateName, $options: 'i' };
    }
    if (req.query.roleId) {
      filter.roleId = req.query.roleId;
    }

    const sessions = await Session.find(filter)
      .select('-questionsAnswered') // omit heavy transcript for list view
      .sort({ timestamp: -1 })
      .limit(50);

    res.json({ success: true, count: sessions.length, sessions });
  } catch (err) {
    console.error('[sessions] GET error:', err.message);
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
});

// GET /api/sessions/:id — Get full session with transcript
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ id: req.params.id });
    if (!session) {
      return res.status(404).json({ error: 'Session not found.' });
    }
    res.json({ success: true, session });
  } catch (err) {
    console.error('[sessions] GET/:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch session.' });
  }
});

// DELETE /api/sessions/:id — Delete a session
router.delete('/:id', async (req, res) => {
  try {
    await Session.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Session deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete session.' });
  }
});

module.exports = router;
