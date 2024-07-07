// createRouter：创建路由实例
// createWebHistory：创建基于浏览器 history 的路由历史记录。这样当你找不到路径时，它会会加载默认的路由规则（App.vue）
import { createRouter, createWebHistory } from 'vue-router'

// 使用"@/"的方式导入，有提示，可以解决路径错误的问题
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component是对应关系
  routes: [
    {
      // 定义根路由，路径可以自定义
      path: '/',
      component: Layout,
      name: 'layout',
      children: [
        {
          path: '',
          // 用于命名路由，可以通过该名称来跳转路由，无需路径
          name: 'home',
          component: Home
        },
        {
          // 定义动态参数的路由
          // :id表示动态参数，路由路径以冒号开头的部分表示动态参数。可以通过${ 值 }的方式传递
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path:'category/sub/:id',
          name:'subcategory',
          component: SubCategory
        },
        {
          path:'detail/:id',
          component: Detail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  // 路由滚动行为定制
  scrollBehavior(){
    return {
      top : 0
    }
  }
})

export default router
