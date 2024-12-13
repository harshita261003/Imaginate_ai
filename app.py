from flask import Flask, request, jsonify
import openai  # Make sure you have OpenAI's library installed or another image generation API

# Initialize Flask app
app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = '5be9a6289f334c2d9687d3d030e1c281'

# Endpoint to generate image
@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        # Example with OpenAI's DALL·E model
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response['data'][0]['url']
        return jsonify({'image_url': image_url})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

