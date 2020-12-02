<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" md="8" lg="6" xl="4">
        <v-card color="#FFFFFFc0">
          <v-list color="transparent">
            <v-list-item
              href="https://app.netlify.com/sites/zhangzisu/deploys"
              target="_blank"
            >
              <v-list-item-content>
                <v-list-item-title>Index</v-list-item-title>
                <v-list-item-subtitle>zhangzisu.cn</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row dense>
                  <v-col>
                    <v-img
                      :src="
                        'https://img.shields.io/netlify/49a9880e-8ee7-4506-8575-0dcd7b335fb6?logo=netlify&style=flat-square&t=' +
                        t
                      "
                    />
                  </v-col>
                  <v-col>
                    <v-img
                      :src="
                        'https://img.shields.io/github/workflow/status/zhangzisu-cn/www/Deploy to Coding?logo=github&style=flat-square&t=' +
                        t
                      "
                    />
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="https://app.netlify.com/sites/zzsblog/deploys"
              target="_blank"
            >
              <v-list-item-content>
                <v-list-item-title>Blog</v-list-item-title>
                <v-list-item-subtitle>blog.zhangzisu.cn</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row dense>
                  <v-col>
                    <v-img
                      :src="
                        'https://img.shields.io/netlify/fb7bef3d-d3d8-482e-93db-67e542c8d8b5?logo=netlify&style=flat-square&t=' +
                        t
                      "
                    />
                  </v-col>
                  <v-col>
                    <v-img
                      :src="
                        'https://img.shields.io/github/workflow/status/zhangzisu-cn/blog/Coding?logo=github&style=flat-square&t=' +
                        t
                      "
                    />
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="https://app.netlify.com/sites/zcn-proxy/deploys"
              target="_blank"
            >
              <v-list-item-content>
                <v-list-item-title>Proxy</v-list-item-title>
                <v-list-item-subtitle>proxy.zhangzisu.cn</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row dense>
                  <v-col>
                    <v-img
                      :src="
                        'https://img.shields.io/netlify/4d380063-9f4b-4a33-8092-df8026fa7570?logo=netlify&style=flat-square&t=' +
                        t
                      "
                    />
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list>
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
    t: 0
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