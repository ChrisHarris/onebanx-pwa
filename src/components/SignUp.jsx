import React from "react";
import { t, l } from "../localisation";

export default function SignUp() {
  return (
      <div className="wa-stack">

    	<wa-input type="text" label={t("Sign Up Input Name Label")} placeholder={t("Sign Up Input Name Placeholder")}  with-clear appearance="outlined">
        <wa-icon name={t("Sign Up Input Name Icon")} variant={t("Sign Up Input Name Icon Variant")} slot="start"></wa-icon>
      </wa-input>
		  <wa-input type="tel" label={t("Sign Up Input Tel Label")} placeholder={t("Sign Up Input Tel Placeholder")} with-clear appearance="outlined">
        <wa-icon name={t("Sign Up Input Tel Icon")} variant={t("Sign Up Input Tel Icon Variant")} slot="start"></wa-icon>
      </wa-input>
		  <wa-checkbox checked>
        {t("Terms Checkbox Label")}
        <a href={l("Terms & Conditions URL")}>
          {l("Terms & Conditions Link")}
        </a>
      </wa-checkbox>

      <wa-button className="" data-drawer="open profile-signin">
				{t("Sign Up Passkey Button")}
				<wa-icon slot="end" name={t("Sign Up Passkey Button Icon")} variant={t("Sign Up Passkey Button Icon Variant")}></wa-icon>
			</wa-button>

      <p className="">
        {t("Sign In Small Print A")}
        <a href={l("Privacy Policy URL")}>
          {l("Privacy Policy Link")}
        </a>
        {t("Sign In Small Print B")}
        <a href={l("FAQ URL")}>
          {l("FAQ Link")}
        </a>
        {t("Sign In Small Print C")}
      </p>
      </div>
  );
}
