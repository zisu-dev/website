<template>
  <div class="bml-root">
    <block v-for="(block, i) in content" :key="i" :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Block from '~/components/Block.vue'
import { parse } from '~/utils/bml'

export default Vue.extend({
  name: 'Bml',
  components: { Block },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    content() {
      return parse(this.src)
    }
  }
})
</script>
