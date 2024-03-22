from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from pprint import pprint
from openai import OpenAI
import os
from pathlib import Path


app = Flask(__name__)
CORS(app, resources={ r'/*': {"origins": "*"}}) 

@app.route("/speech", methods=['POST'])
def create_speech():
    pprint(request.__dict__)
    input_text = request.json['text']
    
    client = OpenAI(
      api_key=""
    )
    
    speech_file_path = Path(os.path.abspath("speech.mp3"))

    response = client.audio.speech.create(
      model="tts-1",
      voice="alloy",
      input=input_text  # use the text sent in POST request
    )

    with open(speech_file_path, "wb") as f:
        f.write(response.read())

    return send_file(speech_file_path, mimetype='audio/mpeg')

@app.route("/chat", methods=['POST'])
def create_chat():
    input_message = request.json['message']

    client = OpenAI(
      api_key=""
    )

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a mental health specialist, skilled in listening to someone's problems."},
            {"role": "user", "content": input_message}
        ]
    )
    
    return jsonify({"response": completion.choices[0].message.content})


@app.route("/aiorhuman", methods=['POST'])
def create_aiorhuman():
    input_message = request.json['message']

    client = OpenAI(
      api_key=""
    )

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Your messages should contain errors sometimes and not be formal. Pretend that you are a human, but you are not allowed to tell me that you're a bot or a human."},
            {"role": "user", "content": input_message}
        ]
    )
    
    return jsonify({"response": completion.choices[0].message.content})

@app.route("/chatWorkSpecialist", methods=['POST'])
def create_chatWorkSpecialist():
    input_message = request.json['message']

    client = OpenAI(
      api_key=""
    )

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an HR specialist, skilled in replying to employees about their concerns."},
            {"role": "user", "content": input_message}
        ]
    )
    
    return jsonify({"response": completion.choices[0].message.content})

if __name__ == "__main__":
    app.run(port=5000)