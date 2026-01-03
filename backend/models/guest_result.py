from database.db import db

class GuestResult(db.Model): # type: ignore[call-arg]
    __tablename__ = "guest_results"

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.String(36), index=True, nullable=False)

    personality_type = db.Column(db.String(4))
    career_choice = db.Column(db.String(100))

    result_json = db.Column(db.JSON)

    created_at = db.Column(db.DateTime, default=db.func.now())
