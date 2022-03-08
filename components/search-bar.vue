<template>
  <vl-grid>
    <vl-column
      class="vl-push--1-12 animate__animated animate__backInUp"
      width="9"
    >
      <vl-input-field
        ref="inputFieldWithButton"
        v-model="input"
        mod-block
        placeholder="Geef een of meer zoekwoorden in"
        @blur="showSearchButton = input.length > 0 ? true : false"
      />
    </vl-column>
    <vl-column width="2">
      <vl-button
        :mod-disabled="input.length > 0 ? false : true"
        class="animate__animated animate__backInRight"
        @click="search"
      >
        Zoeken
      </vl-button>
    </vl-column>
  </vl-grid>
</template>

<script lang="ts">
import Vue from 'vue'
import * as config from '../config.json'

export default Vue.extend({
  data() {
    return {
      showSearchButton: false,
      input: ''
    }
  },
  methods: {
    async search() {
      const keywords = this.input.split(' ')

      const queries: Promise<any>[] = []
      keywords.forEach((keyword) => {
        queries.push(this.query(keyword))
      })

      const responses = await Promise.all(queries)

      this.$nuxt.$emit('search-results', responses)
    },
    async query(keyword: string) {
      const requestBody = {
        size: 10000,
        query: {
          query_string: { query: `*${keyword}*`, fields: config.queryFields }
        }
      }
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }

      const response = await fetch(config.elasticEndpoint, request)
      return response.json()
    },
    enableSearchButton() {
      this.showSearchButton = true
    }
  }
})
</script>

<style lang="scss"></style>
