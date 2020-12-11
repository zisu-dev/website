<template>
  <v-footer>
    <v-row justify="end" no-gutters>
      <v-col cols="12" sm="auto" class="text-right">
        <v-btn text disabled class="text-none">
          &copy; {{ new Date().getFullYear() }} ZhangZisu
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              href="https://github.com/zzs-web/website/blob/master/LICENSE"
              target="_blank"
              rel="noopener"
              v-on="on"
            >
              <v-icon>mdi-certificate</v-icon>
            </v-btn>
          </template>
          <span>MIT</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              href="https://creativecommons.org/licenses/by-sa/"
              target="_blank"
              rel="noopener"
              v-on="on"
            >
              <v-icon>mdi-creative-commons</v-icon>
            </v-btn>
          </template>
          <span>BY-SA</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppFooter'
})
</script>
