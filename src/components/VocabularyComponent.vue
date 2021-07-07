<template>
  <span>
    <vl-grid v-if="results.length > 0">
      <vl-column>
        <vl-grid mod-stacked>
          <vl-column
            v-for="result of results"
            :key="result._source.id"
            width="6"
          >
            <vl-info-tile
              :href="result._source.id"
              :title="result._source.prefLabel"
              :subtitle="'Domein: ' + result._source.context"
              target="_blank"
            >
              {{ result._source.definition }}
            </vl-info-tile>
          </vl-column>
        </vl-grid>
      </vl-column>
    </vl-grid>
    <vl-grid v-else>
      <vl-column width="8">
        <vl-title tag-name="h3">Geen resultaten beschikbaar.</vl-title>
      </vl-column>
    </vl-grid>
  </span>
</template>

<script>
const config = require("../../config");
const VOCABULARY_ENDPOINT = `${config.ELASTIC_ENDPOINT}/oslo-terminology/_search`;

export default {
  name: "VocabularyComponent",
  props: {
    searchTerms: {
      type: Array,
      default: null
    }
  },
  emits: ["childToParent", "queryFinished"],
  data() {
    return {
      results: [],
      related: new Set()
    };
  },
  methods: {
    async executeQuery() {
      this.related.clear();
      this.results = [];

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      for (let term of this.searchTerms) {
        const request = {
          size: 10000,
          query: {
            query_string: {
              query: `*${term}*`,
              fields: ["prefLabel"]
            }
          }
        };

        const requestOptions = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(request),
          redirect: "follow"
        };

        await fetch(VOCABULARY_ENDPOINT, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.results = this.results.concat(data.hits.hits);
          })
          .catch(error => console.error(error));
      }

      this.emitResultToParent();
    },
    emitResultToParent() {
      this.$emit("childToParent", { Vocabulary: this.results.length });
      this.$emit("queryFinished");
    }
  }
};
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-info-tile/src/scss/info-tile";

    .voc-information {
        border-left: 3px solid #333332;
        color: #333332;
    }
</style>
