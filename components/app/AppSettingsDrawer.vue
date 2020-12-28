<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="settingsDrawer"
    right
    disable-route-watcher
    fixed
    hide-overlay
    temporary
  >
    <v-toolbar flat color="transparent">
      <div class="text-button">Settings</div>
      <v-spacer />
      <v-btn icon @click="settingsDrawer = !settingsDrawer">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <client-only>
      <theme />
      <v-divider />
      <storage />
    </client-only>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiClose } from '@mdi/js'
import Theme from '~/components/app/settings/Theme.vue'
import Storage from '~/components/app/settings/Storage.vue'

export default Vue.extend({
  name: 'AppSettingsDrawer',
  components: { Theme, Storage },
  data() {
    return {
      mdiClose
    }
  },
  computed: {
    settingsDrawer: {
      get() {
        return this.$store.state.settingsDrawer
      },
      set(val) {
        this.$store.commit('settingsDrawer:update', val)
      }
    }
  }
})
</script>