<template>
  <monaco-editor v-model.lazy="json" language="json" class="editor" />
</template>

<script lang="ts">
import Vue from 'vue'
import MonacoEditor from '~/components/MonacoEditor.vue'

export default Vue.extend({
  name: 'JSONEditor',
  components: { MonacoEditor },
  model: {
    prop: 'value',
    event: 'change'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      json: ''
    }
  },
  watch: {
    value: {
      handler(val: any) {
        this.json = JSON.stringify(val, null, '\t')
      },
      immediate: true
    },
    json: {
      handler(val: string) {
        try {
          this.$emit('change', JSON.parse(val))
        } catch (e) {
          //
        }
      }
    }
  }
})
</script>