<template>
    <div>
        <vl-region>
            <vl-layout>
                <vl-grid class="vl-grid--align-center" mod-stacked>
                    <vl-column>
                        <vl-title class="title" tag-name="h1">
                            OSLO Search Engine
                        </vl-title>
                    </vl-column>
                    <vl-column width="8">
                        <v-select :options="paginated"
                                  @search="query => search = query"
                                  :filterable="false"
                                  required
                                  multiple
                                  taggable
                                  placeholder="Geef één of meer zoektermen op"
                                  v-model="selected">
                            <!--<li slot="list-footer" class="pagination">
                                <button @click="offset -= 10" :disabled="!hasPrevPage">Prev</button>
                                <button @click="offset += 10" :disabled="!hasNextPage">Next</button>
                            </li>-->
                        </v-select>
                    </vl-column>
                    <vl-column width="6" class="vl-push--4-12">
                        <vl-button @click="executeQuery"
                                   @mouseover="hovered = true"
                                   @mouseleave="hovered = false"
                                   :class="{'hover': hovered}" id="search-button">
                            Zoeken
                        </vl-button>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
        <vl-region>
            <vl-layout>
                <vl-grid v-bind:class="{'showComponent': queryExecuted, 'hideComponent' : !queryExecuted}" mod-stacked>
                    <vl-column>
                        <vl-tabs>
                            <vl-tab :label="'Terminologie (' + numberOfVocabularies + ')'">
                                <VocabularyComponent :searchTerms="selected" v-on:childToParent="onResult" ref="Vocabulary"/>
                            </vl-tab>
                            <vl-tab :label="'Klassen & Eigenschappen (' + numberOfApplicationProfiles + ')'">
                                <ApplicationProfileComponent :searchTerms="selected" v-on:childToParent="onResult" ref="ApplicationProfile"/>
                            </vl-tab>
                        </vl-tabs>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
    </div>

</template>

<script>
    import VocabularyComponent from "./VocabularyComponent";
    import ApplicationProfileComponent from "./ApplicationProfileComponent";

    const elasticsearch = require('elasticsearch');
    const config = require('../../config');

    export default {
        name: "SearchComponent",
        components: {ApplicationProfileComponent, VocabularyComponent},
        data: () => ({
            focus: false,
            queryExecuted: false,
            numberOfVocabularies: 0,
            numberOfApplicationProfiles: 0,
            data: [],
            selected: [],
            hovered: false,
            search: '',
            offset: 0,
            limit: 20,

        }),
        methods: {
            executeQuery() {
                if (this.selected.length) {
                    this.queryExecuted = true;
                    this.$refs.Vocabulary.executeQuery();
                    this.$refs.ApplicationProfile.executeQuery();
                }

            },
            onResult(resultObject) {
                const key = Object.keys(resultObject)[0];
                switch (key) {
                    case 'Vocabulary':
                        this.numberOfVocabularies = resultObject[key];
                        break;
                    case 'ApplicationProfile':
                        this.numberOfApplicationProfiles = resultObject[key];
                        break;
                }
            }
        },
        async beforeCreate() {
            this.data = [];
            const client = new elasticsearch.Client({
                host: config.ELASTIC_HOST
            });

            const vocabularies = await client.search({
                index: 'terminology',
                type: 'vocabularies',
                body: {
                    _source: ['prefLabel'],
                    size: 10000,
                    query: {
                        match_all: {}
                    }
                }
            });

            //TODO: not showing 'Persoon'
            const applicationProfiles = await client.search({
                index: 'application_profiles',
                type: 'classes',
                body: {
                    _source: ['prefLabel', 'properties.prefLabel'],
                    size: 10000,
                    query: {
                        match_all: {}
                    }
                }
            });
            const vocLabels = vocabularies.hits.hits.map(object => object._source.prefLabel);
            const apLabels = applicationProfiles.hits.hits.map(object => object._source.prefLabel);
            let propertyArray = applicationProfiles.hits.hits.map(object => object._source.properties).flat();
            propertyArray = propertyArray.filter(term => term !== undefined); // Apparently, there's an undefined in the array which causes errors. TODO: check this for production
            const propertyLabels = propertyArray.map(object => object.prefLabel);
            this.data = [...new Set([...vocLabels, ...apLabels, ...propertyLabels])];   // Add vocabularies


            // Apparently, there's an undefined in the array which causes errors. TODO: check this for production
            this.data = this.data.filter(term => term !== undefined);

        },
        computed: {
            filtered() {
                if (this.data.length) {
                    return this.data.filter(term => term.toLowerCase().includes(this.search.toLowerCase()));
                } else {
                    return [];
                }
            },
            paginated() {
                return this.filtered.slice(this.offset, this.limit + this.offset);

            }
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-input-field/src/scss/input-field";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-button/src/scss/button";
    @import "~@govflanders/vl-ui-search/src/scss/search";
    @import "~@govflanders/vl-ui-tabs/src/scss/tabs";
    @import "~vue-select/src/scss/vue-select.scss";

    .title {
        text-align: center !important;
        font-size: 350%;
    }

    .v-select .vs__dropdown-toggle,
    .v-select .vs__dropdown-menu {
        font-size: 120%;
        font-family: "Flanders Art Serif";
    }

    .v-select .vs__search::placeholder {
        color: lightgray;
        font-family: "Flanders Art Serif";
    }

    .v-select .vs__deselect:hover {
        fill: red;
    }

    #search-input {
        height: 30px;
        border-radius: 25px;
        border: 2px solid #0055cc;
        font-size: 120%;
        width: 100%;
    }

    #search-button {
        height: 40px;
        border: 2px solid #0055cc;
        font-size: 120%;
        border-radius: 5px;
        outline: none;
    }

    .hover {
        border: 3px solid #ffe615 !important;
        transition: .5s !important;
        transform: scale(1.3, 1.3);
        -webkit-transform: scale(1.3, 1.3);
        -moz-transform: scale(1.3, 1.3);
    }

    .showComponent {
        display: flex !important;
        -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
        -o-animation: fadein 1s; /* Opera < 12.1 */
        animation: fadein 1s;
    }

    .hideComponent {
        display: none !important;
    }

    .input-focus {
        border: 2px solid #ffe615 !important;
        width: 86% !important;
        transition-duration: 1s;
    }


</style>
