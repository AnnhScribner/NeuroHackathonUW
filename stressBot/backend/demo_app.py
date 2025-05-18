import sys
import signal
from flask import Flask, jsonify
from flask_cors import CORS

# Dummy fallback if no EEG data is detected
DUMMY_DATA = {
    "warning": "THIS IS DUMMY DATA BECAUSE THE MUSE DEVICE DIDN'T CONNECT.",
    "stress_ratio": -1,
    "stress": "DUMMY",
    "stress_level": "none",
    "stress_percentage": -1,

    "meditation_ratio": -1,
    "meditation": "DUMMY",
    "meditation_level": "none",

    "creativity_ratio": -1,
    "creativity": "DUMMY",
    "creativity_level": "none",

    "ambition_ratio": -1,
    "ambition": "DUMMY",
    "ambition_level": "none"
}

app = Flask(__name__)
CORS(app, origins=["*"])

i = 0

@app.route("/stress", methods=["GET"])
def get_stress():
    global i
    i += 1
    stress_ratio, med_ratio, creativity_ratio, ambition_ratio = 1,2,3,4
    # Classify levels






    stress_level = "high" if i % 4 == 0 else "low"
    stress_ratio = 0.576 if i % 4 == 0 else 3.437

    meditation_level =  "high" if i % 4 == 1 else "low"
    med_ratio = 3.6567 if i % 4 == 1 else 1.2432

    creativity_level =  "high" if i % 4 == 2 else "low"
    creativity_ratio =  2.3567 if i % 4 == 2 else 6.55454

    ambition_level = "high" if i % 4 == 3 else "low"
    ambition_ratio = -2.3545 if i % 4 == 3 else 1.234

    stress_percentage = 85

    return jsonify({
        "stress_ratio": stress_ratio,
        "stress": stress_level,
        "stress_level": stress_level,
        "stress_percentage": stress_percentage,

        "meditation_ratio": med_ratio,
        "meditation": meditation_level,
        "meditation_level": meditation_level,

        "creativity_ratio": creativity_ratio,
        "creativity": creativity_level,
        "creativity_level": creativity_level,

        "ambition_ratio": ambition_ratio,
        "ambition": ambition_level,
        "ambition_level": ambition_level
    })

def shutdown_handler(sig, frame):
    print("\nShutting down gracefully...")
    sys.exit(0)

# Start EEG reading loop and run the Flask app
if __name__ == "__main__":
    signal.signal(signal.SIGINT, shutdown_handler)
    app.run(debug=True, host="127.0.0.1", port=5050)
