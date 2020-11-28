<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col xs="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div>
                  <div class="title" v-text="user.name" />
                </div>
              </v-card-title>
              <v-divider />
              <v-tabs>
                <v-tab> Info </v-tab>
                <v-tab-item>
                  <v-list dense color="transparent">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-identifier</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          <code>{{ user._id }}</code>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-pound</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ user.slug }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-email</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ user.email }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
                <template v-if="canManage">
                  <v-tab> Edit </v-tab>
                  <v-tab-item>
                    <v-card-text>
                      <v-text-field v-model="user.name" label="Name" />
                      <v-text-field
                        v-model="user.email"
                        label="Email"
                        type="email"
                      />
                      <v-text-field
                        v-model="pass"
                        label="Password"
                        placeholder="(Do not change)"
                        type="password"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="primary" @click="submit">Submit</v-btn>
                    </v-card-actions>
                  </v-tab-item>
                </template>
              </v-tabs>
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
    const data: any = await ctx.$http.get(`/user/${slug}`).then((r) => r.json())
    return {
      user: data
    }
  },
  data() {
    return {
      pass: '',
      loading: false
    }
  },
  computed: {
    canManage() {
      return (
        this.$store.state.user?.perm.admin ||
        this.$store.state.user?._id === this.$data.user._id
      )
    }
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        const body: Record<string, any> = {
          name: this.$data.user.name,
          email: this.$data.user.email
        }
        if (this.pass) {
          body.pass = this.pass
        }
        await this.$http.$put(`/user/${this.$data.user._id}`, body)
        this.$toast.success({ title: 'Success' })
      } catch (e) {
        this.$toast.error({ title: 'Failed', message: e.message })
      }
      this.loading = false
    }
  }
})
</script>
