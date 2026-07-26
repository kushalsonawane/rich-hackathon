const mongoose = require('mongoose');

const QuestionEvalSchema = new mongoose.Schema({
  questionId: String,
  questionText: String,
  userAnswerText: String,
  score: Number,
  feedback: String,
  ragContextMatch: mongoose.Schema.Types.Mixed,
  keyStrengths: [String],
  improvements: [String],
  breakdown: {
    technicalAccuracy: Number,
    ragSimilarityMatch: Number,
    starStructure: Number,
    clarityAndPacing: Number
  },
  ragBenchmark: mongoose.Schema.Types.Mixed
});

const SessionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
  roleTitle: { type: String, required: true },
  roleId: { type: String, required: true },
  difficulty: String,
  candidateName: { type: String, default: 'Anonymous' },
  mode: String,
  totalDuration: String,
  overallScore: { type: Number, min: 0, max: 100 },
  breakdown: {
    technicalAccuracy: Number,
    ragSimilarityMatch: Number,
    starStructure: Number,
    clarityAndPacing: Number
  },
  fillerWordsCount: { type: Number, default: 0 },
  averageWPM: { type: Number, default: 0 },
  summary: String,
  questionsAnswered: [QuestionEvalSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);
