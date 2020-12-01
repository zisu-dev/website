<template>
  <v-app class="acrylic">
    <v-app-bar app dark>
      <v-btn icon tile x-large @click="drawer = !drawer">
        <v-avatar tile size="32">
          <v-img src="/logo.svg" class="logo" />
        </v-avatar>
      </v-btn>
      <v-btn text x-large class="pa-0 text-center" to="/">
        <div class="ma-2">
          <div class="font-weight-bold">ZhangZisu.CN</div>
          <div class="text-overline" style="line-height: unset">Admin</div>
        </div>
      </v-btn>
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
import UserIndicator from '~/components/UserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { Background, AppFooter, UserIndicator },
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

<style>
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
