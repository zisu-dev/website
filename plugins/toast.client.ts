import Vue from 'vue'
import iziToast from 'izitoast'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: typeof iziToast
  }
}

Vue.prototype.$toast = iziToast
