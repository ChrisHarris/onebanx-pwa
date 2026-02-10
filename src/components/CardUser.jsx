import React from "react";
import "./CardUser.css";

export default function CardUser({ location, institution }) {
  return (
    <wa-card className="state-user-not-signed-in" appearance="plain">
			<div className="state-template">
			<p className="area-subtitle font-size-s">Welcome to {institution && <span>{institution}</span>}</p>
			<h2 className="area-title font-size-l">{location}</h2>

			<wa-avatar className="area-emblem emblem" image={institution ? `/images/Emblem-${institution.replace(/ /g, "-")}.svg` : undefined}>
				{!institution && <wa-icon slot="icon" name="id-badge" variant="solid"></wa-icon>}
			</wa-avatar>

			<p className="area-label-get-started">First time here?</p>

      <wa-button className="area-button-get-started">
        Get Started
				<wa-icon slot="end" name="circle-plus" variant="solid"></wa-icon>
			</wa-button>

			<p className="area-label-sign-in">Already signed up?</p>
			<wa-button className="area-button-sign-in" data-drawer="open profile-signin">
				Sign In
				<wa-icon slot="end" name="circle-user" variant="solid"></wa-icon>
			</wa-button>
			
      </div>

		</wa-card>
  );
}
