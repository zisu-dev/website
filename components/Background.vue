<template>
  <div :style="{ backgroundImage: `url(${bg})` }"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Background extends Vue {
  get bg() {
    return 'https://i.loli.net/2020/11/21/H2hewskIoquRBzg.png'
  }
}
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
