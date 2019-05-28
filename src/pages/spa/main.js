import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

const router = new VueRouter({
  routes : [
    { path: '/', component: () => import('./views/Top.vue')},
    { path: '/service/:category', component: () => import('./views/Service.vue')},
    { path: '/about', component: () => import('./views/About.vue')},
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
