export const state = () => ({
  title: 'ZhangZisu.CN Blog'
})

type State = ReturnType<typeof state>

export const mutations = {
  'title:update'(state: State, title: string) {
    state.title = title
  }
}

export const actions = {}

export const modules = {}
