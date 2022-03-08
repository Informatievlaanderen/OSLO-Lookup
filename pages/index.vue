<template>
  <vl-grid mod-stacked>
    <vl-column>
      <content-header />
    </vl-column>
    <vl-column>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column>
              <vl-title
                tag-name="h1"
                class="vl-u-align-center animate__animated animate__backInLeft"
              >
                Vraag het aan OSLO.
              </vl-title>
            </vl-column>
            <vl-column>
              <search-bar />
            </vl-column>
            <vl-column v-if="showResultsArea">
              <search-results-area :results="osloResults" />
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-column>
  </vl-grid>
</template>

<script lang="ts">
import Vue from 'vue'
import 'animate.css'
import * as config from '../config.json'
import { OsloItem } from '~/helpers/OsloItem'

export default Vue.extend({
  data() {
    return {
      showResultsArea: false,
      osloResults: [] as OsloItem[]
    }
  },
  created() {
    this.$nuxt.$on('search-results', (responses: any[]) => {
      this.showResultsArea = true
      this.osloResults = this.mapResults(responses)
    })
  },
  methods: {
    mapResults(responses: any[]): OsloItem[] {
      return responses.map((response) => this.mapResult(response)).flat(1)
    },
    mapResult(response: any): OsloItem[] {
      return response.hits && response.hits.hits.length
        ? response.hits.hits.map((hit: any) => this.mapToOsloItem(hit))
        : []
    },
    mapToOsloItem(object: any): OsloItem {
      return new OsloItem(
        object._source[config.idField],
        object._source[config.nameField],
        object._source[config.contextField],
        object._source[config.definitionField]
      )
    }
  }
})
</script>
