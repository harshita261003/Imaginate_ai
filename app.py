from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# OpenAI API Key
openai.api_key = "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"

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()

    prompt = data.get('prompt')
    n = data.get('n', 1)  # Default to 1 image if not provided
    size = data.get('size', '512x512')

    try:
        response = openai.Image.create(
            prompt=prompt,
            n=n,
            size=size,
            response_format="b64_json"
        )
        return jsonify(response['data'])  # Return the generated image data
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
