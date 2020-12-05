<template>
  <v-row>
    <v-col cols="12">
      <post :post="post" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '~/components/Post.vue'

export default Vue.extend({
  components: { Post },
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$http.$get(`/post/${slug}`)
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
