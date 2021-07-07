<template>
  <div>
    <vl-region>
      <vl-layout>
        <vl-grid
          class="vl-grid--align-center"
          mod-stacked
        >
          <vl-column>
            <vl-title
              class="title"
              tag-name="h1"
            >
              OSLO Search Engine
            </vl-title>
          </vl-column>
          <vl-column width="8">
            <vl-pill-input
              v-model="terms"
              placeholder="Geef een of meer zoekwoorden op"
              class="search-input"
              name="search-input"
            />
          </vl-column>
          <vl-column class="vl-u-align-center">
            <vl-button
              id="search-button"
              :class="{'hover': hovered}"
              @click="executeQuery"
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
            >
              Zoeken
            </vl-button>
          </vl-column>
        </vl-grid>
      </vl-layout>
    </vl-region>
    <vl-region>
      <vl-layout>
        <vl-grid
          :class="{'showComponent': queryStarted && !queryExecuted, 'hideComponent' : !queryStarted || queryExecuted}"
          mod-stacked
        >
          <vl-column class="vl-u-align-center">
            <vl-loader message="De termen worden opgezocht" />
          </vl-column>
        </vl-grid>
        <vl-grid
          :class="{'showComponent': queryExecuted, 'hideComponent' : !queryExecuted}"
          mod-stacked
        >
          <vl-column>
            <vl-tabs>
              <vl-tab :label="'Terminologie (' + numberOfVocabularies + ')'">
                <VocabularyComponent
                  ref="Vocabulary"
                  :search-terms="terms"
                  @queryFinished="onQueryFinished"
                  @childToParent="onResult"
                />
              </vl-tab>
              <!--<vl-tab :label="'Klassen & Eigenschappen (' + numberOfApplicationProfiles + ')'">
                                <ApplicationProfileComponent :searchTerms="terms" v-on:childToParent="onResult" ref="ApplicationProfile"/>
                            </vl-tab>-->
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
  components: { VocabularyComponent },
  data: () => ({
    focus: false,
    queryExecuted: false,
    queryStarted: false,
    numberOfVocabularies: 0,
    numberOfApplicationProfiles: 0,
    terms: [],
    hovered: false
  }),
  methods: {
    executeQuery() {
      if (this.terms.length) {
        this.queryStarted = true;
        this.$refs.Vocabulary.executeQuery();
        //this.$refs.ApplicationProfile.executeQuery(); //TODO: enable this once production elasticsearch also contains application profiles
      }
    },
    onResult(resultObject) {
      const key = Object.keys(resultObject)[0];
      switch (key) {
        case "Vocabulary":
          this.numberOfVocabularies = resultObject[key];
          break;
        case "ApplicationProfile":
          this.numberOfApplicationProfiles = resultObject[key];
          break;
      }
    },
    onQueryFinished() {
      this.queryExecuted = true;
    }
  }
};
</script>


<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-input-field/src/scss/input-field";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-button/src/scss/button";
    @import "~@govflanders/vl-ui-search/src/scss/search";
    @import "~@govflanders/vl-ui-tabs/src/scss/tabs";
    @import "~vue-select/src/scss/vue-select.scss";
    @import "~@govflanders/vl-ui-pill-input/src/scss/pill-input";
    @import "~@govflanders/vl-ui-pill/src/scss/pill";
    @import "~@govflanders/vl-ui-util/src/scss/util";
    @import "~@govflanders/vl-ui-loader/src/scss/loader";

    .title {
        text-align: center !important;
        font-size: 350%;
    }

    .vl-form__annotation {
        margin-top: 2%;
    }

    /*.vl-pill-input__inner {
        height: 50px!important;
        width: 100%;
    }*/

    #search-button {
        height: 40px;
        border: 2px solid #0055cc;
        font-size: 120%;
        border-radius: 5px;
        outline: none!important;
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


</style>
