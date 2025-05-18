import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MeditatePage() {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isInhaling, setIsInhaling] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const breathInterval = setInterval(() => {
            setIsInhaling((prev) => !prev);
        }, 4000); // switch every 4 seconds (inhale/exhale)

        return () => clearInterval(breathInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4"> Meditation Break</h1>

                <div className="w-32 h-32 mx-auto mb-6">
                    <div
                        className={`w-full h-full rounded-full bg-purple-300 transition-all duration-1000 ease-in-out ${
                            isInhaling ? "scale-110" : "scale-90"
                        }`}
                    ></div>
                </div>

                <p className="text-lg mb-4">
                    {isInhaling ? "Inhale..." : "Exhale..."}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    {secondsLeft > 0
                        ? `Time left: ${secondsLeft} seconds`
                        : "Meditation complete ✨"}
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
