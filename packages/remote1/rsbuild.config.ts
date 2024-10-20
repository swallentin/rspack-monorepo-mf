import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { dependencies } from "./package.json";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "remote1",
      exposes: {
        "./Button": "./src/Button.tsx",
        "./stateMachine": "./src/stateMachine.ts",
        "./eventBus": "./src/eventBus.ts",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          version: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          version: "18.3.1",
        },
      },
    }),
  ],
});
