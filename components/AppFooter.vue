<template>
  <v-footer inset dark>
    <v-row justify="end" no-gutters>
      <v-col cols="12" sm="auto" class="text-right">
        <v-btn text disabled class="text-none" >
          &copy; {{ new Date().getFullYear() }} ZhangZisu
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://github.com/zhangzisu-cn/blog/blob/master/LICENSE" target="_blank" v-on="on">
              <v-icon>mdi-certificate</v-icon>
            </v-btn>
          </template>
          <span>Apache-2.0</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://creativecommons.org/licenses/by-sa/" target="_blank" v-on="on">
              <v-icon>mdi-creative-commons</v-icon>
            </v-btn>
          </template>
          <span>BY-SA</span>
        </v-tooltip>
        <v-btn icon href="https://zhangzisu.wordpress.com/feed/" target="_blank">
          <v-icon>mdi-rss</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppFooter extends Vue {}
</script>
