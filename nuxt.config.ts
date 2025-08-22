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
        // Apple touch icons for better iOS support
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '167x167', href: '/icon-167x167.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/icon-120x120.png' },
      ],
      meta: [
        /* SEO */
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'description', content: 'Radio PlanetaX - Tu estación de radio favorita' },
        { name: 'keywords', content: 'Radio PlanetaX, radio, música, entretenimiento' },
        { name: 'google', content: 'notranslate' },

        /* OpenGraph */
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'PlanetaX - Página Oficial' },
        { property: 'og:description', content: 'Radio PlanetaX - Tu estación de radio favorita' },
        { property: 'og:image', content: 'https://planetax.netlify.app/icon-512x512.png' },
        { property: 'og:image:alt', content: 'Imagen PlanetaX' },
        { property: 'og:url', content: 'https://planetax.netlify.app/' },
        { property: 'og:site_name', content: 'PlanetaX' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { property: 'og:image:type', content: 'image/png' },

        /* Twitter */
        { name: 'twitter:title', content: 'PlanetaX - Página Oficial' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: 'Radio PlanetaX - Tu estación de radio favorita' },
        { name: 'twitter:image', content: 'https://planetax.netlify.app/icon-512x512.png' },
        { name: 'twitter:image:alt', content: 'PlanetaX - Página Oficial' },

        // iOS - Enhanced
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'PlanetaX' },
        { name: 'format-detection', content: 'telephone=no' },

        // Android / Chrome - Enhanced
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'theme-color', content: '#000000' },
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'msapplication-tap-highlight', content: 'no' },

        // Viewport for better mobile experience
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover' }
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
      name: 'PlanetaX - Radio App',
      short_name: 'PlanetaX',
      description: 'Radio PlanetaX - Tu estación de radio favorita',
      start_url: '/',
      scope: '/',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      orientation: 'portrait-primary',

      // Enhanced icons with more sizes and purposes
      icons: [
        { src: '/icon-72x72.png', sizes: '72x72', type: 'image/png', purpose: 'any' },
        { src: '/icon-96x96.png', sizes: '96x96', type: 'image/png', purpose: 'any' },
        { src: '/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'any' },
        { src: '/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'any' },
        { src: '/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'any' },
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'any' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ],

      // Enhanced screenshots for better app store presentation
      screenshots: [
        {
          src: '/screenshot1.png',
          sizes: '360x640',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'PlanetaX Radio - Pantalla principal'
        },
        // {
        //   src: '/screenshot2.png',
        //   sizes: '1024x768',
        //   type: 'image/png',
        //   form_factor: 'wide',
        //   label: 'PlanetaX Radio - Vista de escritorio'
        // }
      ],

      // Categories help app stores classify your PWA
      categories: ['music', 'entertainment', 'lifestyle'],

      // Additional metadata for better app recognition
      lang: 'es',
      dir: 'ltr',

      // Display override for better fallback support
      display_override: ['standalone', 'minimal-ui', 'fullscreen'],

      // Edge cases support
      prefer_related_applications: false,

      // Protocol handlers for better integration
      protocol_handlers: [
        {
          protocol: 'web+planetax',
          url: '/?action=%s'
        },
        {
          protocol: 'web+radio',
          url: '/player?stream=%s'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
      // Enhanced caching strategies
      // runtimeCaching: [
      //   {
      //     urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'google-fonts-cache',
      //       expiration: {
      //         maxEntries: 10,
      //         maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
      //       },
      //       cacheableResponse: {
      //         statuses: [0, 200]
      //       }
      //     }
      //   },
      //   {
      //     urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'images',
      //       expiration: {
      //         maxEntries: 100,
      //         maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
      //       }
      //     }
      //   }
      // ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}']
    },

    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },

    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})