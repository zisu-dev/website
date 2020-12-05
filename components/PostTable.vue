<template>
  <v-card>
    <v-card-title>{{ page ? 'Page' : 'Post' }} List</v-card-title>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="posts"
      :options.sync="postsTableOpt"
      :server-items-length="postCount"
      :loading="$fetchState.pending"
      dense
    >
      <template v-slot:[`item._id`]="{ item }">
        <nuxt-link class="object-id" :to="'/admin/post/' + item._id">
          {{ item._id }}
        </nuxt-link>
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <tag-chip
          v-for="(tag, i) in item.tags"
          :key="i"
          class="ma-1"
          :tag="tag"
          no-icon
          admin
        />
      </template>
    </v-data-table>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import TagChip from '~/components/TagChip.vue'

export default Vue.extend({
  name: 'PostTable',
  components: { TagChip },
  props: {
    page: {
      type: Boolean
    }
  },
  async fetch() {
    const { page, itemsPerPage } = this.postsTableOpt
    const searchParams: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$http.$get(this.page ? '/page/' : '/post', {
      searchParams
    })

    this.posts = data.items
    this.postCount = data.total
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Tags', value: 'tags', sortable: false }
      ],
      posts: [],
      postsTableOpt: {
        page: 1,
        itemsPerPage: 15
      },
      postCount: 0
    }
  },
  watch: {
    options: {
      handler() {
        this.$fetch()
      },
      deep: true
    }
  }
})
</script>
