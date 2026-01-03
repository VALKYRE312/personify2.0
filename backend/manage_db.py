# backend/manage_db.py
from app import create_app
from database.db import db

# 🚨 Import your models so SQLAlchemy registers the tables!
from models.user import User  

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("✅ DB tables created (or already exist)")
