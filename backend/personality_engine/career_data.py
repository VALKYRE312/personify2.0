from personality_engine.personality_full_data import PERSONALITY_FULL

CAREER_MAP = {}

for ptype, data in PERSONALITY_FULL.items():
    CAREER_MAP[ptype] = {
        "title": data.get("title"),
        "work_style": data.get("work_style"),
        "ideal_roles": data.get("roles", [])[:4],
        "strengths": data.get("strengths", [])[:3],
        "growth_points": data.get("growth_points", [])
    }
