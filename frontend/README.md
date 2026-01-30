# Translation Frontend

基于 React 和 Tailwind CSS 的翻译助手前端界面。

## 功能特性

- 🎨 现代化的响应式设计
- 📝 大文本输入框支持中文输入
- 🚀 一键翻译功能 (支持 Ctrl+Enter 快捷键)
- 💡 智能关键词提取和展示
- ⚡ 实时加载状态和错误处理
- 🎯 直观的结果展示界面

## 技术栈

- **React 18** - UI 框架
- **Tailwind CSS 3** - 样式框架
- **Fetch API** - 后端接口调用

## 安装和运行

1. **安装依赖**
```bash
cd frontend
npm install
```

2. **启动开发服务器**
```bash
npm start
```

应用将在 http://localhost:3000 打开

3. **构建生产版本**
```bash
npm run build
```

## 使用说明

### 界面组件

1. **标题区域** - 居中显示应用标题和说明
2. **输入区域** - 大型文本框，支持多行中文输入
3. **翻译按钮** - 点击或使用 Ctrl+Enter 触发翻译
4. **结果展示** - 翻译结果和关键词卡片

### 操作流程

1. 在输入框中输入中文文本
2. 点击"开始翻译"按钮或使用 Ctrl+Enter 快捷键
3. 等待翻译完成（会显示加载动画）
4. 查看翻译结果和提取的关键词

### 错误处理

- 空输入检测
- 网络错误提示
- 后端服务异常处理

## 项目结构

```
frontend/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── App.js             # 主组件
│   ├── index.js           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind 配置
└── postcss.config.js      # PostCSS 配置
```

## API 接口

调用后端接口 `http://localhost:8000/translate`

**请求格式:**
```json
{
  "text": "要翻译的中文内容"
}
```

**响应格式:**
```json
{
  "translation": "英文翻译结果",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}
```

## 自定义配置

### 修改 API 地址

在 `src/App.js` 中修改 `fetch` 的 URL:

```javascript
const response = await fetch('http://your-api-host:port/translate', {
  // ...
});
```

### 样式自定义

编辑 `tailwind.config.js` 来自定义主题：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 自定义颜色
      },
      // 其他自定义样式
    },
  },
}
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

1. 确保后端服务已启动 (http://localhost:8000)
2. 后端需要配置 CORS 允许前端访问
3. 建议使用现代浏览器以获得最佳体验
