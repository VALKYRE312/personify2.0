# backend/personality_engine/roadmap_generator.py

MBTI_TRAITS = {
    "ESTJ": {
        "learning_style": "structured",
        "preferred_roles": ["Team Lead", "Operations Manager", "Project Manager"]
    },
    "INFP": {
        "learning_style": "self-paced",
        "preferred_roles": ["Writer", "Therapist", "Creative Strategist"]
    },
    "INTJ": {
        "learning_style": "systems-first",
        "preferred_roles": ["Architect", "Researcher", "Tech Lead"]
    }
    # you can extend this later
}


def get_pace(financial, time_commitment):
    if financial == "Low":
        return "slow"
    if time_commitment and time_commitment <= 5:
        return "slow"
    return "normal"


def get_level(status, experience):
    if status == "Studying":
        return "foundation"
    if experience and experience >= 2:
        return "intermediate"
    return "beginner"


def generate_roadmap(data: dict):
    mbti = data.get("mbti", "INFP")
    career = data.get("career", "General")
    status = data.get("status", "Studying")
    financial = data.get("financial", "Medium")
    time_commitment = int(data.get("time_commitment", 10))
    experience = int(data.get("experience", 0))
    interests = data.get("interests", [])

    traits = MBTI_TRAITS.get(mbti, MBTI_TRAITS["INFP"])

    pace = get_pace(financial, time_commitment)
    level = get_level(status, experience)

    phases = []

    # 🧠 MBTI-DRIVEN STRUCTURE (THIS IS THE KEY CHANGE)
    if mbti in ["INFP", "INFJ"]:
        phase_order = [
            "Self Discovery",
            "Skill Expression",
            "Purpose Alignment",
        ]
    elif mbti in ["INTJ", "ISTJ"]:
        phase_order = [
            "System Foundations",
            "Skill Optimization",
            "Strategic Positioning",
        ]
    elif mbti in ["ESTJ", "ENTJ"]:
        phase_order = [
            "Discipline Setup",
            "Execution & Scale",
            "Leadership Alignment",
        ]
    else:
        phase_order = [
            "Foundation",
            "Skill Expansion",
            "Career Alignment",
        ]

    # 🔧 BUILD PHASES DYNAMICALLY
    for phase_name in phase_order:
        focus = []

        # level-based logic
        if level == "foundation":
            focus.append(f"Learn fundamentals of {career}")
            focus.append("Build consistency and confidence")

        if level in ["beginner", "intermediate"]:
            focus.append(f"Apply {career} skills in small projects")

        if level == "intermediate":
            focus.append("Improve quality and efficiency")

        # interest-based personalization
        if interests:
            focus.append(
                f"Projects combining {career} with {', '.join(interests)}"
            )

        # MBTI learning style influence
        focus.append(f"Learning style emphasis: {traits['learning_style']}")

        phases.append({
            "phase": phase_name,
            "duration": "4 months" if pace == "slow" else "2 months",
            "focus": focus,
        })

    # 🎯 Final career alignment (NOT generic anymore)
    phases.append({
        "phase": "Role Targeting",
        "duration": "1–2 months",
        "focus": traits["preferred_roles"],
    })

    return {
        "mbti": mbti,
        "career": career,
        "pace": pace,
        "level": level,
        "phases": phases,
    }
