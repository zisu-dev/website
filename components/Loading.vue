<template>
  <svg width="12em" height="12em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path class="cls-1"
      d="M141.5,16,36.8,147.5c-7.55,9.49-23.47,2.35-20.42-9.15L46.67,24.23A11.42,11.42,0,0,1,57.86,16H484.24c10.28,0,15.43,11.7,8.16,18.55L95.18,496"
      transform="translate(0 0)" />
    <path class="cls-1"
      d="M370.5,496,475.2,364.5c7.55-9.49,23.47-2.35,20.42,9.15L465.33,487.77A11.42,11.42,0,0,1,454.14,496H27.76c-10.28,0-15.43-11.7-8.16-18.55L416.82,16"
      transform="translate(0 0)" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import anime from 'animejs'

@Component
export default class Loading extends Vue {
  mounted () {
    anime({
      targets: this.$el.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      direction: 'alternate',
      loop: true
    })
    anime({
      targets: this.$el.querySelectorAll('path'),
      easing: 'easeInOutSine',
      duration: 1500,
      stroke: ['#4585f3', '#eb4134', '#fbba04', '#34aa51'],
      loop: true
    })
  }
}
</script>

<style scoped>
.cls-1 {
  fill: none;
  stroke: #4585f3;
  stroke-miterlimit: 10;
  stroke-width: 32px;
}

svg {
  filter: drop-shadow(7px 7px 7px #00000070);
}
</style>
