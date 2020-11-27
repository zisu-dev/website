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
            <v-btn color="primary" :loading="loading" @click="submit"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
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
        this.$toast.error({ title: 'Login failed' })
      }
      this.loading = false
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
