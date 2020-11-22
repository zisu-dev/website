<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="title" v-html="post.title.rendered" />
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>mdi-clock-outline</v-icon>
            {{ new Date(post.date_gmt).toLocaleString() }}
          </v-chip>
          <v-chip
            class="ml-1"
            small
            label
            color="#0073aa"
            dark
            :href="post.link"
            target="_blank"
          >
            <v-icon left>mdi-wordpress</v-icon>
            View on WordPress
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <article
        ref="content"
        class="markdown-body line-numbers"
        v-html="post.content.rendered"
      />
    </v-card-text>
    <v-divider />
    <div class="pl-1 pr-1">
      <tag-chip
        v-for="(tag, i) in post._embedded['wp:term'][1]"
        :key="'t' + i"
        class="ma-1"
        :tag="tag"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Prism from '@/plugins/prism'
import TagChip from '@/components/TagChip.vue'

@Component({ components: { TagChip } })
export default class PostItem extends Vue {
  @Prop({ required: true }) readonly post!: any

  @Watch('post.slug')
  _wslug() {
    this.highlight()
  }

  mounted() {
    this.highlight()
  }

  highlight() {
    Prism.highlightAllUnder(this.$refs.content as Element)
  }
}
</script>
