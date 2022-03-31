import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/views/user/index.vue")
  },
  {
    path: '/company',
    name: 'company',
    component: () => import("@/views/company/index.vue")
  },
  {
    path: '/searchTicket',
    name: 'searchTicket',
    component: () => import("@/views/searchTicket/index.vue")
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
