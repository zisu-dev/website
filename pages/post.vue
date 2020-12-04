<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <nuxt-child />
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="3">
        <sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Sidebar from '~/components/Sidebar.vue'

export default Vue.extend({
  name: 'PostPage',
  components: { Sidebar },
  created() {
    this.$store.commit('scope:update', 'blog')
  },
  head() {
    return {
      title: 'Posts'
    }
  }
})
</script>
