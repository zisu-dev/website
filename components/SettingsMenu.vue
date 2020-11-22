<template>
  <v-menu offset-x :close-on-content-click="false" open-on-hover>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-list subheader>
      <v-subheader inset>Theme</v-subheader>
      <v-list-item @click="changeColor">
        <v-list-item-icon><v-icon>mdi-brightness-6</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><code>Color</code></v-list-item-title>
          <v-list-item-subtitle>{{
            $vuetify.theme.dark ? 'Dark' : 'Light'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeAcrylic">
        <v-list-item-icon><v-icon>mdi-blur</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><code>Acrylic</code></v-list-item-title>
          <v-list-item-subtitle>{{
            acrylic ? 'Enabled' : 'Disabled'
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-subheader inset>About</v-subheader>
      <v-list-item
        :href="'https://github.com/zhangzisu-cn/blog/commit/' + gitHash"
        target="_blank"
      >
        <v-list-item-icon><v-icon>mdi-git</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Git Hash</v-list-item-title>
          <v-list-item-subtitle
            ><code>{{ gitHash.substr(0, 6) }}</code></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-clock</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Build Date</v-list-item-title>
          <v-list-item-subtitle>{{ buildDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-server</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Build Machine</v-list-item-title>
          <v-list-item-subtitle>{{ buildMachine }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SettingsMenu extends Vue {
  readonly gitHash = 'GIT_HASH'
  readonly gitBranch = 'GIT_BRANCH'
  readonly buildDate = 'BUILD_DATE'
  readonly buildMachine = 'BUILD_MACHINE'

  acrylic = true

  mounted() {
    window.addEventListener('storage', () => this.reload())
    this.reload()
  }

  changeColor() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
  }

  changeAcrylic() {
    this.acrylic = !this.acrylic
    document.body.classList.toggle('acrylic')
    localStorage.setItem('acrylic', this.acrylic ? '1' : '0')
  }

  reload() {
    this.$vuetify.theme.dark = localStorage.getItem('theme') === 'dark'
    this.acrylic = (localStorage.getItem('acrylic') || '1') !== '0'
    if (this.acrylic !== document.body.classList.contains('acrylic')) {
      document.body.classList.toggle('acrylic')
    }
  }
}
</script>
