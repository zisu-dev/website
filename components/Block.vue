<template>
  <div class="block line-numbers">
    <pre
      v-if="block.type === 'code'"
      :class="['language-' + block.props.lang]"
    ><code>{{block.content}}</code></pre>
    <md v-else-if="block.type === 'md'" :source="block.content" />
    <div v-else>
      {{ block }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Md from '~/components/functional/md'
import Prism from '~/utils/prism'

export default Vue.extend({
  name: 'Block',
  components: { Md },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  mounted() {
    Prism.highlightAllUnder(this.$el)
  }
})
</script>