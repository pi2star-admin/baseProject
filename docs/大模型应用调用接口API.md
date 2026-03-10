# 大模型应用调用接口API文档

## 目录
- [基础配置](#基础配置)
- [快速开始](#快速开始)
- [接口详情](#接口详情)
  - [1. 图片上传接口](#1-图片上传接口)
  - [2. 创建新对话接口](#2-创建新对话接口)
  - [3. Chat对话接口](#3-chat对话接口)
- [完整调用流程](#完整调用流程)
- [常见问题](#常见问题)

---

## 基础配置

### 接口基础URL
```
https://1ei0799js7678.vicp.fun:42959
```

### Application API Key
```
application-ce156078d1045f02413025cf8562fc75
```

**使用说明**：
- 在请求Header中携带：`Authorization: Bearer <API_KEY>`
- 适用于所有接口：创建对话、图片上传、聊天接口

---

## 快速开始

### 最简单的对话示例
```bash
# 1. 创建新对话
curl -X GET 'https://1ei0799js7678.vicp.fun:42959/chat/api/open' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44'

# 返回: {"code": 200, "message": "成功", "data": "019ca485-f7a5-7953-adaf-ce6e01665c4e"}

# 2. 发送消息
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/chat_message/019ca485-f7a5-7953-adaf-ce6e01665c4e' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44' \
  -d '{
    "message": "你好，请介绍一下你自己",
    "stream": true,
    "re_chat": false,
    "form_data": {}
  }'
```

---

## 接口详情

### 1. 图片上传接口

**功能说明**：上传图片文件，上传成功后可在Chat对话接口中使用。

#### 接口信息
- **URL**: `/chat/api/oss/file`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| file | file | 是 | 要上传的图片文件 | test.jpeg |
| source_id | string | 是 | 源ID（通常为对话ID） | "019ca798-0da4-79e1-897c-1bff38043979" |
| source_type | string | 是 | 源类型 | "CHAT" |

#### 请求示例
```bash
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/oss/file' \
  -H 'authorization: Bearer <your_token>' \
  -F 'file=@/path/to/your/image.jpeg' \
  -F 'source_id=019ca798-0da4-79e1-897c-1bff38043979' \
  -F 'source_type=CHAT' \
  --insecure
```

#### 响应参数

| 字段 | 类型 | 说明 |
|------|------|------|
| code | integer | 状态码，200表示成功 |
| message | string | 响应消息 |
| data.name | string | 文件名 |
| data.file_id | string | 文件ID，用于后续引用 |
| data.url | string | 文件URL路径 |

#### 响应示例
```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "name": "test.jpeg",
    "file_id": "019ca7be-0015-7ff3-abb6-23daec9bc159",
    "url": "./oss/file/019ca7be-0015-7ff3-abb6-23daec9bc159"
  }
}
```

#### 常见错误码
- **401 Unauthorized**: 认证失败（Token 无效或过期）
- **400 Bad Request**: 请求参数错误（缺少必填参数或文件格式不支持）
- **413 Payload Too Large**: 上传文件过大
- **500 Internal Server Error**: 服务器内部错误

---

### 2. 创建新对话接口

**功能说明**：创建一个新的对话会话，返回对话ID。

#### 接口信息
- **URL**: `/chat/api/open`
- **Method**: `GET`
- **Content-Type**: `application/json`

#### 请求参数
无

#### 响应参数

| 字段 | 类型 | 说明 |
|------|------|------|
| code | integer | 状态码 |
| message | string | 响应消息 |
| data | string | 对话ID |

#### 响应示例
```json
{
  "code": 200,
  "message": "成功",
  "data": "019ca485-f7a5-7953-adaf-ce6e01665c4e"
}
```

---

### 3. Chat对话接口

**功能说明**：发起应用对话，支持流式（Streaming）和非流式响应。

#### 接口信息
- **URL**: `/chat/api/chat_message/<chat_id>`
- **Method**: `POST`
- **Content-Type**: `application/json`

**注意**：`<chat_id>` 为对话ID（UUID）。如果是新对话，需先调用创建新对话接口获取；如果是继续之前的对话，请使用之前的 chat_id。

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| message | string | 是 | 用户输入的问题内容 | "你好，请介绍一下你自己" |
| stream | boolean | 是 | 是否开启流式输出 | true (推荐) |
| re_chat | boolean | 是 | 是否为重新回答（重新生成上一条） | false |
| chat_record_id | string | 否 | 如果是重新回答，需传入上一条记录的 ID | "123e4567-e89b-..." |
| form_data | object | 否 | 全局变量/表单参数，用于工作流应用 | {"key": "value"} |
| image_list | array | 否 | 上传的图片列表 | [{"file_id": "...", "url": "..."}] |

#### 请求示例
```json
{
  "message": "帮我写一篇关于人工智能的短文",
  "stream": true,
  "re_chat": false,
  "form_data": {}
}
```

#### 响应说明

##### 流式响应 (stream=true)
响应头 `Content-Type: text/event-stream`，返回 Server-Sent Events (SSE) 格式的数据流。每一行数据以 `data:` 开头，内容为 JSON 字符串。

**流式数据结构**：

| 字段 | 类型 | 说明 |
|------|------|------|
| chat_id | string | 对话 ID |
| chat_record_id | string | 本次生成的记录 ID |
| content | string | 增量内容片段（即当前 chunk 的文本） |
| is_end | boolean | 是否结束。true 表示生成完成 |
| operate | boolean | 标识位，通常为 true |

**流式响应示例**:
```
data: {"chat_id": "...", "chat_record_id": "...", "content": "人工", "is_end": false, "operate": true}

data: {"chat_id": "...", "chat_record_id": "...", "content": "智能", "is_end": false, "operate": true}

...

data: {"chat_id": "...", "chat_record_id": "...", "content": "", "is_end": true, "operate": true}
```

**客户端处理建议**：监听 data 事件，将每次收到的 content 拼接到当前回答中。当检测到 `is_end: true` 时结束接收。

##### 非流式响应 (stream=false)
直接返回完整的 JSON 结果（等待时间较长）。

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": "人工智能（AI）是指由计算机系统模拟人类智能的技术...",
    "chat_id": "...",
    "chat_record_id": "...",
    "usage": {
      "prompt_tokens": 10,
      "completion_tokens": 50,
      "total_tokens": 60
    }
  }
}
```

#### 常见错误码
- **401 Unauthorized**: 认证失败（Key 无效或过期）
- **404 Not Found**: 应用 ID 不存在或 Key 与应用不匹配
- **500 Internal Server Error**: 服务器内部错误

---

## 完整调用流程

### 场景1：纯文本对话
```bash
# 步骤1: 创建新对话
curl -X GET 'https://1ei0799js7678.vicp.fun:42959/chat/api/open' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44'

# 返回对话ID: 019ca485-f7a5-7953-adaf-ce6e01665c4e

# 步骤2: 发送消息
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/chat_message/019ca485-f7a5-7953-adaf-ce6e01665c4e' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44' \
  -d '{
    "message": "你好，请介绍一下你自己",
    "stream": true,
    "re_chat": false,
    "form_data": {}
  }'
```

### 场景2：带图片的对话
```bash
# 步骤1: 创建新对话
curl -X GET 'https://1ei0799js7678.vicp.fun:42959/chat/api/open' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44'

# 返回对话ID: 019ca485-f7a5-7953-adaf-ce6e01665c4e

# 步骤2: 上传图片
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/oss/file' \
  -H 'authorization: Bearer <your_token>' \
  -F 'file=@/path/to/image.jpeg' \
  -F 'source_id=019ca485-f7a5-7953-adaf-ce6e01665c4e' \
  -F 'source_type=CHAT' \
  --insecure

# 返回: {"code": 200, "data": {"file_id": "019ca7be-0015-7ff3-abb6-23daec9bc159", "url": "..."}}

# 步骤3: 发送带图片的消息
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/chat_message/019ca485-f7a5-7953-adaf-ce6e01665c4e' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44' \
  -d '{
    "message": "请分析这张图片",
    "stream": true,
    "re_chat": false,
    "form_data": {},
    "image_list": [
      {
        "file_id": "019ca7be-0015-7ff3-abb6-23daec9bc159",
        "url": "./oss/file/019ca7be-0015-7ff3-abb6-23daec9bc159"
      }
    ]
  }'
```

### 场景3：继续之前的对话
```bash
# 使用之前的对话ID继续对话
curl -X POST 'https://1ei0799js7678.vicp.fun:42959/chat/api/chat_message/019ca485-f7a5-7953-adaf-ce6e01665c4e' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer application-c3191ac1fcb60fa709a897a402996b44' \
  -d '{
    "message": "请继续详细说明",
    "stream": true,
    "re_chat": false,
    "form_data": {}
  }'
```

---

## 常见问题

### Q1: 如何获取Bearer Token？
A: Bearer Token用于图片上传接口，需要从浏览器中获取。步骤如下：
1. 打开浏览器开发者工具（F12）
2. 切换到Network标签
3. 在应用中上传一张图片
4. 找到上传请求，查看Request Headers中的Authorization字段
5. 复制完整的Bearer Token值

### Q2: 流式响应如何处理？
A: 流式响应使用SSE格式，建议处理方式：
1. 监听`data:`事件
2. 解析每行的JSON数据
3. 将`content`字段拼接到完整回答中
4. 当`is_end`为`true`时结束接收

### Q3: 如何重新生成回答？
A: 设置`re_chat`为`true`，并传入上一条记录的`chat_record_id`。

### Q4: 图片上传失败怎么办？
A: 检查以下几点：
1. Token是否有效
2. 文件格式是否支持（推荐JPEG、PNG）
3. 文件大小是否超过限制
4. `source_id`和`source_type`参数是否正确

### Q5: 如何处理跨域问题？
A: 在开发环境中，建议配置代理服务器。生产环境中，确保服务器端已正确配置CORS。

---

## 更新日志

- **2026-03-01**: 添加图片上传接口文档，重新梳理文档结构
- **初始版本**: 创建基础API文档
