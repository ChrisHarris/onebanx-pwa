import React from "react";
import { WaButton, WaIcon } from "@awesome.me/webawesome/dist/react";

export default function Header() {
  return (
    <header className="wa-split">
      <h1 className="wa-cluster">
        <img src="/images/icon.svg" alt="" />
        Business Cash Flow
      </h1>
      <WaButton variant="neutral" appearance="plain" pill={true}>
        <WaIcon name="circle-question" variant="light" />
      </WaButton>
    </header>
  );
}
