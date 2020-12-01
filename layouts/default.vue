<template>
  <v-app :class="{ acrylic: $store.state.acrylic }">
    <v-app-bar app dark>
      <v-btn icon tile x-large @click="drawer = !drawer">
        <v-avatar tile size="32">
          <v-img src="/logo.svg" class="logo" />
        </v-avatar>
      </v-btn>
      <v-btn text x-large class="pa-0 text-center" to="/">
        <div class="ma-2">
          <div class="font-weight-bold">ZhangZisu.CN</div>
          <div class="text-overline" style="line-height: unset">
            {{ scope }}
          </div>
        </div>
      </v-btn>
      <v-spacer />
      <user-indicator />
    </v-app-bar>
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
import AppFooter from '~/components/AppFooter.vue'
import UserIndicator from '~/components/UserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppFooter, UserIndicator },
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    scope() {
      return this.$route.path.split('/')[1] || 'index'
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
  },
  created() {
    this.$vuetify.theme.themes.light.primary = 'rgba(0, 0, 0, 0)'
  }
})
</script>

<style>
.theme--dark .logo {
  filter: invert(1);
}
</style>
