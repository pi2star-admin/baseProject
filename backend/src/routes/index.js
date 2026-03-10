import { Router } from 'express'
import systemRouter from './system.js'

const router = Router()

// 系统相关接口
router.use('/system', systemRouter)

// 在此处注册更多路由模块
// router.use('/users', userRouter)

export default router
