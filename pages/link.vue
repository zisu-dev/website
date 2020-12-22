<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="(x, i) of links" :key="i" xs="6" md="4" lg="3">
        <v-card :href="x.link" target="_blank" rel="noopener" hover>
          <v-img
            :src="screenshotUrl(x.link)"
            height="200px"
            class="align-end white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>
              <v-avatar v-if="x.avatar" class="mr-4">
                <v-img :src="x.avatar" />
              </v-avatar>
              {{ x.name }}
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiAccountCircle } from '@mdi/js'

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
      ],
      mdiAccountCircle
    }
  },
  head() {
    return {
      title: 'Friend Links'
    }
  },
  created() {
    this.$store.commit('scope:update', 'friend links')
  },
  methods: {
    screenshotUrl(link: string) {
      return `https://cdn.staticaly.com/screenshot/full=true/${
        link.match(/^https?:\/\/(.+)$/)![1]
      }`
    }
  }
})
</script>
