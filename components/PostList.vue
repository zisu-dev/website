<template>
  <v-row>
    <v-col v-for="(post, i) in posts" :key="i" cols="12">
      <post-list-item :post="post" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import PostListItem from '@/components/PostListItem.vue'

@Component({ components: { PostListItem } })
export default class PostList extends Vue {
  @Prop({ required: true }) readonly posts!: any[]
}
</script>
