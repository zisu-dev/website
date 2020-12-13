<template>
  <v-app-bar app>
    <v-btn icon tile x-large @click="$emit('change', !value)">
      <v-avatar tile size="32">
        <v-img :src="require('~/assets/logo.svg')" />
      </v-avatar>
    </v-btn>
    <v-btn text x-large class="pa-0 text-left" disabled>
      <div class="ma-2 site-title">
        <div class="font-weight-bold">ZZisu.dev</div>
        <div class="text-overline" style="line-height: unset">
          {{ scope }}
        </div>
      </div>
    </v-btn>
    <v-spacer />
    <user-indicator />
    <v-divider vertical />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="changeTheme">
          <v-icon v-text="themeIcon[theme]" />
        </v-btn>
      </template>
      <span>Theme: {{ theme }}</span>
    </v-tooltip>
  </v-app-bar>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import UserIndicator from '~/components/UserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { UserIndicator },
  model: {
    prop: 'value',
    event: 'change'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      drawer: null,
      themeIcon: {
        auto: 'mdi-brightness-auto',
        light: 'mdi-brightness-5',
        dark: 'mdi-brightness-4'
      }
    }
  },
  computed: {
    ...mapState(['scope', 'theme'])
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

<style>
.theme--dark .site-title {
  color: #fff;
}
.theme--light .site-title {
  color: #000;
}
</style>
