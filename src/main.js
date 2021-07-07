import Vue from 'vue'
import App from './App.vue';
import router from "./router/route";

Vue.config.productionTip = false;

// Webcomponents
import VlUiVueComponents from'@govflanders/vl-ui-vue-components';

const validatorConfig = {
  inject: true,
  locale: 'nl',
};

// install the component library with config
Vue.use(VlUiVueComponents, {
  validation: validatorConfig,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
