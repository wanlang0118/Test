# Translation API

基于 FastAPI 的中英文翻译服务，使用 DeepSeek API 进行翻译并提取关键词。

## 功能特性

- 中文到英文翻译
- 自动提取3个关键词
- 支持 CORS 跨域访问
- RESTful API 接口
- 错误处理和输入验证

## 安装和设置

1. **安装依赖**
```bash
pip install -r requirements.txt
```

2. **配置 API 密钥**
```bash
# 复制环境变量模板
copy .env .env

# 编辑 .env 文件，添加你的 DeepSeek API 密钥
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

3. **启动服务**
```bash
python main.py
```

或使用 uvicorn 启动：
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```




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
