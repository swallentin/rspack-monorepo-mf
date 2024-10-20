import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "host",
      remotes: {
        remote1: "remote1@http://localhost:3000/mf-manifest.json",
        remote2: "remote2@http://localhost:3001/mf-manifest.json",
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
  server: {
    port: 2000,
  },
});
