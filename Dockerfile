# ==================== 阶段一：构建前端 ====================
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# 复制前端依赖文件并安装
COPY frontend/package.json ./frontend/
RUN cd frontend && npm install

# 复制前端源码并构建
COPY frontend/ ./frontend/
RUN cd frontend && npm run build
# 构建产物输出到 backend/public（由 vite.config.js 配置）


# ==================== 阶段二：构建后端（TypeScript 编译 + Prisma 生成）====================
FROM node:22-alpine AS backend-builder

WORKDIR /app

COPY backend/package.json ./backend/
RUN cd backend && npm install

# 复制后端源码和 Prisma schema
COPY backend/src ./backend/src
COPY backend/tsconfig.json ./backend/tsconfig.json
COPY backend/prisma ./backend/prisma

# 生成 Prisma Client
RUN cd backend && npx prisma generate

# 编译 TypeScript
RUN cd backend && npm run build


# ==================== 阶段三：最终运行镜像 ====================
FROM node:22-alpine AS runner

WORKDIR /app

# 只安装生产依赖
COPY backend/package.json ./backend/
RUN cd backend && npm install --omit=dev

# 复制 Prisma schema 并重新生成 Client（生产环境）
COPY backend/prisma ./backend/prisma
RUN cd backend && npx prisma generate

# 复制编译后的 JS 产物
COPY --from=backend-builder /app/backend/dist ./backend/dist

# 复制前端构建产物到后端静态目录
COPY --from=frontend-builder /app/backend/public ./backend/public

# 设置环境变量默认值（可通过 docker run -e 或 .env 覆盖）
ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0

EXPOSE 4000

# 启动后端服务（同时托管前端静态文件）
CMD ["node", "backend/dist/main.js"]
