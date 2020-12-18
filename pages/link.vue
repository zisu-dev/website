<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="6" lg="4" xl="3">
        <v-card>
          <v-card-title>Links</v-card-title>
          <v-divider />
          <v-list color="transparent">
            <v-list-item
              v-for="(x, i) of links"
              :key="i"
              :href="x.link"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar>
                <v-icon v-if="x.icon" size="48">{{ x.icon }}</v-icon>
                <v-img v-else-if="x.avatar" :src="x.avatar" />
                <v-icon v-else size="48">mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ x.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LinkPage',
  data() {
    return {
      links: [
        {
          avatar:
            'https://www.gravatar.com/avatar/6563066d6b1ac788fca3a8033c382c46',
          name: 'skylee',
          link: 'https://skylee.xyz/'
        },
        {
          avatar:
            'https://cdn.jsdelivr.net/gh/ZigZagK/jsDelivrCDN@latest/usr/uploads/2018/07/176242131.png',
          name: 'ZigZagK',
          link: 'https://zigzagk.top/'
        },
        {
          avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1254846416&s=640',
          name: 'Mo Yi',
          link: 'https://moyi.ml/'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Friend Links'
    }
  },
  created() {
    this.$store.commit('scope:update', 'friend links')
  }
})
</script>
