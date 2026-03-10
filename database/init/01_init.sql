-- =====================================================
-- 数据库初始化脚本
-- 容器首次启动时自动执行（按文件名顺序）
-- =====================================================

-- 示例：创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 示例表（按需修改或删除）
-- CREATE TABLE IF NOT EXISTS users (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

SELECT 'Database initialized successfully' AS message;
