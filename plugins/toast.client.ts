import Vue from 'vue'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: typeof iziToast & { $error: typeof $error }
  }
}

async function $error(e: Error | Record<string, any>) {
  if ('response' in e) {
    const { message } = await e.response.json()
    iziToast.error({ title: 'Failed', message })
    return
  }
  iziToast.error({ title: 'Failed', message: e.message })
}

Vue.prototype.$toast = iziToast
Vue.prototype.$toast.$error = $error
