import Vue from 'vue'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: typeof iziToast
  }
}

Vue.prototype.$toast = iziToast
