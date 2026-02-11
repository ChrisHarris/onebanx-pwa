import React, { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import CardUser from "./components/CardUser";
import CardAbout from "./components/CardAbout";
import SignUp from "./components/SignUp";
import useAppState from "./useAppState";

export default function App() {
  const { uiState, userId, location, org, handleAuthenticated } = useAppState();
  const drawerRef = useRef(null);
  const [signUpLoading, setSignUpLoading] = useState(false);

  function handleSignUp() {
    setSignUpLoading(true);
    const drawer = drawerRef.current;
    if (drawer) drawer.open = true;
  }

  // Clear button loading state when drawer closes
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const handleHide = () => setSignUpLoading(false);
    drawer.addEventListener("wa-after-hide", handleHide);
    return () => drawer.removeEventListener("wa-after-hide", handleHide);
  }, []);

  return (
  <>
    <main>
      {/* Add className="wa-cloak" to main to reduce FOUCE */}
      <Header />
      <section className="wa-stack">
        <CardUser
          location={location}
          org={org}
          onSignUp={handleSignUp}
          signUpLoading={signUpLoading}
        />
        <CardAbout />
      </section>
    </main>

    <wa-drawer ref={drawerRef} placement="bottom" id="app-popover">
      <SignUp />
    </wa-drawer>
  </>
  );
}
