<template>
  <v-chip label :to="'/tag/' + tag.slug" outlined
    ><v-icon left>mdi-label</v-icon>{{ tag.name }}</v-chip
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TagChip extends Vue {
  @Prop({ required: true }) readonly tag!: any
}
</script>
