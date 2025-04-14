'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';

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

export default function PostDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/community/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('获取帖子失败');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取帖子失败');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/community/posts/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '评论失败');
      }

      // 刷新帖子数据
      const updatedPost = await response.json();
      setPost(updatedPost);
      setComment('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '评论失败，请稍后再试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('确定要删除这条评论吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${params.id}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '删除失败');
      }

      // 刷新帖子数据
      const updatedPost = await fetch(`/api/community/posts/${params.id}`).then(res => res.json());
      setPost(updatedPost);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败，请稍后再试');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">加载中...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">帖子不存在</div>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>作者: {post.author.username}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>浏览: {post.views}</span>
            </div>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">评论 ({post.comments.length})</h2>
            
            {session ? (
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="写下你的评论..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {submitting ? '提交中...' : '提交评论'}
                </button>
              </form>
            ) : (
              <div className="mb-6 text-center">
                <p className="text-gray-600">请登录后发表评论</p>
                <button
                  onClick={() => router.push('/login')}
                  className="text-indigo-600 hover:text-indigo-500 mt-2"
                >
                  登录
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
                          删除
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
                </button>
              </form>
            ) : (
              <div className="mb-6 text-center">
                <p className="text-gray-600">请登录后发表评论</p>
                <button
                  onClick={() => router.push('/login')}
                  className="text-indigo-600 hover:text-indigo-500 mt-2"
                >
                  登录
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
                          删除
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