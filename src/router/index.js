import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/public'
import Login from '@/components/login'
import Sign from '@/components/sign'
import Details from '@/components/details'
//二级路由
import Index from '@/components/page/index.vue'
import Sort from '@/components/page/sort.vue'
import ShopCar from '@/components/page/shopCar.vue'
import Mine from '@/components/page/mine.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/public',
      component: Public,
      children:[
        {
          path:'/index',
          component:Index
        },
        {
          path:'/sort',
          component:Sort
        },
        {
          path:'/shopcar',
          component:ShopCar
        },
        {
          path:'/mine',
          component:Mine
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/sign',
      component:Sign
    },
    {
      path:'/details',
      component:Details
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
