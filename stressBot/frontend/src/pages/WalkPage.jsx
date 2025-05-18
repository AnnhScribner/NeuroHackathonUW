import React from "react";
import { useNavigate } from "react-router-dom";

export default function WalkPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">🚶 Walk Break</h1>

                <p className="text-lg mb-6">
                    A short walk can clear your mind, reduce tension, and refresh your energy.
                </p>

                <p className="text-gray-600 mb-6">
                     Take a few minutes to walk around, get fresh air, or just move your body gently.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-green-300 hover:bg-green-400 text-white px-4 py-2 rounded"
                >
                    ← Back to StressBot
                </button>
            </div>
        </div>
    );
}
