import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: '机票售票系统'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/views/user/index.vue"),
    meta: {
      title: '机票售票系统-用户'
    }
  },
  {
    path: '/company',
    name: 'company',
    component: () => import("@/views/company/index.vue"),
    meta: {
      title: '机票售票系统-航空公司'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("@/views/administrator/index.vue"),
    meta: {
      title: '机票售票系统-管理员'
    }
  },
  {
    path: '/searchTicket',
    name: 'searchTicket',
    component: () => import("@/views/searchTicket/index.vue"),
    meta: {
      title: '机票售票系统'
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
