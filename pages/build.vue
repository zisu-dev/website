<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>Build details</v-card-title>
          <v-divider />
          <v-list color="transparent">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="#F05032">mdi-git</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <code>{{ build.git.hash }}</code>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <code>{{ build.git.branch }}</code>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-clock-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <code>{{ new Date(build.time).toLocaleDateString() }}</code>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <code>{{ new Date(build.time).toLocaleTimeString() }}</code>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>CI/CD</v-card-title>
          <v-divider />
          <v-list color="transparent">
            <v-list-item
              v-for="(info, i) in infos"
              :key="i"
              :href="info.link"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar>
                <v-icon>mdi-web</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ info.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  info.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row dense>
                  <v-col v-for="(badge, j) in info.badges" :key="j">
                    <v-img :src="badge + '&t=' + t" />
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>Powered By</v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-icon color="#339933">mdi-nodejs</v-icon>
            <v-icon color="#8DD6F9">mdi-webpack</v-icon>
            <v-icon color="#4FC08D">mdi-vuejs</v-icon>
            <v-icon color="#1867C0">mdi-vuetify</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Build',
  data: () => ({
    t: 0,
    infos: [
      {
        name: 'Website',
        description: 'www.zzisu.dev',
        link: '/',
        badges: [
          'https://img.shields.io/github/deployments/zzisu/website/Production?label=Deployment&logo=vercel&style=flat-square',
          'https://img.shields.io/github/workflow/status/zzs-web/website/ci?logo=github&style=flat-square'
        ]
      },
      {
        name: 'Proxy',
        description: 'proxy.zhangzisu.cn',
        link: 'https://proxy.zhangzisu.cn',
        badges: [
          'https://img.shields.io/netlify/4d380063-9f4b-4a33-8092-df8026fa7570?logo=netlify&style=flat-square'
        ]
      }
    ],
    build: BUILD
  }),
  created() {
    this.$store.commit('scope:update', 'build info')
  },
  head() {
    return {
      title: 'Build Info'
    }
  }
})
</script>