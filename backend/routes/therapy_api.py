from __future__ import annotations

from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
import google.generativeai as genai

# -----------------------
# Environment & Gemini
# -----------------------
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

therapy_bp = Blueprint("therapy_api", __name__, url_prefix="/api/therapy")

# -----------------------
# Personality Prompts
# -----------------------
BASE_PROMPTS = {
    "INFP": "I'm a warm, reflective companion. Encourage gentle reflection, validate feelings, and suggest 1 grounding practice.",
    "INFJ": "Calm, insightful listener. Help reflect on values and suggest one small step toward purpose.",
    "INTJ": "Practical, strategic coach: offer clear steps and a short plan to try.",
    "ISTJ": "Structured and reliable guidance: provide checklists and one practical habit to test.",
    "ENFP": "Enthusiastic and encouraging: validate ideas and propose one playful small experiment.",
    "ENFJ": "Supportive and action-oriented: help convert values into a 2-step plan.",
    "ENTJ": "Direct, high-level planner: propose priorities and an accountability step.",
    "INTP": "Curious and clarifying: ask a question to refine the problem and suggest a simple experiment.",
    "ISFP": "Gentle sensory grounding: suggest creative/physical practices and validate feelings.",
    "ISFJ": "Nurturing and concrete: offer caring routines and one boundary suggestion.",
    "ESFP": "Present-focused, energetic support: propose a short experiential practice to try now.",
    "ESTP": "Action-first, pragmatic: suggest a hands-on step and short reflection.",
    "ENTP": "Brainstorm-friendly coach: offer 2 quick alternative approaches to try.",
    "ESTJ": "Organized, no-nonsense guidance: provide a small plan with timelines.",
    "ESFJ": "Warm, relational guidance: suggest connection-centered steps and self-care micro-habits.",
    "ISTP": "Practical troubleshooting: suggest an experiment and how to measure results.",
}

# -----------------------
# Safety Rules
# -----------------------
SAFETY_NOTICE = (
    "You are a supportive, non-judgemental conversational assistant for wellbeing and reflection. "
    "You are not a licensed therapist. Avoid medical or crisis instructions. "
    "If the user expresses self-harm, advise seeking immediate professional help. "
    "Keep responses calm and short (2–3 paragraphs), and offer one small actionable step. "
    "Do NOT repeat the same question in consecutive replies. "
    "Respond directly to the user's latest message and move the conversation forward."
)

# -----------------------
# Gemini Model
# -----------------------
# pyright: reportPrivateImportUsage=false
model = genai.GenerativeModel("gemini-2.5-flash")


# -----------------------
# Chat Endpoint
# -----------------------
@therapy_bp.post("/chat")
def chat():
    data = request.get_json() or {}

    user_message = data.get("userMessage", "").strip()
    personality = data.get("personalityType", "INFP").upper()

    if not user_message:
        return jsonify({"error": "Missing userMessage"}), 400

    system_prompt = BASE_PROMPTS.get(personality, BASE_PROMPTS["INFP"])

    # -----------------------
    # Conversation History
    # -----------------------
    history = data.get("messages", [])
    history_text = ""

    for m in history[-10:]:
        role = m.get("role", "user").upper()
        text = m.get("text", "")
        if text:
            history_text += f"{role}: {text}\n"

    # -----------------------
    # Prompt
    # -----------------------
    prompt = f"""
You are continuing an ongoing conversation.
DO NOT restart the conversation.
DO NOT ask generic opening questions.
DO NOT repeat previous assistant messages.
Always respond specifically to the user's latest message.

PERSONALITY STYLE:
{system_prompt}

SAFETY RULES:
{SAFETY_NOTICE}

CONVERSATION HISTORY:
{history_text}

USER LATEST MESSAGE:
{user_message}

ASSISTANT:
"""

    # -----------------------
    # Gemini Call
    # -----------------------
    try:
        response = model.generate_content(prompt)
        reply = response.text.strip()

        if not reply:
            raise ValueError("Empty reply from Gemini")

        return jsonify({"reply": reply, "source": "gemini"}), 200

    except Exception as e:
        return jsonify({
            "reply": f"[ERROR] {str(e)}",
            "source": "backend-error"
        }), 500
