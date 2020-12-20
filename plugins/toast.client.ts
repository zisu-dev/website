import { Plugin } from '@nuxt/types'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

const toast = {
  ...iziToast,
  async $error(e: Error | Record<string, any>) {
    if ('response' in e) {
      const { message } = await e.response.json()
      iziToast.error({ title: 'Failed', message })
      return
    }
    iziToast.error({ title: 'Failed', message: e.message })
  }
}

type Toast = typeof toast

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

declare module '@nuxt/types' {
  interface Context {
    $toast: Toast
  }
}

const plugin: Plugin = (_ctx, inject) => {
  inject('toast', toast)
}

export default plugin
