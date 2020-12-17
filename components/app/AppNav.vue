<template>
  <v-list nav dense>
    <v-list-item v-for="(link, i) of links" :key="i" :to="link.to">
      <v-list-item-avatar tile size="24">
        <v-icon v-text="link.icon" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-overline" v-text="link.text" />
      </v-list-item-content>
    </v-list-item>
    <template v-if="isAdmin">
      <v-divider />
      <admin-nav />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import AdminNav from '~/components/admin/AdminNav.vue'

export default Vue.extend({
  name: 'AppNav',
  components: { AdminNav },
  data() {
    return {
      links: [
        { to: '/', icon: 'mdi-home', text: 'Home' },
        { to: '/post', icon: 'mdi-format-list-text', text: 'Blog' },
        { to: '/about', icon: 'mdi-information-outline', text: 'About' },
        { to: '/build', icon: 'mdi-rocket', text: 'Build Info' },
        { to: '/link', icon: 'mdi-link', text: 'Friend Links' }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  }
})
</script>