<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <code>{{
                  postCount
                    ? `Showing ${(curPage - 1) * postPerPage + 1}-${Math.min(
                        curPage * postPerPage,
                        postCount
                      )} of ${postCount} posts`
                    : 'No posts found'
                }}</code>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <template v-if="posts">
          <post-list :posts="posts" />
          <v-row justify="center">
            <v-col cols="auto">
              <v-pagination v-model="curPage" :length="pageCount" />
            </v-col>
          </v-row>
        </template>
        <template v-else-if="err">
          <v-row justify="center">
            <v-col cols="auto">
              <v-card class="text-center" flat>
                <v-icon size="96px">mdi-alert-circle-outline</v-icon>
                <v-card-title>An error occurred</v-card-title>
                <v-card-text>
                  <code>{{ err.message }}</code>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn color="primary" outlined block @click="load"
                    >Reload</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row justify="center">
            <v-col cols="auto">
              <loading />
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'
import PostList from '@/components/PostList.vue'
import Loading from '@/components/Loading.vue'
import Sidebar from '@/components/Sidebar.vue'

@Component({ components: { PostList, Loading, Sidebar } })
export default class Home extends Vue {
  @Prop() readonly page?: string

  posts: any = null
  err: Error | null = null
  postCount = 1
  pageCount = 1
  postPerPage = 10
  curPage = 1

  generateParams() {
    const params = {
      //
    }
    return params
  }

  async load() {
    try {
      this.err = this.posts = null
    } catch (e) {
      this.err = e
    }
  }

  @Watch('page', { immediate: true })
  _wPage() {
    this.curPage = parseInt(this.page || '1')
    this.load()
  }

  @Watch('curPage')
  _wCurPage() {
    if (this.curPage === parseInt(this.page || '1')) {
      return
    }
    const query = { ...this.$route.query }
    if (this.curPage === 1) {
      delete query.page
    } else {
      query.page = this.curPage.toString()
    }
    const next: RawLocation = {
      path: this.$route.path,
      query,
      params: this.$route.params
    }
    this.$router.push(next)
  }

  created() {
    this.$store.commit('title:update', 'Posts')
  }
}
</script>
