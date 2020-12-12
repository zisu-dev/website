import { NuxtConfig } from '@nuxt/types'
import { NuxtOptionsBuild } from '@nuxt/types/config/build'

function generateBuildConfig(): NuxtOptionsBuild | undefined {
  if (process.env.VERCEL && !process.env.CI) {
    // Do not add webpack plugins when running on Vercel
    return
  }
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
  return {
    plugins: [new MonacoWebpackPlugin()]
  }
}

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
    '~/plugins/toast.client.ts',
    '~/plugins/shortcuts.client.ts'
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: [
    '@nuxt/http',
    // '@nuxtjs/pwa',
    '@nuxtjs/gtm',
    'cookie-universal-nuxt'
  ],
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || ''
  },
  http: {
    baseURL: process.env.API_ENDPOINT
  },
  gtm: {
    id: process.env.GTM_ID
  },
  vuetify: {
    customVariables: ['~/styles/variables.scss'],
    treeShake: true
  },
  build: generateBuildConfig(),
  modern: true
}

export default config
