<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            Register
            <v-spacer />
            <v-btn outlined to="/login">
              Login
              <v-icon right>mdi-login-variant</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field v-model="login" label="Username" />
            <v-text-field v-model="pass" label="Password" type="password" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :loading="loading" @click="submit">
              Submit
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
  name: 'RegisterPage',
  data() {
    return {
      loading: false,
      login: '',
      pass: ''
    }
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        throw await new Error('Not implemented')
      } catch (e) {
        this.$toast.error({ title: 'Register failed' })
      }
      this.loading = false
    }
  },
  head() {
    return {
      title: 'Register'
    }
  },
  middleware(ctx) {
    const { store, redirect } = ctx
    if (store.state.token) {
      return redirect('/')
    }
  }
})
</script>
