// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// //
// // export default function StressBot() {
// //     const navigate = useNavigate();
// //
// //     const [stressLevel, setStressLevel] = useState("none");
// //     const [stressValue, setStressValue] = useState(-1);
// //
// //     const [ambitionLevel, setAmbitionLevel] = useState("none");
// //     const [ambitionValue, setAmbitionValue] = useState(-1);
// //
// //     const [creativityLevel, setCreativityLevel] = useState("none");
// //     const [creativityValue, setCreativityValue] = useState(-1);
// //
// //     const [response, setResponse] = useState("I'm here with you. Let's get started!");
// //     const[allData, setAllData] = useState("none")
// //
// //     const [comebackMode, setComebackMode] = useState(false);
// //     const [comebackPhase, setComebackPhase] = useState("initial"); // "wait" or "return"
// //     const [suggestions, setSuggestions] = useState([]);
// //
// //     function getSuggestions(data) {
// //         const suggestions = [];
// //
// //         if (data.creativity === "in creative flow") {
// //             suggestions.push("You're in a creative flow — it’s a great time to work on your project!");
// //         }
// //
// //         if (data.ambition === "ambitious") {
// //             suggestions.push("You're feeling ambitious — why not start something new?");
// //         }
// //
// //         if (data.meditation === "meditative") {
// //             suggestions.push("You’re calm and focused — now’s a good moment to make an important decision.");
// //         }
// //
// //         return suggestions;
// //     }
// //
// //     useEffect(() => {
// //         const fetchStress = async () => {
// //
// //             try {
// //                 const res = await fetch("http://127.0.0.1:5050/stress");
// //
// //                 console.log("Response result: " + JSON.stringify(allData, null, 2))
// //
// //                 const data = await res.json();
// //                 setAllData(data);
// //
// //                 setStressLevel(data.stress);
// //                 setStressValue(data.stress_ratio);
// //
// //                 setAmbitionLevel(data.ambition);
// //                 setAmbitionValue(data.ambition_ratio);
// //
// //                 setCreativityLevel(data.creativity);
// //                 setCreativityValue(data.creativity_ratio);
// //                 setSuggestions(getSuggestions(data));
// //
// //                 if (data.stress === "high") {
// //                     setResponse("You look a little stressed. Let's take a deep breath together. Would you like to meditate, go on a walk, or check back in 5 minutes?");
// //                 } else if (data.stress === "mild") {
// //                     setResponse("Noticing a slight tension... maybe a quick stretch would help?");
// //                 } else {
// //                     setResponse("You're doing great! Keep going");
// //                 }
// //             } catch (error) {
// //                 console.error("Could not fetch stress level:", error);
// //             }
// //         };
// //
// //         fetchStress();
// //         const interval = setInterval(fetchStress, 10000);
// //         return () => clearInterval(interval);
// //     }, []);
// //
// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
// //             <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
// //                 <h1 className="text-3xl font-bold mb-4">StressBot</h1>
// //                 <p className="text-lg mb-4">{response}</p>
// //                 {suggestions.map((tip, index) => (
// //                     <p key={index} className="text-sm text-green-700 mb-1">
// //                         • {tip}
// //                     </p>
// //                 ))}
// //
// //                 {/*<pre className="text-left text-sm bg-gray-100 p-2 rounded">*/}
// //                 {/*    {JSON.stringify(allData, null, 2)}*/}
// //                 {/*</pre>*/}
// //
// //
// //                 {/* Comeback Mode Logic */}
// //                 {comebackMode ? (
// //                     comebackPhase === "wait" ? (
// //                         <p className="text-lg text-gray-600">
// //                             No worries. We'll give you space and check on you soon.
// //                         </p>
// //                     ) : (
// //                         <div className="flex flex-col gap-2">
// //                             <p className="text-lg mb-4">
// //                                 I didn’t forget you, I’m back! Would you like to meditate, go on a walk, or more 5 min?
// //                             </p>
// //                             <button
// //                                 onClick={() => navigate("/meditate")}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  Meditate
// //                             </button>
// //                             <button
// //                                 onClick={() => navigate("/walk")}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  Go on a walk
// //                             </button>
// //                             <button
// //                                 onClick={() => {
// //                                     setComebackPhase("wait");
// //                                     setTimeout(() => setComebackPhase("return"), 5000);
// //                                 }}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  More 5 min
// //                             </button>
// //                         </div>
// //                     )
// //                 ) : (
// //                     stressLevel === "high" && (
// //                         <div className="flex flex-col gap-2">
// //                             <button
// //                                 onClick={() => navigate("/meditate")}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  Meditate
// //                             </button>
// //                             <button
// //                                 onClick={() => navigate("/walk")}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  Go on a walk
// //                             </button>
// //                             <button
// //                                 onClick={() => {
// //                                     setComebackMode(true);
// //                                     setComebackPhase("wait");
// //                                     setTimeout(() => {
// //                                         setComebackPhase("return");
// //                                     }, 5000);
// //                                 }}
// //                                 className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
// //                             >
// //                                  Come back in 5 min
// //                             </button>
// //                         </div>
// //                     )
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// //
//
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
//
// export default function StressBot() {
//     const navigate = useNavigate();
//
//     const [stressLevel, setStressLevel] = useState("none");
//     const [stressValue, setStressValue] = useState(-1);
//     const [stressPercentage, setStressPercentage] = useState(0);
//
//     const [ambitionLevel, setAmbitionLevel] = useState("none");
//     const [ambitionValue, setAmbitionValue] = useState(-1);
//
//     const [creativityLevel, setCreativityLevel] = useState("none");
//     const [creativityValue, setCreativityValue] = useState(-1);
//
//     const [meditationLevel, setMeditationLevel] = useState("none");
//     const [meditationValue, setMeditationValue] = useState(-1);
//
//     const [response, setResponse] = useState("I'm here with you. Let's get started!");
//     const [allData, setAllData] = useState("none");
//
//     const [comebackMode, setComebackMode] = useState(false);
//     const [comebackPhase, setComebackPhase] = useState("initial");
//     const [suggestions, setSuggestions] = useState([]);
//
//     function getSuggestions(data) {
//         const suggestions = [];
//
//         if (data.creativity === "in creative flow") {
//             suggestions.push("You're in a creative flow — it’s a great time to work on your project!");
//         }
//
//         if (data.ambition === "ambitious") {
//             suggestions.push("You're feeling ambitious — why not start something new?");
//         }
//
//         if (data.meditation === "meditative") {
//             suggestions.push("You’re calm and focused — now’s a good moment to make an important decision.");
//         }
//
//         return suggestions;
//     }
//
//     useEffect(() => {
//         const fetchStress = async () => {
//             try {
//                 const res = await fetch("http://127.0.0.1:5050/stress");
//                 const data = await res.json();
//                 setAllData(data);
//
//                 setStressLevel(data.stress);
//                 setStressValue(data.stress_ratio);
//                 setStressPercentage(data.stress_percentage);
//
//                 setAmbitionLevel(data.ambition);
//                 setAmbitionValue(data.ambition_ratio);
//
//                 setCreativityLevel(data.creativity);
//                 setCreativityValue(data.creativity_ratio);
//
//                 setMeditationLevel(data.meditation);
//                 setMeditationValue(data.meditation_ratio);
//
//                 setSuggestions(getSuggestions(data));
//
//                 if (data.stress === "high") {
//                     setResponse("You look a little stressed. Let's take a deep breath together. Would you like to meditate, go on a walk, or check back in 5 minutes?");
//                 } else if (data.stress === "mild") {
//                     setResponse("Noticing a slight tension... maybe a quick stretch would help?");
//                 } else {
//                     setResponse("You're doing great! Keep going");
//                 }
//             } catch (error) {
//                 console.error("Could not fetch stress level:", error);
//             }
//         };
//
//         fetchStress();
//         const interval = setInterval(fetchStress, 10000);
//         return () => clearInterval(interval);
//     }, []);
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
//             <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
//                 <h1 className="text-3xl font-bold mb-4">StressBot</h1>
//                 <p className="text-lg mb-4">{response}</p>
//
//                 {suggestions.map((tip, index) => (
//                     <p key={index} className="text-sm text-green-700 mb-1">
//                         • {tip}
//                     </p>
//                 ))}
//
//                 {/* Emotion Stats Section */}
//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold mb-2">Your Brain State</h2>
//                     <div className="grid grid-cols-1 gap-2 text-sm text-left">
//                         <div className="bg-red-100 text-red-800 p-2 rounded shadow">
//                             <strong>Stress:</strong> {stressPercentage}% ({stressLevel})
//                         </div>
//                         <div className="bg-indigo-100 text-indigo-800 p-2 rounded shadow">
//                             <strong>Meditation:</strong> {meditationValue.toFixed(2)} ({meditationLevel})
//                         </div>
//                         <div className="bg-green-100 text-green-800 p-2 rounded shadow">
//                             <strong>Creativity:</strong> {creativityValue.toFixed(2)} ({creativityLevel})
//                         </div>
//                         <div className="bg-blue-100 text-blue-800 p-2 rounded shadow">
//                             <strong>Ambition:</strong> {ambitionValue.toFixed(2)} ({ambitionLevel})
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Comeback Mode Logic */}
//                 <div className="mt-6">
//                     {comebackMode ? (
//                         comebackPhase === "wait" ? (
//                             <p className="text-lg text-gray-600">
//                                 No worries. We'll give you space and check on you soon.
//                             </p>
//                         ) : (
//                             <div className="flex flex-col gap-2">
//                                 <p className="text-lg mb-4">
//                                     I didn’t forget you, I’m back! Would you like to meditate, go on a walk, or more 5 min?
//                                 </p>
//                                 <button
//                                     onClick={() => navigate("/meditate")}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     Meditate
//                                 </button>
//                                 <button
//                                     onClick={() => navigate("/walk")}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     Go on a walk
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setComebackPhase("wait");
//                                         setTimeout(() => setComebackPhase("return"), 5000);
//                                     }}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     More 5 min
//                                 </button>
//                             </div>
//                         )
//                     ) : (
//                         stressLevel === "high" && (
//                             <div className="flex flex-col gap-2">
//                                 <button
//                                     onClick={() => navigate("/meditate")}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     Meditate
//                                 </button>
//                                 <button
//                                     onClick={() => navigate("/walk")}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     Go on a walk
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setComebackMode(true);
//                                         setComebackPhase("wait");
//                                         setTimeout(() => {
//                                             setComebackPhase("return");
//                                         }, 5000);
//                                     }}
//                                     className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
//                                 >
//                                     Come back in 5 min
//                                 </button>
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StressBot() {
    const navigate = useNavigate();

    const [stressLevel, setStressLevel] = useState("none");
    const [stressValue, setStressValue] = useState(-1);
    const [stressPercentage, setStressPercentage] = useState(0);

    const [ambitionLevel, setAmbitionLevel] = useState("none");
    const [ambitionValue, setAmbitionValue] = useState(-1);

    const [creativityLevel, setCreativityLevel] = useState("none");
    const [creativityValue, setCreativityValue] = useState(-1);

    const [meditationLevel, setMeditationLevel] = useState("none");
    const [meditationValue, setMeditationValue] = useState(-1);

    const [response, setResponse] = useState("I'm here with you. Let's get started!");
    const [comebackMode, setComebackMode] = useState(false);
    const [comebackPhase, setComebackPhase] = useState("initial");

    useEffect(() => {
        const fetchStress = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5050/stress");
                const data = await res.json();

                setStressLevel(data.stress);
                setStressValue(data.stress_ratio);
                setStressPercentage(data.stress_percentage);

                setAmbitionLevel(data.ambition);
                setAmbitionValue(data.ambition_ratio);

                setCreativityLevel(data.creativity);
                setCreativityValue(data.creativity_ratio);

                setMeditationLevel(data.meditation);
                setMeditationValue(data.meditation_ratio);

                if (data.stress === "high") {
                    setResponse("You look a little stressed. Let's take a deep breath together. Would you like to meditate, go on a walk, or check back in 5 minutes?");
                } else if (data.stress === "mild") {
                    setResponse("Noticing a slight tension... maybe a quick stretch would help?");
                } else {
                    setResponse("You're doing great! Keep going");
                }
            } catch (error) {
                console.error("Could not fetch stress level:", error);
            }
        };

        fetchStress();
        const interval = setInterval(fetchStress, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">StressBot</h1>
                <p className="text-lg mb-6">{response}</p>

                <h2 className="text-xl font-semibold mb-2">Your Brain State</h2>
                <div className="grid grid-cols-1 gap-2 text-sm text-left">
                    {/* Stress */}
                    <div className="bg-red-100 text-red-800 p-2 rounded shadow flex justify-between items-center">
                        <div>
                            <strong>Stress:</strong> {stressPercentage}% ({stressLevel})
                        </div>
                        {stressLevel === "high" && (
                            <button
                                onClick={() => alert("Try a deep breathing exercise or go for a walk.")}
                                className="text-xs bg-red-200 hover:bg-red-300 px-2 py-1 rounded"
                            >
                                Suggestion
                            </button>
                        )}
                    </div>

                    {/* Meditation */}
                    <div className="bg-indigo-100 text-indigo-800 p-2 rounded shadow flex justify-between items-center">
                        <div>
                            <strong>Meditation:</strong> {meditationValue.toFixed(2)} ({meditationLevel})
                        </div>
                        {meditationLevel === "high" && (
                            <button
                                onClick={() => alert("You're in a great state to make thoughtful decisions.")}
                                className="text-xs bg-indigo-200 hover:bg-indigo-300 px-2 py-1 rounded"
                            >
                                Suggestion
                            </button>
                        )}
                    </div>

                    {/* Creativity */}
                    <div className="bg-green-100 text-green-800 p-2 rounded shadow flex justify-between items-center">
                        <div>
                            <strong>Creativity:</strong> {creativityValue.toFixed(2)} ({creativityLevel})
                        </div>
                        {creativityLevel === "high" && (
                            <button
                                onClick={() => alert("Perfect moment to brainstorm or work on a personal project.")}
                                className="text-xs bg-green-200 hover:bg-green-300 px-2 py-1 rounded"
                            >
                                Suggestion
                            </button>
                        )}
                    </div>

                    {/* Ambition */}
                    <div className="bg-blue-100 text-blue-800 p-2 rounded shadow flex justify-between items-center">
                        <div>
                            <strong>Ambition:</strong> {ambitionValue.toFixed(2)} ({ambitionLevel})
                        </div>
                        {ambitionLevel === "high" && (
                            <button
                                onClick={() => alert("Great time to tackle goals or take initiative!")}
                                className="text-xs bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                            >
                                Suggestion
                            </button>
                        )}
                    </div>
                </div>

                {/* Comeback Mode Logic */}
                <div className="mt-6">
                    {comebackMode ? (
                        comebackPhase === "wait" ? (
                            <p className="text-lg text-gray-600">
                                No worries. We'll give you space and check on you soon.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="text-lg mb-4">
                                    I didn’t forget you, I’m back! Would you like to meditate, go on a walk, or more 5 min?
                                </p>
                                <button
                                    onClick={() => navigate("/meditate")}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    Meditate
                                </button>
                                <button
                                    onClick={() => navigate("/walk")}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    Go on a walk
                                </button>
                                <button
                                    onClick={() => {
                                        setComebackPhase("wait");
                                        setTimeout(() => setComebackPhase("return"), 5000);
                                    }}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    More 5 min
                                </button>
                            </div>
                        )
                    ) : (
                        stressLevel === "high" && (
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={() => navigate("/meditate")}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    Meditate
                                </button>
                                <button
                                    onClick={() => navigate("/walk")}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    Go on a walk
                                </button>
                                <button
                                    onClick={() => {
                                        setComebackMode(true);
                                        setComebackPhase("wait");
                                        setTimeout(() => {
                                            setComebackPhase("return");
                                        }, 5000);
                                    }}
                                    className="bg-purple-200 hover:bg-purple-300 p-2 rounded"
                                >
                                    Come back in 5 min
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
