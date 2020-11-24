import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  target: 'static',
  head: {
    titleTemplate: '%s - Blog - ZhangZisu.CN',
    title: 'Blog - ZhangZisu.CN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['~/assets/vuetify.scss'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: ['@nuxt/http', '@nuxtjs/pwa'],
  http: {
    baseURL: 'http://127.0.0.1:8010'
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },
  build: {},
  modern: true
}

export default config
