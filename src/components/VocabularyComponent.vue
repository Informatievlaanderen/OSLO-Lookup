<template>
    <span>
    <vl-grid v-if="results.length > 0">
        <vl-column>
            <vl-grid mod-stacked>
                <vl-column v-bind:key="result._source.URI" width="6" v-for="result of results">
                    <vl-info-tile
                            :href="result._source.URI"
                            :title="result._source.prefLabel"
                            :subtitle="'Context: ' + result._source.context"
                            target="_blank">
                        {{result._source.definition}}
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
    const elasticsearch = require('elasticsearch');
    const config = require('../../config');

    export default {
        name: "VocabularyComponent",
        props: {
            searchTerms: Array
        },
        data() {
            return {
                results: [],
                related: new Set()
            }
        },
        methods: {
            async executeQuery() {
                this.related.clear();
                this.results = [];
                const client = new elasticsearch.Client({
                    host: config.ELASTIC_HOST
                });

                for (let term of this.searchTerms) {

                    //TODO: better query
                    const response = await client.search({
                        index: 'terminology',
                        type: 'vocabularies',
                        body: {
                            query: {
                                query_string: {
                                    query: '*' + term + '*',
                                    fields: ['prefLabel']
                                }
                            }
                        }
                    });
                    this.results = this.results.concat(response.hits.hits);
                }

                /*this.results = responses.hits.hits;
                for (let result of this.results) {
                    this.related.add(result._source.context);
                }*/

                this.emitResultToParent()

            },
            emitResultToParent() {
                this.$emit('childToParent', {'Vocabulary': this.results.length});
            }
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-info-tile/src/scss/info-tile";

    .voc-information {
        border-left: 3px solid #333332;
        color: #333332;
    }
</style>
