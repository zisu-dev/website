<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <v-card>
          <v-card-title>Admin Home</v-card-title>
          <v-card-text>
            <prism :code="JSON.stringify(stat, null, '\t')" language="json" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Prism from '~/components/functional/VCode'

export default Vue.extend({
  name: 'AdminHomePage',
  layout: 'admin',
  components: { Prism },
  async fetch() {
    this.stat = await this.$http.$get('/admin/stat')
  },
  data() {
    return {
      stat: {}
    }
  }
})
</script>
