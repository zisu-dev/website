<template>
  <v-card>
    <v-card-title>
      <div>
        <nuxt-link
          class="title"
          :to="`/post/${post.slug}`"
          v-text="post.title"
        />
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
        <v-btn outlined small :to="'/admin/post/' + post.slug">Edit</v-btn>
      </v-card-text>
    </template>
    <v-divider />
    <v-card-text>
      <block v-for="(block, i) in summary" :key="'s' + i" :block="block" />
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
import { mapGetters } from 'vuex'
import Block from '~/components/Block.vue'
import TagChip from '~/components/TagChip.vue'

export default Vue.extend({
  name: 'PostListItem',
  components: { TagChip, Block },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    summary() {
      return this.$bml.parse(this.post.summary)
    },
    ...mapGetters(['isAdmin'])
  }
})
</script>
