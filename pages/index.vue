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
          <v-list color="transparent">
            <v-list-item href="https://proxy.zhangzisu.cn/" target="_blank">
              <v-list-item-content>
                <v-list-item-title>Proxy</v-list-item-title>
                <v-list-item-subtitle>
                  ZhangZisu.CN Proxy Services
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="https://status.zhangzisu.cn/" target="_blank">
              <v-list-item-content>
                <v-list-item-title>Status</v-list-item-title>
                <v-list-item-subtitle>
                  ZhangZisu.CN Status
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
          <v-list color="transparent">
            <v-list-item href="https://twitter.com/zzisu03" target="_blank">
              <v-list-item-avatar>
                <v-icon color="#1DA1F2">mdi-twitter</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>zzisu03</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="https://t.me/zhangzisu" target="_blank">
              <v-list-item-avatar>
                <v-icon color="#2CA5E0">mdi-telegram</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>zhangzisu</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="mailto:i@zzs1.cn" target="_blank">
              <v-list-item-avatar>
                <v-icon>mdi-email</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>i@zzs1.cn</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="https://github.com/zzisu" target="_blank">
              <v-list-item-avatar>
                <v-icon color="#181717">mdi-github</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>zzisu</v-list-item-title>
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
  created() {
    this.$store.commit('scope:update', 'index')
  },
  head() {
    return {
      title: 'Index'
    }
  }
})
</script>