# Flutter 翻译助手前端

基于 Flutter 开发的翻译助手移动应用，连接本地 FastAPI 后端服务进行中英文翻译和关键词提取。

## 功能特性

- 🎯 **居中标题设计** - 美观的应用标题展示
- 📝 **大型输入框** - 便于输入中文文本的多行输入框
- 🔄 **一键翻译** - 点击按钮即可调用后端 API 进行翻译
- 📄 **翻译结果显示** - 清晰展示英文翻译结果
- 🏷️ **关键词卡片** - 以卡片形式展示提取的关键词
- ⚡ **实时加载状态** - 翻译过程中显示加载动画
- 🚫 **错误处理** - 网络错误和 API 错误的友好提示

## 环境要求

- Flutter SDK 3.0.0 或更高版本
- Dart SDK 3.0.0 或更高版本
- 本地运行的 FastAPI 后端（端口 8000）

## 安装和运行

1. **确保 Flutter 环境已安装**
```bash
flutter --version
```

2. **获取依赖包**
```bash
flutter pub get
```

3. **启动后端服务**
确保 FastAPI 后端正在 http://localhost:8000 运行

4. **运行 Flutter 应用**
```bash
flutter run
```

## 项目结构

```
frontend/
├── main.dart          # 主应用文件
├── pubspec.yaml       # Flutter 依赖配置
└── README.md          # 项目说明文档
```

## API 集成

应用连接到本地 FastAPI 后端：
- **后端地址**: `http://localhost:8000`
- **翻译接口**: `POST /translate`
- **请求格式**: `{"text": "中文内容"}`
- **响应格式**: `{"translation": "英文翻译", "keywords": ["关键词1", "关键词2", "关键词3"]}`

## 主要 Widget

### TranslationHomePage
主页面组件，包含：
- 应用标题
- 文本输入区域
- 翻译按钮
- 结果显示区域
- 关键词卡片

### 关键功能
- `_translateText()` - 调用后端 API 进行翻译
- `_buildKeywordCard()` - 构建关键词卡片 UI
- 状态管理：加载状态、错误处理、结果显示

## 依赖包

- `flutter` - Flutter 框架
- `http ^1.1.0` - HTTP 客户端，用于 API 调用
- `cupertino_icons ^1.0.2` - iOS 风格图标

## 使用说明

1. 在输入框中输入要翻译的中文文本
2. 点击"开始翻译"按钮
3. 等待翻译完成（显示加载动画）
4. 查看翻译结果和关键词卡片
5. 如有错误会显示相应的错误信息

## 注意事项

- 确保手机/模拟器能访问 localhost:8000
- 如果使用物理设备测试，可能需要修改 API 地址为电脑的局域网 IP
- 网络错误时会显示友好的错误提示
