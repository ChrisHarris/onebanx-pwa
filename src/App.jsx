import React, { useEffect, useState } from "react";
import SignUpButton from "./components/SignUpButton";
import Welcome from "./components/Welcome";
import { getUserId } from "./auth";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [qrCode, setQrCode] = useState(null);

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
    <main style={{ padding: "20px" }}>
      {!showWelcome && (
        <>
          <h1>Passkey PWA Demo</h1>
          <p>Tap below to Sign Up or Unlock with a Passkey.</p>
          <SignUpButton onAuthenticated={handleAuthenticated} />
        </>
      )}

      {showWelcome && <Welcome userId={userId} qrCode={qrCode} />}
    </main>
  );
}