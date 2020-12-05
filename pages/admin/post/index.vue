<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <v-card>
          <v-card-title>Admin: Posts</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/post/new">New Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="posts"
            :options.sync="tableOptions"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TagChip from '~/components/TagChip.vue'

export default Vue.extend({
  name: 'AdminPostPage',
  layout: 'admin',
  components: { TagChip },
  async fetch() {
    const { page, itemsPerPage } = this.tableOptions
    const searchParams: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$http.$get('/post/', {
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
      tableOptions: {
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
