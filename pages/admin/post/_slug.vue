<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-title>Edit post</v-card-title>
              <v-card-text>
                <v-text-field :value="post._id" disabled label="ID" />
                <v-text-field
                  v-model.number="post.priority"
                  label="Priority"
                  type="number"
                  min="0"
                  max="16"
                />
                <v-text-field v-model="post.slug" label="Slug" />
                <v-text-field v-model="post.title" label="Title" />
                <v-textarea
                  v-model="post.summary"
                  label="Summary"
                  class="code-editor"
                />
                <v-textarea
                  v-model="post.content"
                  label="Content"
                  class="code-editor"
                />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-switch v-model="post.public" label="Public" />
                <v-spacer />
                <v-btn color="success" :to="'/post/' + post.slug">View</v-btn>
                <v-btn color="error" @click="reset">Reset</v-btn>
                <v-btn color="primary" @click="submit">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$http.get(`/post/${slug}`).then((r) => r.json())
    return {
      post: data
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      try {
        const post = this.$data.post
        await this.$http.$put(`/post/${this.$data.post._id}`, post)
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.error({ title: 'Failed', message: e.message })
      }
      this.loading = false
    }
  }
})
</script>
