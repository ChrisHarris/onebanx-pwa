import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Make the React Compiler plugin optional so the dev server works even if it's not installed.
const reactCompilerPlugins =
  (() => {
    try {
      require.resolve("babel-plugin-react-compiler");
      return [["babel-plugin-react-compiler"]];
    } catch {
      return [];
    }
  })();

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: reactCompilerPlugins,
      },
    }),
  ],
});
