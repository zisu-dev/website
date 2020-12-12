<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <post :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '~/components/Post.vue'

export default Vue.extend({
  components: { Post },
  async asyncData(ctx) {
    const data: any = await ctx.$http.$get(`/post/about`)
    return {
      post: data
    }
  },
  head() {
    return {
      title: this.$data.post.title
    }
  }
})
</script>
