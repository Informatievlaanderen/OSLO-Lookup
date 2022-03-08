<template>
  <vl-info-tile
    :href="item.id"
    target="_blank"
    :title="item.name"
    :subtitle="'Vocabularium: ' + item.context"
  >
    <p>{{ item.definition }}</p>
  </vl-info-tile>
</template>

<script lang="ts">
import Vue from 'vue'
import { OsloItem } from '~/helpers/OsloItem'

export default Vue.extend({
  props: {
    item: {
      type: OsloItem,
      default: null
    }
  }
})
</script>
