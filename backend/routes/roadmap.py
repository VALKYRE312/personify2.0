from flask import Blueprint, request, jsonify
from personality_engine.roadmap_generator import generate_roadmap

roadmap_bp = Blueprint("roadmap", __name__)

@roadmap_bp.route("/roadmap", methods=["POST"])
def roadmap():
    try:
        data = request.get_json(force=True, silent=True) or {}

        roadmap = generate_roadmap(data)

        phases = roadmap.get("phases", [])

        return jsonify({
            "success": True,
            "phases": phases,      # 👈 frontend uses this
            "roadmap": roadmap     # 👈 full object (useful for PDF / UI later)
        }), 200

    except Exception as e:
        print("Roadmap API Error:", e)
        return jsonify({
            "success": False,
            "error": "Failed to generate roadmap"
        }), 500