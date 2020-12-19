<template>
  <nuxt-child />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['admin'],
  head: {
    titleTemplate: '%s - Admin - ZZisu.dev'
  }
})
</script>