<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="title" v-text="post.title" />
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>mdi-clock-outline</v-icon>
            {{ new Date(post.published).toLocaleString() }}
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <article
        ref="content"
        class="markdown-body line-numbers"
        v-text="post.content"
      />
    </v-card-text>
    <v-divider />
    <div class="pl-1 pr-1">
      <tag-chip
        v-for="(tag, i) in post.tags"
        :key="'t' + i"
        class="ma-1"
        :tag="tag"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Prism from '@/plugins/prism'
import TagChip from '@/components/TagChip.vue'

export default Vue.extend({
  name: 'PostItem',
  components: { TagChip },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  watch: {
    'post._id'() {
      this.highlight()
    }
  },
  mounted() {
    this.highlight()
  },
  methods: {
    highlight() {
      Prism.highlightAllUnder(this.$refs.content as Element)
    }
  }
})
</script>
