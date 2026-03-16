// src/main.ts
// 应用入口：注册插件、路由，启动服务

import Fastify from 'fastify'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ——— 全局类型扩展（必须在入口导入，确保类型声明生效）———
import './types/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  logger:
    process.env.NODE_ENV === 'development'
      ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
      : true,
})

async function bootstrap() {
  // ——— 注册基础插件 ———
  await fastify.register(import('./plugins/postgres.js'))
  await fastify.register(import('@fastify/cors'), { origin: true })
  await fastify.register(import('@fastify/helmet'))

  // ——— 静态文件（前端打包产物）———
  const publicPath = join(__dirname, '../../backend/public')
  await fastify.register(import('@fastify/static'), {
    root: publicPath,
    wildcard: false,
  })

  // ——— 健康检查（白名单路径，无需登录）———
  fastify.get('/health', async () => {
    return { code: 0, message: null, data: { status: 'ok', timestamp: Date.now() } }
  })

  // ——— 注册业务模块路由 ———
  await fastify.register(import('./modules/system/routes.js'))
  // 在此处注册更多路由模块
  // await fastify.register(import('./modules/user/routes.js'))

  // ——— 全局错误处理 ———
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error({ err: error, url: request.url }, '未捕获的路由错误')
    reply.send({ code: 500, message: error.message || '服务器内部错误', data: null })
  })

  // ——— 404 处理 ———
  fastify.setNotFoundHandler((request, reply) => {
    // 非 /api 开头的请求返回前端 SPA 入口（支持前端路由）
    if (!request.url.startsWith('/api')) {
      return reply.sendFile('index.html')
    }
    reply.send({ code: 404, message: `路径不存在: ${request.url}`, data: null })
  })

  // ——— 启动监听 ———
  const port = Number(process.env.PORT ?? 4000)
  const host = process.env.HOST ?? '0.0.0.0'

  await fastify.listen({ port, host })
  fastify.log.info(`🚀 服务已启动，监听 http://${host}:${port}`)
  fastify.log.info(`📦 运行环境: ${process.env.NODE_ENV || 'development'}`)
}

bootstrap().catch((err) => {
  fastify.log.error(err, '服务启动失败')
  process.exit(1)
})
