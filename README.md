# 基础平台项目模板

> 为各项目组提供统一的前后端技术栈规范和基础项目结构。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Vue 3 | ^3.5 |
| 前端构建 | Vite | ^6.1 |
| UI 组件库 | Ant Design Vue | ^4.2 |
| 前端路由 | Vue Router | ^4.5 |
| HTTP 请求 | Axios | ^1.7 |
| 后端框架 | Express | ^4.21 |
| 数据库 | PostgreSQL | 17 |
| 数据库客户端 | pg | ^8.13 |
| 环境变量 | dotenv | ^16.4 |
| 运行时 | Node.js | 22 (LTS) |

## 项目结构

```
baseProject/
├── frontend/                   # 前端项目（Vue 3 + Vite）
│   ├── public/                 # 静态资源
│   ├── src/
│   │   ├── api/                # API 请求封装
│   │   │   ├── request.js      # Axios 实例 + 拦截器
│   │   │   └── index.js        # 业务 API 方法
│   │   ├── router/             # 路由配置
│   │   │   └── index.js
│   │   ├── views/              # 页面视图
│   │   │   └── HomeView.vue    # 首页
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # 后端项目（Express）
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # PostgreSQL 连接池
│   │   ├── middlewares/
│   │   │   └── errorHandler.js # 全局错误处理
│   │   ├── routes/
│   │   │   ├── index.js        # 路由汇总
│   │   │   └── system.js       # 系统接口示例
│   │   ├── utils/
│   │   │   └── response.js     # 统一响应格式工具
│   │   └── app.js              # 应用入口
│   ├── public/                 # 前端构建产物（自动生成）
│   ├── env.example             # 环境变量模板
│   └── package.json
│
├── database/
│   └── init/                   # 数据库初始化 SQL 脚本
│       └── 01_init.sql
│
├── Dockerfile                  # 多阶段构建
├── docker-compose.yml          # 本地/生产编排
├── .gitignore
└── README.md
```

## 统一 API 响应格式

所有接口统一返回以下格式：

```json
{
  "code": 0,        // 0 = 成功，非 0 = 失败
  "data": {},       // 响应数据
  "message": "success"
}
```

后端使用 `src/utils/response.js` 中的工具函数：

```js
import { success, fail, serverError } from '../utils/response.js'

// 成功
success(res, { id: 1, name: 'test' })

// 失败（业务错误）
fail(res, '参数错误', 1001)

// 服务器错误
serverError(res, '数据库连接失败')
```

---

## 本地开发

### 前置条件

- Node.js >= 22
- PostgreSQL >= 17（或使用 Docker）

### 1. 安装依赖

```bash
# 安装根目录 + 所有 workspace 依赖
npm install
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp backend/env.example backend/.env

# 编辑 .env，填写数据库配置
vim backend/.env
```

`.env` 内容示例：

```env
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=base_project
DB_USER=postgres
DB_PASSWORD=your_password
```

### 3. 初始化数据库

```bash
# 创建数据库（PostgreSQL 已启动的情况下）
createdb base_project

# 执行初始化脚本
psql -U postgres -d base_project -f database/init/01_init.sql
```

### 4. 启动开发服务

```bash
# 同时启动前端（:3000）和后端（:4000）
npm run dev
```

- 前端访问：http://localhost:3000
- 后端 API：http://localhost:4000/api
- 前端开发时已配置代理，`/api` 请求自动转发到 `:4000`

---

## Docker 部署

### 方式一：docker-compose（推荐，含数据库）

```bash
# 1. 设置数据库密码（可选，默认 postgres123）
export DB_PASSWORD=your_secure_password

# 2. 构建并启动所有服务
docker-compose up -d --build

# 3. 查看运行状态
docker-compose ps

# 4. 查看日志
docker-compose logs -f app
```

访问：http://localhost:4000

停止服务：

```bash
docker-compose down

# 同时删除数据卷（清空数据库）
docker-compose down -v
```

---

### 方式二：仅构建应用镜像（外部数据库）

```bash
# 构建镜像
docker build -t base-project:latest .

# 运行容器
docker run -d \
  --name base-project \
  -p 4000:4000 \
  -e NODE_ENV=production \
  -e PORT=4000 \
  -e DB_HOST=your_db_host \
  -e DB_PORT=5432 \
  -e DB_NAME=base_project \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your_password \
  base-project:latest
```

---

## 接口文档

### 系统接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/system/health` | 健康检查 |
| GET | `/api/system/info` | 获取系统信息 |

#### GET /api/system/health

```json
{
  "code": 0,
  "data": {
    "status": "ok",
    "timestamp": "2026-03-10T00:00:00.000Z"
  },
  "message": "success"
}
```

#### GET /api/system/info

```json
{
  "code": 0,
  "data": {
    "appName": "基础平台",
    "version": "1.0.0",
    "nodeVersion": "v22.x.x",
    "dbVersion": "PostgreSQL 17.x ...",
    "env": "production"
  },
  "message": "success"
}
```

---

## 新增路由规范

### 后端新增路由

1. 在 `backend/src/routes/` 下新建路由文件，例如 `users.js`
2. 在 `backend/src/routes/index.js` 中注册：

```js
import userRouter from './users.js'
router.use('/users', userRouter)
```

### 前端新增页面

1. 在 `frontend/src/views/` 下新建 Vue 文件
2. 在 `frontend/src/router/index.js` 中添加路由配置
3. 在 `frontend/src/api/index.js` 中添加对应 API 方法

---

## 常见问题

**Q: 前端构建后访问页面空白？**  
A: 确认 `vite.config.js` 中 `build.outDir` 指向 `../backend/public`，且后端 `app.js` 中静态文件路径正确。

**Q: 数据库连接失败？**  
A: 检查 `.env` 中的数据库配置，确认 PostgreSQL 服务已启动，以及数据库和用户已创建。

**Q: docker-compose 启动后 app 容器退出？**  
A: 查看日志 `docker-compose logs app`，通常是数据库连接配置问题。
