from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database.db import db
from personality_engine.career_data import CAREER_MAP
from models.guest_result import GuestResult
from models.result import Result

career_bp = Blueprint("career", __name__, url_prefix="/api/career")


# ---------------------------------------------------------
# 1️⃣ Get career suggestions by personality type
# ---------------------------------------------------------
@career_bp.route("/<ptype>", methods=["GET"])
def get_career(ptype):
    ptype = ptype.upper()

    if ptype not in CAREER_MAP:
        return jsonify({"error": "Career data not found"}), 404

    return jsonify(CAREER_MAP[ptype])


# ---------------------------------------------------------
# 2️⃣ Save quiz result for GUEST user (no login required)
# ---------------------------------------------------------
@career_bp.route("/quiz/submit", methods=["POST"])
def submit_quiz_guest():
    data = request.get_json(silent=True) or {}

    guest_id = data.get("guest_id")
    personality_type = data.get("personality_type")
    career_choice = data.get("career_choice")
    result_json = data.get("result")

    if not guest_id:
        return jsonify({"error": "guest_id is required"}), 400

    guest_result = GuestResult( # type: ignore[call-arg]
        guest_id=guest_id, # type: ignore
        personality_type=personality_type, # type: ignore
        career_choice=career_choice, # type: ignore
        result_json=result_json # type: ignore
    )  

    db.session.add(guest_result)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Guest quiz result saved"
    })


# ---------------------------------------------------------
# 3️⃣ Merge guest quiz results into USER account (after login)
# ---------------------------------------------------------
@career_bp.route("/quiz/merge-results", methods=["POST"])
@jwt_required()
def merge_guest_results():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True) or {}

    guest_id = data.get("guest_id")
    if not guest_id:
        return jsonify({"error": "guest_id is required"}), 400

    guest_results = GuestResult.query.filter_by(guest_id=guest_id).all()

    if not guest_results:
        return jsonify({
            "status": "noop",
            "message": "No guest results found"
        })

    for g in guest_results:
        user_result = Result( # type: ignore[call-arg]
            user_id=user_id, # type: ignore
            personality_type=g.personality_type, # type: ignore
            career_choice=g.career_choice, # type: ignore
            result_json=g.result_json # type: ignore
        )
        db.session.add(user_result)

    # cleanup guest data
    GuestResult.query.filter_by(guest_id=guest_id).delete()

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Guest results merged into user account"
    })
