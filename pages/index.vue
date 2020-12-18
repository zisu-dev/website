<template>
  <v-container class="home">
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card color="#1976D2c0" dark>
          <v-card-title>
            <div class="fill-width">
              <div
                class="text-uppercase font-italic font-weight-light subtitle-1"
              >
                Welcome TO
              </div>
              <div class="text-right display-1">
                ZZisu.dev<br />
                <span class="text-overline font-weight-light">
                  formerly zhangzisu.cn
                </span>
              </div>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <code>Code is philosophy</code>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-card-title>Next</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item to="/post">
              <v-list-item-avatar>
                <v-icon>mdi-format-list-text</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Blog</v-list-item-title>
                <v-list-item-subtitle>ZZisu.dev blog</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              href="https://proxy.zhangzisu.cn/"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar tile>
                <v-icon>mdi-web</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Proxy</v-list-item-title>
                <v-list-item-subtitle>
                  ZhangZisu.CN Proxy Services
                </v-list-item-subtitle>
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
              <v-list-item-avatar>
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
export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      contacts: [
        {
          href: 'https://twitter.com/zzisu03',
          color: '#1DA1F2',
          icon: 'mdi-twitter',
          text: 'zzisu03'
        },
        {
          href: 'https://t.me/zhangzisu',
          color: '#2CA5E0',
          icon: 'mdi-telegram',
          text: 'zhangzisu'
        },
        {
          href: 'mailto:i@zzs1.cn',
          color: 'blue',
          icon: 'mdi-email',
          text: 'i@zzs1.cn'
        },
        {
          href: 'https://github.com/zzisu',
          color: '#181717',
          icon: 'mdi-github',
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
