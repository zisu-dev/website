<template>
  <v-app :class="{ acrylic: $store.state.acrylic }">
    <app-bar v-model="drawer" />
    <v-navigation-drawer v-model="drawer" app>
      <app-nav />
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
import AppNav from '~/components/AppNav.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppBar, AppFooter, AppNav },
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
