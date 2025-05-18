@app.route("/stress", methods=["GET"])
def get_stress():
    stress_ratio, meditative_ratio, creativity_ratio, ambition_ratio = calculate_stress()
    if stress_ratio < 1:
        level = "high"
    elif stress_ratio < 1.5:
        level = "mild"
    else:
        level = "normal"

    return jsonify({
        "stress_ratio": stress_ratio,
        "stress": level
    })


import math

def stress_percentage_precise(ratio):
    A = 208.9
    B = 3.91
    stress = A * (math.log10(B) - math.log10(ratio + 1))
    return round(min(100, max(0, stress)))