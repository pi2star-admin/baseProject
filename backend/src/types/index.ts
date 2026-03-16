// src/types/index.ts
// 全局公共类型定义

// 统一 API 响应格式：{ code, message, data }
// code: 0 表示成功，非 0 表示失败
export interface Result<T = unknown> {
  code: number
  message: string | null
  data: T
}

// 分页请求基类
export interface BasePageForm {
  pageNum: number
  pageSize: number
}

// 分页响应基类
export interface BasePageList<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

// 当前登录用户信息（按需扩展）
export interface CurrentUser {
  id: string
  username: string
  name: string
}

// 扩展 Fastify Request 类型，注入当前用户（启用鉴权后使用）
declare module 'fastify' {
  interface FastifyRequest {
    currentUser: CurrentUser
  }
}
