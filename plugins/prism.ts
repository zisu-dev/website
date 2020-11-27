import Prism from 'prismjs'
import Vue from 'vue'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-bash'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
;(Prism as any).manual = true

declare module 'vue/types/vue' {
  interface Vue {
    $prism: typeof Prism
  }
}

Vue.prototype.$prism = Prism
