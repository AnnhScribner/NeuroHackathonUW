// src/pages/ComeBackPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ComeBackPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">⏳ We'll check back in 5 min</h1>
                <p className="text-lg mb-4">
                    No worries. We'll give you space and check on you soon.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded text-white"
                >
                    ← Back to StressBot
                </button>
            </div>
        </div>
    );
}
