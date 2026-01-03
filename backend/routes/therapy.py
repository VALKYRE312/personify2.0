from flask import Blueprint, jsonify
from personality_engine.therapy_data import THERAPY_MAP

therapy_data_bp = Blueprint("therapy_data", __name__, url_prefix="/api/therapy-data")

@therapy_data_bp.get("/<ptype>")
def get_therapy(ptype):
    base = ptype.split("-")[0].upper()
    return jsonify(THERAPY_MAP.get(base, {}))
                                 