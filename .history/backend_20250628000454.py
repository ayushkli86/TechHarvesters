from flask import Flask, request, jsonify
import requests
import pandas as pd
import os
from googleapiclient.discovery import build
from PIL import Image
import torch
from torchvision import transforms
import io

app = Flask(__name__)

# Google Custom Search API setup (replace with your own API key and CX)
GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'
GOOGLE_CX = 'YOUR_GOOGLE_CX'

# Load PyTorch model (update path and class labels as needed)
MODEL_PATH = 'models/model.pt'
CLASS_LABELS = ['Healthy', 'Early Blight', 'Late Blight']

# Check if network is available
def is_online():
    try:
        requests.get('https://www.google.com', timeout=3)
        return True
    except requests.RequestException:
        return False

# Google Search
def google_search(query):
    service = build("customsearch", "v1", developerKey=GOOGLE_API_KEY)
    res = service.cse().list(q=query, cx=GOOGLE_CX, num=1).execute()
    if 'items' in res:
        return res['items'][0]['snippet']
    return "No answer found online."

# CSV Search
def csv_search(query):
    if not os.path.exists('answers.csv'):
        return "No offline answers available."
    df = pd.read_csv('answers.csv')
    for _, row in df.iterrows():
        if row['Question'].strip().lower() == query.strip().lower():
            return row['Answer']
    return "No answer found offline."

def load_model():
    model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
    model.eval()
    return model

model = load_model()

# Typical normalization for ImageNet models
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('message', '')
    if not question:
        return jsonify({'answer': 'Please ask a question.'})
    if is_online():
        answer = google_search(question)
    else:
        answer = csv_search(question)
    return jsonify({'answer': answer})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    try:
        img = Image.open(file.stream).convert('RGB')
        input_tensor = preprocess(img).unsqueeze(0)
        with torch.no_grad():
            output = model(input_tensor)
            pred_idx = output.argmax(dim=1).item()
            pred_label = CLASS_LABELS[pred_idx] if pred_idx < len(CLASS_LABELS) else str(pred_idx)
            confidence = torch.softmax(output, dim=1)[0, pred_idx].item()
        return jsonify({'class': pred_label, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 