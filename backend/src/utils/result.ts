// src/utils/result.ts
// 统一 API 响应格式工具

import type { Result, BasePageList } from '../types/index.js'

/**
 * 成功响应
 */
export function success<T>(data: T): Result<T> {
  return { code: 0, message: null, data }
}

/**
 * 失败响应
 */
export function fail(message: string, code = 500): Result<null> {
  return { code, message, data: null }
}

/**
 * 分页数据包装
 */
export function pageSuccess<T>(
  list: T[],
  total: number,
  pageNum: number,
  pageSize: number,
): Result<BasePageList<T>> {
  return success({ list, total, pageNum, pageSize })
}
