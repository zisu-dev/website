<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
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
                  <v-btn outlined small :to="'/admin/post/' + post._id">
                    Edit
                  </v-btn>
                </v-card-text>
              </template>
              <v-divider />
              <v-card-text>
                <block
                  v-for="(block, i) in summary"
                  :key="'s' + i"
                  :block="block"
                />
                <v-divider class="mb-2 mt-2" />
                <block
                  v-for="(block, i) in content"
                  :key="'c' + i"
                  :block="block"
                />
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Block from '~/components/Block.vue'

export default Vue.extend({
  components: { Block },
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$http.$get(`/post/${slug}`)
    return {
      post: data
    }
  },
  computed: {
    summary() {
      return this.$bml.parse(this.$data.post.summary)
    },
    content() {
      return this.$bml.parse(this.$data.post.content)
    },
    ...mapGetters(['isAdmin'])
  }
})
</script>
