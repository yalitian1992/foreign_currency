// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import iosselect from 'iosselect'
import vueResource from 'vue-resource'
import vueBus from 'vue-bus';

Vue.config.productionTip = false
// Vue.use(iosselect)
Vue.use(vueResource)
Vue.use(vueBus);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
