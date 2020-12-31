<template>
  <div class="pb-2 pl-4 pr-4">
    <div class="text-button">Storage</div>
    <template v-if="$fetchState.pending">
      <v-skeleton-loader type="text@2" />
    </template>
    <template v-else-if="$fetchState.error">
      {{ $fetchState.error }}
    </template>
    <template v-else>
      <v-progress-linear :value="used" />
      <div class="text-overline usage-info py-2">
        Used: {{ usage }}/{{ quota }}
        <br />
        Cached Requests: {{ cachedReqs }}
      </div>
    </template>
    <v-btn block color="primary" depressed :loading="cleaning" @click="clear">
      Clear storage
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDataSize, wait } from '~/utils/misc'

export default Vue.extend({
  name: 'Storage',
  data() {
    return {
      quota: '',
      usage: '',
      used: 0,
      cleaning: false,
      cachedReqs: 0
    }
  },
  async fetch() {
    const res = await navigator.storage.estimate()
    this.quota = formatDataSize(res.quota || 0)
    this.usage = formatDataSize(res.usage || 0)
    this.used = res.usage && res.quota ? (res.usage / res.quota) * 100 : 0
    const cacheKeys = await caches.keys()
    this.cachedReqs = 0
    for (const key of cacheKeys) {
      const cache = await caches.open(key)
      const reqs = await cache.keys()
      this.cachedReqs += reqs.length
    }
  },
  fetchOnServer: false,
  methods: {
    async clear() {
      this.cleaning = true
      try {
        const cacheKeys = await caches.keys()
        for (const key of cacheKeys) {
          await caches.delete(key)
        }
        await wait(500)
        this.$toast.success({ title: 'Success', message: 'All cache cleared' })
      } catch (e) {
        this.$toast.$error(e)
      }
      this.cleaning = false
      this.$fetch()
    }
  }
})
</script>

<style scoped>
.usage-info {
  line-height: 1.5;
}
</style>