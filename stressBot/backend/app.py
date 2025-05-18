# import math
# from flask import Flask, jsonify, request, make_response
# from flask_cors import CORS, cross_origin
# from read_eeg_stream import calculate_traits, start_readings, stop_readings
# import sys
# import signal
# DUMMY_DATA = {
#     "warning": "THIS IS DUMMY DATA BECAUSE THE MUSE DEVICE DIDN'T CONNECT. CONNECT IT AND TRY AGAIN",
#     "stress_ratio": -1,
#     "stress": "DUMMY STRESS LEVEL",
#     "stress_percentage": -1,
#
#     "meditation_ratio" : -1,
#     "meditation" : "DUMMY MEDITATION LEVEL",
#
#     "creativity_ratio" : -1,
#     "creativity" : "DUMMY CREATIVITY LEVEL",
#
#     "ambition_ratio" : -1,
#     "ambition" : "DUMMY CREATIVITY LEVEL"
# }
#
# #  1. Create the Flask app first
# app = Flask(__name__)
# #CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app, origins=["*"])
# # CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])
# # CORS(app, origins=["http://localhost:5173"])
# # CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
#
# #  Stress endpoint
# @app.route("/stress", methods=["GET"])
# def get_stress():
#     stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio = calculate_traits()
#     print(stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio)
#     # if stress_ratio == -1 and meditative_ratio == -1:
#     #     return jsonify(DUMMY_DATA)
#
#     #N. H. A. Hamid, N. Sulaiman, Z. H. Murat and M. N. Taib - https://ieeexplore.ieee.org/abstract/document/7412480
#     if stress_ratio < 1:
#         stress_level = "high"
#     elif stress_ratio < 2:
#         stress_level = "mild"
#     else:
#         stress_level = "normal"
#
#     #Rodriguez-Larios, J., Faber, P., Achermann, P. et al. - https://www.nature.com/articles/s41598-020-62392-2#citeas
#     meditation_level = "meditative" if meditative_ratio > 2 else "active"
#     #just our testing, not accurate
#     creativity_level = "in creative flow" if creativity_ratio < 5 else "out of creative flow" #unfounded values
#     #Spielberg JM, Stewart JL, Levin RL, Miller GA, Heller W. - https://pmc.ncbi.nlm.nih.gov/articles/PMC2889703/
#     ambition_level = "ambitious" if ambition_ratio <= 0 else "withdrawn"
#
#     stress_percentage = stress_percentage_precise(stress_ratio)
#
#     return jsonify({
#         "stress_ratio": stress_ratio,
#         "stress": stress_level,
#         "stress_percentage": stress_percentage,
#
#         "meditation_ratio" : meditative_ratio,
#         "meditation" : meditation_level,
#
#         "creativity_ratio" : creativity_ratio,
#         "creativity" : creativity_level,
#
#         "ambition_ratio" : ambition_ratio,
#         "ambition" : ambition_level
#     })
#
# def stress_percentage_precise(ratio):
#     A = 208.9
#     B = 3.91
#     safe_ratio = max(0.001, ratio + 1)
#     stress = A * (math.log10(B) - math.log10(safe_ratio))
#     return round(min(100, max(0, stress)), 2)
#
# def shutdown_handler(sig, frame):
#     print("\nShutting down gracefully...")
#     # Stop EEG loop or clean up resources here
#     stop_readings()  # <- You need to define this in read_eeg_stream
#     sys.exit(0)
#
#
#
# #  Run the server
# if __name__ == "__main__":
#     signal.signal(signal.SIGINT, shutdown_handler)
#     start_readings()
#     app.run(debug=True, host="127.0.0.1", port=5050)
#

import math
import sys
import signal
from flask import Flask, jsonify
from flask_cors import CORS
from read_eeg_stream import calculate_traits, start_readings, stop_readings

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

# Emotion level classifiers
def classify_stress(ratio):
    if ratio < 1:
        return "high"
    elif ratio < 2:
        return "mild"
    else:
        return "normal"

def classify_meditation(ratio):
    if ratio > 3:
        return "high"
    elif ratio > 2:
        return "mild"
    else:
        return "low"

def classify_creativity(ratio):
    if ratio < 3:
        return "high"
    elif ratio < 5:
        return "mild"
    else:
        return "low"

def classify_ambition(ratio):
    if ratio < -1:
        return "high"
    elif ratio < 0:
        return "mild"
    else:
        return "low"

# Calculate percentage-based stress score from alpha/beta ratio
def stress_percentage_precise(ratio):
    A = 208.9
    B = 3.91
    safe_ratio = max(0.001, ratio + 1)
    stress = A * (math.log10(B) - math.log10(safe_ratio))
    return round(min(100, max(0, stress)), 2)

@app.route("/stress", methods=["GET"])
def get_stress():
    stress_ratio, med_ratio, creativity_ratio, ambition_ratio = calculate_traits()

    if stress_ratio == -1 and med_ratio == -1:
        return jsonify(DUMMY_DATA)

    # Classify levels
    stress_level = classify_stress(stress_ratio)
    meditation_level = classify_meditation(med_ratio)
    creativity_level = classify_creativity(creativity_ratio)
    ambition_level = classify_ambition(ambition_ratio)

    stress_percentage = stress_percentage_precise(stress_ratio)

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
    stop_readings()
    sys.exit(0)

# Start EEG reading loop and run the Flask app
if __name__ == "__main__":
    signal.signal(signal.SIGINT, shutdown_handler)
    start_readings()
    app.run(debug=True, host="127.0.0.1", port=5050)
