import process from 'node:process'
const sw = process.env.SW === 'true'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'PlanetaX - Página Oficial',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/icon-192x192.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon-180x180.png' },
      ],
      meta: [
        /* SEO */
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'description', content: 'Radio PlanetaX' },
        { name: 'keywords', content: 'Radio PlanetaX' },
        { name: 'google', content: 'notranslate' },
        /* OpenGraph */
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'PlanetaX - Página Oficial' },
        { property: 'og:description', content: 'PlanetaX - Página Oficial' },
        { property: 'og:image', content: 'https://planetax.netlify.app/icon-512x512.png' },
        { property: 'og:image:alt', content: 'Imagen PlanetaX' },
        { property: 'og:url', content: 'https://planetax.netlify.app/icon-512x512.png' },
        { property: 'og:site_name', content: 'PlanetaX' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { property: 'og:image:type', content: 'image/png' },
        { name: 'twitter:title', content: 'PlanetaX - Página Oficial' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: 'PlanetaX - Página Oficial' },
        { name: 'twitter:image', content: 'https://planetax.netlify.app/icon-512x512.png' },
        { name: 'twitter:image:alt', content: 'PlanetaX - Página Oficial' },
        // iOS
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'PlanetaX app' },
        // Android / Chrome
        { name: 'mobile-web-app-capable', content: 'yes' },
      ]
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    registerWebManifestInRouteRules: true,
    manifest: {
      id: '/',
      name: 'PlanetaX app',
      short_name: 'PlanetaX app',
      start_url: '/',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ],
      screenshots: [
        {
          src: '/screenshot1.png',
          sizes: '360x640',
          type: 'image/png'
        },
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}']
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
  }
})