"""
ChromaDB Vector Store — Manages embedding storage and similarity search
for the AI Mock Interview RAG pipeline (G24).
Uses sentence-transformers (all-MiniLM-L6-v2) — runs 100% offline, no API key needed.
"""
import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings

# ── Embedding function using sentence-transformers ─────────────────────────
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

EMBED_MODEL = "all-MiniLM-L6-v2"
COLLECTION_NAME = "interview_questions"
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "chroma_db")
QUESTIONS_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "questions.json")

# Singleton instances
_client: Optional[chromadb.Client] = None
_collection = None
_questions_cache: List[Dict[str, Any]] = []


def get_client() -> chromadb.ClientAPI:
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(path=DB_PATH)
    return _client


def get_collection():
    global _collection
    if _collection is None:
        client = get_client()
        embedding_fn = SentenceTransformerEmbeddingFunction(model_name=EMBED_MODEL)
        _collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            embedding_function=embedding_fn,
            metadata={"hnsw:space": "cosine"}
        )
    return _collection


def load_questions() -> List[Dict[str, Any]]:
    """Load question bank from JSON file."""
    global _questions_cache
    if _questions_cache:
        return _questions_cache
    with open(QUESTIONS_JSON, "r", encoding="utf-8") as f:
        _questions_cache = json.load(f)
    return _questions_cache


def seed_questions():
    """
    Embed all questions and upsert into ChromaDB on startup.
    Idempotent — safe to call multiple times.
    """
    collection = get_collection()
    questions = load_questions()

    existing = collection.count()
    if existing >= len(questions):
        print(f"[ChromaDB] ✅ Collection already seeded ({existing} documents). Skipping.")
        return

    print(f"[ChromaDB] 🔄 Seeding {len(questions)} questions into vector store...")

    documents = []
    metadatas = []
    ids = []

    for q in questions:
        # Combine question + keywords as the embeddable document text
        embed_text = f"{q['question']} Keywords: {', '.join(q.get('expectedKeywords', []))}"
        documents.append(embed_text)
        metadatas.append({
            "questionId": q["id"],
            "roleId": q["roleId"],
            "difficulty": q["difficulty"],
            "category": q.get("category", ""),
        })
        ids.append(q["id"])

    collection.upsert(documents=documents, metadatas=metadatas, ids=ids)
    print(f"[ChromaDB] ✅ Seeded {len(questions)} questions successfully.")


def search_similar(query_text: str, role_id: str = None, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Perform cosine similarity search in ChromaDB.
    Returns top-k matching question IDs with distances.
    """
    collection = get_collection()
    questions = load_questions()

    # Build optional where filter by roleId
    where_filter = None
    if role_id and role_id != "all":
        where_filter = {"roleId": role_id}

    results = collection.query(
        query_texts=[query_text],
        n_results=min(top_k, collection.count()),
        where=where_filter,
        include=["distances", "metadatas", "documents"]
    )

    # Map results back to full question objects
    matched_ids = results["ids"][0]
    distances = results["distances"][0]

    enriched = []
    for qid, dist in zip(matched_ids, distances):
        # Find full question object
        q = next((x for x in questions if x["id"] == qid), None)
        if q:
            enriched.append({
                **q,
                "vectorDistance": round(dist, 4),
                "similarityScore": round((1 - dist) * 100, 2)
            })

    return enriched


def get_questions_by_role(role_id: str, difficulty: str = None, top_k: int = 10) -> List[Dict[str, Any]]:
    """
    Fetch questions filtered by roleId (and optionally difficulty) using ChromaDB metadata filter.
    """
    collection = get_collection()
    questions = load_questions()

    # Filter locally for deterministic ordering
    filtered = [
        q for q in questions
        if q["roleId"] == role_id or role_id == "all"
    ]

    if difficulty and difficulty != "Any Level":
        filtered = [q for q in filtered if q.get("difficulty") == difficulty] or filtered

    if not filtered:
        filtered = questions  # fallback to all

    return filtered[:top_k]
