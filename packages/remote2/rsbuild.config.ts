import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "remote2",
      exposes: {
        "./Button": "./src/Button.tsx",
        "./stateMachine": "./src/stateMachine.ts",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
