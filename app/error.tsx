'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          title: 'Something went wrong!',
          message: 'An error occurred. Please try again later.',
          retry: 'Try again',
          home: 'Return to Home'
        };
      case 'zh-TW':
        return {
          title: '出現錯誤！',
          message: '發生了一個錯誤。請稍後再試。',
          retry: '重試',
          home: '返回首頁'
        };
      default:
        return {
          title: '出现错误！',
          message: '发生了一个错误。请稍后再试。',
          retry: '重试',
          home: '返回首页'
        };
    }
  };
  
  const errorText = getErrorText();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-5xl font-bold text-red-500 mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{errorText.title}</h2>
      <p className="text-gray-600 mb-8 text-center">{errorText.message}</p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {errorText.retry}
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
          {errorText.home}
        </Link>
      </div>
    </div>
  );
} 

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          title: 'Something went wrong!',
          message: 'An error occurred. Please try again later.',
          retry: 'Try again',
          home: 'Return to Home'
        };
      case 'zh-TW':
        return {
          title: '出現錯誤！',
          message: '發生了一個錯誤。請稍後再試。',
          retry: '重試',
          home: '返回首頁'
        };
      default:
        return {
          title: '出现错误！',
          message: '发生了一个错误。请稍后再试。',
          retry: '重试',
          home: '返回首页'
        };
    }
  };
  
  const errorText = getErrorText();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-5xl font-bold text-red-500 mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{errorText.title}</h2>
      <p className="text-gray-600 mb-8 text-center">{errorText.message}</p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {errorText.retry}
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
          {errorText.home}
        </Link>
      </div>
    </div>
  );
} 