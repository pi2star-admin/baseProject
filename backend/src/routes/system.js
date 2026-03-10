import { Router } from 'express'
import { query } from '../config/db.js'
import { success, fail } from '../utils/response.js'

const router = Router()

/**
 * GET /api/system/info
 * 获取系统基本信息（示例接口）
 */
router.get('/info', async (req, res, next) => {
  try {
    // 示例：查询数据库版本
    const result = await query('SELECT version()')
    return success(res, {
      appName: '基础平台',
      version: '1.0.0',
      nodeVersion: process.version,
      dbVersion: result.rows[0]?.version || 'unknown',
      env: process.env.NODE_ENV,
    })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /api/system/health
 * 健康检查接口
 */
router.get('/health', (req, res) => {
  return success(res, { status: 'ok', timestamp: new Date().toISOString() })
})

export default router
