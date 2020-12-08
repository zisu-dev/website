<template>
  <div>
    <v-img :src="bg" />
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
      return this.$vuetify.theme.dark
        ? 'https://s3.ax1x.com/2020/12/06/DXKDj1.jpg'
        : 'https://s3.ax1x.com/2020/12/08/rpmt3D.jpg'
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
