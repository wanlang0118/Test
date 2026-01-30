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
copy .env.example .env

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

## API 接口

### POST /translate

翻译中文文本为英文并提取关键词。

**请求格式：**
```json
{
    "text": "要翻译的中文内容"
}
```

**返回格式：**
```json
{
    "translation": "英文翻译结果",
    "keywords": ["关键词1", "关键词2", "关键词3"]
}
```

**示例请求：**
```bash
curl -X POST "http://localhost:8000/translate" \
     -H "Content-Type: application/json" \
     -d '{"text": "人工智能技术在现代社会中发挥着越来越重要的作用"}'
```

**示例响应：**
```json
{
    "translation": "Artificial intelligence technology plays an increasingly important role in modern society",
    "keywords": ["人工智能", "技术", "现代社会"]
}
```

### GET /

查看 API 状态信息。

### GET /health

健康检查接口。

## 其他端点

- **API 文档**: http://localhost:8000/docs
- **ReDoc 文档**: http://localhost:8000/redoc

## 错误处理

API 会返回适当的 HTTP 状态码和错误信息：

- `400 Bad Request`: 输入文本为空
- `500 Internal Server Error`: API 调用失败或其他内部错误

## 获取 DeepSeek API 密钥

1. 访问 [DeepSeek 官网](https://www.deepseek.com/)
2. 注册账户并获取 API 密钥
3. 将密钥添加到 `.env` 文件中

## 技术栈

- **FastAPI**: Web 框架
- **OpenAI Python SDK**: 与 DeepSeek API 交互
- **Pydantic**: 数据验证
- **Uvicorn**: ASGI 服务器
