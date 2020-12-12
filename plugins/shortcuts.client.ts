import { Plugin } from '@nuxt/types'
import Mousetrap from 'mousetrap'

const plugin: Plugin = (ctx) => {
  Mousetrap.bind('ctrl+k z', () => {
    ctx.store.commit('zen:update', !ctx.store.state.zen)
  })
}

export default plugin
