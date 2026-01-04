import os
import google.generativeai as genai

# ---------------- CONFIGURE GEMINI ----------------
genai.configure(api_key=os.getenv("GEMINI_API_KEY")) #type: ignore
model = genai.GenerativeModel("gemini-2.5-flash")  # type: ignore


# ---------------- MBTI TONE MAP (ALL 16) ----------------
MBTI_TONES = {
    "INTJ": "strategic, precise, efficient, future-oriented",
    "INTP": "curious, analytical, exploratory, idea-driven",
    "ENTJ": "confident, decisive, leadership-focused, results-oriented",
    "ENTP": "innovative, energetic, adaptive, possibility-driven",

    "INFJ": "calm, insightful, purpose-driven, meaning-oriented",
    "INFP": "gentlpersonality_enginee, validating, emotionally supportive, values-driven",
    "ENFJ": "encouraging, motivating, people-focused, growth-oriented",
    "ENFP": "enthusiastic, inspiring, creative, optimism-driven",

    "ISTJ": "practical, structured, disciplined, reliability-focused",
    "ISFJ": "supportive, steady, service-oriented, detail-conscious",
    "ESTJ": "direct, execution-focused, organized, accountability-driven",
    "ESFJ": "warm, reassuring, community-focused, responsibility-oriented",

    "ISTP": "hands-on, logical, pragmatic, action-focused",
    "ISFP": "gentle, experiential, values-aligned, quietly encouraging",
    "ESTP": "bold, energetic, real-world focused, action-oriented",
    "ESFP": "uplifting, engaging, experience-focused, momentum-driven",
}


# ---------------- GEMINI ENRICHMENT ----------------
def enrich_roadmap_with_gemini(roadmap: dict) -> dict:
    """
    Uses Gemini ONLY to enrich language.
    Does NOT change roadmap structure or steps.
    """

    enriched_phases = []

    mbti = roadmap.get("mbti", "").upper()
    tone = MBTI_TONES.get(mbti, "clear, supportive, realistic")

    for phase in roadmap["phases"]:
        prompt = f"""
You are a {tone} career mentor.

Rewrite the following roadmap phase into a short motivating explanation.
Match the tone to the MBTI personality.
DO NOT change goals or structure.
DO NOT add new steps.

MBTI: {mbti}
Career: {roadmap["career"]}
Phase name: {phase["phase"]}
Duration: {phase["duration"]}
Focus points:
{chr(10).join('- ' + f for f in phase['focus'])}

Return only ONE paragraph.
"""

        try:
            response = model.generate_content(prompt)
            narrative = response.text.strip()
        except Exception as e:
            print("Gemini error:", e)
            narrative = ""

        enriched_phases.append({
            **phase,
            "narrative": narrative
        })

    roadmap["phases"] = enriched_phases
    roadmap["ai_enriched"] = True

    return roadmap
