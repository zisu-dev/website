<template>
  <v-card>
    <v-card-title>Tags</v-card-title>
    <v-divider />
    <template v-if="tags">
      <tag-chip
        v-for="(tag, i) in tags"
        :key="'t' + i"
        class="ma-1"
        :tag="tag"
      />
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import TagChip from '~/components/TagChip.vue'

export default Vue.extend({
  components: {
    TagChip
  },
  async fetch() {
    const data: any = await this.$http.$get('/tag')
    this.tags = data.items
  },
  data() {
    return {
      tags: []
    }
  }
})
</script>
