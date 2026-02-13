import React, { useRef, useEffect } from "react";
import { t, m } from "../localisation";
import { debug } from "../debug";
import "./CardAbout.css";

export default function CardAbout() {
  return (
    <wa-card className="card-about">
      <div class="wa-flank:end wa-align-items-center">
      <div class="wa-stack wa-gap-0">
      <h2 class="font-size-l">{t("About Title")}</h2>
      </div>
      <wa-avatar className="area-emblem emblem" loading="lazy">
				<wa-icon slot="end" name={t("About Emblem Icon")} variant={t("About Emblem Icon Variant")}></wa-icon>
			</wa-avatar>
      </div>
      
      <wa-include src={`/includes/CardAbout-${m("locale")}-${m("org") || "default"}.html`}></wa-include>

    </wa-card>
  );
}
