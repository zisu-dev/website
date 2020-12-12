<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-text>
            <v-text-field :value="meta._id" disabled label="ID" />
            <v-text-field
              v-model="meta.slug"
              :disabled="isSystem"
              label="Slug"
            />
            <json-editor v-model="meta.value" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-switch
              v-model="meta.public"
              label="Public"
              :disabled="isProtected"
            />
            <v-spacer />
            <v-btn color="warning" @click="reset">Reset</v-btn>
            <v-btn color="primary" :disabled="isProtected" @click="submit">
              Update
            </v-btn>
            <v-btn color="error" :disabled="isSystem" @click="remove">
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
import JsonEditor from '~/components/JSONEditor.vue'

export default Vue.extend({
  layout: 'admin',
  name: 'AdminMetaItemPage',
  components: { JsonEditor },
  async asyncData(ctx) {
    const id = ctx.params.id
    const data: any = await ctx.$http.$get(`/meta/${id}`)
    return {
      meta: data
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    isSystem() {
      return this.$data.meta.slug.startsWith('$')
    },
    isProtected() {
      return this.$data.meta.slug.startsWith('$$')
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
        const meta = this.$data.meta
        await this.$http.$put(`/meta/${this.$data.meta._id}`, meta)
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    },
    async remove() {
      this.loading = true
      try {
        await this.$http.$delete(`/meta/${this.$data.meta._id}`)
        this.$toast.success({ title: 'Success' })
        this.$router.replace('/admin/meta')
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    }
  }
})
</script>
