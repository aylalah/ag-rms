/** @type {import('@remix-run/dev').AppConfig} */

import tsconfigPaths from 'vite-tsconfig-paths';
import Unimport from 'unimport/unplugin';
import { defineConfig } from 'vite';
import { flatRoutes } from 'remix-flat-routes';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';
import { vitePlugin as remix } from '@remix-run/dev';

installGlobals();

export default defineConfig({
  plugins: [
    Unimport.vite({
      dirs: ['./app/**/*.ts'],
      dts: true,
    }),
    remix({
      presets: [vercelPreset()],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
});
