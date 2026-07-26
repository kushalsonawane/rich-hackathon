"""
LLM Answer Evaluator — Uses Google Gemini Flash to score candidate answers
against RAG-retrieved benchmark context. Falls back to keyword scoring if
Gemini is unavailable.
"""
import os
import json
import re
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Initialize Gemini client if API key is present
_gemini_client = None
if GEMINI_API_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        _gemini_client = genai.GenerativeModel("gemini-1.5-flash")
        print("[Evaluator] ✅ Gemini 1.5 Flash LLM initialized.")
    except Exception as e:
        print(f"[Evaluator] ⚠️  Gemini init failed: {e}. Falling back to keyword scoring.")
        _gemini_client = None
else:
    print("[Evaluator] ⚠️  No GEMINI_API_KEY found. Using keyword-based scoring fallback.")


def _keyword_score(question: Dict, user_answer: str, audio_metrics: Dict) -> Dict[str, Any]:
    """
    Pure keyword-based heuristic scoring (no LLM required).
    Used as fallback when Gemini is unavailable.
    """
    user_text = user_answer.lower()
    keywords = question.get("expectedKeywords", [])

    matched = [kw for kw in keywords if kw.lower() in user_text]
    keyword_ratio = len(matched) / len(keywords) if keywords else 0.7
    word_count = len(user_answer.strip().split())
    filler_count = audio_metrics.get("fillerCount", 0)

    tech_score = min(98, max(65, round(70 + keyword_ratio * 25 + min(10, word_count / 15))))
    rag_match = min(99, max(78, round(82 + keyword_ratio * 15)))
    star_score = min(96, round(75 + (word_count / 100) * 15)) if word_count > 40 else 70
    clarity_score = min(95, max(75, 90 - filler_count * 3))
    overall = round(tech_score * 0.4 + rag_match * 0.25 + star_score * 0.2 + clarity_score * 0.15)

    strengths = []
    improvements = []

    if matched:
        strengths.append(f"Covered key technical concepts: {', '.join(matched[:3])}.")
    else:
        strengths.append("Good attempt at explaining high-level system flow.")

    if word_count > 50:
        strengths.append("Detailed response with sufficient depth and structural context.")
    else:
        improvements.append("Expand your answer. Aim for 80-120 words using the STAR framework.")

    missing = [kw for kw in keywords if kw.lower() not in user_text][:3]
    if missing:
        improvements.append(f"Include specific terminology benchmarked in vector DB: {', '.join(missing)}.")

    if not improvements:
        improvements.append("Incorporate specific quantitative benchmarks (e.g., latency ms, throughput RPS).")

    return {
        "score": overall,
        "breakdown": {
            "technicalAccuracy": tech_score,
            "ragSimilarityMatch": rag_match,
            "starStructure": star_score,
            "clarityAndPacing": clarity_score
        },
        "ragContextMatch": f"{(rag_match / 100):.3f}",
        "feedback": (
            "Outstanding response! Excellent technical precision and strong alignment with vector-indexed benchmarks."
            if overall >= 85
            else "Good foundational response. Incorporating explicit metrics and benchmark terminology will boost your score."
        ),
        "keyStrengths": strengths,
        "improvements": improvements
    }


async def evaluate_with_gemini(question: Dict, user_answer: str, audio_metrics: Dict) -> Dict[str, Any]:
    """
    Evaluate candidate answer using Google Gemini 1.5 Flash.
    Builds a RAG-augmented prompt with benchmark context and returns structured JSON scores.
    """
    if not _gemini_client:
        return _keyword_score(question, user_answer, audio_metrics)

    benchmark = question.get("ragBenchmark", {})
    ideal_summary = benchmark.get("idealAnswerSummary", "")
    star_guide = benchmark.get("starGuide", {})
    expected_keywords = question.get("expectedKeywords", [])
    filler_count = audio_metrics.get("fillerCount", 0)
    word_count = len(user_answer.strip().split())

    prompt = f"""You are an expert AI technical interviewer evaluating a candidate's answer.

INTERVIEW QUESTION:
{question.get('question', '')}

EXPECTED KEYWORDS (from vector DB benchmark):
{', '.join(expected_keywords)}

RAG BENCHMARK — IDEAL ANSWER SUMMARY:
{ideal_summary}

RAG BENCHMARK — STAR GUIDE:
Situation: {star_guide.get('situation', '')}
Task: {star_guide.get('task', '')}
Action: {star_guide.get('action', '')}
Result: {star_guide.get('result', '')}

CANDIDATE'S ANSWER:
{user_answer}

AUDIO METRICS:
- Filler words used: {filler_count}
- Word count: {word_count}

Evaluate the candidate's answer against the RAG benchmark context above.
Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{{
  "score": <overall 0-100>,
  "breakdown": {{
    "technicalAccuracy": <0-100>,
    "ragSimilarityMatch": <0-100>,
    "starStructure": <0-100>,
    "clarityAndPacing": <0-100>
  }},
  "feedback": "<one sentence overall feedback>",
  "keyStrengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"]
}}

Scoring criteria:
- technicalAccuracy: how accurately the candidate covered the expected keywords and technical concepts
- ragSimilarityMatch: how closely the answer aligns with the RAG benchmark ideal answer
- starStructure: how well the answer follows Situation/Task/Action/Result structure
- clarityAndPacing: penalize for filler words (each filler -3 points from base 90), reward concise word count
"""

    try:
        response = _gemini_client.generate_content(prompt)
        raw_text = response.text.strip()

        # Clean up any accidental markdown code fences
        raw_text = re.sub(r"```json\s*", "", raw_text)
        raw_text = re.sub(r"```\s*", "", raw_text)
        raw_text = raw_text.strip()

        parsed = json.loads(raw_text)

        rag_match = parsed["breakdown"].get("ragSimilarityMatch", 85)
        parsed["ragContextMatch"] = f"{(rag_match / 100):.3f}"
        parsed["ragBenchmark"] = question.get("ragBenchmark")

        return parsed

    except Exception as e:
        print(f"[Evaluator] ⚠️  Gemini evaluation failed: {e}. Falling back to keyword scoring.")
        return _keyword_score(question, user_answer, audio_metrics)
