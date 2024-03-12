/** @type {import('@remix-run/dev').AppConfig} */

import tsconfigPaths from 'vite-tsconfig-paths';
import Unimport from 'unimport/unplugin';
import { defineConfig } from 'vite';
import { flatRoutes } from 'remix-flat-routes';
import { installGlobals } from '@remix-run/node';
import { vitePlugin as remix } from '@remix-run/dev';
import mkcert from 'vite-plugin-mkcert';

installGlobals();

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  plugins: [
    //mkcert(),
    Unimport.vite({
      dirs: ['./app/**/*.ts'],
      dts: true,
    }),
    remix({
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
});
