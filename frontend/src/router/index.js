import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: '首页' },
  },
  // 在此处添加更多路由
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫 - 设置页面标题
router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = `星枢基础平台 - ${to.meta.title}`
  }
})

export default router
