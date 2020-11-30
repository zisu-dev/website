<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <v-card>
          <v-card-title>Admin: Posts</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/post/new">New Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminPostPage',
  layout: 'admin'
})
</script>
