import Vue from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from '@/store/store'
import AsyncComputed from 'vue-async-computed'

import Repositories from '@/components/Repositories'

/* Initialize the plugin */
Vue.use(AsyncComputed)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Repositories },
  render: h => h(App),
});
