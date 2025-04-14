'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface Comment {
  _id: string;
  postId: string;
  postTitle: string;
  content: string;
  createdAt: string;
}

export default function MyPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  useEffect(() => {
    // 首先确保会话已经加载完成
    if (session === undefined) {
      // 会话还在加载中，不做任何处理
      return;
    }
    
    if (session?.user?.id) {
      // 用户已登录，加载数据时重置错误和状态
      console.log('用户已登录，ID:', session.user.id);
      setError(null);
      setLoading(true);
      
      // 首先加载帖子，然后再加载评论
      fetchMyPosts()
        .then(() => fetchMyComments())
        .catch(err => {
          console.error('加载数据失败:', err);
          setError('加载数据失败，请稍后再试');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (session === null) {
      // 会话已加载，但用户未登录
      console.log('用户未登录');
      setLoading(false);
      setError('请先登录');
    }
  }, [session]);

  const fetchMyPosts = async () => {
    try {
      console.log('正在获取我的帖子...');
      const response = await fetch('/api/community/posts/my-posts', {
        // 添加缓存控制，防止缓存问题
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('获取帖子失败，状态码:', response.status);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '获取帖子失败');
      }
      
      const data = await response.json();
      console.log('成功获取帖子数据，数量:', data.length);
      setPosts(data);
      return data;
    } catch (err) {
      console.error('加载帖子失败:', err);
      throw err; // 向上传递错误，由上层处理
    }
  };

  const fetchMyComments = async () => {
    try {
      console.log('正在获取我的评论...');
      const response = await fetch('/api/community/comments/my-comments', {
        // 添加缓存控制，防止缓存问题
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('获取评论失败，状态码:', response.status);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '获取评论失败');
      }
      
      const data = await response.json();
      console.log('成功获取评论数据，数量:', data.length);
      setComments(data);
      return data;
    } catch (err) {
      console.error('加载评论失败:', err);
      throw err; // 向上传递错误，由上层处理
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('确定要删除此帖子吗？')) return;

    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('删除帖子失败');
      }
      
      // 从列表中移除帖子
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('删除帖子失败:', err);
      alert('删除帖子失败，请稍后再试');
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    if (!confirm('确定要删除此评论吗？')) return;

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('删除评论失败');
      }
      
      // 从列表中移除评论
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error('删除评论失败:', err);
      alert('删除评论失败，请稍后再试');
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error && !posts.length && !comments.length) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-4 px-6 border-b-2 text-sm font-medium ${
              activeTab === 'posts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            我的帖子
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-4 px-6 border-b-2 text-sm font-medium ${
              activeTab === 'comments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            我的评论
          </button>
        </nav>
      </div>

      {/* 帖子列表 */}
      {activeTab === 'posts' && (
        <div>
          {posts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {posts.map(post => (
                <li key={post._id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/community/post/${post._id}`} className="text-lg font-medium text-blue-600 hover:underline">
                        {post.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="mt-2 text-gray-700 line-clamp-2">{post.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-500 hover:text-red-700"
                      title="删除帖子"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">您还没有发布任何帖子</div>
          )}
        </div>
      )}

      {/* 评论列表 */}
      {activeTab === 'comments' && (
        <div>
          {comments.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {comments.map(comment => (
                <li key={comment._id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/community/post/${comment.postId}`} className="text-blue-600 hover:underline">
                        {comment.postTitle}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600">
                        {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="mt-2 text-gray-700">{comment.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id, comment.postId)}
                      className="text-red-500 hover:text-red-700"
                      title="删除评论"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">您还没有发表任何评论</div>
          )}
        </div>
      )}
    </div>
  );
} 

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface Comment {
  _id: string;
  postId: string;
  postTitle: string;
  content: string;
  createdAt: string;
}

export default function MyPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  useEffect(() => {
    // 首先确保会话已经加载完成
    if (session === undefined) {
      // 会话还在加载中，不做任何处理
      return;
    }
    
    if (session?.user?.id) {
      // 用户已登录，加载数据时重置错误和状态
      console.log('用户已登录，ID:', session.user.id);
      setError(null);
      setLoading(true);
      
      // 首先加载帖子，然后再加载评论
      fetchMyPosts()
        .then(() => fetchMyComments())
        .catch(err => {
          console.error('加载数据失败:', err);
          setError('加载数据失败，请稍后再试');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (session === null) {
      // 会话已加载，但用户未登录
      console.log('用户未登录');
      setLoading(false);
      setError('请先登录');
    }
  }, [session]);

  const fetchMyPosts = async () => {
    try {
      console.log('正在获取我的帖子...');
      const response = await fetch('/api/community/posts/my-posts', {
        // 添加缓存控制，防止缓存问题
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('获取帖子失败，状态码:', response.status);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '获取帖子失败');
      }
      
      const data = await response.json();
      console.log('成功获取帖子数据，数量:', data.length);
      setPosts(data);
      return data;
    } catch (err) {
      console.error('加载帖子失败:', err);
      throw err; // 向上传递错误，由上层处理
    }
  };

  const fetchMyComments = async () => {
    try {
      console.log('正在获取我的评论...');
      const response = await fetch('/api/community/comments/my-comments', {
        // 添加缓存控制，防止缓存问题
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('获取评论失败，状态码:', response.status);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '获取评论失败');
      }
      
      const data = await response.json();
      console.log('成功获取评论数据，数量:', data.length);
      setComments(data);
      return data;
    } catch (err) {
      console.error('加载评论失败:', err);
      throw err; // 向上传递错误，由上层处理
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('确定要删除此帖子吗？')) return;

    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('删除帖子失败');
      }
      
      // 从列表中移除帖子
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('删除帖子失败:', err);
      alert('删除帖子失败，请稍后再试');
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    if (!confirm('确定要删除此评论吗？')) return;

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('删除评论失败');
      }
      
      // 从列表中移除评论
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error('删除评论失败:', err);
      alert('删除评论失败，请稍后再试');
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error && !posts.length && !comments.length) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-4 px-6 border-b-2 text-sm font-medium ${
              activeTab === 'posts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            我的帖子
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-4 px-6 border-b-2 text-sm font-medium ${
              activeTab === 'comments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            我的评论
          </button>
        </nav>
      </div>

      {/* 帖子列表 */}
      {activeTab === 'posts' && (
        <div>
          {posts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {posts.map(post => (
                <li key={post._id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/community/post/${post._id}`} className="text-lg font-medium text-blue-600 hover:underline">
                        {post.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="mt-2 text-gray-700 line-clamp-2">{post.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-500 hover:text-red-700"
                      title="删除帖子"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">您还没有发布任何帖子</div>
          )}
        </div>
      )}

      {/* 评论列表 */}
      {activeTab === 'comments' && (
        <div>
          {comments.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {comments.map(comment => (
                <li key={comment._id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/community/post/${comment.postId}`} className="text-blue-600 hover:underline">
                        {comment.postTitle}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600">
                        {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="mt-2 text-gray-700">{comment.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id, comment.postId)}
                      className="text-red-500 hover:text-red-700"
                      title="删除评论"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">您还没有发表任何评论</div>
          )}
        </div>
      )}
    </div>
  );
} 