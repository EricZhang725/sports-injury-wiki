import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { EnvelopeIcon, EnvelopeOpenIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '获取消息失败');
      }
      
      const data = await response.json();
      console.log("获取到的消息:", data.length);
      setMessages(data);
    } catch (err) {
      console.error('加载消息时出错:', err);
      setError(err instanceof Error ? err.message : '加载消息时出错');
    } finally {
      setLoading(false);
    }
  };

  const handleReadMessage = async (message: Message) => {
    if (!message.read) {
      try {
        const response = await fetch(`/api/messages/${message._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ read: true }),
        });

        if (!response.ok) {
          throw new Error('更新消息状态失败');
        }

        // 更新本地消息列表
        setMessages(messages.map(m => 
          m._id === message._id ? { ...m, read: true } : m
        ));
      } catch (err) {
        console.error('标记消息为已读失败:', err);
        alert('标记消息为已读失败: ' + (err instanceof Error ? err.message : String(err)));
      }
    }
    
    setActiveMessage(message);
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('确定要删除这条消息吗？')) return;
    
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除消息失败');
      }

      // 从列表中移除消息
      setMessages(messages.filter(m => m._id !== id));
      
      // 如果正在查看的是被删除的消息，清除活动消息
      if (activeMessage && activeMessage._id === id) {
        setActiveMessage(null);
      }
    } catch (err) {
      console.error('删除消息失败:', err);
      alert('删除消息失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (loading) {
    return <div className="text-center py-10">加载消息中...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchMessages}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return <div className="text-center py-10">暂无消息</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
        {/* 消息列表 */}
        <div className="border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">消息列表</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li key={message._id}>
                <button
                  onClick={() => handleReadMessage(message)}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${
                    activeMessage?._id === message._id ? 'bg-blue-50' : ''
                  } ${!message.read ? 'font-semibold' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {message.read ? (
                        <EnvelopeOpenIcon className="h-5 w-5 text-gray-400 mr-2" />
                      ) : (
                        <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-2" />
                      )}
                      <div>
                        <p className="truncate w-36">{message.subject}</p>
                        <p className="text-sm text-gray-500 truncate w-36">
                          {message.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(message.createdAt), 'MM/dd HH:mm')}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 消息详情 */}
        <div className="col-span-2 p-4 overflow-y-auto">
          {activeMessage ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">{activeMessage.subject}</h3>
                <button
                  onClick={() => handleDeleteMessage(activeMessage._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm">
                  <span className="font-medium">发件人: </span>
                  {activeMessage.name} &lt;{activeMessage.email}&gt;
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">时间: </span>
                  {format(new Date(activeMessage.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="whitespace-pre-line">{activeMessage.content}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              选择一条消息查看详情
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 