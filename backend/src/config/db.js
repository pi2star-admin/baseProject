import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

// PostgreSQL 连接池
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'base_project',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  // 连接池配置
  max: 10,              // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// 测试数据库连接
pool.on('connect', () => {
  console.log('✅ PostgreSQL 连接成功')
})

pool.on('error', (err) => {
  console.error('❌ PostgreSQL 连接错误:', err.message)
})

/**
 * 执行 SQL 查询
 * @param {string} text - SQL 语句
 * @param {Array} params - 参数列表
 */
export const query = (text, params) => pool.query(text, params)

export default pool
