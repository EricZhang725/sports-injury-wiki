'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import { useLanguage } from '@/app/context/LanguageContext';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  tags: string[];
  comments: {
    _id: string;
    user: {
      _id: string;
      username: string;
    };
    content: string;
    createdAt: string;
  }[];
  likes: string[];
  views: number;
  createdAt: string;
}

// 客户端组件，不直接接收params
function PostContent({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      try {
        console.log('正在获取帖子数据:', postId);
        setLoading(true);
        
        const response = await fetch(`/api/community/posts/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('获取帖子失败 状态码:', response.status, errorData);
          throw new Error(errorData.message || t('post_fetch_error'));
        }
        
        const data = await response.json();
        console.log('成功获取帖子数据:', data);
        setPost(data);
      } catch (err) {
        console.error('获取帖子失败:', err);
        setError(err instanceof Error ? err.message : t('post_fetch_error'));
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchPost();
    } else {
      setLoading(false);
      setError(t('login_required'));
    }
  }, [postId, session, t]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t('comment_error'));
      }

      // 刷新帖子数据
      const updatedPost = await response.json();
      setPost(updatedPost);
      setComment('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('comment_error_retry'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm(t('confirm_delete_comment'))) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t('delete_error'));
      }

      // 刷新帖子数据
      const updatedPost = await fetch(`/api/community/posts/${postId}`).then(res => res.json());
      setPost(updatedPost);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('delete_error_retry'));
    }
  };

  const handleDeletePost = async () => {
    if (!confirm(t('confirm_delete_post'))) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t('post_delete_error'));
      }

      // 删除成功，返回社区页面
      router.push('/community');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('post_delete_error_retry'));
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">{t('post_not_exist')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
              {session?.user.id === post.author._id && (
                <button
                  onClick={handleDeletePost}
                  disabled={deleting}
                  className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition-colors"
                >
                  {deleting ? t('deleting') : t('delete_post')}
                </button>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{t('author')}: {post.author.username}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{t('views')}: {post.views}</span>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              {post.content}
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('comments')} ({post.comments.length})</h2>
            
            {session ? (
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('write_comment')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {submitting ? t('submitting') : t('submit_comment')}
                </button>
              </form>
            ) : (
              <div className="mb-6 text-center">
                <p className="text-gray-600">{t('login_to_comment')}</p>
                <button
                  onClick={() => router.push('/login')}
                  className="text-indigo-600 hover:text-indigo-500 mt-2"
                >
                  {t('login')}
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment._id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{comment.user.username}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                      {(session?.user.id === comment.user._id || session?.user.id === post.author._id) && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          {t('delete')}
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 页面组件，从params中安全提取id并传递给客户端组件
export default function PostDetail({ params }: { params: { id: string } }) {
  // 从params安全地提取id
  const id = params?.id || '';
  
  // 将id传递给客户端组件
  return <PostContent postId={id} />;
} 