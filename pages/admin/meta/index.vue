<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <v-card>
          <v-card-title>Admin: Metas</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/meta/new">New Meta Item</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="metas"
            :options.sync="tableOptions"
            :server-items-length="metaCount"
            :loading="$fetchState.pending"
            dense
          >
            <template v-slot:[`item._id`]="{ item }">
              <nuxt-link class="object-id" :to="'/admin/meta/' + item._id">
                {{ item._id }}
              </nuxt-link>
            </template>
            <template v-slot:[`item.slug`]="{ item }">
              <span class="object-id">
                {{ item.slug }}
              </span>
            </template>
            <template v-slot:[`item.public`]="{ item }">
              <v-icon v-if="item.public" color="green">mdi-lock-open</v-icon>
              <v-icon v-else color="red">mdi-lock</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminMetaPage',
  async fetch() {
    const { page, itemsPerPage } = this.tableOptions
    const searchParams: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$http.$get('/meta/', {
      searchParams
    })

    this.metas = data.items
    this.metaCount = data.total
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: '', value: 'public', sortable: false }
      ],
      metas: [],
      tableOptions: {
        page: 1,
        itemsPerPage: 15
      },
      metaCount: 0
    }
  },
  watch: {
    options: {
      handler() {
        this.$fetch()
      },
      deep: true
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::meta')
  }
})
</script>
