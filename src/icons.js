// Import icon component to ensure library system is initialized
import "@awesome.me/webawesome/dist/components/icon/icon.js";
import { registerIconLibrary } from "@awesome.me/webawesome/dist/components/icon/library.js";

// Override the default icon library to use self-hosted SVGs
registerIconLibrary("default", {
  resolver: (name, family = "classic", variant = "solid") => {
    // Map variant to folder name
    let folder = variant;

    // Handle family-specific folders
    if (family === "sharp") {
      folder = `sharp-${variant}`;
    } else if (family === "duotone") {
      folder = variant === "solid" ? "duotone" : `duotone-${variant}`;
    } else if (family === "brands") {
      folder = "brands";
    }

    const url = `/icons/${folder}/${name}.svg`;
    console.log(`[icons] Loading: ${url}`);
    return url;
  },
  mutator: (svg) => {
    svg.setAttribute("fill", "currentColor");
  },
});

console.log("[icons] Self-hosted icon library registered");
