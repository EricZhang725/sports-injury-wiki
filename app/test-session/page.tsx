'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navigation from '@/app/components/Navigation';

export default function TestSession() {
  const { data: session, status } = useSession();
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    // 测试调用 API
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => {
          return res.json().then(data => ({ status: res.status, data }));
        })
        .then(result => {
          setApiResponse(result);
        })
        .catch(error => {
          setApiResponse({ error: error.message });
        });
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">会话测试页面</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">会话状态</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p className="mb-2"><strong>状态:</strong> {status}</p>
              {status === 'authenticated' && (
                <div>
                  <p className="mb-1"><strong>用户名:</strong> {session?.user?.username}</p>
                  <p className="mb-1"><strong>邮箱:</strong> {session?.user?.email}</p>
                  <p className="mb-1"><strong>角色:</strong> {session?.user?.role}</p>
                </div>
              )}
            </div>
          </div>
          
          {apiResponse && (
            <div>
              <h2 className="text-xl font-semibold mb-2">API 测试结果</h2>
              <div className="bg-gray-100 p-4 rounded">
                <p className="mb-2"><strong>状态码:</strong> {apiResponse.status}</p>
                <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
                  {JSON.stringify(apiResponse.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <a 
              href="/profile" 
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              尝试访问个人资料
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 