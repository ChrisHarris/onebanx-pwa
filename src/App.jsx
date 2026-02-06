import React, { useEffect, useReducer } from "react";
import Header from './components/Header'
import SignUpButton from "./components/SignUpButton";
import Welcome from "./components/Welcome";
import { getUserId } from "./auth";

const initialState = {
  uiState: "welcome", // "welcome" | "returning" | "signed_in"
  userId: null,
  qrCode: null,
  location: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_RETURNING":
      return { ...state, uiState: "returning", userId: action.userId };
    case "SET_SIGNED_IN":
      return { ...state, uiState: "signed_in", userId: action.userId };
    case "SET_LOCATION":
      return { ...state, location: action.location };
    case "SET_QR_CODE":
      return { ...state, qrCode: action.qrCode };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { uiState, userId, qrCode, location } = state;

  // Sync theme-color meta tag with CSS variable
  useEffect(() => {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-color")
      .trim();
    if (themeColor) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
    }
  }, []);

  // Read stored user ID (if any) – returning user
  useEffect(() => {
    const stored = getUserId();
    if (stored) {
      dispatch({ type: "SET_RETURNING", userId: stored });
    }
  }, []);

  // QR routing support via ?qr=XXXX in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qr = params.get("qr");
    if (qr) {
      dispatch({ type: "SET_QR_CODE", qrCode: qr });
    }
  }, []);

  // Location support via ?location=XXXX in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get("location");
    if (loc) {
      dispatch({ type: "SET_LOCATION", location: loc });
      // Remove location from URL without reload
      params.delete("location");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  function handleAuthenticated(id) {
    dispatch({ type: "SET_SIGNED_IN", userId: id });
  }

  function renderCardContent() {
    switch (uiState) {
      case "returning":
        return (
          <>
            {location && <h2 className="font-size-l">Welcome to {location}</h2>}
            <p>Welcome back!</p>
            <SignUpButton onAuthenticated={handleAuthenticated} />
          </>
        );
      case "signed_in":
        return <Welcome userId={userId} qrCode={qrCode} />;
      default:
        return (
          <>
            {location && <h2 className="font-size-l">Welcome to {location}</h2>}
            <p>New here? Sign up to get started.</p>
            <SignUpButton onAuthenticated={handleAuthenticated} />
          </>
        );
    }
  }




  return (
    <main>
      <Header />
      <section className="wa-stack">
        <wa-card>
          {renderCardContent()}
        </wa-card>
      </section>
    </main>
  );
}