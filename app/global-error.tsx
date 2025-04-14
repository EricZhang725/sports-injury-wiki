'use client';

import { useEffect, useState } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 简单的语言选择器，因为我们在全局错误状态下无法访问本地存储
  const [language, setLanguage] = useState('zh-CN');
  
  // 翻译函数
  const getErrorText = () => {
    switch(language) {
      case 'en':
        return {
          title: 'Something went wrong!',
          message: 'A critical error occurred. Please try refreshing the page.',
          retry: 'Try again',
          language: 'Language:'
        };
      case 'zh-TW':
        return {
          title: '出現嚴重錯誤！',
          message: '發生了嚴重錯誤。請嘗試刷新頁面。',
          retry: '重試',
          language: '語言:'
        };
      default:
        return {
          title: '出现严重错误！',
          message: '发生了严重错误。请尝试刷新页面。',
          retry: '重试',
          language: '语言:'
        };
    }
  };
  
  const errorText = getErrorText();
  
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="text-5xl font-bold text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{errorText.title}</h2>
          <p className="text-gray-600 mb-8 text-center">{errorText.message}</p>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">{errorText.language}</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('zh-CN')}
                className={`px-3 py-1 rounded-md ${language === 'zh-CN' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                简体中文
              </button>
              <button 
                onClick={() => setLanguage('zh-TW')}
                className={`px-3 py-1 rounded-md ${language === 'zh-TW' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                繁體中文
              </button>
            </div>
          </div>
          
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {errorText.retry}
          </button>
        </div>
      </body>
    </html>
  );
} 

import { useEffect, useState } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 简单的语言选择器，因为我们在全局错误状态下无法访问本地存储
  const [language, setLanguage] = useState('zh-CN');
  
  // 翻译函数
  const getErrorText = () => {
    switch(language) {
      case 'en':
        return {
          title: 'Something went wrong!',
          message: 'A critical error occurred. Please try refreshing the page.',
          retry: 'Try again',
          language: 'Language:'
        };
      case 'zh-TW':
        return {
          title: '出現嚴重錯誤！',
          message: '發生了嚴重錯誤。請嘗試刷新頁面。',
          retry: '重試',
          language: '語言:'
        };
      default:
        return {
          title: '出现严重错误！',
          message: '发生了严重错误。请尝试刷新页面。',
          retry: '重试',
          language: '语言:'
        };
    }
  };
  
  const errorText = getErrorText();
  
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="text-5xl font-bold text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{errorText.title}</h2>
          <p className="text-gray-600 mb-8 text-center">{errorText.message}</p>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">{errorText.language}</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('zh-CN')}
                className={`px-3 py-1 rounded-md ${language === 'zh-CN' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                简体中文
              </button>
              <button 
                onClick={() => setLanguage('zh-TW')}
                className={`px-3 py-1 rounded-md ${language === 'zh-TW' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                繁體中文
              </button>
            </div>
          </div>
          
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {errorText.retry}
          </button>
        </div>
      </body>
    </html>
  );
} 