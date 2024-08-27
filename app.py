from flask import Flask, request, jsonify, send_from_directory
from groq import Groq

app = Flask(__name__)

# Initialize the Groq client with the API key
api_key = "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"
client = Groq(api_key=api_key)

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    user_message = data.get('message')

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_message,
                }
            ],
            model="llama3-8b-8192",
        )

        if hasattr(chat_completion, 'choices') and len(chat_completion.choices) > 0:
            response_message = chat_completion.choices[0].message.content
            return jsonify({'response': response_message})
        else:
            return jsonify({'response': "Unexpected response format."})
    except Exception as e:
        return jsonify({'response': f"An error occurred: {e}"})

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == "__main__":
    app.run(debug=True)

