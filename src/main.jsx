import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Web Awesome web components + styles
import "@awesome.me/webawesome/dist/webawesome.js";
import "./icons.js"; // Self-hosted icon library (must be before other components)
import "./webawesome.js"; // All Web Awesome component registrations
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "./styles.css";

// Sync theme-color meta tag with CSS variable
const themeColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--theme-color")
  .trim();
if (themeColor) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
}

import App from "./App";
import QR from "./pages/QR";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("SW registration failed:", err);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/qr" element={<QR />} />
    </Routes>
  </BrowserRouter>
);
