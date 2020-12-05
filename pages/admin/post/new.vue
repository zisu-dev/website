<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text>
                <v-text-field
                  v-model.number="post.priority"
                  label="Priority"
                  type="number"
                  min="-1"
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
                <v-btn color="error" @click="reset">Reset</v-btn>
                <v-btn color="primary" @click="submit">Create</v-btn>
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
  layout: 'admin',
  name: 'AdminPostNewPage',
  data() {
    return {
      loading: false,
      post: {
        priority: 0,
        slug: '',
        title: '',
        content: '',
        summary: '',
        published: Date.now(),
        public: false
      }
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
        const _id: string = await this.$http.$post(`/post`, post)
        this.$toast.success({ title: 'Success', message: 'ID: ' + _id })
        this.$router.push('/admin/post/' + _id)
      } catch (e) {
        this.$toast.error({ title: 'Failed', message: e.message })
      }
      this.loading = false
    }
  }
})
</script>
