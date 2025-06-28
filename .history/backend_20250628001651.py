from flask import Flask, request, jsonify
import pandas as pd
import os
from PIL import Image
import torch
from torchvision import transforms
import io
import threading

app = Flask(__name__)

# Check if network is available
def is_online():
    try:
        requests.get('https://www.google.com', timeout=3)
        return True
    except requests.RequestException:
        return False

# CSV Search
def csv_search(query):
    if not os.path.exists('answers.csv'):
        return "No offline answers available."
    df = pd.read_csv('answers.csv')
    for _, row in df.iterrows():
        if row['Question'].strip().lower() == query.strip().lower():
            return row['Answer']
    return "No answer found offline."

# --- Model and Advice Setup ---
def load_model_threadsafe(path):
    model = torch.load(path, map_location=torch.device('cpu'))
    model.eval()
    return model

# Potato model
POTATO_MODEL_PATH = 'models/potato_leaf_model.pt'
POTATO_CLASSES = ['Healthy', 'Early Blight', 'Late Blight']
POTATO_ADVICE = {
    'Healthy': 'No action needed.',
    'Early Blight': 'Remove affected leaves and apply fungicide.',
    'Late Blight': 'Destroy infected plants and use recommended fungicide.'
}
potato_model = load_model_threadsafe(POTATO_MODEL_PATH)

# Tomato model
TOMATO_MODEL_PATH = 'models/tomato_leaf_model.pt'
TOMATO_CLASSES = ['Healthy', 'Early Blight', 'Late Blight']
TOMATO_ADVICE = {
    'Healthy': 'No action needed.',
    'Early Blight': 'Remove affected leaves and apply fungicide.',
    'Late Blight': 'Destroy infected plants and use recommended fungicide.'
}
tomato_model = load_model_threadsafe(TOMATO_MODEL_PATH)

preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# --- Prediction Endpoints ---
def predict_with_model(model, class_labels, advice_dict, file):
    img = Image.open(file.stream).convert('RGB')
    input_tensor = preprocess(img).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        pred_idx = output.argmax(dim=1).item()
        pred_label = class_labels[pred_idx] if pred_idx < len(class_labels) else str(pred_idx)
        confidence = torch.softmax(output, dim=1)[0, pred_idx].item()
        suggestion = advice_dict.get(pred_label, '')
    return pred_label, confidence, suggestion

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('message', '')
    if not question:
        return jsonify({'answer': 'Please ask a question.'})
    answer = csv_search(question)
    return jsonify({'answer': answer})

@app.route('/predict_potato', methods=['POST'])
def predict_potato():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    try:
        pred_label, confidence, suggestion = predict_with_model(potato_model, POTATO_CLASSES, POTATO_ADVICE, file)
        return jsonify({'class': pred_label, 'confidence': confidence, 'suggestion': suggestion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_tomato', methods=['POST'])
def predict_tomato():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    try:
        pred_label, confidence, suggestion = predict_with_model(tomato_model, TOMATO_CLASSES, TOMATO_ADVICE, file)
        return jsonify({'class': pred_label, 'confidence': confidence, 'suggestion': suggestion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 