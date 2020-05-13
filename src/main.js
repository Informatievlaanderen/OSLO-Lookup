import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import {
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
  VlLink
} from'@govflanders/vl-ui-vue-components';

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

Vue.use(VlCore);
Vue.use(VlUtil);

new Vue({
  render: h => h(App),
}).$mount('#app')
