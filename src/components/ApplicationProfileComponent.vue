<template>
    <div>
        <vl-grid v-if="results.length > 0">
            <vl-column width="8">
                <vl-grid mod-stacked>
                    <vl-column v-bind:key="result._source.URI" v-for="result of results">
                        <vl-info-tile
                                :href="result._source.fragmentIdentifier"
                                :title="result._source.prefLabel"
                                :subtitle="'Context: ' + result._source.context"
                                target="_blank">
                            {{result._source.definition}}<br>
                            <strong>Type: </strong>{{result._source.termType === 'APPLICATION_PROFILE_TERM' ? 'Klasse' :
                            'Eigenschap'}}<br>
                            <strong>Eigenschappen:</strong><br>
                            <span v-for="prop of result._source.properties">
                            <vl-link :href="prop.URI">{{prop.prefLabel}}</vl-link>,&nbsp;
                        </span>

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
    </div>

</template>

<script>

    export default {
        name: "ApplicationProfileComponent",
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
                this.results = [];
                /*const client = new elasticsearch.Client({
                    host: 'localhost:9200'
                });

                for (let term of this.searchTerms) {
                    const response = await client.search({
                        index: 'application_profiles',
                        type: 'classes',
                        body: {
                            query: {
                                query_string: {
                                    query: '*' + term + '*',
                                    fields: ["prefLabel", "properties.prefLabel"]
                                }
                            }
                        }
                    });
                    this.results = this.results.concat(response.hits.hits);
                }*/

                /*this.results = response.hits.hits;
                for (let result of this.results) {
                    this.related.add(result._source.context);
                }*/

                this.emitResultToParent();

            },
            emitResultToParent() {
                this.$emit('childToParent', {'ApplicationProfile': this.results.length});
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
