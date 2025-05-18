
// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import StressBot from "./StressBot.jsx";
import MeditatePage from "./pages/MeditatePage.jsx";
import WalkPage from "./pages/WalkPage.jsx";
import ComeBackPage from "./pages/ComeBackPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<StressBot />} />
            <Route path="/meditate" element={<MeditatePage />} />
            <Route path="/walk" element={<WalkPage />} />
            <Route path="/comeback" element={<ComeBackPage />} />
        </Routes>
    );
}













// src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import StressBot from "./StressBot.jsx";
// import MeditatePage from "./pages/MeditatePage.jsx";
// import WalkPage from "./pages/WalkPage.jsx";
// import ComeBackPage from "./pages/ComeBackPage.jsx";
//
// export default function App() {
//     return (
//         <Routes>
//             <Route path="/src/index.html" element={<StressBot />} />
//             <Route path="/meditate" element={<MeditatePage />} />
//             <Route path="/walk" element={<WalkPage />} />
//             <Route path="/comeback" element={<ComeBackPage />} />
//         </Routes>
//     );
// }

// //export default App;

// import React from "react";
//
// export default function App() {
//     return (
//         <div style={{ padding: "2rem", fontSize: "24px" }}>
//             Hello from App.jsx!
//         </div>
//     );
// }

