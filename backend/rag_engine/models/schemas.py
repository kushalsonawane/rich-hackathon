from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


class QuestionsRequest(BaseModel):
    customJd: Optional[str] = ""


class AudioMetrics(BaseModel):
    fillerCount: Optional[int] = 0
    secondsElapsed: Optional[int] = 0


class EvaluateRequest(BaseModel):
    questionId: str
    userAnswer: str
    audioMetrics: Optional[AudioMetrics] = None


class ScoreBreakdown(BaseModel):
    technicalAccuracy: int
    ragSimilarityMatch: int
    starStructure: int
    clarityAndPacing: int


class EvaluateResponse(BaseModel):
    score: int
    breakdown: ScoreBreakdown
    ragContextMatch: str
    ragBenchmark: Optional[Dict[str, Any]] = None
    feedback: str
    keyStrengths: List[str]
    improvements: List[str]


class VectorSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5
