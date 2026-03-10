/**
 * 统一 API 响应格式工具
 * 响应结构：{ code, data, message }
 * code: 0 表示成功，非 0 表示失败
 */

/**
 * 成功响应
 * @param {object} res - Express response 对象
 * @param {*} data - 响应数据
 * @param {string} message - 提示信息
 * @param {number} httpStatus - HTTP 状态码
 */
export const success = (res, data = null, message = 'success', httpStatus = 200) => {
  return res.status(httpStatus).json({
    code: 0,
    data,
    message,
  })
}

/**
 * 失败响应
 * @param {object} res - Express response 对象
 * @param {string} message - 错误信息
 * @param {number} code - 业务错误码
 * @param {number} httpStatus - HTTP 状态码
 */
export const fail = (res, message = 'error', code = 1, httpStatus = 400) => {
  return res.status(httpStatus).json({
    code,
    data: null,
    message,
  })
}

/**
 * 服务器内部错误响应
 * @param {object} res - Express response 对象
 * @param {string} message - 错误信息
 */
export const serverError = (res, message = '服务器内部错误') => {
  return res.status(500).json({
    code: 500,
    data: null,
    message,
  })
}
