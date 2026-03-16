// src/modules/system/routes.ts
// 系统模块路由（对标旧后端 /api/system，路径前缀 /api/system）

import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { success, fail } from '../../utils/result.js'

export default async function systemRoutes(fastify: FastifyInstance) {
  // ——— 统一 Zod 错误处理 ———
  fastify.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      const msg = error.errors.map((e) => e.message).join('; ')
      return reply.send(fail(msg, 400))
    }
    fastify.log.error({ err: error }, '系统模块路由错误')
    return reply.send(fail(error.message || '服务器内部错误', 500))
  })

  /**
   * GET /api/system/info
   * 获取系统基本信息（示例接口）
   */
  fastify.get('/api/system/info', async () => {
    // 示例：查询数据库版本
    const result = await fastify.db.$queryRaw<[{ version: string }]>`SELECT version()`
    return success({
      appName: '基础平台',
      version: '1.0.0',
      nodeVersion: process.version,
      dbVersion: result[0]?.version ?? 'unknown',
      env: process.env.NODE_ENV,
    })
  })

  /**
   * GET /api/system/health
   * 健康检查接口
   */
  fastify.get('/api/system/health', async () => {
    return success({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // 在此处注册更多系统相关接口
}
