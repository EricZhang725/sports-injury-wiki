'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  UserIcon, 
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  EyeIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MyPosts from '@/app/components/MyPosts';
import { useLanguage } from '../context/LanguageContext';

interface UserProfile {
  username: string;
  email: string;
  signature: string;
  birthday: string;
  favorites: Array<{
    id: string;
    title: string;
    type: string;
    createdAt: string;
  }>;
  history: Array<{
    id: string;
    title: string;
    type: string;
    viewedAt: string;
  }>;
  role?: string;
}

// 动态导入管理员组件，避免不必要的加载
const AdminMessages = dynamic(() => import('@/app/components/AdminMessages'), {
  ssr: false,
  loading: () => <div className="text-center py-10">加载消息组件中...</div>
});

const AdminUserManager = dynamic(() => import('@/app/components/AdminUserManager'), {
  ssr: false,
  loading: () => <div className="text-center py-10">加载用户管理组件中...</div>
});

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    signature: '',
    birthday: '',
  });
  const [activeTab, setActiveTab] = useState<'info' | 'favorites' | 'history' | 'messages' | 'users' | 'my-posts'>('info');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user) {
      fetchUserProfile();
      fetchUserPosts();
    }
  }, [status, session, router]);

  const fetchUserProfile = async () => {
    try {
      console.log('开始获取用户资料...');
      const response = await fetch('/api/profile');
      
      console.log('API响应状态:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('获取个人资料失败:', errorData);
        throw new Error(errorData.error || '获取个人资料失败');
      }
      
      const data = await response.json();
      console.log('获取到的用户资料:', data);
      setProfile(data);
      setEditForm({
        signature: data.signature || '',
        birthday: data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : '',
      });
    } catch (err) {
      console.error('加载个人资料时出错:', err);
      setError(err instanceof Error ? err.message : '加载个人资料时出错');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/api/community/posts/my-posts');
      if (!response.ok) {
        throw new Error(t('failed_to_fetch_posts'));
      }
      const data = await response.json();
      setUserPosts(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('提交更新:', editForm);
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新个人资料失败');
      }

      const updatedProfile = await response.json();
      console.log('更新后的资料:', updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('更新个人资料时出错:', err);
      setError(err instanceof Error ? err.message : '更新个人资料时出错');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    console.log('Checking isAdmin:');
    console.log(' - Session user role:', session?.user?.role);
    console.log(' - Profile role:', profile?.role);
    console.log(' - Is admin from session?', session?.user?.role === 'admin');
    console.log(' - Is admin from profile?', profile?.role === 'admin');
    return session?.user?.role === 'admin' || profile?.role === 'admin';
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <UserCircleIcon className="h-8 w-8" />
                {t('user_profile')}
              </h1>
            </div>
            
            {error && (
              <div className="mt-4 mx-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Profile Information Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Account Information */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <UserIcon className="h-6 w-6 text-blue-600" />
                    {t('account_info')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">{t('username')}</div>
                        <div className="text-lg text-gray-900">{session.user.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">{t('email_label')}</div>
                        <div className="text-lg text-gray-900">{session.user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">{t('role')}</div>
                        <div className="text-lg text-gray-900">
                          {session.user.role === 'admin' ? t('admin') : t('user')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <PencilSquareIcon className="h-6 w-6 text-blue-600" />
                    {t('account_actions')}
                  </h2>
                  <div className="space-y-4">
                    <button
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() => router.push('/community/new')}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      {t('create_new_post')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
                {t('your_posts')}
              </h2>
            </div>
            
            <div className="p-6">
              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{t('no_posts_yet')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {userPosts.map((post: any) => (
                    <div key={post._id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          {post.comments?.length || 0} {t('comments')}
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="h-4 w-4" />
                          {post.likes?.length || 0} {t('likes')}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          onClick={() => router.push(`/community/post/${post._id}`)}
                        >
                          <EyeIcon className="h-4 w-4" />
                          {t('view_post')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
  );
} 