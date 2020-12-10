<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text>
                <v-text-field v-model="meta.slug" label="Slug" />
                <v-textarea
                  v-model="meta.value"
                  label="Value"
                  class="code-editor"
                />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-switch v-model="meta.public" label="Public" />
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
  name: 'AdminMetaNewPage',
  data() {
    return {
      loading: false,
      meta: {
        slug: '',
        value: '',
        public: false
      }
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::meta')
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      try {
        const meta = this.meta
        const _id: string = await this.$http.$post(`/meta`, meta)
        this.$toast.success({ title: 'Success', message: 'ID: ' + _id })
        this.$router.push('/admin/meta/' + _id)
      } catch (e) {
        this.$toast.error({ title: 'Failed', message: e.message })
      }
      this.loading = false
    }
  }
})
</script>
