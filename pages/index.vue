<template>
  <v-container class="home">
    <v-row justify="center">
      <v-col cols="12">
        <v-card
          color="transparent"
          style="backdrop-filter: none"
          flat
          class="text-center"
        >
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <div class="text-h3">
                <code>ZZisu.dev</code>
              </div>
            </v-col>
          </v-row>
          <v-card-text class="text-h6">
            <code>Code is philosophy</code>
          </v-card-text>
          <v-divider />
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-card-title>Next</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" v-bind="link.link">
              <v-list-item-avatar tile size="24">
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ link.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-card-title>Contact</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item
              v-for="(contact, i) of contacts"
              :key="i"
              :href="contact.href"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar tile size="24">
                <v-icon :color="contact.color" v-text="contact.icon" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ contact.text }}</v-list-item-title>
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
import {
  mdiEmail,
  mdiFormatListText,
  mdiGithub,
  mdiTelegram,
  mdiTwitter,
  mdiWeb
} from '@mdi/js'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      links: [
        {
          link: { to: '/post' },
          icon: mdiFormatListText,
          title: 'Blog',
          subtitle: 'ZZisu.dev blog'
        },
        {
          link: {
            href: 'https://proxy.zhangzisu.cn/',
            target: '_blank',
            rel: 'noopener'
          },
          icon: mdiWeb,
          title: 'Proxy',
          subtitle: 'ZhangZisu.CN Proxy Services'
        }
      ],
      contacts: [
        {
          href: 'https://twitter.com/zzisu03',
          color: '#1DA1F2',
          icon: mdiTwitter,
          text: 'zzisu03'
        },
        {
          href: 'https://t.me/zhangzisu',
          color: '#2CA5E0',
          icon: mdiTelegram,
          text: 'zhangzisu'
        },
        {
          href: 'mailto:i@zzs1.cn',
          color: 'blue',
          icon: mdiEmail,
          text: 'i@zzs1.cn'
        },
        {
          href: 'https://github.com/zzisu',
          color: '#181717',
          icon: mdiGithub,
          text: 'zzisu'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Index'
    }
  },
  created() {
    this.$store.commit('scope:update', 'index')
  }
})
</script>
