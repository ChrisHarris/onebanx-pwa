import React, { useRef, useEffect } from "react";
import { t } from "../localisation";
import "./CardUser.css";

export default function CardUser({ location, org, onSignUp, signUpLoading }) {
  const buttonRef = useRef(null);

  function handleSignUp() {
    onSignUp?.();
  }

  // Sync loading attribute with parent state
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (signUpLoading) {
      btn.setAttribute("loading", "");
    } else {
      btn.removeAttribute("loading");
    }
  }, [signUpLoading]);

  return (
    <wa-card className="state-user-not-signed-in" appearance="plain">
			<div className="state-template alt">
			<p className="area-subtitle font-size-s">{t("Welcome To")} {org && <span>{org}</span>}</p>
			<h2 className="area-title font-size-l">{location}</h2>

			<wa-avatar className="area-emblem emblem" loading="lazy" image={org ? `/images/Emblem-${org.replace(/ /g, "-")}.svg` : undefined}>
				{!org && <wa-icon slot="icon" name="id-badge" variant="solid"></wa-icon>}
			</wa-avatar>

			<p className="area-label-sign-up">{t("Sign Up Label")}</p>

      <wa-button ref={buttonRef} className="area-button-sign-up" onClick={handleSignUp}>
        {t("Sign Up Button")}
				<wa-icon slot="end" name={t("Sign Up Button Icon")} variant={t("Sign Up Button Icon Variant")}></wa-icon>
			</wa-button>

			<p className="area-label-sign-in">{t("Sign In Label")}</p>
			<wa-button className="area-button-sign-in" data-drawer="open profile-signin">
				{t("Sign Up Button")}
				<wa-icon slot="end" name={t("Sign In Button Icon")} variant={t("Sign In Button Icon Variant")}></wa-icon>
			</wa-button>

      </div>

		</wa-card>
  );
}
