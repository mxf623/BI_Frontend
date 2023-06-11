import { createRouter, createWebHistory } from 'vue-router'
import Compose from '@/views/Compose'
import home from '@/views/home'
import recommend from '@/views/recommend'
import UserLine from '@/views/UserLine'
import NewsLine from '@/views/NewsLine'
import categoryLine from '@/views/categoryLine'

const routes = [
  {
    path: '/',
    redirect: '/NewsLine'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      
      {
        path: '/categoryLine',
        component: categoryLine,
        meta: {
          name: '某种新闻变化'
        }
      },
      {
        path: '/NewsLine',
        component: NewsLine,
        meta: {
          name: '单个新闻变化'
        }
      }, 
      {
        path: '/UserLine',
        component: UserLine,
        meta: {
          name: '用户兴趣变化'
        }
      },
      {
        path: '/recommend',
        component: recommend,
        meta: {
          name: '新闻推荐'
        }
      },
      {
        path: '/Compose',
        component: Compose,
        meta: {
          name: '组合查询'
        }
      },
    ],
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
