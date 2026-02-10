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
          <h2 slot="header">LLoyds<br />Leeds</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?institution=Lloyds&location=Leeds+City+Centre" label="Visit Leeds"></wa-qr-code>
        </wa-card>

        <wa-card>
          <h2 slot="header">LLoyds<br />Manchester</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?institution=Lloyds&location=Market+Street+Manchester" label="Visit Manchester"></wa-qr-code>
        </wa-card>

        <wa-card>
          <h2 slot="header">Halifax<br />Bradford</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?institution=Halifax&location=Bank+Street+Bradford" label="Visit Bradford"></wa-qr-code>
        </wa-card>
        
        <wa-card>
          <h2 slot="header">BoS<br />Edinburgh</h2>
          <wa-qr-code value="https://onebanx-pwa.pages.dev/?institution=Bank+of+Scotland&location=George+Street+Edinburgh" label="Visit Edinburgh"></wa-qr-code>
        </wa-card>
      </div>
    </main>
  );
}
