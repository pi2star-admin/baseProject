import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// ==================== 中间件 ====================
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ==================== API 路由 ====================
app.use('/api', router)

// ==================== 静态文件（前端打包产物）====================
const publicPath = join(__dirname, '../../backend/public')
app.use(express.static(publicPath))

// 所有非 /api 请求返回前端 index.html（支持 SPA 路由）
app.get('*', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'))
})

// ==================== 全局错误处理 ====================
app.use(errorHandler)

// ==================== 启动服务 ====================
app.listen(PORT, () => {
  console.log(`🚀 服务已启动: http://localhost:${PORT}`)
  console.log(`📦 运行环境: ${process.env.NODE_ENV || 'development'}`)
})

export default app
