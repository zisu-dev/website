<template>
  <v-footer inset dark>
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
              href="https://github.com/zhangzisu-cn/zblog/blob/master/LICENSE"
              target="_blank"
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
              v-on="on"
            >
              <v-icon>mdi-creative-commons</v-icon>
            </v-btn>
          </template>
          <span>BY-SA</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="changeTheme">
              <v-icon v-text="themeIcon[theme]" />
            </v-btn>
          </template>
          <span>Theme: {{ theme }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      themeIcon: {
        auto: 'mdi-brightness-auto',
        light: 'mdi-brightness-5',
        dark: 'mdi-brightness-4'
      }
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    changeTheme() {
      if (this.theme === 'auto') {
        this.setTheme('light')
      } else if (this.theme === 'light') {
        this.setTheme('dark')
      } else {
        this.setTheme('auto')
      }
    },
    setTheme(theme: string) {
      this.$cookies.set('theme', theme)
      this.$store.commit('theme:update', theme)
    }
  }
})
</script>
