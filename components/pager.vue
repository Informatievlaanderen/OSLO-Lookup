<template>
  <vl-pager
    mod-align="right"
    mod-align-l="right"
    mod-align-m="right"
    mod-align-s="center"
    mod-align-xs="left"
  >
    <vl-pager-bounds
      :from="(from + 1).toString()"
      :to="to.toString()"
      :total="total.toString()"
      page-label="Page"
      prefix="tot en met"
    />
    <vl-pager-item type="previous" @click="previous" />
    <vl-pager-item type="next" label="volgende" @click="next" />
  </vl-pager>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    from: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    next() {
      this.$nuxt.$emit('next-results')
    },
    previous() {
      this.$nuxt.$emit('previous-results')
    }
  }
})
</script>
