'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    // 打印当前session状态用于调试
    console.log("Session status:", status, session);
    
    if (status === 'authenticated' && session) {
      console.log("已登录，重定向中...", session);
      const callbackUrl = searchParams?.get('callbackUrl') || '/';
      router.push(callbackUrl);
    }
  }, [status, router, searchParams, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo(null);

    if (!username || !password) {
      setError(t('all_fields_required'));
      setLoading(false);
      return;
    }

    try {
      console.log("尝试使用NextAuth登录...", { username });
      
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      
      console.log("登录响应:", res);
      setDebugInfo({ nextAuthResponse: res });

      if (res?.error) {
        console.error("登录失败:", res.error);
        setError(res.error === "CredentialsSignin" 
          ? t('invalid_credentials') 
          : t('login_error'));
      } else if (res?.ok) {
        console.log("登录成功，重定向中...");
        const callbackUrl = searchParams?.get('callbackUrl') || '/';
        router.push(callbackUrl);
      } else {
        console.error("未知登录错误");
        setError(t('login_error'));
      }
    } catch (err) {
      console.error('登录错误:', err);
      setError(t('login_error'));
      setDebugInfo({ error: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {t('login')}
            </h2>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t('username_or_email')}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password_label')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? t('logging_in') : t('login')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="flex justify-center text-sm">
                <Link 
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t('need_account')}
                </Link>
              </div>
            </div>
          </div>
          
          {debugInfo && (
            <div className="mt-6 text-xs text-gray-500 border-t pt-4">
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