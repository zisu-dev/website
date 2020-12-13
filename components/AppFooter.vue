<template>
  <v-footer>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn
              outlined
              small
              :href="
                'https://github.com/zzs-web/website/commit/' + build.git.hash
              "
              target="_blank"
              rel="noopener"
              color="#F05032"
            >
              <v-icon left>mdi-git</v-icon>
              {{ build.git.hash }}
            </v-btn>
            <v-btn
              outlined
              small
              href="https://stats.zzisu.dev"
              target="_blank"
              rel="noopener"
              color="green"
            >
              <v-icon left>mdi-circle-outline</v-icon>
              stats
            </v-btn>
            <v-btn
              outlined
              small
              href="https://github.com/zzs-web/website/blob/master/LICENSE"
              target="_blank"
              rel="noopener"
              color="blue"
            >
              <v-icon left>mdi-certificate</v-icon>
              MIT
            </v-btn>
            <v-btn
              outlined
              small
              href="https://creativecommons.org/licenses/by-sa/"
              target="_blank"
              rel="noopener"
              color="orange"
            >
              <v-icon left>mdi-creative-commons</v-icon>
              BY-SA
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
      build: BUILD
    }
  }
})
</script>
