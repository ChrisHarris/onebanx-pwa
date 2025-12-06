import React from "react";
import ReactDOM from "react-dom/client";

// Web Awesome web components + styles
import "@awesome.me/webawesome/dist/webawesome.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/styles/webawesome.css";

import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("SW registration failed:", err);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
