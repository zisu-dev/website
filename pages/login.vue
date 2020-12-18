<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            Login
            <v-spacer />
            <v-btn outlined to="/register">
              Register
              <v-icon right>mdi-account-plus</v-icon>
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
            <v-btn
              v-if="githubEnabled"
              color="#181717"
              dark
              :disabled="loading"
              @click="githubOpen"
            >
              <v-icon left>mdi-github</v-icon>
              Github
            </v-btn>
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
import { enabled, open, getState } from '~/utils/github'

export default Vue.extend({
  name: 'LoginPage',
  middleware(ctx) {
    const { store, redirect } = ctx
    if (store.state.token) {
      return redirect('/')
    }
  },
  data() {
    return {
      loading: false,
      login: '',
      pass: '',
      githubEnabled: enabled
    }
  },
  head() {
    return {
      title: 'Login'
    }
  },
  mounted() {
    const githubState = getState()
    if (githubState) {
      const { code, state } = this.$route.query
      if (githubState === state) {
        this.githubLogin(code, state)
      } else {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        const body = {
          login: this.login,
          pass: this.pass
        }
        const res: any = await this.$http.$post('/login', body)
        this.$cookies.set('token', res.token)
        this.$store.commit(':login', res)
        this.$http.setToken(res.token, 'Bearer')
        this.$toast.success({ title: `Welcome ${res.user.name}` })
        this.$router.push('/')
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    },
    githubOpen() {
      open()
    },
    async githubLogin(code: string, state: string) {
      this.loading = true
      try {
        const body = { code, state }
        const res: any = await this.$http.$post('/oauth/github/login', body)
        this.$cookies.set('token', res.token)
        this.$store.commit(':login', res)
        this.$http.setToken(res.token, 'Bearer')
        this.$toast.success({ title: `Welcome ${res.user.name}` })
        this.$router.push('/')
      } catch (e) {
        this.$toast.$error(e)
      }
      this.loading = false
    }
  }
})
</script>
