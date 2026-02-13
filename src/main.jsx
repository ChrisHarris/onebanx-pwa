import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Web Awesome web components + styles
import "@awesome.me/webawesome/dist/webawesome.js";
import "./icons.js"; // Self-hosted icon library (must be before other components)
import "./webawesome.js"; // All Web Awesome component registrations
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import { loadLocalisation, m } from "./localisation";
import { DEFAULT_ORG } from "./config";

// Read locale and org from URL params (e.g. from QR code scan)
const params = new URLSearchParams(window.location.search);
const locale = params.get("locale") || "en-GB";
const org = (params.get("org") || DEFAULT_ORG).replace(/ /g, "-");

// Load localisation before rendering
await loadLocalisation({ locale, org });

// Load base styles + org theme CSS
const baseStyles = document.createElement("link");
baseStyles.rel = "stylesheet";
baseStyles.href = "/css/styles.css";
document.head.appendChild(baseStyles);

const theme = m("theme");
if (theme) {
  const themeLink = document.createElement("link");
  themeLink.rel = "stylesheet";
  themeLink.href = `/css/theme.${theme}.css`;
  document.head.appendChild(themeLink);
}

// Sync theme-color meta tag with CSS variable
const themeColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--theme-color")
  .trim();
if (themeColor) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
}

// Set page title and patch manifest with localised app name
const appName = m("app name");
if (appName) document.title = appName;
if (appName) {
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink) {
    const res = await fetch(manifestLink.href);
    const manifest = await res.json();
    manifest.name = appName;
    manifest.short_name = appName;
    manifestLink.href = URL.createObjectURL(
      new Blob([JSON.stringify(manifest)], { type: "application/json" })
    );
  }
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
