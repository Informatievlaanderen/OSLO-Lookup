import Vue from 'vue'
import App from './App.vue';
import router from "./router/route";

Vue.config.productionTip = false;

import {
  i18n,
  VlCore,
  VlUtil,
  VlGrid,
  VlColumn,
  VlLayout,
  VlRegion,
  VlContentHeader,
  VlContentHeaderTitle,
  VlContentHeaderEntity,
  VlInputField,
  VlTitle,
  VlIcon,
  VlButton,
  VlTabs,
  VlTab,
  VlSearch,
  VlSearchResults,
  VlSearchResult,
  VlSearchResultProperty,
  VlInfoTile,
  VlLinkList,
  VlLinkListItem,
  VlLink,
  VlPillInput,
  VlLoader
} from'@govflanders/vl-ui-vue-components';

import VueI18n from 'vue-i18n';



Vue.component('vl-grid', VlGrid);
Vue.component('vl-column', VlColumn);
Vue.component('vl-layout', VlLayout);
Vue.component('vl-region', VlRegion);
Vue.component('vl-content-header', VlContentHeader);
Vue.component('vl-content-header-title', VlContentHeaderTitle);
Vue.component('vl-content-header-entity', VlContentHeaderEntity);
Vue.component('vl-input-field', VlInputField);
Vue.component('vl-title', VlTitle);
Vue.component('vl-icon', VlIcon);
Vue.component('vl-button', VlButton);
Vue.component('vl-tabs', VlTabs);
Vue.component('vl-tab', VlTab);
Vue.component('vl-search', VlSearch);
Vue.component('vl-search-results', VlSearchResults);
Vue.component('vl-search-result', VlSearchResult);
Vue.component('vl-search-result-property', VlSearchResultProperty);
Vue.component('vl-info-tile', VlInfoTile);
Vue.component('vl-link-list', VlLinkList);
Vue.component('vl-link-list-item', VlLinkListItem);
Vue.component('vl-link', VlLink);
Vue.component('vl-pill-input', VlPillInput);
Vue.component('vl-loader', VlLoader);

Vue.use(VlCore);
Vue.use(VlUtil);
Vue.use(VueI18n);

const messages = i18n;
const vlI18n = new VueI18n({
  locale: 'nl-BE',
  messages,
});
Vue.use(vlI18n);

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
