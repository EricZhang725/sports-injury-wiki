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
    username: string;
  };
  comments: {
    _id: string;
    user: {
      username: string;
    };
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export default function MyComments() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/community/posts/my-posts');
        if (!response.ok) {
          throw new Error('获取帖子失败');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取帖子失败');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserPosts();
    }
  }, [session]);

  const handleDeletePost = async (postId: string) => {
    if (!confirm('确定要删除这篇帖子吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '删除失败');
      }

      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败，请稍后再试');
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!confirm('确定要删除这条评论吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '删除失败');
      }

      // 更新帖子列表
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: post.comments.filter(comment => comment._id !== commentId)
          };
        }
        return post;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败，请稍后再试');
    }
  };

  if (!session) {
    router.push('/login');
    return null;
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">我的帖子与评论</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <a
                      href={`/community/${post._id}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.title}
                    </a>
                  </h2>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除帖子
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="text-sm text-gray-500 mb-4">
                  发布于 {new Date(post.createdAt).toLocaleDateString()}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">我的评论</h3>
                  {post.comments
                    .filter(comment => comment.user.username === session.user.username)
                    .map((comment) => (
                      <div key={comment._id} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-700">{comment.content}</p>
                          <button
                            onClick={() => handleDeleteComment(post._id, comment._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            删除
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          发布于 {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  comments: {
    _id: string;
    user: {
      username: string;
    };
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export default function MyComments() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/community/posts/my-posts');
        if (!response.ok) {
          throw new Error('获取帖子失败');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取帖子失败');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserPosts();
    }
  }, [session]);

  const handleDeletePost = async (postId: string) => {
    if (!confirm('确定要删除这篇帖子吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '删除失败');
      }

      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败，请稍后再试');
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!confirm('确定要删除这条评论吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '删除失败');
      }

      // 更新帖子列表
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: post.comments.filter(comment => comment._id !== commentId)
          };
        }
        return post;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败，请稍后再试');
    }
  };

  if (!session) {
    router.push('/login');
    return null;
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">我的帖子与评论</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <a
                      href={`/community/${post._id}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.title}
                    </a>
                  </h2>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除帖子
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="text-sm text-gray-500 mb-4">
                  发布于 {new Date(post.createdAt).toLocaleDateString()}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">我的评论</h3>
                  {post.comments
                    .filter(comment => comment.user.username === session.user.username)
                    .map((comment) => (
                      <div key={comment._id} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-700">{comment.content}</p>
                          <button
                            onClick={() => handleDeleteComment(post._id, comment._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            删除
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          发布于 {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 