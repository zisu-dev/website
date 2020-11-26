<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <post-item :post="post"> </post-item>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PostItem from '~/components/PostItem.vue'

export default Vue.extend({
  components: {
    PostItem
  },
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$http.get(`/post/${slug}`).then((r) => r.json())
    return {
      post: data
    }
  }
})
</script>
