import { NuxtConfig } from '@nuxt/types'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const config: NuxtConfig = {
  target: 'server',
  head: {
    titleTemplate: '%s - ZZisu.dev',
    title: 'ZZisu.dev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['~/styles/vuetify.scss', '~/styles/global.scss'],
  plugins: [
    '~/plugins/init.ts',
    '~/plugins/bml.ts',
    '~/plugins/toast.client.ts'
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: [
    '@nuxt/http',
    // '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],
  http: {
    baseURL: process.env.API_ENDPOINT
  },
  vuetify: {
    customVariables: ['~/styles/variables.scss'],
    treeShake: true
  },
  build: {
    plugins: [new MonacoWebpackPlugin()]
  },
  modern: true
}

export default config
