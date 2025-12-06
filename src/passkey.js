// Helpers: ArrayBuffer <-> base64
export const bufferToBase64 = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

export const base64ToBuffer = (base64) =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;

/**
 * First-time registration: create a passkey and store its ID locally.
 */
export async function registerPasskey() {
  const userId = crypto.randomUUID();

  const publicKey = {
    challenge: crypto.getRandomValues(new Uint8Array(32)),
    rp: {
      name: "Passkey PWA Demo",
    },
    user: {
      id: new TextEncoder().encode(userId),
      name: userId,
      displayName: "PWA User",
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
  };

  const credential = await navigator.credentials.create({ publicKey });

  return {
    userId,
    credentialId: bufferToBase64(credential.rawId),
  };
}

/**
 * Unlock: we don't talk to a server; success == user verified locally.
 */
export async function authenticatePasskey(credentialIdBase64) {
  const publicKey = {
    challenge: crypto.getRandomValues(new Uint8Array(32)),
    allowCredentials: [
      {
        id: base64ToBuffer(credentialIdBase64),
        type: "public-key",
      },
    ],
    userVerification: "required",
  };

  await navigator.credentials.get({ publicKey });

  // If we get here, FaceID/TouchID/PIN verification succeeded.
  return true;
}