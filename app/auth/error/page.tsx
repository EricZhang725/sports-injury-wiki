'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  useEffect(() => {
    const errorParam = searchParams?.get('error');
    const errorDesc = searchParams?.get('error_description');
    
    setError(errorParam);
    
    // 记录错误和调试信息
    if (errorParam) {
      console.error('Authentication error:', errorParam);
      if (errorDesc) {
        console.error('Error description:', errorDesc);
      }
      
      // 存储调试信息
      setDebugInfo({
        error: errorParam,
        description: errorDesc || '无附加描述',
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
  }, [searchParams]);
  
  const getErrorMessage = (errorCode: string | null) => {
    if (!errorCode) {
      return '身份验证过程中发生未知错误。请重试或联系管理员。';
    }
    
    switch (errorCode) {
      case 'CredentialsSignin':
        return '用户名或密码不正确。请检查您的凭据并重试。';
      case 'SessionRequired':
        return '您需要登录才能访问此页面。';
      case 'AccessDenied':
        return '您没有权限访问此页面。';
      case 'CallbackRouteError':
        return '登录过程中出现问题。请重试。';
      case 'OAuthAccountNotLinked':
        return '此电子邮件已存在于系统中。请使用另一个登录方法。';
      case 'EmailSignin':
        return '发送登录链接时出错。请检查您的电子邮件并重试。';
      case 'Configuration':
        return '服务器配置错误。请联系管理员。';
      case 'CLIENT_FETCH_ERROR':
        return '无法连接到认证服务器。请检查您的网络连接并重试。';
      case 'undefined':
      case undefined:
        return '身份验证服务器暂时不可用。请稍后再试或联系管理员。';
      default:
        return '身份验证过程中发生错误。请重试或联系管理员。';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              身份验证错误
            </h2>
          </div>
          
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">错误:</strong>
            <span className="block sm:inline ml-2">
              {getErrorMessage(error)}
            </span>
            
            {error && (
              <div className="mt-2 text-sm text-gray-600">
                错误代码: {error === 'undefined' ? '服务器通信错误' : error}
              </div>
            )}
          </div>
          
          <div className="mt-6 flex flex-col space-y-4">
            <Link 
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              返回登录
            </Link>
            
            <Link 
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              返回首页
            </Link>
          </div>
          
          {debugInfo && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 text-xs bg-gray-100 rounded-md">
              <h3 className="font-bold mb-2">调试信息:</h3>
              <pre className="overflow-auto max-h-40">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 