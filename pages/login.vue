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
        this.$store.commit(':login', res)
        this.$http.setToken(res.token, 'Bearer')
      } catch (e) {
        //
      }
      this.loading = false
    }
  }
})
// import { Vue, Component, Prop } from 'vue-property-decorator'
// import { api } from '@/api'
// import { NavigationGuardNext, Route } from 'vue-router'

// @Component({
//   beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
//     if (api.state.loggedIn) {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })
// export default class Login extends Vue {
//   @Prop()
//   embed!: boolean

//   loading = false
//   username = ''
//   password = ''

//   async submit() {
//     this.loading = true
//     try {
//       await api.login(this.username, this.password)
//       if (this.embed) {
//         window.opener.postMessage('done', '*')
//         window.close()
//       }
//       this.$router.push('/')
//     } catch (e) {
//       console.log(e)
//     }
//     this.loading = false
//   }
// }
</script>
