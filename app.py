from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = "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"

@app.route("/generate", methods=["POST"])
def generate_image():
    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        # Call OpenAI or another image generation model
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="512x512"
        )
        return jsonify({"image_url": response['data'][0]['url']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
