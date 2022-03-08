<template>
  <vl-grid mod-stacked>
    <vl-column>
      <vl-title mod-border tag-name="h3">
        Resultaten ({{ results.length }})
      </vl-title>
    </vl-column>
    <vl-column v-if="results.length >= shownResults">
      <pager :from="from" :to="shownResults" :total="results.length" />
    </vl-column>
    <vl-column v-for="(result, index) of loadedResults" :key="index" width="6">
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
      from: 0,
      shownResults: 20,
      offset: 10
    }
  },
  computed: {
    loadedResults(): OsloItem[] {
      const copy = [...this.results] as OsloItem[]
      return copy.slice(this.from, this.shownResults)
    }
  },
  created() {
    this.$nuxt.$on('next-results', () => {
      if (this.shownResults === this.results.length) {
        return
      }
      this.from = this.shownResults

      if (this.shownResults + this.offset > this.results.length) {
        this.shownResults = this.results.length
      } else {
        this.shownResults += this.offset
      }
    })

    this.$nuxt.$on('previous-results', () => {
      if (this.from === 0) {
        return
      }
      this.shownResults = this.from

      if (this.from - this.offset < 0) {
        this.from = 0
      } else {
        this.from -= this.offset
      }
    })
  }
})
</script>
