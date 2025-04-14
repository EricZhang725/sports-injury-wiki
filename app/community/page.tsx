'use client';

import { useState, useEffect, Component, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// 定义错误边界的属性和状态类型
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// 错误边界组件
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新状态，下次渲染时显示错误UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 记录错误信息
    console.error("社区页面错误:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 自定义错误展示UI
      return (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">页面出现错误</h2>
            <p className="mb-4 text-gray-700">加载社区页面时出现问题。错误类型: {this.state.error?.name}</p>
            <p className="mb-4 text-gray-700">错误信息: {this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              重试
            </button>
          </div>
        </div>
      );
    }

    // 如果没有错误，正常渲染子组件
    return this.props.children;
  }
}

// 定义支持的语言
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
];

// 定义翻译内容
const translations = {
  'community_forum': {
    'en': 'Community Forum',
    'zh-CN': '社区论坛',
    'zh-TW': '社區論壇'
  },
  'loading': {
    'en': 'Loading...',
    'zh-CN': '加载中...',
    'zh-TW': '載入中...'
  },
  'new_post': {
    'en': 'Create New Post',
    'zh-CN': '发布新帖子',
    'zh-TW': '發布新帖子'
  },
  'post_author': {
    'en': 'Author:',
    'zh-CN': '作者:',
    'zh-TW': '作者:'
  },
  'post_comments': {
    'en': 'Comments:',
    'zh-CN': '评论:',
    'zh-TW': '評論:'
  },
  'post_views': {
    'en': 'Views:',
    'zh-CN': '浏览:',
    'zh-TW': '瀏覽:'
  },
  'likes': {
    'en': 'Likes:',
    'zh-CN': '赞:',
    'zh-TW': '讚:'
  },
  'fetch_posts_error': {
    'en': 'Failed to fetch posts',
    'zh-CN': '获取帖子失败',
    'zh-TW': '獲取帖子失敗'
  },
  'please_login': {
    'en': 'Please login to create a new post',
    'zh-CN': '请登录后发布新帖子',
    'zh-TW': '請登錄後發布新帖子'
  },
  'login': {
    'en': 'Login',
    'zh-CN': '登录',
    'zh-TW': '登錄'
  },
  'tags': {
    'en': 'Tags:',
    'zh-CN': '标签:',
    'zh-TW': '標籤:'
  }
};

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  tags: string[];
  comments: number | Array<{
    _id: string;
    user: {
      _id: string;
      username: string;
    };
    content: string;
    createdAt: string;
  }>;
  views: number;
  likes: number;
  createdAt: string;
}

export default function CommunityPage() {
  try {
    return (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    );
  } catch (error) {
    // 处理任何意外错误
    console.error("无法渲染社区页面:", error);
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">页面加载失败</h2>
          <p className="mb-4 text-gray-700">
            无法加载社区页面，请刷新页面重试。如果问题持续存在，请联系管理员。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }
}

function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  
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
  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language as keyof typeof translations[keyof typeof translations]] || key;
  };
  
  // 改变语言
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // 更新 HTML 的 lang 属性
    if (document) {
      document.documentElement.lang = lang === 'en' ? 'en' : 
                                      lang === 'zh-TW' ? 'zh-Hant' : 'zh-Hans';
    }
  };

  useEffect(() => {
    // 获取帖子数据
    fetch('/api/community/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // 确保数据格式正确
        const formattedPosts = data.posts.map(post => ({
          ...post,
          // 如果comments是数组则保留，否则确保是数字
          comments: Array.isArray(post.comments) ? post.comments : (post.comments || 0)
        }));
        setPosts(formattedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(t('fetch_posts_error'));
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 语言选择器 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <div className="relative inline-block text-left">
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-3 py-1 rounded-md ${language === lang.code ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('community_forum')}</h1>
          {session ? (
            <Link href="/community/new" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              {t('new_post')}
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{t('please_login')}</span>
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                {t('login')}
              </Link>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-xl">{t('loading')}</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link href={`/community/post/${post._id}`} key={post._id} className="block">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 line-clamp-1">{post.title}</div>
                    <p className="text-gray-700 text-base line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                  <div className="px-6 pt-2 pb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {t('post_author')} {post.author.username}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex text-xs text-gray-500 space-x-4">
                      <span>{t('post_comments')} {Array.isArray(post.comments) ? post.comments.length : post.comments}</span>
                      <span>{t('post_views')} {post.views}</span>
                      <span>{t('likes')} {post.likes}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }
}

function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  
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
  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language as keyof typeof translations[keyof typeof translations]] || key;
  };
  
  // 改变语言
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // 更新 HTML 的 lang 属性
    if (document) {
      document.documentElement.lang = lang === 'en' ? 'en' : 
                                      lang === 'zh-TW' ? 'zh-Hant' : 'zh-Hans';
    }
  };

  useEffect(() => {
    // 获取帖子数据
    fetch('/api/community/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // 确保数据格式正确
        const formattedPosts = data.posts.map(post => ({
          ...post,
          // 如果comments是数组则保留，否则确保是数字
          comments: Array.isArray(post.comments) ? post.comments : (post.comments || 0)
        }));
        setPosts(formattedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(t('fetch_posts_error'));
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 语言选择器 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <div className="relative inline-block text-left">
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-3 py-1 rounded-md ${language === lang.code ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('community_forum')}</h1>
          {session ? (
            <Link href="/community/new" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              {t('new_post')}
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{t('please_login')}</span>
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                {t('login')}
              </Link>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-xl">{t('loading')}</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link href={`/community/post/${post._id}`} key={post._id} className="block">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 line-clamp-1">{post.title}</div>
                    <p className="text-gray-700 text-base line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                  <div className="px-6 pt-2 pb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {t('post_author')} {post.author.username}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex text-xs text-gray-500 space-x-4">
                      <span>{t('post_comments')} {Array.isArray(post.comments) ? post.comments.length : post.comments}</span>
                      <span>{t('post_views')} {post.views}</span>
                      <span>{t('likes')} {post.likes}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 