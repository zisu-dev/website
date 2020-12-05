<template>
  <v-menu v-if="user" offset-y open-on-hover :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" :to="'/user/' + user.slug" v-on="on">
        <v-avatar size="32">
          <v-img :src="getAvatar(user.email)" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-badge
            :content="userBadge"
            :color="user.perm.admin ? 'red' : 'blue'"
            inline
          >
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
          </v-badge>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="user.perm.admin" to="/admin">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else outlined to="/login">
    <v-icon left>mdi-account-circle</v-icon>
    Login
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import gravatar from 'gravatar'

export default Vue.extend({
  name: 'UserIndicator',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userBadge'])
  },
  methods: {
    logout() {
      this.$store.commit(':logout')
      this.$cookies.remove('token')
      this.$http.setToken(false)
      this.$toast.success({ title: 'Bye' })
      this.$router.push('/')
    },
    getAvatar(email: string) {
      return gravatar.url(email)
    }
  }
})
</script>