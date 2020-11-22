<template>
  <v-row>
    <v-col cols="12">
      <tags-card />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TagsCard from '@/components/TagsCard.vue'

@Component({ components: { TagsCard } })
export default class Sidebar extends Vue {}
</script>
