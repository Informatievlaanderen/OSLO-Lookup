<template>
    <div>
        <vl-region>
            <vl-layout>
                <vl-grid class="vl-grid--align-center">
                    <vl-column>
                        <vl-title class="title" tag-name="h1">
                            OSLO Search Engine
                        </vl-title>
                    </vl-column>
                    <vl-column width="8">
                        <vl-search mod-inline name="search-input" id="search-input"
                                   placeholder="Search for application profiles or terminology"></vl-search>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
        <vl-region>

            <vl-layout>
                <vl-grid>
                    <vl-tabs>
                        <vl-tab label="Terminologie"></vl-tab>
                        <vl-tab label="Applicatieprofielen"></vl-tab>
                    </vl-tabs>
                </vl-grid>
            </vl-layout>
        </vl-region>
    </div>

</template>

<script>
    export default {
        name: "SearchComponent"
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

    .vl-search {
        width: 100%;
    }

    #search-input {
        height: 50px;
        border-radius: 25px;
        border: 2px solid #0055cc;
        font-size: 120%;
    }

    #search-input:focus {
        border: 2px solid #ffe615;
    }

    .vl-search__submit {
        border-radius: 50px;
        height: 50px !important;
        outline: none !important;

    }


</style>
