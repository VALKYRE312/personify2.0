# backend/routes/auth_google.py
import os
from flask import Blueprint, redirect, session, url_for
from authlib.integrations.flask_client import OAuth

google_bp = Blueprint("google_auth", __name__, url_prefix="/api")
oauth = OAuth()


def init_oauth(app):
    oauth.init_app(app)

    oauth.register(
        name="google",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={
            "scope": "openid email profile"
        },
    )


@google_bp.route("/auth/google")
def google_login():
    return oauth.google.authorize_redirect(# type: ignore
        redirect_uri=url_for("google_auth.google_callback", _external=True)
    )


@google_bp.route("/auth/google/callback")
def google_callback():
    token = oauth.google.authorize_access_token()  # type: ignore

    user = token.get("userinfo")

    session["user"] = {
        "email": user.get("email"),
        "name": user.get("name"),
        "picture": user.get("picture"),
    }

    return redirect((os.getenv("FRONTEND_URL", "http://localhost:5173")) + "/profile")


