from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Step 1: Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin access from your frontend

# Step 2: Load API key from .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Step 3: Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Step 4: Route to analyze complaints
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    complaint = data.get('complaint', '')

    if not complaint.strip():
        return jsonify({"error": "Complaint is empty."}), 400

    prompt = f"""
You are a customer service assistant.

Analyze the following complaint and return a response ONLY in raw JSON format (no markdown, no triple backticks). The JSON should look like this:
{{
  "issue_category": "...",
  "sentiment": "...",
  "summary": "...",
  "response": "..."
}}

Complaint:
\"\"\"{complaint}\"\"\"
"""

    try:
        gemini_response = model.generate_content(prompt)
        result_text = gemini_response.text.strip()

        # Remove triple backticks if Gemini adds them
        if result_text.startswith("```"):
            result_text = result_text.replace("```json", "").replace("```", "").strip()

        return jsonify({"result": result_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Step 5: Run the app
if __name__ == '__main__':
    app.run(debug=True)

