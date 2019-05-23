import Vue from 'vue'
import VueScrollto from 'vue-scrollto'

Vue.use(VueScrollto)

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  render: h => h(App),
}).$mount('#app')
