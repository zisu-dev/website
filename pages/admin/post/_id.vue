<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card :loading="loading">
          <v-tabs>
            <v-tab>Meta</v-tab>
            <v-tab-item>
              <v-card-text>
                <v-text-field :value="post._id" disabled label="ID" />
                <v-text-field
                  v-model.number="post.priority"
                  label="Priority"
                  type="number"
                  min="-1"
                  max="16"
                  :hint="priorityHint"
                  persistent-hint
                />
                <v-text-field v-model="post.slug" label="Slug" />
                <v-text-field v-model="post.title" label="Title" />
                <v-row dense>
                  <v-col cols="6">
                    <date-editor
                      v-model="post.published"
                      label="Published at"
                    />
                  </v-col>
                  <v-col cols="6">
                    <date-editor v-model="post.updated" label="Last edit at" />
                  </v-col>
                </v-row>
                <v-switch v-model="post.public" label="Public" />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="loading"
                  color="success"
                  :to="'/post/' + post.slug"
                  nuxt
                >
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
            </v-tab-item>
            <v-tab>Summary</v-tab>
            <v-tab-item>
              <monaco-editor
                v-model="post.summary"
                language="txt"
                class="editor"
              />
            </v-tab-item>
            <v-tab>Content</v-tab>
            <v-tab-item>
              <monaco-editor
                v-model="post.content"
                language="txt"
                class="editor"
              />
            </v-tab-item>
            <v-tab>Tags</v-tab>
            <v-tab-item>
              <v-card-text>Total tags: {{ post.tags.length }}</v-card-text>
              <v-divider />
              <v-list dense color="transparent">
                <v-list-item v-for="(tag, i) of post.tags" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>{{ tag.title }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="error" @click="deleteTag(tag)">
                      {{ mdiDelete }}
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider />
              <v-card-actions>
                <tag-autocomplete v-model="newTag" />
                <v-btn color="primary" :disabled="!newTag" @click="addTag">
                  Add
                </v-btn>
              </v-card-actions>
            </v-tab-item>
            <v-tab>Preview</v-tab>
            <v-tab-item>
              <v-card-text class="preview-background">
                <v-row justify="center">
                  <v-col cols="12">
                    <post :post="post" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiDelete, mdiPencil } from '@mdi/js'
import TagAutocomplete from '~/components/tag/TagAutocomplete.vue'
import Post from '~/components/post/Post.vue'
import MonacoEditor from '~/components/MonacoEditor.vue'
import DateEditor from '~/components/misc/DateEditor.vue'

export default Vue.extend({
  name: 'AdminPostItemPage',
  components: { TagAutocomplete, Post, MonacoEditor, DateEditor },
  async asyncData(ctx) {
    const id = ctx.params.id
    const data: any = await ctx.$http.$get(`/post/${id}`)
    return {
      post: data
    }
  },
  data() {
    return {
      loading: false,
      newTag: null as any,
      mdiDelete,
      mdiPencil
    }
  },
  computed: {
    priorityHint() {
      if (this.$data.post.priority === -1)
        return "Page (won't display in post list)"
      if (this.$data.post.priority === 0) return 'Common Post'
      return 'Prioritized Post'
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::post')
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
        this.$toast.$error(e)
      }
      this.loading = false
    },
    async addTag() {
      this.loading = true
      try {
        const res: boolean = await this.$http.$put(
          `/post/${this.$data.post._id}/tag/${this.newTag._id}`
        )
        if (res) {
          this.$data.post.tags.push(this.newTag)
        }
        this.newTag = null
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    },
    async deleteTag(tag: any) {
      this.loading = true
      try {
        const res: boolean = await this.$http.$delete(
          `/post/${this.$data.post._id}/tag/${tag._id}`
        )
        if (res) {
          this.$data.post.tags.splice(this.$data.post.tags.indexOf(tag), 1)
        }
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    },
    async remove() {
      this.loading = true
      try {
        await this.$http.$delete(`/post/${this.$data.post._id}`)
        this.$toast.success({ title: 'Success' })
        this.$router.replace('/admin/post')
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.preview-background {
  background: linear-gradient(-135deg, rgb(34, 76, 152) 10%, transparent),
    repeating-linear-gradient(
      45deg,
      rgba(34, 76, 152, 1) 0%,
      rgba(31, 48, 94, 0.6) 5%,
      transparent 5%,
      transparent 10%
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(34, 76, 152, 0.4) 0%,
      rgba(31, 48, 94, 0.5) 5%,
      transparent 5%,
      transparent 10%
    );
  background-color: rgba(34, 76, 152, 0.25);
}
</style>