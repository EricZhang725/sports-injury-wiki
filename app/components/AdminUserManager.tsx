import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { UserIcon, TrashIcon, XCircleIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  comments: {
    _id: string;
    user: {
      _id: string;
      username: string;
    };
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export default function AdminUserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users' 或 'posts'
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '获取用户列表失败');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('加载用户列表时出错:', err);
      setError(err instanceof Error ? err.message : '加载用户列表时出错');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${userId}/posts`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '获取用户帖子失败');
      }
      
      const data = await response.json();
      setPosts(data);
      setActivePost(null); // 重置选中的帖子
    } catch (err) {
      console.error('加载用户帖子时出错:', err);
      setError(err instanceof Error ? err.message : '加载用户帖子时出错');
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (user: User) => {
    setActiveUser(user);
    fetchUserPosts(user._id);
    setActiveTab('users');
  };

  const handleViewPost = (post: Post) => {
    setActivePost(post);
    setActiveTab('posts');
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('确定要删除该用户吗？此操作不可逆，将删除用户的所有帖子和评论。')) return;
    
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除用户失败');
      }

      // 从列表中移除用户
      setUsers(users.filter(user => user._id !== id));
      
      // 如果正在查看的是被删除的用户，清除活动用户
      if (activeUser && activeUser._id === id) {
        setActiveUser(null);
        setPosts([]);
        setActivePost(null);
      }
    } catch (err) {
      console.error('删除用户失败:', err);
      alert('删除用户失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleToggleUserStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (!response.ok) {
        throw new Error('更新用户状态失败');
      }

      const updatedUser = await response.json();
      
      // 更新用户列表
      setUsers(users.map(user => 
        user._id === id ? updatedUser : user
      ));
      
      // 更新活动用户
      if (activeUser && activeUser._id === id) {
        setActiveUser(updatedUser);
      }
    } catch (err) {
      console.error('更新用户状态失败:', err);
      alert('更新用户状态失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('确定要删除该帖子吗？此操作不可逆。')) return;
    
    try {
      const response = await fetch(`/api/community/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除帖子失败');
      }

      // 从列表中移除帖子
      setPosts(posts.filter(post => post._id !== postId));
      
      // 如果当前正在查看这个帖子，清除选中状态
      if (activePost && activePost._id === postId) {
        setActivePost(null);
      }
    } catch (err) {
      console.error('删除帖子失败:', err);
      alert('删除帖子失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!confirm('确定要删除该评论吗？此操作不可逆。')) return;
    
    try {
      const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除评论失败');
      }

      // 更新帖子中的评论列表
      if (activePost && activePost._id === postId) {
        setActivePost({
          ...activePost,
          comments: activePost.comments.filter(comment => comment._id !== commentId)
        });
      }
      
      // 更新帖子列表中的评论计数
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
      console.error('删除评论失败:', err);
      alert('删除评论失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (loading && users.length === 0) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (error && users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchUsers}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
        {/* 用户列表 */}
        <div className="border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">用户列表</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {users.filter(user => user.role !== 'admin').map((user) => (
              <li key={user._id}>
                <button
                  onClick={() => handleViewUser(user)}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${
                    activeUser?._id === user._id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className={`${!user.isActive ? 'text-gray-400' : ''}`}>
                          {user.username}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${!user.isActive ? 'text-red-500' : 'text-green-500'}`}>
                      {!user.isActive ? '已禁用' : '活跃'}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 用户详情和帖子 */}
        <div className="col-span-2 overflow-hidden flex flex-col">
          {activeUser ? (
            <>
              {/* 用户信息和操作 */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">{activeUser.username}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleUserStatus(activeUser._id, activeUser.isActive || false)}
                      className={`${
                        activeUser.isActive ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'
                      }`}
                      title={activeUser.isActive ? '禁用账号' : '启用账号'}
                    >
                      {activeUser.isActive ? (
                        <XCircleIcon className="h-5 w-5" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(activeUser._id)}
                      className="text-red-500 hover:text-red-700"
                      title="删除用户"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm">
                    <span className="font-medium">邮箱: </span>
                    {activeUser.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">注册时间: </span>
                    {format(new Date(activeUser.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">状态: </span>
                    <span className={activeUser.isActive ? 'text-green-500' : 'text-red-500'}>
                      {activeUser.isActive ? '活跃' : '已禁用'}
                    </span>
                  </p>
                </div>
              </div>
              
              {/* 标签页导航 */}
              <div className="border-b border-gray-200">
                <nav className="flex px-4">
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`py-2 px-3 border-b-2 text-sm font-medium ${
                      activeTab === 'users'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    用户帖子
                  </button>
                  {activePost && (
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`py-2 px-3 border-b-2 text-sm font-medium ${
                        activeTab === 'posts'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      帖子详情
                    </button>
                  )}
                </nav>
              </div>
              
              {/* 标签页内容 */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'users' && (
                  <>
                    <h4 className="text-lg font-medium mb-4">用户帖子列表</h4>
                    {posts.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {posts.map(post => (
                          <li key={post._id} className="py-3">
                            <div className="flex justify-between">
                              <div>
                                <button
                                  onClick={() => handleViewPost(post)}
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                >
                                  {post.title}
                                </button>
                                <p className="text-sm text-gray-500">
                                  发布于 {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {post.comments.length} 条评论
                                </p>
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
                      <p className="text-gray-500">该用户暂无帖子</p>
                    )}
                  </>
                )}
                
                {activeTab === 'posts' && activePost && (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium">{activePost.title}</h4>
                      <button
                        onClick={() => handleDeletePost(activePost._id)}
                        className="text-red-500 hover:text-red-700"
                        title="删除帖子"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        作者: {activePost.author.username} | 
                        发布于 {format(new Date(activePost.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                      </p>
                    </div>
                    
                    <div className="mb-6 bg-gray-50 p-4 rounded-md">
                      <p className="whitespace-pre-line">{activePost.content}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-md font-medium mb-3">评论 ({activePost.comments.length})</h5>
                      {activePost.comments.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {activePost.comments.map(comment => (
                            <li key={comment._id} className="py-3">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm">
                                    <span className="font-medium">{comment.user.username}</span>
                                    <span className="text-gray-500 ml-2">
                                      {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
                                    </span>
                                  </p>
                                  <p className="mt-1">{comment.content}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteComment(activePost._id, comment._id)}
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
                        <p className="text-gray-500">暂无评论</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              请从左侧选择用户
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 