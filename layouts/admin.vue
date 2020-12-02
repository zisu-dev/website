<template>
  <v-app class="acrylic">
    <app-bar v-model="drawer" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Site Index</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin" exact>
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Admin Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/post">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-post</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/tag">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-tag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Tags</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/user">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
    <app-footer />
    <background />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Background from '~/components/Background.vue'
import AppFooter from '~/components/AppFooter.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppFooter },
  middleware: ['admin'],
  data() {
    return {
      drawer: null
    }
  },
  watch: {
    '$store.state.theme': {
      immediate: true,
      handler(val) {
        if (val === 'light') {
          this.$vuetify.theme.dark = false
        } else if (val === 'dark') {
          this.$vuetify.theme.dark = true
        } else if (process.client) {
          const darkMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
          )
          this.$vuetify.theme.dark = darkMediaQuery.matches
        }
      }
    }
  }
})
</script>
