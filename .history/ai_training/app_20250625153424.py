from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
MODEL_PATH = 'models/crop_disease_model.h5'
IMG_SIZE = (224, 224)

# Load model
model = load_model(MODEL_PATH)

# Class labels (update as per your dataset)
CLASS_NAMES = ['Healthy', 'Disease1', 'Disease2']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    img = image.load_img(file, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    preds = model.predict(img_array)[0]
    top_idx = np.argmax(preds)
    result = {
        'class': CLASS_NAMES[top_idx],
        'confidence': float(preds[top_idx])
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True) 