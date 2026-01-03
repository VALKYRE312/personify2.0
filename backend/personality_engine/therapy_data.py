# backend/personality_engine/therapy_data.py

"""
THERAPY_MAP provides personalized therapy suggestions for each MBTI personality.
This is used by the route: /api/therapy/<ptype>
"""

THERAPY_MAP = {
    "INFP": {
        "title": "Personalized Therapy for INFP — The Mediator",
        "core_issues": [
            "Emotional overwhelm",
            "Difficulty setting boundaries",
            "Conflict avoidance",
            "Overthinking feelings",
        ],
        "therapy_goals": [
            "Strengthen emotional boundaries",
            "Improve communication confidence",
            "Balance idealism with grounded routines",
            "Develop healthy coping strategies",
        ],
        "recommendations": [
            "Mindfulness meditation",
            "Creative expression (journaling, art, music)",
            "Deep-breathing exercises",
            "Validation + emotional grounding therapy",
        ],
    },

    "INTJ": {
        "title": "Personalized Therapy for INTJ — The Architect",
        "core_issues": [
            "Bottling up emotions",
            "Work-life imbalance",
            "Difficulty expressing vulnerability",
        ],
        "therapy_goals": [
            "Improve emotional awareness",
            "Develop balanced self-care",
            "Strengthen relationship communication",
        ],
        "recommendations": [
            "CBT-based emotional clarity exercises",
            "Journaling emotional patterns",
            "Practicing controlled vulnerability",
        ],
    },

    # ✅ Add more later (INFJ, ENFP, ESTJ, etc.)
}
