import React from "react";
import Header from "../components/Header";

export default function QR() {
  return (
    <main>
      <Header />

      <style>{`
        .qr-grid { max-width: 800px; margin:40px auto; padding:0 40px; }
        .qr-grid wa-card { }
        .qr-grid wa-card h2 { text-align:center; margin-bottom:0;}
        .qr-grid wa-card::part(body) { text-align:center; }
      `}</style>

      <div className="wa-grid qr-grid wa-gap-xl">
        <wa-card>
          <h2 slot="header">Leeds</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?location=Leeds" label="Visit Leeds"></wa-qr-code>
        </wa-card>

        <wa-card>
          <h2 slot="header">Manchester</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?location=Manchester" label="Visit Manchester"></wa-qr-code>
        </wa-card>

        <wa-card>
          <h2 slot="header">Halifax</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?location=Halifax" label="Visit Leeds"></wa-qr-code>
        </wa-card>
        
        <wa-card>
          <h2 slot="header">Redhill</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?location=Redhill" label="Visit Leeds"></wa-qr-code>
        </wa-card>
      </div>
    </main>
  );
}
