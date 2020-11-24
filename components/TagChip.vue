<template>
  <v-chip label :to="'/tag/' + tag.slug" outlined
    ><v-icon left>mdi-label</v-icon>{{ tag.title }}</v-chip
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TagChip',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
})
</script>
