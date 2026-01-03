# backend/config.py
import os
from dotenv import load_dotenv

# 🔑 Load environment variables from .env
load_dotenv()

class Config:
    DEBUG = True

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///personality.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
