import React, { useEffect, useState } from "react";
import { registerPasskey, authenticatePasskey } from "../passkey";
import { saveCredentialId, saveUserId, getCredentialId, getUserId } from "../auth";

export default function SignUpButton({ onAuthenticated }) {
  const [hasCredential, setHasCredential] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setHasCredential(!!getCredentialId());
  }, []);

  async function handlePress() {
    setError("");
    setBusy(true);

    try {
      const existingCred = getCredentialId();

      // First time: register
      if (!existingCred) {
        const { userId, credentialId } = await registerPasskey();
        saveCredentialId(credentialId);
        saveUserId(userId);
        setHasCredential(true);
        onAuthenticated(userId);
        return;
      }

      // Subsequent: unlock
      await authenticatePasskey(existingCred);
      const userId = getUserId();
      onAuthenticated(userId);
    } catch (err) {
      console.error("Passkey error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const label = hasCredential ? "Unlock with Passkey" : "Sign Up";

  return (
    <div>
      <wa-button type="button" onClick={handlePress} disabled={busy} variant="primary">
        {busy ? "Working..." : label}
      </wa-button>

      {error && <p>{error}</p>}
    </div>
  );
}
