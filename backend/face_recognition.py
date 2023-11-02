# face_recognition.py

import face_recognition
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .models import User
from . import db

face_recognition_bp = Blueprint('face_recognition', __name__)

@face_recognition_bp.route('/recognize_faces', methods=['POST'])
@login_required
def recognize_faces():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Load the user's saved facial data
    saved_face_encoding = current_user.FaceRecognitionData

    # Load the uploaded image
    uploaded_image = face_recognition.load_image_file(image_file)
    uploaded_face_locations = face_recognition.face_locations(uploaded_image)
    
    if not uploaded_face_locations:
        return jsonify({'error': 'No faces found in the uploaded image'})

    # Encode the faces in the uploaded image
    uploaded_face_encodings = face_recognition.face_encodings(uploaded_image, uploaded_face_locations)

    if not uploaded_face_encodings:
        return jsonify({'error': 'No faces could be encoded in the uploaded image'})

    # Compare the uploaded face encodings with the saved face encoding
    is_match = False
    for uploaded_face_encoding in uploaded_face_encodings:
        match = face_recognition.compare_faces([saved_face_encoding], uploaded_face_encoding, tolerance=0.6)  # Adjust tolerance as needed
        if any(match):
            is_match = True
            break

    if is_match:
        return jsonify({'message': 'Face recognized!'})
    else:
        return jsonify({'error': 'Face not recognized'})

@face_recognition_bp.route('/capture_face', methods=['POST'])
@login_required
def capture_face():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Load the uploaded image
    uploaded_image = face_recognition.load_image_file(image_file)
    uploaded_face_locations = face_recognition.face_locations(uploaded_image)

    if not uploaded_face_locations:
        return jsonify({'error': 'No faces found in the uploaded image'})

    # Encode the face(s) in the uploaded image
    uploaded_face_encodings = face_recognition.face_encodings(uploaded_image, uploaded_face_locations)

    if not uploaded_face_encodings:
        return jsonify({'error': 'No faces could be encoded in the uploaded image'})

    # Save the first face encoding to the user's profile
    current_user.FaceRecognitionData = uploaded_face_encodings[0]
    db.session.commit()

    return jsonify({'message': 'Face data captured and saved!'})
