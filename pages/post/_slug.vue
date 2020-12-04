<template>
  <v-row>
    <v-col cols="12">
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
        <template v-if="isAdmin">
          <v-divider />
          <v-card-text>
            <v-btn outlined small :to="'/admin/post/' + post._id"> Edit </v-btn>
          </v-card-text>
        </template>
        <v-divider />
        <v-card-text>
          <bml :src="post.summary" />
          <v-divider class="mb-2 mt-2" />
          <bml :src="post.content" />
        </v-card-text>
        <v-divider />
        <div class="pl-1 pr-1">
          <tag-chip
            v-for="(tag, i) in post.tags"
            :key="i"
            class="ma-1"
            :tag="tag"
          />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Bml from '~/components/Bml.vue'
import TagChip from '~/components/TagChip.vue'

export default Vue.extend({
  components: { Bml, TagChip },
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$http.$get(`/post/${slug}`)
    return {
      post: data
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  head() {
    return {
      title: this.$data.post.title
    }
  }
})
</script>
