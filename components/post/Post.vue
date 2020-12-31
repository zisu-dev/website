<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="title" v-text="post.title" />
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>{{ mdiClockOutline }}</v-icon>
            {{ new Date(post.published).toLocaleString() }}
          </v-chip>
        </div>
      </div>
      <template v-if="post.priority > 0">
        <v-spacer />
        <v-chip color="red" outlined>Pinned</v-chip>
      </template>
    </v-card-title>
    <template v-if="isAdmin">
      <v-divider />
      <v-card-actions>
        <v-chip small :color="post.public ? 'success' : 'error'">
          {{ post.public ? 'Public' : 'Private' }}
        </v-chip>
        <v-spacer />
        <v-btn outlined small :to="'/admin/post/' + post._id" nuxt>Edit</v-btn>
      </v-card-actions>
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
        v-for="(tag, i) of post.tags"
        :key="i"
        class="ma-1"
        :tag="tag"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { mdiClockOutline } from '@mdi/js'
import Bml from '~/components/Bml.vue'
import TagChip from '~/components/tag/TagChip.vue'

export default Vue.extend({
  name: 'Post',
  components: { Bml, TagChip },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mdiClockOutline
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  }
})
</script>
