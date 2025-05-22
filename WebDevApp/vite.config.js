import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: [
      'icons/icon-128.png',
      'icons/icon-512x512.png'
    ],
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: 'Futurama PWA app',
      short_name: 'MiPWA',
      description: 'PWA app',
      theme_color: '#ffffff',
      display: 'standalone', 
      start_url: '/',
      icons:[
        {
        src: 'icons/icon-128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
      ]

    },
    workbox:{
      globPatterns:['**/*.{js,css,html,png,svg}'],
    }
  }
  )],
})

