import React, { useEffect, useState } from "react";
import Header from './components/Header'
import SignUpButton from "./components/SignUpButton";
import Welcome from "./components/Welcome";
import { getUserId } from "./auth";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  // Sync theme-color meta tag with CSS variable
  useEffect(() => {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-color")
      .trim();
    if (themeColor) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
    }
  }, []);

  // Read stored user ID (if any) – doesn't unlock, just remembers who
  useEffect(() => {
    const stored = getUserId();
    if (stored) {
      setUserId(stored);
    }
  }, []);

  // QR routing support via ?qr=XXXX in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qr = params.get("qr");
    if (qr) {
      setQrCode(qr);
    }
  }, []);

  function handleAuthenticated(id) {
    setUserId(id);
    setIsUnlocked(true);
  }

  const showWelcome = isUnlocked && userId;




  return (
    <main>
    <Header />
    {!showWelcome && (
      <>
        <section class="wa-stack">
        <wa-card>
          
          <wa-button>Get Started</wa-button>
        </wa-card>
        
        <wa-card>
          <SignUpButton onAuthenticated={handleAuthenticated} />
        </wa-card>
        </section>
      </>
    )}

      

    {showWelcome && <Welcome userId={userId} qrCode={qrCode} />}
    </main>
  );
}