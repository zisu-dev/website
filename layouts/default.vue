<template>
  <v-app :class="{ acrylic: $store.state.acrylic }">
    <app-bar v-model="drawer" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item to="/post">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/build">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-rocket</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Build Info</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/link">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-link</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Friend Links</v-list-item-title>
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
import AppBar from '~/components/AppBar.vue'
import AppFooter from '~/components/AppFooter.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppBar, AppFooter },
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
