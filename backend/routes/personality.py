# backend/routes/personality.py

from flask import Blueprint, jsonify
from personality_engine.traits_data import TYPE_DESCRIPTIONS

personality_bp = Blueprint("personality", __name__, url_prefix="/api/personality")

@personality_bp.get("/<type_code>")
def get_personality(type_code):
    type_code = type_code.upper()

    # For now we use your existing TYPE_DESCRIPTIONS dict
    data = TYPE_DESCRIPTIONS.get(type_code)

    if not data:
        return jsonify({"error": "Personality type not found"}), 404

    return jsonify(data)
