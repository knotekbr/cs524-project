from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# Import configurations
from config import Config

# Initialize app and load configurations
app = Flask(__name__)
app.config.from_object(Config)

# Initialize Flask extensions
db = SQLAlchemy(app)           # Database
migrate = Migrate(app, db)     # Database migrations
login_manager = LoginManager() # Login management
login_manager.login_view = 'auth.login'  # Specify what is the login view

# Initialize database models
from .models import User, Game, QuestionCategory, Question, Answer, GameEvent, GamePlayer

# Import Blueprints
from .auth import auth_bp
from .face_recognition import face_recognition_bp

# Register Blueprints with the app
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(face_recognition_bp, url_prefix='/face_recognition')

# You may have more Blueprints to register, include them in a similar fashion.

# User loader function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Import error handlers if you have them defined
# from .error_handlers import page_not_found, internal_server_error
# app.register_error_handler(404, page_not_found)
# app.register_error_handler(500, internal_server_error)

# Additional initialization code can go here

# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# Application entry point
if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False in a production environment
