import { Context } from '@nuxt/types'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

type Theme = 'auto' | 'dark' | 'light'

export const state = () => ({
  title: 'ZhangZisu.CN Blog',
  theme: 'auto' as Theme,
  acrylic: true,
  token: null as string | null,
  user: null as Record<string, any> | null,
  initialized: false
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  'title:update'(state: RootState, title: string) {
    state.title = title
  },
  'theme:update'(state: RootState, theme: Theme) {
    state.theme = theme
  },
  'acrylic:update'(state: RootState, acrylic: boolean) {
    state.acrylic = acrylic
  },
  'token:update'(state: RootState, token: string) {
    state.token = token
  },
  'user:update'(state: RootState, user: any) {
    state.user = user
  },
  ':initialize'(state: RootState) {
    state.initialized = true
  },
  ':login'(state: RootState, { token, user }) {
    state.token = token
    state.user = user
  },
  ':logout'(state: RootState) {
    state.token = state.user = null
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtInit(store, ctx: Context) {
    const { app } = ctx
    const { $cookies } = app
    const token = $cookies.get('token')
    const acrylic = $cookies.get('acrylic')
    const theme = $cookies.get('theme')

    if (!store.state.initialized) {
      if (['auto', 'light', 'dark'].includes(theme)) {
        store.commit('theme:update', theme)
      } else if (theme !== undefined) {
        $cookies.remove('theme')
      }

      if (typeof acrylic === 'boolean') {
        store.commit('acrylic:update', acrylic)
      } else if (acrylic !== undefined) {
        $cookies.remove('acrylic')
      }

      if (token) {
        try {
          ctx.$http.setToken(token, 'Bearer')
          const user = await ctx.$http.$get('/session')
          store.commit('token:update', token)
          store.commit('user:update', user)
        } catch (e) {
          ctx.$http.setToken(false)
          $cookies.remove('token')
        }
      }
      store.commit(':initialize')
    }
  }
}
