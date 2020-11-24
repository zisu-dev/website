import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  title: 'ZhangZisu.CN Blog'
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  'title:update'(state: RootState, title: string) {
    state.title = title
  }
}

export const actions: ActionTree<RootState, RootState> = {}
