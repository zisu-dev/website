<template>
  <v-app :class="{ acrylic: $store.state.acrylic }">
    <app-bar v-model="drawer" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-if="isAdmin">
          <template v-slot:activator>
            <v-list-item-avatar tile size="24">
              <v-icon>mdi-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Admin</v-list-item-title>
          </template>
          <v-list-item to="/admin" exact>
            <v-list-item-avatar tile size="24">
              <v-icon>mdi-view-dashboard</v-icon>
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
          <v-list-item to="/admin/meta">
            <v-list-item-avatar tile size="24">
              <v-icon>mdi-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Metas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/post">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
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
import { mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapGetters(['isAdmin'])
  }
})
</script>
