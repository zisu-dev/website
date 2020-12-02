<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-actions>
                <v-text-field
                  v-model.trim.lazy="searchInput"
                  label="Search"
                  placeholder="Type your query here"
                  append-icon="mdi-magnify"
                  clearable
                  @click:append="search = searchInput"
                  @keydown.enter="search = searchInput"
                />
              </v-card-actions>
              <v-divider />
              <v-card-text>
                <code
                  >{{
                    postCount
                      ? `Showing ${(curPage - 1) * postPerPage + 1}-${Math.min(
                          curPage * postPerPage,
                          postCount
                        )} of ${postCount} posts`
                      : 'No posts found'
                  }}
                  {{ search ? 'with search ' + search : '' }}
                </code>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <template v-if="$fetchState.pending">
          <v-row justify="center">
            <v-col cols="auto">
              <loading />
            </v-col>
          </v-row>
        </template>
        <template v-else-if="$fetchState.error">
          <v-row justify="center">
            <v-col cols="auto">
              <v-card class="text-center" flat>
                <v-icon size="96px">mdi-alert-circle-outline</v-icon>
                <v-card-title>An error occurred</v-card-title>
                <v-card-text>
                  <code>{{ $fetchState.error.message }}</code>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn color="primary" outlined block @click="$fetch"
                    >Reload</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <post-list :posts="posts" />
          <v-row justify="center">
            <v-col cols="auto">
              <v-pagination v-model="curPage" :length="pageCount" />
            </v-col>
          </v-row>
        </template>
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="3">
        <sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/PostList.vue'
import Loading from '~/components/Loading.vue'
import Sidebar from '~/components/Sidebar.vue'

export default Vue.extend({
  name: 'PostPage',
  components: { PostList, Loading, Sidebar },
  async fetch() {
    const searchParams: Record<string, any> = {
      page: this.curPage,
      per_page: this.postPerPage
    }
    if (this.search) {
      searchParams.search = this.search
    }

    const data: any = await this.$http.$get('/post/', {
      searchParams
    })

    this.posts = data.items
    this.postCount = data.total
    this.pageCount = Math.ceil(data.total / this.postPerPage)
  },
  data() {
    return {
      posts: [],
      postCount: 0,
      pageCount: 1,
      postPerPage: 15,
      curPage: 1,
      search: '',
      searchInput: ''
    }
  },
  watch: {
    curPage() {
      this.$fetch()
    },
    search() {
      this.$fetch()
    }
  },
  created() {
    this.$store.commit('scope:update', 'blog')
  },
  head() {
    return {
      title: 'Posts'
    }
  }
})
</script>
