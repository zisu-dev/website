import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - zblog',
    title: 'zblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/vuetify.scss'],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: ['@nuxt/http', '@nuxtjs/pwa'],

  http: {
    baseURL: 'http://127.0.0.1:8010'
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}

export default config
