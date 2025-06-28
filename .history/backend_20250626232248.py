from flask import Flask, request, jsonify
import requests
import pandas as pd
import os
from googleapiclient.discovery import build

app = Flask(__name__)

# Google Custom Search API setup (replace with your own API key and CX)
GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'
GOOGLE_CX = 'YOUR_GOOGLE_CX'

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

if __name__ == '__main__':
    app.run(debug=True) 