<template>
  <div>
    <v-img :src="bg" height="100%" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Background',
  computed: {
    scope() {
      return this.$route.path.split('/')[1] || 'index'
    },
    bg() {
      // switch (this.scope) {
      //   case 'index':
      //     return 'https://i.loli.net/2020/10/03/sMTDHWquvjmNwG7.png'
      //   default:
      //     return 'https://i.loli.net/2020/11/21/H2hewskIoquRBzg.png'
      // }
      return 'https://i.loli.net/2020/11/21/H2hewskIoquRBzg.png'
    }
  }
})
</script>

<style scoped>
div {
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  background-position: center center;
}
</style>
