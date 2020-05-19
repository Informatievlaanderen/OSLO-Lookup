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
                        <vl-input-field
                                @focus="focus = true"
                                @keydown.enter="executeQuery"
                                v-model="query"
                                v-bind:class="{'input-focus': focus}"
                                id="search-input"
                                name="search-input"/>
                        <vl-button @click="executeQuery" v-if="focus" id="search-button">
                            <vl-icon icon="search"/>
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
                            <vl-tab :label="'Terminologie (' + vocabularyResult + ')'">
                                <VocabularyComponent :query="query" v-on:childToParent="onResult" ref="Vocabulary"/>
                            </vl-tab>
                            <vl-tab label="Klassen & Eigenschappen">
                                <ApplicationProfileComponent :query="query" ref="ApplicationProfile"/>
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

    export default {
        name: "SearchComponent",
        components: {ApplicationProfileComponent, VocabularyComponent},
        data() {
            return {
                query: '',
                focus: false,
                queryExecuted: false,
                vocabularyResult: 0
            }
        },
        methods: {
            executeQuery() {
                if (this.query != '') {
                    this.queryExecuted = true;
                    this.$refs.Vocabulary.executeQuery();
                    //this.$refs.ApplicationProfile.executeQuery();
                }

            },
            onResult(resultObject) {
                const key = Object.keys(resultObject)[0];
                switch (key) {
                    case 'Vocabulary':
                        this.vocabularyResult = resultObject[key];
                        break;
                    case 'Application_Profile':
                        console.log('Received AP');
                        break;
                }
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

    .title {
        text-align: center !important;
        font-size: 350%;
    }

    #search-input {
        height: 50px;
        border-radius: 25px;
        border: 2px solid #0055cc;
        font-size: 120%;
        width: 100%;
    }

    #search-button {
        height: 50px;
        border-radius: 25px;
        position: absolute;
        right: 1px;
        border: 2px solid #0055cc;
        font-size: 120%;

        -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
        animation: fadein 2s;
    }

    .showComponent {
        display: flex!important;
        -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
        -o-animation: fadein 1s; /* Opera < 12.1 */
        animation: fadein 1s;
    }

    .hideComponent {
        display: none!important;
    }

    .input-focus {
        border: 2px solid #ffe615 !important;
        width: 86% !important;
        transition-duration: 1s;
    }

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }


</style>
