import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from "./store";
import './registerServiceWorker'
import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)


Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
