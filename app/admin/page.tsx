'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { dbConnect } from '@/app/lib/db';
import AdminUserManager from '@/app/components/AdminUserManager';
import AdminMessages from '@/app/components/AdminMessages';

export default function AdminPanel() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login?callbackUrl=/admin');
    },
  });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'users' | 'messages'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        // 如果用户不是管理员，重定向到首页
        router.push('/');
        return;
      }
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">管理员控制面板</h1>

          {/* 标签页导航 */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 border-b-2 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                用户管理
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-6 border-b-2 text-sm font-medium ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                消息管理
              </button>
            </nav>
          </div>

          {/* 标签页内容 */}
          <div>
            {activeTab === 'users' && <AdminUserManager />}
            {activeTab === 'messages' && <AdminMessages />}
          </div>
        </div>
      </div>
    </div>
  );
} 
                }`}
              >
                消息管理
              </button>
            </nav>
          </div>

          {/* 标签页内容 */}
          <div>
            {activeTab === 'users' && <AdminUserManager />}
            {activeTab === 'messages' && <AdminMessages />}
          </div>
        </div>
      </div>
    </div>
  );
} 