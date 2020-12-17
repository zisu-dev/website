<template>
  <div :style="{ zIndex }">
    <v-img :src="bg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppBg',
  computed: {
    scope() {
      return this.$route.path.split('/')[1] || 'index'
    },
    bg() {
      return this.$vuetify.theme.dark
        ? 'https://s3.ax1x.com/2020/12/17/r8hg5q.png'
        : 'https://s3.ax1x.com/2020/12/08/rpmt3D.jpg'
    },
    zIndex() {
      return this.$store.state.zen ? 0 : -1
    }
  }
})
</script>

<style scoped>
div {
  position: fixed;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  background-position: center center;
}
</style>
