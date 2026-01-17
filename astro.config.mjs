// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://warehouse-nonameapp.github.io',
  base: '/8Jfhyk9Ndv1YJ7dxE5ZH3-statch-web-landing-8Txm2iwwEl',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});