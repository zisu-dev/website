import Vue from 'vue'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: typeof iziToast & { $error: typeof $error }
  }
}

function $error(e: Error) {
  iziToast.error({ title: 'Failed', message: e.message })
}

Vue.prototype.$toast = iziToast
Vue.prototype.$toast.$error = $error
