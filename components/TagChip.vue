<template>
  <v-chip
    label
    :to="(admin ? '/admin/tag/' : '/tag/') + tag.slug"
    outlined
    small
  >
    <v-icon v-if="!noIcon" left>mdi-label</v-icon>
    {{ tag.title }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TagChip',
  props: {
    tag: {
      type: Object,
      required: true
    },
    noIcon: {
      type: Boolean
    },
    admin: {
      type: Boolean
    }
  }
})
</script>
