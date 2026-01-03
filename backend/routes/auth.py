# backend/routes/auth.py
from __future__ import annotations
from flask import Blueprint, request, jsonify
from datetime import datetime
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from database.db import db
from models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}

    first_name = (data.get("first_name") or "").strip()
    last_name = (data.get("last_name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    birthday_str = data.get("birthday")  # could be "YYYY-MM-DD" or "MM/DD/YYYY" etc.

    if not all([first_name, last_name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400

    # check existing email
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered."}), 409

    user = User( # type: ignore
        first_name=first_name,
        last_name=last_name,
        email=email,
    )

    # ---------- REPLACED BLOCK: accept several common date formats ----------
    if birthday_str:
        parsed = None
        # try common formats (ISO, US, EU)
        for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%d/%m/%Y"):
            try:
                parsed = datetime.strptime(birthday_str, fmt).date()
                break
            except ValueError:
                continue

        # optional: fallback to python-dateutil if available (more flexible)
        if parsed is None:
            try:
                from dateutil.parser import parse as dateparse  # pip install python-dateutil
                parsed = dateparse(birthday_str).date()
            except Exception:
                return jsonify({"error": "Invalid birthday format"}), 400

        user.birthday = parsed
    # -----------------------------------------------------------------------

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"user": user.to_dict()}), 201

# =========================
# LOGIN  ✅ THIS WAS MISSING
# =========================
@auth_bp.post("/login")
def login():
    data = request.get_json() or {}

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    }), 200