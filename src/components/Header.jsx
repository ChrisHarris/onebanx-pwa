import React from "react";
import { t } from "../localisation";

export default function Header() {
  return (
    <header className="wa-split">
      <h1 className="wa-cluster wa-gap-xs">
        <img src="/images/icon.svg" alt="" />
        Business Cash Flow
      </h1>
      <wa-button variant="neutral" appearance="plain" pill>
        <wa-icon name="circle-question" variant="light" />
      </wa-button>
    </header>
  );
}
