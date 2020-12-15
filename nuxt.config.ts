import cp from 'child_process'
import { NuxtConfig } from '@nuxt/types'
import { NuxtOptionsBuild } from '@nuxt/types/config/build'
import { NuxtOptionsModule } from '@nuxt/types/config/module'

function run(cmd: string) {
  return cp.execSync(cmd).toString().trim()
}

function getGitInfo() {
  return {
    branch: run('git rev-parse --abbrev-ref HEAD'),
    hash: run('git rev-parse --short HEAD')
  }
}

function generateBuildConfig(): NuxtOptionsBuild | undefined {
  if (process.env.VERCEL && !process.env.CI) {
    // Do not add webpack plugins when running on Vercel
    return
  }
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
  const { DefinePlugin } = require('webpack')
  return {
    plugins: [
      new MonacoWebpackPlugin(),
      new DefinePlugin({
        BUILD: JSON.stringify({
          git: getGitInfo(),
          time: Date.now()
        })
      })
    ]
  }
}

function generateModulesConfig(): NuxtOptionsModule[] | undefined {
  const options = [
    '@nuxt/http',
    'cookie-universal-nuxt'
    // '@nuxtjs/pwa',
  ]
  if (process.env.GTM_ID) {
    options.push('@nuxtjs/gtm')
  }
  return options
}

const config: NuxtConfig = {
  target: 'server',
  modern: true,
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
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || ''
  },
  http: {
    baseURL: process.env.API_ENDPOINT || 'https://cms.zzisu.dev'
  },
  gtm: {
    id: process.env.GTM_ID
  },
  vuetify: {
    customVariables: ['~/styles/variables.scss'],
    treeShake: true
  },
  build: generateBuildConfig(),
  modules: generateModulesConfig()
}

export default config
