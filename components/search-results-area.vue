<template>
  <vl-grid mod-stacked>
    <vl-column>
      <vl-title mod-border tag-name="h3">
        Resultaten ({{ results.length }})
      </vl-title>
    </vl-column>
    <vl-column v-for="(result, index) of results" :key="index" width="6">
      <search-result :item="result" />
    </vl-column>
  </vl-grid>
</template>

<script lang="ts">
import Vue from 'vue'
import { OsloItem } from 'helpers/OsloItem'

export default Vue.extend({
  props: {
    results: {
      type: Array,
      default: () => [] as OsloItem[]
    }
  },
  data() {
    return {
      osloItems: [] as OsloItem[]
    }
  }
})
</script>
