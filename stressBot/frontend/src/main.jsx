// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// This brings in React Router's browser navigation system
import { BrowserRouter } from "react-router-dom";

// This brings App component
import App from "./App.jsx";

// This brings in global CSS styles, likeTailwind
import "./index.css";

// Good for catching mistakes, showing warnings, etc. It can be deleted if wanted.
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// the  <BrowserRouter>
// wraps my whole app with a router.

// it works as someting like:
// "Hey! Go find the empty `<div id='root'>` in the HTML file, and load my entire `App` inside it.
// > While doing that, let it handle page navigation (BrowserRouter), and help me catch
// errors during development (StrictMode)."