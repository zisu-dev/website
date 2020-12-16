<template>
  <v-footer>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn
              v-for="(badge, i) of badges"
              :key="i"
              :href="badge.href"
              :color="badge.color"
              small
              outlined
              target="_blank"
              rel="noopener"
            >
              <v-icon left v-text="badge.icon" />
              {{ badge.text }}
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row justify="center" no-gutters>
          <div class="text-overline">
            &copy; {{ new Date().getFullYear() }} ZhangZisu
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      build: BUILD,
      badges: [
        {
          href: 'https://github.com/zzs-web/website/commit/' + BUILD.git.hash,
          color: '#F05032',
          icon: 'mdi-git',
          text: BUILD.git.hash
        },
        {
          href: 'https://stats.zzisu.dev',
          color: 'green',
          icon: 'mdi-circle-outline',
          text: 'stats'
        },
        {
          href: 'https://github.com/zzs-web/website/blob/master/LICENSE',
          color: 'blue',
          icon: 'mdi-certificate',
          text: 'MIT'
        },
        {
          href: 'https://creativecommons.org/licenses/by-sa',
          color: '#EF9421',
          icon: 'mdi-creative-commons',
          text: 'BY-SA'
        }
      ]
    }
  }
})
</script>
