import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuecoms9 from "@/index.js"
Vue.use(vuecoms9)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')