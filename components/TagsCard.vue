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
import { Vue, Component } from 'vue-property-decorator'
import TagChip from '@/components/TagChip.vue'

@Component({ components: { TagChip } })
export default class TagsCard extends Vue {
  tags: any[] | null = null
  err: Error | null = null

  created() {
    this.load()
  }

  async load() {
    this.tags = this.err = null

    try {
      this.tags = []
    } catch (e) {
      this.err = e
    }
  }
}
</script>
