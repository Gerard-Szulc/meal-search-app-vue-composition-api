import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from "./store";
import './registerServiceWorker'
import vueDebounce from 'vue-debounce'
import { startFirebase } from "./firebase/init";
import Ads from 'vue-google-adsense'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.use(vueDebounce)

startFirebase()

Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
