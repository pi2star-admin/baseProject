# AI 开发项目设计规范指南

> 本文档用于指导 AI 助手开发新的前端项目，确保代码风格、UI 设计、组件使用符合项目标准。
涉及到大模型相关需求的API接口，需要参见项目目录下的《大模型应用调用接口API.md》文档
---

## 📋 目录

- [项目概述](#项目概述)
- [技术栈规范](#技术栈规范)
- [设计理念](#设计理念)
- [UI 样式规范](#ui-样式规范)
- [组件使用规范](#组件使用规范)
- [代码风格规范](#代码风格规范)
- [页面开发规范](#页面开发规范)
- [最佳实践](#最佳实践)

---

## 项目概述

### 项目定位

这是一个**企业级前端管理平台**，采用现代化的前端技术栈，具有以下特点：

- **模块化架构**: 三层模块化设计（base/modules/modules-ai）
- **组件化开发**: 高度封装的标准化组件
- **主题系统**: 支持多主题切换（亮色/暗色/大屏主题）
- **国际化**: 中英文双语支持
- **权限管理**: 完善的 RBAC 权限体系

### 技术特点

- **Vue 3 Composition API**: 使用最新的组合式 API
- **TypeScript**: 完整的类型安全支持
- **Vite**: 快速的开发构建工具
- **Pinia**: 新一代状态管理
- **Ant Design Vue**: 企业级 UI 组件库

---

## 技术栈规范

### 核心框架

```json
{
  "vue": "^3.5.17",           // Vue 3 Composition API
  "typescript": "~5.8.0",     // 类型安全
  "vite": "^7.0.0",           // 构建工具
  "pinia": "^3.0.3",          // 状态管理
  "vue-router": "^4.5.1"      // 路由管理
}
```

### UI 组件库

```json
{
  "ant-design-vue": "^4.2.6",  // 主 UI 库
  "echarts": "5.4.0",          // 图表库
  "@antv/x6": "2.18.1"         // 图形编辑
}
```

### 工具库

```json
{
  "axios": "^1.10.0",         // HTTP 请求
  "dayjs": "^1.11.13",        // 日期处理
  "lodash": "^4.17.21",       // 工具函数
  "rxjs": "^7.8.2"            // 响应式编程
}
```

---

## 设计理念

### 1. 模块化设计

#### 三层架构

```
src/
├── modules-base/      # 基础层 - 公共基础设施
│   ├── components/    # 基础组件
│   ├── utils/         # 工具函数
│   ├── store/         # 基础状态
│   └── types/         # 类型定义
├── modules/           # 业务层 - 核心业务模块
│   ├── module-a/      # 业务模块A
│   ├── module-b/      # 业务模块B
│   └── module-c/      # 业务模块C
└── modules-ai/        # AI层 - 智能化功能
    ├── ai-feature-1/  # AI功能1
    └── ai-feature-2/  # AI功能2
```

#### 模块划分原则

- **modules-base**: 业务无关的基础设施
- **modules**: 核心业务功能模块
- **modules-ai**: AI 智能化功能模块

### 2. 组件化开发

#### 组件分类

1. **基础组件** (modules-base/components)
   - CTable - 表格组件
   - PageSearchBar - 搜索栏组件
   - FormModal - 表单弹窗组件
   - CTag - 标签组件

2. **业务组件** (modules/*/components)
   - 特定业务场景的组件
   - 基于基础组件封装

3. **页面组件** (views)
   - 完整的页面视图
   - 组合基础组件和业务组件

### 3. 配置化优于硬编码

```typescript
// ✅ 推荐：配置化
const searchFormList = [
  { label: '名称', type: 'input', key: 'name' },
  { label: '状态', type: 'select', key: 'status', options: statusOptions },
];

// ❌ 避免：硬编码
<template>
  <a-form-item label="名称">
    <a-input v-model="form.name" />
  </a-form-item>
  <a-form-item label="状态">
    <a-select v-model="form.status" />
  </a-form-item>
</template>
```

### 4. 类型安全

```typescript
// ✅ 推荐：完整的类型定义
interface DataItem {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createTime: string;
}

// ❌ 避免：any 类型
const item: any = {};
```

---

## UI 样式规范

### 1. 颜色系统

#### 主题色

```scss
// 主色
--primary: #1890ff;
--primaryHover: #40a9ff;
--primaryLight: rgba(24, 144, 255, 0.1);
--primaryBorderColor: rgba(24, 144, 255, 0.2);

// 成功色
--success: #52c41a;
--successHover: #73d13d;
--successLight: rgba(82, 196, 26, 0.1);

// 警告色
--warning: #faad14;
--warningHover: #ffc53d;
--warningLight: rgba(250, 173, 20, 0.1);

// 错误色
--error: #ff4d4f;
--errorHover: #ff7875;
--errorLight: rgba(255, 77, 79, 0.1);
```

#### 文本色

```scss
// 黑色透明度系列
--black_o_85: rgba(0, 0, 0, 0.85);  // 主要文本
--black_o_65: rgba(0, 0, 0, 0.65);  // 次要文本
--black_o_45: rgba(0, 0, 0, 0.45);  // 辅助文本
--black_o_25: rgba(0, 0, 0, 0.25);  // 禁用文本
```

#### 背景色

```scss
--base_bgc: #f0f2f5;        // 页面背景
--card_bgc: #ffffff;        // 卡片背景
--header_bgc: #fafafa;      // 头部背景
--tableRowStriped: #fafafa; // 表格斑马纹
--tableRowHover: #e6f7ff;   // 表格悬停
```

### 2. 间距规范

```scss
// 标准间距
$spacing-values: 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24;

// 使用方式
.margin-t-12 { margin-top: 12px; }
.margin-r-12 { margin-right: 12px; }
.margin-b-12 { margin-bottom: 12px; }
.margin-l-12 { margin-left: 12px; }
```

### 3. 字体规范

```scss
// 字号
.font-s-12 { font-size: 12px; }  // 辅助文本
.font-s-14 { font-size: 14px; }  // 正文
.font-s-16 { font-size: 16px; }  // 标题
.font-s-18 { font-size: 18px; }  // 大标题

// 字重
.font-w-400 { font-weight: 400; }  // 正常
.font-w-500 { font-weight: 500; }  // 中等
.font-w-600 { font-weight: 600; }  // 粗体
```

### 4. 圆角规范

```scss
.border-r-2 { border-radius: 2px; }   // 小圆角
.border-r-4 { border-radius: 4px; }   // 标准圆角
.border-r-6 { border-radius: 6px; }   // 卡片圆角
.border-r-8 { border-radius: 8px; }   // 大圆角
```

### 5. 卡片样式

```scss
// 标准卡片
.ant-card {
  border-radius: 6px;
  
  &-head {
    padding: 0 12px;
    
    &-title {
      padding: 10px 0;
      color: var(--primary);
      font-weight: 600;
    }
  }
  
  &-body {
    padding: 12px;
  }
}
```

### 6. 表格样式

```scss
// 表格斑马纹
.table-striped .ant-table-cell {
  background-color: var(--tableRowStriped);
}

// 表格悬停
.ant-table-tbody > tr:hover > td {
  background: var(--tableRowHover) !important;
}

// 表格头部
.ant-table-thead > tr > th {
  background-color: var(--card_bgc);
  color: var(--black_o_45);
  font-weight: 600;
}
```

### 7. 标签样式

```scss
// 主题标签
.c-tag-theme {
  color: var(--primary);
  background-color: var(--primaryLight2);
}

// 成功标签
.c-tag-success {
  color: var(--success);
  background-color: var(--successLight2);
}

// 警告标签
.c-tag-warning {
  color: var(--warning);
  background-color: var(--warningLight2);
}

// 错误标签
.c-tag-error {
  color: var(--error);
  background-color: var(--errorLight2);
}
```

---

## 组件使用规范

### 1. CTable 表格组件

#### 基础用法

```vue
<template>
  <c-table
    size="small"
    rowKey="id"
    tableLayout="fixed"
    :pagination="pagination"
    :loading="loading"
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 1200 }"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text, record, index }">
      <template v-if="column.dataIndex === 'seq'">
        {{ index + 1 + (current - 1) * pagination.pageSize }}
      </template>
      <template v-if="column.dataIndex === 'status'">
        <CTag :color="getStatusColor(text)">
          {{ getStatusText(text) }}
        </CTag>
      </template>
    </template>
  </c-table>
</template>

<script setup lang="ts">
import { useTablePagination } from '@/modules-base/utils/useTablePage';
import CTable from '@/modules-base/components/CTable.vue';

const { data, loading, pagination, run, refresh, handleTableChange } = useTablePagination(
  getDataList,
  props.defaultParams
);
</script>
```

#### 列定义规范

```typescript
const columns = [
  {
    title: '序号',
    dataIndex: 'seq',
    width: 60,
    fixed: 'left',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    fixed: 'right',
  },
];
```

### 2. PageSearchBar 搜索栏组件

#### 基础用法

```vue
<template>
  <PageSearchBar
    :search-params="queryRef"
    :form-list="searchFormList"
    @handleSearch="onSearch"
    @handleResetAndSearch="handleResetAndSearch"
  >
    <template #outSearch>
      <a-form-item label="快速查询">
        <a-input v-model:value.trim="queryRef.keyword" />
      </a-form-item>
    </template>

    <template #extraAfter>
      <a-button type="primary" @click="handleAdd">添加</a-button>
    </template>
  </PageSearchBar>
</template>

<script setup lang="ts">
import { useSearchBar } from '@/modules-base/utils/useTablePage';

const searchFormList = computed(() => [
  {
    label: '名称',
    type: 'input',
    key: 'name',
  },
  {
    label: '状态',
    type: 'select',
    key: 'status',
    options: statusOptions,
  },
  {
    label: '创建时间',
    type: 'range-picker',
    key: 'createTime',
  },
]);

const { queryRef, handleSearch, handleResetAndSearch } = useSearchBar({
  props,
  emit,
  searchFormList,
  hasFilterPopover: true,
});
</script>
```

#### 搜索类型

```typescript
type SearchFormItem = {
  key: string;          // 字段名
  label: string;        // 标签文本
  type: 'input' | 'select' | 'range-picker' | 'cascader' | 'tree-select' | 'number-input';
  options?: IOption[];  // 选项（select/cascader/tree-select）
  placeholder?: string; // 占位文本
  mode?: string;        // 模式（multiple）
  disabled?: boolean;   // 是否禁用
};
```

### 3. FormModal 表单弹窗组件

#### 基础用法

```vue
<template>
  <FormModal
    :title="isEdit ? '编辑' : '添加'"
    :confirmLoading="confirmLoading"
    @close="handleClose"
    @submit="handleSubmit"
  >
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
    </a-form>
  </FormModal>
</template>

<script setup lang="ts">
import FormModal from '@/modules-base/components/FormModal.vue';

const modalRef = ref();
const formRef = ref();
const confirmLoading = ref(false);

const open = (record?: any) => {
  modalRef.value?.open();
};

const handleSubmit = async () => {
  await formRef.value?.validateFields();
  confirmLoading.value = true;
  // 提交逻辑
  confirmLoading.value = false;
};

defineExpose({ open });
</script>
```

### 4. CTag 标签组件

```vue
<template>
  <!-- 基础用法 -->
  <CTag color="green">正常</CTag>
  <CTag color="red">异常</CTag>
  <CTag color="orange">警告</CTag>
  
  <!-- 自定义颜色 -->
  <CTag :color="getStatusColor(status)">
    {{ getStatusText(status) }}
  </CTag>
</template>

<script setup lang="ts">
const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    normal: 'green',
    warning: 'orange',
    error: 'red',
  };
  return colorMap[status] || 'default';
};
</script>
```

---

## 代码风格规范

### 1. 命名规范

#### 文件命名

```
// 组件文件：大驼峰
DataList.vue
EditDataModal.vue
TheSearchBar.vue

// TypeScript 文件：小驼峰
useData.ts
dataApi.ts
dataTypes.ts

// 样式文件：小驼峰
dataList.scss
common.scss
```

#### 变量命名

```typescript
// 常量：大写下划线
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 10;

// 变量：小驼峰
const dataList = ref([]);
const searchParams = reactive({});

// 函数：小驼峰
const handleSearch = () => {};
const getDataList = async () => {};

// 组件：大驼峰
const EditModal = ref();
const TableRef = ref();

// 类型：大驼峰
interface DataItem {}
type Status = 'active' | 'inactive';
```

### 2. TypeScript 规范

#### 类型定义

```typescript
// ✅ 推荐：明确的类型定义
interface DataItem {
  id: string;
  name: string;
  status: ItemStatus;
  createTime: string;
}

type ItemStatus = 'active' | 'inactive' | 'pending';

// ✅ 推荐：使用泛型
interface BaseOutput<T> {
  code: number;
  message: string;
  data: T;
}

// ❌ 避免：any 类型
const item: any = {};
```

#### 接口定义

```typescript
// API 响应类型
interface IPaginationRes<T> {
  list: T[];
  total: number;
}

// 表格列类型
interface IColumn {
  title: string;
  dataIndex: string;
  width?: number;
  fixed?: 'left' | 'right';
  customRender?: (params: any) => VNode;
}
```

### 3. Vue 3 Composition API 规范

#### 组件结构

```vue
<template>
  <!-- 模板 -->
</template>

<script setup lang="ts">
// 1. 导入
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 2. Props & Emits
const props = defineProps<{ id: string }>();
const emit = defineEmits(['update', 'delete']);

// 3. 响应式状态
const loading = ref(false);
const data = ref([]);

// 4. 计算属性
const isEmpty = computed(() => data.value.length === 0);

// 5. 方法
const fetchData = async () => {
  loading.value = true;
  // ...
  loading.value = false;
};

// 6. 生命周期
onMounted(() => {
  fetchData();
});

// 7. 暴露给父组件
defineExpose({ fetchData });
</script>

<style scoped lang="scss">
/* 样式 */
</style>
```

#### Hook 使用

```typescript
// ✅ 推荐：使用标准化的 Hook
import { useTablePage, useTablePagination, useSearchBar } from '@/modules-base/utils/useTablePage';

// 页面状态管理
const { defaultParams, search, refresh } = useTablePage({
  sessionKey: Symbol('data-list'),
});

// 表格分页
const { data, loading, pagination, run } = useTablePagination(
  getDataList,
  defaultParams
);

// 搜索栏
const { queryRef, handleSearch } = useSearchBar({
  props,
  emit,
  searchFormList,
});
```

### 4. 代码格式化

#### Prettier 配置

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2
}
```

#### ESLint 配置

```javascript
module.exports = {
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    // 自定义规则
  },
};
```

---

## 页面开发规范

### 1. 页面结构

```
views/
└── data-list/
    ├── index.vue              # 主页面
    ├── components/
    │   ├── TheSearchBar.vue   # 搜索栏
    │   ├── TheTable.vue       # 表格
    │   └── EditModal.vue      # 编辑弹窗
    └── README.md              # 文档
```

### 2. 主页面模板

```vue
<template>
  <div class="page-content">
    <a-card>
      <TheSearchBar
        ref="searchBarRef"
        :defaultParams="defaultParams"
        @search="search"
      />
      <TheTable
        ref="tableRef"
        :defaultParams="defaultParams"
        @refresh="refresh"
        @open-modal="handleOpenModal"
      />
    </a-card>

    <EditModal ref="editModalRef" @submit="refresh" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import TheSearchBar from './components/TheSearchBar.vue';
import TheTable from './components/TheTable.vue';
import EditModal from './components/EditModal.vue';
import { useTablePage } from '@/modules-base/utils/useTablePage';
import { LayoutHeaderRefreshBus } from '@/utils/bus';

type PageQuery = {
  page?: number;
  size?: number;
  keyword?: string;
};

const {
  defaultParams,
  searchBarRef,
  tableRef,
  search,
  refresh,
} = useTablePage<PageQuery>({
  sessionKey: Symbol('data-list'),
  clearSessionOnRouteLeave: true,
});

const editModalRef = ref();

const handleOpenModal = (record?: any) => {
  editModalRef.value?.open(record);
};

LayoutHeaderRefreshBus.on(refresh);
onBeforeUnmount(() => {
  LayoutHeaderRefreshBus.off(refresh);
});
</script>

<style scoped lang="scss">
.page-content {
  padding: 12px;
}
</style>
```

### 3. 路由配置

```typescript
{
  path: '/data_list',
  name: 'data_list',
  component: () => import('../views/data-list/index.vue'),
  meta: { 
    breadcrumbs: ['数据管理', '数据列表'],
    noAuth: false,  // 生产环境需要配置权限
  },
}
```

---

## 最佳实践

### 1. 组件拆分原则

- **单一职责**: 每个组件只负责一个功能
- **可复用性**: 提取可复用的逻辑到 Hook
- **可配置性**: 通过 props 和 slots 提供灵活性

### 2. 性能优化

```typescript
// ✅ 使用 computed 缓存计算结果
const filteredData = computed(() => {
  return data.value.filter(item => item.status === 'active');
});

// ✅ 使用 shallowRef 优化大列表
const data = shallowRef([]);

// ✅ 使用虚拟滚动
<a-table
  :scroll="{ y: 600 }"
  :pagination="false"
/>
```

### 3. 错误处理

```typescript
// ✅ 统一的错误处理
const fetchData = async () => {
  try {
    loading.value = true;
    const { code, data } = await getDataList(params);
    if (code === 0) {
      // 处理数据
    }
  } catch (error) {
    message.error('请求失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
```

### 4. 权限控制

```typescript
// ✅ 使用权限 Hook
import { useAuthChecked } from '@/modules-base/utils/shared';

const hasEditPermission = computed(() => useAuthChecked('data_edit'));

// 模板中使用
<a-button v-if="hasEditPermission" @click="handleEdit">编辑</a-button>
```

### 5. 国际化

```vue
<template>
  <a-button>{{ $t('添加') }}</a-button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const title = t('数据列表');
</script>
```

### 6. 主题适配

```vue
<template>
  <div :class="themeStore.currentTheme">
    <!-- 内容 -->
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/modules-base/store';

const themeStore = useThemeStore();
</script>

<style lang="scss">
// 主题变量
.dark_1 {
  --primary: #7CD8FF;
  --card_bgc: #001529;
}

.dark_2 {
  --primary: #1890ff;
  --card_bgc: #1f1f1f;
}
</style>
```

---

## 开发流程

### 1. 新建页面流程

1. **创建页面目录**
```bash
mkdir -p src/views/data-list/components
```

2. **创建主页面** (index.vue)
3. **创建搜索栏组件** (TheSearchBar.vue)
4. **创建表格组件** (TheTable.vue)
5. **创建编辑弹窗** (EditModal.vue)
6. **添加路由配置**
7. **添加 API 接口**
8. **测试验证**

### 2. 组件开发流程

1. **分析需求**: 确定组件功能和接口
2. **定义类型**: TypeScript 类型定义
3. **实现组件**: 编写组件逻辑
4. **样式设计**: 遵循 UI 规范
5. **文档编写**: 添加使用说明
6. **测试验证**: 功能测试

### 3. API 开发流程

1. **定义类型**: 请求和响应类型
2. **创建 API 函数**: 使用 axios 封装
3. **错误处理**: 统一错误处理
4. **测试验证**: 接口测试

---

## 常见问题

### 1. 如何选择组件？

- **列表页面**: CTable + PageSearchBar + FormModal
- **详情页面**: Descriptions + Card
- **表单页面**: Form + FormModal
- **图表页面**: ECharts 封装组件

### 2. 如何处理复杂业务？

- 使用 Composition API 拆分逻辑
- 提取可复用的 Hook
- 使用 Pinia 管理复杂状态

### 3. 如何优化性能？

- 使用 computed 缓存
- 使用 shallowRef 优化大列表
- 使用虚拟滚动
- 懒加载组件

### 4. 如何保证代码质量？

- 使用 TypeScript 类型检查
- 使用 ESLint + Prettier 格式化
- 编写单元测试
- Code Review

---

## 附录

### 1. 常用工具函数

```typescript
// 时间格式化
import { formatTime } from '@/modules-base/utils/shared';
formatTime(timestamp, 'YYYY-MM-DD HH:mm:ss');

// 选项格式化
import { formatOptions } from '@/modules-base/utils/shared';
const options = formatOptions(data, 'label', 'value');

// 权限检查
import { useAuthChecked } from '@/modules-base/utils/shared';
const hasPermission = useAuthChecked('permission_code');

// 复制功能
import { useCopyBtn } from '@/modules-base/utils/shared';
const { handleCopy } = useCopyBtn();
```

### 2. 常用样式类

```scss
// 间距
.margin-t-12 { margin-top: 12px; }
.margin-r-12 { margin-right: 12px; }
.margin-b-12 { margin-bottom: 12px; }
.margin-l-12 { margin-left: 12px; }

// 字体
.font-s-14 { font-size: 14px; }
.font-w-600 { font-weight: 600; }
.f-black-85 { color: var(--black_o_85); }

// 圆角
.border-r-6 { border-radius: 6px; }

// 卡片
.c-card { 
  background-color: var(--card_bgc);
  border-radius: 6px;
  padding: 12px;
}

// 标签
.c-tag-success { color: var(--success); background-color: var(--successLight2); }
.c-tag-warning { color: var(--warning); background-color: var(--warningLight2); }
.c-tag-error { color: var(--error); background-color: var(--errorLight2); }
```

### 3. 参考资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Ant Design Vue 文档](https://antdv.com/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

---

## 总结

本规范指南旨在帮助 AI 助手开发符合项目标准的前端代码。关键要点：

1. ✅ **使用标准化组件**: CTable、PageSearchBar、FormModal 等
2. ✅ **遵循设计规范**: 颜色、间距、字体、圆角等
3. ✅ **采用模块化架构**: modules-base/modules/modules-ai
4. ✅ **保证类型安全**: 完整的 TypeScript 类型定义
5. ✅ **配置化开发**: 避免硬编码，提高可维护性
6. ✅ **性能优化**: computed、shallowRef、虚拟滚动等
7. ✅ **错误处理**: 统一的错误处理机制
8. ✅ **权限控制**: RBAC 权限体系
9. ✅ **国际化支持**: 中英文双语
10. ✅ **主题适配**: 多主题支持

遵循这些规范，可以确保开发出高质量、可维护、符合项目标准的前端代码。
