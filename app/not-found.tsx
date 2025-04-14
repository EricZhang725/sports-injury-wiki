'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  // 获取当前语言，默认简体中文
  const [language, setLanguage] = useState('zh-CN');
  
  // 加载保存的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'zh-CN', 'zh-TW'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // 翻译函数
  const getErrorText = () => {
    switch(language) {
      case 'en':
        return {
          title: '404 - Page Not Found',
          message: 'Sorry, the page you are looking for does not exist.',
          link: 'Return to Home'
        };
      case 'zh-TW':
        return {
          title: '404 - 頁面未找到',
          message: '抱歉，您尋找的頁面不存在。',
          link: '返回首頁'
        };
      default:
        return {
          title: '404 - 页面未找到',
          message: '抱歉，您查找的页面不存在。',
          link: '返回首页'
        };
    }
  };
  
  const errorText = getErrorText();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-6xl font-bold text-blue-500 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{errorText.title}</h1>
      <p className="text-gray-600 mb-8 text-center">{errorText.message}</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
        {errorText.link}
      </Link>
    </div>
  );
} 