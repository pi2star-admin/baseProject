<template>
  <a-layout class="layout">
    <!-- 顶部导航 -->
    <a-layout-header class="header">
      <div class="header-inner">
        <div class="logo">
          <img src="/favicon.svg" alt="logo" class="logo-img" />
          <span class="logo-text">基础平台</span>
        </div>
        <a-menu
          mode="horizontal"
          :selected-keys="['home']"
          class="nav-menu"
          theme="dark"
        >
          <a-menu-item key="home">首页</a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>

    <!-- 主内容区 -->
    <a-layout-content class="content">
      <!-- Hero 区域 -->
      <div class="hero">
        <div class="hero-inner">
          <a-typography-title :level="1" class="hero-title">
            欢迎使用基础平台
          </a-typography-title>
          <a-typography-paragraph class="hero-desc">
            本项目为基础平台模板，提供统一的前后端技术栈规范，助力团队快速启动新项目。
          </a-typography-paragraph>
          <a-space size="middle">
            <a-button type="primary" size="large">快速开始</a-button>
            <a-button size="large">查看文档</a-button>
          </a-space>
        </div>
      </div>

      <!-- 技术栈卡片 -->
      <div class="cards-section">
        <a-typography-title :level="2" class="section-title">技术栈规范</a-typography-title>
        <a-row :gutter="[24, 24]" justify="center">
          <a-col :xs="24" :sm="12" :md="8" v-for="item in techStack" :key="item.title">
            <a-card hoverable class="tech-card">
              <template #cover>
                <div class="card-icon-wrap">
                  <span class="card-icon">{{ item.icon }}</span>
                </div>
              </template>
              <a-card-meta :title="item.title" :description="item.description" />
              <div class="card-tags">
                <a-tag v-for="tag in item.tags" :key="tag" :color="item.color">{{ tag }}</a-tag>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <!-- 系统状态 -->
      <div class="status-section">
        <a-typography-title :level="2" class="section-title">系统状态</a-typography-title>
        <a-row :gutter="[24, 24]" justify="center">
          <a-col :xs="24" :sm="8" v-for="stat in systemStats" :key="stat.label">
            <a-statistic
              :title="stat.label"
              :value="stat.value"
              :suffix="stat.suffix"
              class="stat-card"
            />
          </a-col>
        </a-row>
      </div>
    </a-layout-content>

    <!-- 底部 -->
    <a-layout-footer class="footer">
      基础平台 © {{ new Date().getFullYear() }} | Vue 3 + Vite + Ant Design Vue + Express + PostgreSQL
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSystemInfo } from '@/api/index'

const techStack = [
  {
    icon: '⚡',
    title: '前端',
    description: '基于 Vue 3 + Vite 构建，使用 Ant Design Vue 组件库，Vue Router 管理路由，Axios 处理请求。',
    tags: ['Vue 3', 'Vite', 'Ant Design Vue', 'Vue Router', 'Axios'],
    color: 'green',
  },
  {
    icon: '🚀',
    title: '后端',
    description: '基于 Express 构建 RESTful API，统一响应格式，dotenv 管理环境变量，pg 连接 PostgreSQL。',
    tags: ['Express', 'PostgreSQL', 'dotenv', 'pg'],
    color: 'blue',
  },
  {
    icon: '🐳',
    title: '部署',
    description: '前端构建产物由后端静态托管，单 Dockerfile 完成整体打包，支持 Docker 一键部署。',
    tags: ['Docker', 'Dockerfile', 'Static Serve'],
    color: 'purple',
  },
]

const systemStats = ref([
  { label: '前端框架', value: 'Vue', suffix: '3' },
  { label: '后端框架', value: 'Express', suffix: '' },
  { label: '数据库', value: 'PostgreSQL', suffix: '' },
])

onMounted(async () => {
  try {
    // 示例：调用后端接口获取系统信息
    // const info = await getSystemInfo()
    // 可根据返回数据更新 systemStats
  } catch (e) {
    // 接口异常不影响页面展示
  }
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
  background: #001529;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 40px;
  flex-shrink: 0;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #001529 0%, #003a70 50%, #1677ff 100%);
  padding: 100px 24px;
  text-align: center;
}

.hero-inner {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  color: #fff !important;
  font-size: 48px !important;
  margin-bottom: 20px !important;
}

.hero-desc {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 16px !important;
  margin-bottom: 40px !important;
}

/* Cards */
.cards-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px;
}

.section-title {
  text-align: center;
  margin-bottom: 40px !important;
}

.tech-card {
  height: 100%;
  border-radius: 8px;
  transition: transform 0.2s;
}

.tech-card:hover {
  transform: translateY(-4px);
}

.card-icon-wrap {
  background: #f5f7fa;
  padding: 24px;
  text-align: center;
}

.card-icon {
  font-size: 48px;
}

.card-tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Status */
.status-section {
  background: #f5f7fa;
  padding: 64px 24px;
}

.status-section .section-title {
  text-align: center;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Footer */
.footer {
  text-align: center;
  background: #001529;
  color: rgba(255, 255, 255, 0.65);
  padding: 24px;
}
</style>
