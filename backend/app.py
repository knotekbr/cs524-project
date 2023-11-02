from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# Initialize the core application
app = Flask(__name__)
app.config.from_object(Config)

# Initialize Flask extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'auth.login'  # Specify the login view

# Import Blueprints
from my_jeopardy_game.auth import auth_bp
from my_jeopardy_game.face_recognition import face_recognition_bp
# Potentially import additional Blueprints here

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(face_recognition_bp, url_prefix='/face_recognition')
# Potentially register additional Blueprints here

# Error handlers
# app.register_error_handler(404, page_not_found)
# app.register_error_handler(500, internal_server_error)

if __name__ == '__main__':
    app.run()
