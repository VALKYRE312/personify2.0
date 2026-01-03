# backend/personality_engine/traits_data.py

# Very short summaries (you can expand later).
TYPE_DESCRIPTIONS = {
    "INTJ": {
        "title": "INTJ — The Architect",
        "summary": "Strategic, independent, and future-focused problem solvers.",
        "strengths": ["Strategic thinking", "Self-discipline", "Long-range planning"],
        "weaknesses": ["Impatient with inefficiency", "May appear distant"],
    },
    "INTP": {
        "title": "INTP — The Thinker",
        "summary": "Analytical, curious, and theory-driven.",
        "strengths": ["Analysis", "Creativity", "Objectivity"],
        "weaknesses": ["Procrastination", "Inconsistent follow-through"],
    },
    "ENTJ": {
        "title": "ENTJ — The Commander",
        "summary": "Decisive leaders focused on results and structure.",
        "strengths": ["Leadership", "Organization", "Efficiency"],
        "weaknesses": ["Blunt communication", "Impatience"],
    },
    "ENTP": {
        "title": "ENTP — The Debater",
        "summary": "Energetic idea-generators who love challenge and change.",
        "strengths": ["Innovation", "Debate", "Agility"],
        "weaknesses": ["Follow-through", "Can be provocative"],
    },
    "INFJ": {
        "title": "INFJ — The Advocate",
        "summary": "Visionary idealists with deep empathy and conviction.",
        "strengths": ["Empathy", "Insight", "Purpose"],
        "weaknesses": ["Over-idealism", "Burnout risk"],
    },
    "INFP": {
        "title": "INFP — The Mediator",
        "summary": "Compassionate, creative, and values-driven.",
        "strengths": ["Empathy", "Creativity", "Integrity"],
        "weaknesses": ["Conflict-avoidance", "Overthinking"],
    },
    "ENFJ": {
        "title": "ENFJ — The Protagonist",
        "summary": "Inspirational organizers focused on people’s growth.",
        "strengths": ["Mentoring", "Communication", "Team building"],
        "weaknesses": ["People-pleasing", "Overcommitment"],
    },
    "ENFP": {
        "title": "ENFP — The Campaigner",
        "summary": "Enthusiastic, imaginative, and people-centered explorers.",
        "strengths": ["Inspiration", "Creativity", "Connection"],
        "weaknesses": ["Scattered focus", "Routine fatigue"],
    },
    "ISTJ": {
        "title": "ISTJ — The Logistician",
        "summary": "Practical, reliable, and detail-oriented.",
        "strengths": ["Dependability", "Thoroughness", "Stability"],
        "weaknesses": ["Rigidity", "Reluctance to change"],
    },
    "ISFJ": {
        "title": "ISFJ — The Defender",
        "summary": "Supportive protectors with strong sense of duty.",
        "strengths": ["Loyalty", "Care", "Consistency"],
        "weaknesses": ["Self-neglect", "Difficulty saying no"],
    },
    "ESTJ": {
        "title": "ESTJ — The Executive",
        "summary": "Organized, direct, and results-driven.",
        "strengths": ["Management", "Order", "Decisiveness"],
        "weaknesses": ["Stubbornness", "Bluntness"],
    },
    "ESFJ": {
        "title": "ESFJ — The Consul",
        "summary": "Warm caretakers who value harmony and tradition.",
        "strengths": ["Supportive", "Responsible", "Community-minded"],
        "weaknesses": ["Approval-seeking", "Change-averse"],
    },
    "ISTP": {
        "title": "ISTP — The Virtuoso",
        "summary": "Hands-on problem solvers who adapt quickly.",
        "strengths": ["Practical analysis", "Calm under pressure", "Flexibility"],
        "weaknesses": ["Aloofness", "Risk-taking"],
    },
    "ISFP": {
        "title": "ISFP — The Adventurer",
        "summary": "Gentle creators who value freedom and authenticity.",
        "strengths": ["Aesthetic sense", "Kindness", "Adaptability"],
        "weaknesses": ["Conflict-avoidance", "Inconsistency"],
    },
    "ESTP": {
        "title": "ESTP — The Entrepreneur",
        "summary": "Action-oriented doers who love solving real problems.",
        "strengths": ["Boldness", "Practicality", "Social ease"],
        "weaknesses": ["Impulsivity", "Dislike of theory"],
    },
    "ESFP": {
        "title": "ESFP — The Entertainer",
        "summary": "Lively, spontaneous, and people-focused.",
        "strengths": ["Energy", "Optimism", "Observation"],
        "weaknesses": ["Long-term planning", "Easily bored"],
    },
}
