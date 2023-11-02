#config.py
import os

class Config:
    # General Flask Config
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you_should_replace_this'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Database Config
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://your_db_url_here'
    
    # Performance Config
    SQLALCHEMY_POOL_RECYCLE = 90  # Recommended for MySQL to avoid disconnects
    SQLALCHEMY_POOL_TIMEOUT = 20
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_MAX_OVERFLOW = 5

    # Security Config
    # CSRF_ENABLED = True
    # REMEMBER_COOKIE_SECURE = True  # If using HTTPS
    # SESSION_COOKIE_HTTPONLY = True
    # SESSION_COOKIE_SECURE = True  # If using HTTPS

    # Game Specific Config
    GAME_ROUND_DURATION_SECONDS = 30
    MAX_PLAYERS_PER_GAME = 5
    # ... add any other game-specific configurations you might have

# Optionally, you can create different configuration sets for development, testing, and production.
