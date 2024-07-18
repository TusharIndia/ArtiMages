from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os


load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')

app = Flask(__name__)

app.config['SECRET_KEY'] = SECRET_KEY
app.config['MONGO_URI'] = DATABASE_URL

CORS(app, origins=['https://artimages-tushars-projects-aa4fc2bf.vercel.app'], methods=['GET', 'POST'], 
     allow_headers=['Content-Type'])

client = MongoClient(DATABASE_URL)
db = client.AiPosts
collection = db.aaa



@app.route('/api/posts/GetAllPosts', methods=['GET'])
def GetAllPosts():
    try:
        data = list(collection.find({}))  
        for post in data:
            post['_id'] = str(post['_id'])  
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posts/CreatePost', methods=['POST'])
def CreatePost():
    data = request.json
    author = data.get('author', None)
    prompt = data.get('prompt', None)
    avatar = data.get('avatar', None)
    pict = data.get('pict', None)
    deta = {
        "author": author,
        "avatar": avatar,
        "prompt": prompt,
        "pict": pict
    }
    try:
        collection.insert_one(deta)
        return jsonify(success=True), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt', None)

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    payload = {
        "key": SECRET_KEY,
        "prompt": prompt,
        "negative_prompt": "bad quality"
    }

    try:
        response = requests.post(
            "https://modelslab.com/api/v6/realtime/text2img",
            headers={"Content-Type": "application/json"},
            json=payload
        )

        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({'error': 'Failed to generate image', 'details': response.text}), response.status_code
    except requests.RequestException as e:
        return jsonify({'error': 'Request failed', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
