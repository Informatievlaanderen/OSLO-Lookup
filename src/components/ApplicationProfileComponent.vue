<template>
    <vl-grid>

        <vl-column width="8">
            <vl-grid mod-stacked>
                <vl-column v-bind:key="result._source.URI" v-for="result of results">
                    <vl-info-tile
                        :href="result._source.fragmentIdentifier"
                        :title="result._source.prefLabel"
                        :subtitle="'Context: ' + result._source.context"
                        target="_blank">
                        {{result._source.definition}}<br>
                        <strong>Type: </strong>{{result._source.termType === 'APPLICATION_PROFILE_TERM' ? 'Klasse' : 'Eigenschap'}}<br>
                        <strong>Eigenschappen:</strong><br>
                        <span v-for="prop of result._source.properties">
                            <vl-link :href="prop.URI">{{prop.prefLabel}}</vl-link>,&nbsp;
                        </span>

                    </vl-info-tile>
                </vl-column>
            </vl-grid>
        </vl-column>
        <vl-column width="4">

        </vl-column>
    </vl-grid>
</template>

<script>
    const elasticsearch = require('elasticsearch');

    export default {
        name: "ApplicationProfileComponent",
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
                    index: 'application_profiles',
                    type: 'classes',
                    body: {
                        query: {
                            multi_match: {
                                query: this.query,
                                fields: ["prefLabel", "properties.prefLabel"],
                                fuzziness: "AUTO"
                            }
                        }
                    }
                });

                this.results = response.hits.hits;
                for (let result of this.results) {
                    this.related.add(result._source.context);
                }

            }
        }
    }

</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-info-tile/src/scss/info-tile";
    @import "~@govflanders/vl-ui-link-list/src/scss/link-list";
    @import "~@govflanders/vl-ui-util/src/scss/util";

</style>
