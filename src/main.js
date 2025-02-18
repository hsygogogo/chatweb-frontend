import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueDeviceDetector from 'vue-device-detector'

Vue.config.productionTip = false
Vue.use(VueDeviceDetector);

new Vue({
  router,
  VueDeviceDetector,
  render: h => h(App),
}).$mount('#app')
