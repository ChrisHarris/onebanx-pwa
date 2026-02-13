import React from "react";
import { m } from "../localisation";

export default function Header() {
  return (
    <header className="wa-split">
      <h1>
        <img src={`/images/logo-${m("app name").replaceAll(" ", "-")}.svg`} alt={m("app name")} />
      </h1>
      <wa-button variant="neutral" appearance="plain" pill>
        <wa-icon name="circle-question" variant="light" />
      </wa-button>
    </header>
  );
}