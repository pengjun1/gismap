import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/mapList',
  },
  {
    path:'/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path:'/home',
    component: () => import('@/views/home.vue'),
    redirect:'/fieldsList',
    children:[
      // 地块页面
      {
        path:'/fieldsList',
        component: () => import('@/views/fields/fieldsList'),
      },

      {
        path:'/addFields',
        component: () => import('@/views/fields/addFields'),
      },
      {
        path:'/editFields',
        component: () => import('@/views/fields/editFields'),
      },
      {
        path:'/finishFields',
        component: () => import('@/views/fields/addFields/finishFields.vue'),
      },
      {
        path:'/fieldsDetail',
        component: () => import('@/views/fields/fieldsDetail'),
      },
      // 农资页面
      {
        path:'/addCate',
        component: () => import('@/views/cate/addCate'),
      },
      {
        path:'/editCate',
        component: () => import('@/views/cate/editCate'),
      },
      // 农事页面
      {
        path:'/addWork',
        component: () => import('@/views/work/addWork'),
      },
    ]
  },
  {
    path:'/mapList',
    component: () => import('@/views/fields/mapList'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL + '/gismapPC',
  base: process.env.BASE_URL,
  routes
})

export default router
