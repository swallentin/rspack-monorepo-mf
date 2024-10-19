import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote1',
      exposes: {
        './button': './src/button.tsx',
        './stateMachine': './src/stateMachine.ts'
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});