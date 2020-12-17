<template>
  <v-list-group>
    <template v-slot:activator>
      <v-list-item-avatar tile size="24">
        <v-icon>mdi-hammer-wrench</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="text-overline">Admin</v-list-item-title>
    </template>
    <v-list-item
      v-for="(link, i) of links"
      :key="i"
      :to="'/admin' + link.to"
      :exact="link.exact"
    >
      <v-list-item-avatar tile size="24">
        <v-icon v-text="link.icon" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-overline" v-text="link.text" />
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AdminNav',
  data() {
    return {
      links: [
        { to: '/', icon: 'mdi-view-dashboard', text: 'Dashboard', exact: true },
        { to: '/post', icon: 'mdi-post', text: 'Posts' },
        { to: '/tag', icon: 'mdi-tag', text: 'Tags' },
        { to: '/user', icon: 'mdi-account', text: 'Users' },
        { to: '/meta', icon: 'mdi-cog', text: 'Metas' }
      ]
    }
  }
})
</script>