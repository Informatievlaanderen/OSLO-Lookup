<template>
    <vl-grid>
        <vl-column width="8">
            <vl-grid mod-stacked>
                <vl-column v-bind:key="result._source.URI" width="5" v-for="result of results">
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
        <vl-column width="4" class="voc-information">
            <vl-title tag-name="h3">Gerelateerde vocabularia</vl-title>
            <vl-grid mod-stacked>
                <vl-column v-bind:key="voc" v-for="voc of related">
                    <vl-info-tile
                        :href="voc"
                        :title="voc"
                        subtitle=""
                        target="_blank"
                    />
                </vl-column>
            </vl-grid>
        </vl-column>
    </vl-grid>
</template>

<script>
    const elasticsearch = require('elasticsearch');

    export default {
        name: "VocabularyComponent",
        props: {
            query: String
        },
        data() {
            return {
                results: [],
                related: new Set()
            }
        },
        methods: {
            async executeQuery() {
                const client = new elasticsearch.Client({
                    host: 'localhost:9200'
                });

                const response = await client.search({
                    index: 'terminology',
                    type: 'vocabularies',
                    body: {
                        query: {
                            multi_match: {
                                query: this.query,
                                fields: ["prefLabel"],
                                fuzziness: "AUTO"
                            }
                        }
                    }
                });

                this.results = response.hits.hits;
                for(let result of this.results){
                    this.related.add(result._source.context);
                }

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
