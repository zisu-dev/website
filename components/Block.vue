<template>
  <div>
    <v-code
      v-if="block.type === 'code'"
      :code="block.content"
      :language="block.props.lang"
    />
    <v-markdown v-else-if="block.type === 'md'" :source="block.content" />
    <v-text v-else-if="block.type === 'text'" :src="block.content" />
    <div v-else>
      {{ block }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMarkdown from '~/components/functional/VMarkdown'
import VCode from '~/components/functional/VCode'
import VText from '~/components/functional/VText'

export default Vue.extend({
  name: 'Block',
  components: { VMarkdown, VCode, VText },
  props: {
    block: {
      type: Object,
      required: true
    }
  }
})
</script>
