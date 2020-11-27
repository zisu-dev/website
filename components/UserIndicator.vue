<template>
  <v-menu v-if="user" offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined v-bind="attrs" v-on="on">
        {{ user.name }}
      </v-btn>
    </template>
    <v-list dense>
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
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'UserIndicator',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.commit(':logout')
      this.$cookies.remove('token')
      this.$http.setToken(false)
    }
  }
})
</script>