<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-text>
            <v-text-field :value="tag._id" disabled label="ID" />
            <v-text-field v-model="tag.slug" label="Slug" />
            <v-text-field v-model="tag.title" label="Title" />
            <v-textarea
              v-model="tag.content"
              label="Content"
              class="code-editor"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="loading" color="success" :to="'/tag/' + tag.slug">
              View
            </v-btn>
            <v-btn :disabled="loading" color="warning" @click="reset">
              Reset
            </v-btn>
            <v-btn :disabled="loading" color="primary" @click="submit">
              Update
            </v-btn>
            <v-btn :disabled="loading" color="error" @click="remove">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin',
  name: 'AdminTagItemPage',
  async asyncData(ctx) {
    const id = ctx.params.id
    const data: any = await ctx.$http.$get(`/tag/${id}`)
    return {
      tag: data
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::tag')
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      try {
        const tag = this.$data.tag
        await this.$http.$put(`/tag/${this.$data.tag._id}`, tag)
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    },
    async remove() {
      this.loading = true
      try {
        await this.$http.$delete(`/tag/${this.$data.tag._id}`)
        this.$toast.success({ title: 'Success' })
        this.$router.replace('/admin/tag')
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    }
  }
})
</script>
