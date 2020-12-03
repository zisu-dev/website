<template>
  <div>
    <v-code
      v-if="block.type === 'code'"
      :code="block.content"
      :language="block.props.lang"
    />
    <v-markdown v-else-if="block.type === 'md'" :source="block.content" />
    <div v-else>
      {{ block }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMarkdown from '~/components/functional/VMarkdown'
import VCode from '~/components/functional/VCode'

export default Vue.extend({
  name: 'Block',
  components: { VMarkdown, VCode },
  props: {
    block: {
      type: Object,
      required: true
    }
  }
})
</script>