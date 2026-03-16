// src/modules/system/schema.ts
// 系统模块 Zod 请求校验 Schema

import { z } from 'zod'

/**
 * 健康检查（无需参数，仅作占位示例）
 */
export const HealthSchema = z.object({})

// 在此处添加更多 Schema，例如：
// export const SomeRequestSchema = z.object({
//   id: z.string().min(1, 'id 不能为空'),
// })
