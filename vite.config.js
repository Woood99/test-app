import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifest = {
   theme_color: '#262627',
   background_color: '#ffffff',
   icons: [
      { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
      { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
   ],
   screenshots: [{ src: 'desktop.png', sizes: '1904x899', type: 'image/png', form_factor: 'wide' }],
   screenshots: [{ src: 'mobile.png', sizes: '378x808', type: 'image/png', form_factor: 'narrow' }],
   orientation: 'any',
   display: 'standalone',
   dir: 'auto',
   lang: 'ru-RU',
   name: 'наше приложение',
   short_name: 'Our app',
   start_url: '/',
};

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: 'autoUpdate',
         workbox: {
            globPatterns: ['**/*.{html,css,js,ico,png,svg,jpg}'],
         },
         manifest,
      }),
   ],
   server: {
      host: '0.0.0.0',
      port: 5000,
      open: true,
   },
});
