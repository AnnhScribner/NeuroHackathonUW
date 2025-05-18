'''
IF YOU DONT HAVE THE MUSE HEADSET, YOU CAN STILL PLAY AROUND
OR DO SOME DEMO USING THIS FILE

importing two tools from Flask package:
- Flask: to create a web application/mini server
- jsonify: to send back data in a format React (and browsers) understand  - > JSON

CORS = Cross-Oring Resource Sharing -> lets my frontend (React) talk to my backend (Flask)
   -> This is like: "Hey Flask, it is okay to let React in"

random -> can be delated -> it will be replaced by reall stress data

'''


from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__) # created the Flask app -> Opening the front door to the server
# __name__ -> tells Flask where to find my code
CORS(app)  # Allows React to talk to this backend

@app.route("/") # This is what im gonna see at http://127.0.0.1:5000/
def home():
    return "👋 Hello from StressBot backend!"

# This next line defines a URL route that I can use in my browser (or call from React)
# And it connects to the function right below it
@app.route("/stress", methods=["GET"])
def get_stress_level():
    stress_levels = ["normal", "mild", "high"] # A pretend list of stress levels, change it later
    # with real data from Muse

    # This next line randomly picks one of the stress levels from list and sends it back as a JSON object
    # like this:        {" stress" : "mild"}
    # This is what my React app will receive and use to change the screen
    return jsonify({"stress": random.choice(stress_levels)})

if __name__ == "__main__":
    app.run(debug=True) # debug means that it will restart automatically if I change the code
