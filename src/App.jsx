import React from "react";
import Header from "./components/Header";
import CardUser from "./components/CardUser";
import CardAbout from "./components/CardAbout";
import useAppState from "./useAppState";

export default function App() {
  const { uiState, userId, location, institution, handleAuthenticated } = useAppState();

  return (
    <main>
      {/* Add className="wa-cloak" to main to reduce FOUCE */}
      <Header />
      <section className="wa-stack">

        <CardUser location={location} institution={institution} />



        <CardAbout />
        
      </section>
    </main>
  );
}
