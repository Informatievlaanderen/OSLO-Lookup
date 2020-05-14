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
                        <!--<vl-search @click="executeQuery" mod-inline name="search-input" id="search-input"
                                   placeholder="Search for application profiles or terminology"></vl-search>-->
                        <vl-input-field
                                @focus="focus = true"
                                v-model="query"
                                v-bind:class="{'input-focus': focus}"
                                id="search-input"
                                name="search-input" />
                        <vl-button @click="executeQuery" v-if="focus" id="search-button"><vl-icon icon="search"/></vl-button>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
        <vl-region>
            <vl-layout>
                <vl-grid mod-stacked>
                    <vl-column>
                        <vl-tabs>
                            <vl-tab label="Terminologie"><VocabularyComponent :query="query" ref="Vocabulary"/></vl-tab>
                            <vl-tab label="Klassen & Eigenschappen"><ApplicationProfileComponent :query="query" ref="ApplicationProfile"/></vl-tab>
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
                focus: false
            }
        },
        methods: {
            executeQuery(){
                this.$refs.Vocabulary.executeQuery();
                this.$refs.ApplicationProfile.executeQuery();
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
    }

    .input-focus {
        border: 2px solid #ffe615!important;
        width: 85%!important;
        transition-duration: 1s;
    }



</style>
