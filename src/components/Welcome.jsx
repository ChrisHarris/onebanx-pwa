import React from "react";

export default function Welcome({ userId, qrCode }) {
  return (
    <section>
      <h2>Welcome</h2>
      {userId && <p>User ID: {userId}</p>}
      {qrCode && (
        <p>
          QR code data: <strong>{qrCode}</strong>
        </p>
      )}
    </section>
  );
}