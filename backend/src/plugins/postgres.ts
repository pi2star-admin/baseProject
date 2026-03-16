// src/plugins/postgres.ts
// Prisma Client 插件，挂载到 fastify.db，供所有路由使用

import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'
import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const prisma = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
  })

  await prisma.$connect()

  fastify.decorate('db', prisma)

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect()
    fastify.log.info('PostgreSQL 连接已关闭')
  })

  fastify.log.info('PostgreSQL (Prisma) 已连接')
})
