from flask import Blueprint, request, jsonify
from personality_engine.roadmap_generator import generate_roadmap
from personality_engine.roadmap_gemini import enrich_roadmap_with_gemini

roadmap_bp = Blueprint("roadmap", __name__)

@roadmap_bp.route("/roadmap", methods=["POST", "OPTIONS"])
def roadmap():
    if request.method == "OPTIONS":
        return "", 200
    
    try:
        data = request.get_json(force=True, silent=True) or {}

        # 1️⃣ Generate deterministic roadmap
        roadmap = generate_roadmap(data)

        # 2️⃣ OPTIONAL Gemini enrichment (language only)
        if data.get("use_ai", True):
            roadmap = enrich_roadmap_with_gemini(roadmap)

        # 3️⃣ Always read phases AFTER enrichment
        phases = roadmap.get("phases", [])

        return jsonify({
            "success": True,
            "phases": phases,
            "roadmap": roadmap
        }), 200

    except Exception as e:
        print("Roadmap API Error:", e)
        return jsonify({
            "success": False,
            "error": "Failed to generate roadmap"
        }), 500
