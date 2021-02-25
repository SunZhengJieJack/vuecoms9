import Vue from 'vue'
import Router from 'vue-router'
import { defaultRoute } from './router.confg'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  fallback: true,
  routes: defaultRoute,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
export default router