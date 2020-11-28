<template>
  <v-app class="acrylic">
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
      <v-spacer />
      <user-indicator />
    </v-app-bar>
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
        <v-list-item to="/admin">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Admin Home</v-list-item-title>
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
import UserIndicator from '~/components/UserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppFooter, UserIndicator },
  middleware: ['admin'],
  data() {
    return {
      drawer: false
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

<style>
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
