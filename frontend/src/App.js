import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('请输入需要翻译的中文内容');
      return;
    }

    setLoading(true);
    setError('');
    setTranslation('');
    setKeywords([]);

    try {
      const response = await fetch('http://localhost:8000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranslation(data.translation);
      setKeywords(data.keywords || []);
    } catch (err) {
      setError('翻译失败，请检查网络连接或后端服务是否正常运行');
      console.error('Translation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            智能翻译助手
          </h1>
          <p className="text-gray-600 text-lg">
            中文到英文的智能翻译，自动提取关键词
          </p>
        </div>

        {/* 主要翻译界面 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* 输入区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              请输入中文内容
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入需要翻译的中文文本... (Ctrl+Enter 快速翻译)"
              className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 resize-none text-lg leading-relaxed transition-colors duration-200"
            />
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500">
                {inputText.length} 字符
              </span>
            </div>
          </div>

          {/* 翻译按钮 */}
          <div className="text-center mb-8">
            <button
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  翻译中...
                </div>
              ) : (
                '开始翻译'
              )}
            </button>
          </div>

          {/* 错误信息 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* 翻译结果 */}
          {translation && (
            <div className="space-y-6">
              {/* 翻译文本 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  翻译结果
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {translation}
                  </p>
                </div>
              </div>

              {/* 关键词卡片 */}
              {keywords.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    关键词
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {keywords.filter(keyword => keyword.trim()).map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition-transform duration-200"
                      >
                        <span className="font-medium">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="text-center text-gray-500 text-sm">
          <p>💡 提示：输入中文文本后点击翻译按钮，或使用 Ctrl+Enter 快捷键</p>
          <p className="mt-1">支持长文本翻译，AI 将自动提取3个核心关键词</p>
        </div>
      </div>
    </div>
  );
}

export default App;
