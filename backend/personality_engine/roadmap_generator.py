def generate_roadmap(data):
    """
    Generates a personalized roadmap influenced by:
    - MBTI personality type
    - Selected career path
    - Experience / status / constraints
    """

    career = data.get("career") or "Career"
    mbti = (data.get("mbti") or "N/A").upper()

    status = data.get("status")
    experience = int(data.get("experience", 0) or 0)
    financial = data.get("financial")
    country = data.get("country")
    time = data.get("timeCommitment")
    skills = data.get("skills")

    # ---------- 🎨 MBTI Tone Profiles ----------
    mbti_tones = {
        "INTJ": {"voice": "strategic and goal-oriented",
                 "style_note": "Focus on efficiency, structured progress, and long-term mastery."},
        "INTP": {"voice": "analytical and curiosity-driven",
                 "style_note": "Explore deeply, experiment independently, and follow intellectually meaningful paths."},
        "INFJ": {"voice": "reflective and purpose-centered",
                 "style_note": "Align growth with values, impact, and meaningful contribution."},
        "ENFP": {"voice": "encouraging and creative",
                 "style_note": "Embrace exploration, self-expression, and opportunities that inspire motivation."},
        "ISTJ": {"voice": "structured and detail-focused",
                 "style_note": "Prioritize consistency, discipline, and reliable systems of learning."},
        "ENTP": {"voice": "innovative and adaptive",
                 "style_note": "Experiment, iterate fast, and learn through challenge and discovery."},
        "DEFAULT": {"voice": "supportive and growth-oriented",
                    "style_note": "Build confidence through steady practice and reflective progress."}
    }

    tone = mbti_tones.get(mbti, mbti_tones["DEFAULT"])

    # ---------- 🎯 MBTI-driven strengths ----------
    mbti_strengths = {
        "INTP": ["analytical thinking", "independent research", "problem-solving"],
        "INTJ": ["long-term planning", "self-study discipline", "complex systems"],
        "ENFP": ["creative expression", "storytelling", "people-focused growth"],
        "INFJ": ["mentorship", "purpose-driven work", "empathy & guidance"],
        "ISTJ": ["structure", "precision", "process consistency"],
        "ENTP": ["innovation", "experimentation", "rapid learning"],
        "DEFAULT": ["self-awareness", "consistent learning", "growth habits"],
    }

    strengths = mbti_strengths.get(mbti, mbti_strengths["DEFAULT"])

    # ---------- 💼 Career Learning Tracks ----------
    career_tracks = {
        "Research Scientist": [
            "read academic papers weekly",
            "practice hypothesis-driven projects",
            "publish small research notes"
        ],
        "Software Engineer": [
            "strengthen DSA & problem-solving",
            "build full-stack practice apps",
            "contribute to open-source"
        ],
        "Writer / Novelist": [
            "develop daily writing practice",
            "build a small writing portfolio",
            "study narrative techniques"
        ],
        "Counselor / Therapist": [
            "learn foundational psychology skills",
            "seek structured supervised practice",
            "study communication & emotional safety"
        ],
        "DEFAULT": [
            "build core foundation skills",
            "create small practical projects",
            "document learning progress"
        ],
    }

    track_steps = career_tracks.get(career, career_tracks["DEFAULT"])

    # ---------- 🏁 Career-Specific Milestones ----------
    career_milestones = {
        "Software Engineer": {
            "certs": ["Complete one structured DSA course", "Git & Version Control mastery"],
            "portfolio": ["2–3 full-stack projects", "One collaborative or open-source contribution"],
            "experience": ["Build a freelance / internship mini-project", "Solve 50–100 coding challenges"]
        },
        "Writer / Novelist": {
            "certs": ["Take a storytelling or narrative writing workshop"],
            "portfolio": ["Publish 5–10 short pieces online", "Create a themed writing collection"],
            "experience": ["Join a writing community or critique group", "Submit work to a publication"]
        },
        "Counselor / Therapist": {
            "certs": ["Complete an introductory counseling / psychology program"],
            "portfolio": ["Reflection logs & case-practice exercises"],
            "experience": ["Supervised practice / volunteering experience", "Shadow a professional session (where ethical)"]
        },
        "Research Scientist": {
            "certs": ["Take a statistics / research-methods course"],
            "portfolio": ["Create 1–2 mini-research reports"],
            "experience": ["Assist in a lab / field project", "Present findings in a small forum"]
        },
        "DEFAULT": {
            "certs": ["Complete one structured learning course"],
            "portfolio": ["Create 1–2 proof-of-skill projects"],
            "experience": ["Gain at least one small real-world practice experience"]
        }
    }

    milestones = career_milestones.get(career, career_milestones["DEFAULT"])

    # ---------- 🧩 Experience adaptation ----------
    if experience == 0:
        entry_focus = "Start with beginner-friendly foundations."
    elif experience <= 2:
        entry_focus = "Lean into applied practice and small real-world projects."
    else:
        entry_focus = "Focus on specialization, positioning, and higher-level contribution."

    # ---------- 🛠 Build final roadmap ----------
    roadmap = {
        "career": career,
        "mbti": mbti,
        "tone_voice": tone["voice"],
        "overview": (
            f"This roadmap is written in a {tone['voice']} tone for a {mbti} pursuing {career}. "
            f"{tone['style_note']}"
        ),
        "phases": [
            {
                "title": "Foundation Phase",
                "duration": "0–3 months",
                "steps": [
                    f"Leverage your natural strengths: {', '.join(strengths)}",
                    f"{tone['style_note']}",
                    f"Understand core concepts of {career}",
                    entry_focus,
                    f"Assess current skills: {skills or 'not provided'}",
                ],
            },
            {
                "title": "Skill Building Phase",
                "duration": "3–9 months",
                "steps": [
                    *track_steps,
                    "join a peer or mentor group",
                    "apply knowledge through projects or practice",
                    "🎯 Milestone — Certifications: " + "; ".join(milestones["certs"]),
                    "🧩 Milestone — Portfolio Goals: " + "; ".join(milestones["portfolio"]),
                ],
            },
            {
                "title": "Professional Growth Phase",
                "duration": "9–18 months",
                "steps": [
                    "apply skills in real-world environments",
                    "build a portfolio / resume proof-of-work",
                    "seek internships, collaborations, or paid roles",
                    "🏁 Experience Goals: " + "; ".join(milestones["experience"]),
                ],
            },
        ],
        "constraints": {
            "financial_level": financial,
            "time_commitment": time,
            "country": country,
            "experience": experience,
            "status": status,
        },
    }

    return roadmap