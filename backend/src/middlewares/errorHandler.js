import { serverError } from '../utils/response.js'

/**
 * 全局错误处理中间件
 * 必须放在所有路由注册之后
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url}:`, err.message)
  return serverError(res, err.message || '服务器内部错误')
}

export default errorHandler
