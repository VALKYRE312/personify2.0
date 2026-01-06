# backend/app.py
import os
from flask import Flask, app
from flask_cors import CORS
from database.db import db
from flask_jwt_extended import JWTManager

def create_app():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    app = Flask(
        __name__,
        static_folder=os.path.join(BASE_DIR, "static"),
        static_url_path="/static"
    )

    app.secret_key = os.getenv("SECRET_KEY", "dev-secret")

    JWTManager(app)

    CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://personify2-0.vercel.app",
                "https://personify2-0-git-main-valkyre312s-projects.vercel.app",
            ],
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "OPTIONS"],
        }
    },
    supports_credentials=True,
)


    app.config.from_object("config.Config")
    db.init_app(app)
    
    # 🔴 FORCE SQLAlchemy TO LOAD MODELS FIRST
    from models import User, Result, GuestResult
 
    
    with app.app_context():
        db.create_all()



    from routes.analyze import analyze_bp
    from routes.personality import personality_bp
    from routes.career import career_bp
    from routes.auth import auth_bp
    from routes.profile import profile_bp
    from routes.therapy_api import therapy_bp
    from routes.therapy import therapy_data_bp
    from routes.roadmap import roadmap_bp
    from routes.roadmap_pdf import roadmap_pdf_bp
    from routes.auth_google import google_bp, init_oauth

    app.register_blueprint(analyze_bp)

    app.register_blueprint(personality_bp)
    app.register_blueprint(career_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(therapy_bp)
    app.register_blueprint(therapy_data_bp)
    app.register_blueprint(roadmap_bp, url_prefix="/api")
    app.register_blueprint(roadmap_pdf_bp, url_prefix="/api")

    init_oauth(app)
    app.register_blueprint(google_bp)

    return app


# ✅ THIS IS THE KEY LINE
app = create_app()

# ✅ ADD THIS **RIGHT BELOW IT**
@app.route("/")
def health():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
