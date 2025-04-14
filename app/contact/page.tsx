'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navigation from '../components/Navigation';
import { PhotoIcon } from '@heroicons/react/24/outline';

// Local translations
const localTranslations = {
  'emailValue': {
    'en': 'sportsinjurywiki@gmail.com',
    'zh-CN': 'sportsinjurywiki@gmail.com',
    'zh-TW': 'sportsinjurywiki@gmail.com'
  },
  'imageUploadHint': {
    'en': 'Upload an image',
    'zh-CN': '上传图片',
    'zh-TW': '上傳圖片'
  },
  'dragImageHint': {
    'en': 'or drag and drop',
    'zh-CN': '或拖拽到此处',
    'zh-TW': '或拖拽到此處'
  },
  'previewLabel': {
    'en': 'Preview',
    'zh-CN': '预览',
    'zh-TW': '預覽'
  }
};

export default function Contact() {
  const { language, t } = useLanguage();
  
  // Custom translation function that combines global and local translations
  const translate = (key: string): string => {
    // Try to find in local translations first
    const localTranslation = localTranslations[key as keyof typeof localTranslations]?.[language as keyof typeof localTranslations[keyof typeof localTranslations]];
    if (localTranslation) return localTranslation;
    
    // Fall back to global translations
    return t(key);
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    image: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 验证表单字段
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError(translate('contactFillAllFields'));
      return;
    }

    setLoading(true);
    
    try {
      // 首先将消息保存到数据库
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '发送消息失败');
      }
      
      // 然后创建mailto链接，包含表单数据
      const mailtoLink = `mailto:sportsinjurywiki@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `${translate('contactName')}: ${formData.name}\n${translate('contactEmail')}: ${formData.email}\n\n${formData.message}\n\n${translate('contactSentFrom')}`
      )}`;
      
      // 打开用户默认邮件客户端
      window.location.href = mailtoLink;
      
      // 显示成功消息
      setSuccess(true);
      
      // 重置表单数据
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        image: null
      });
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // 3秒后清除成功消息
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('发送消息失败:', err);
      setError(err instanceof Error ? err.message : '发送消息失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // 创建预览URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{translate('contactUs')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{translate('contactMethods')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">{translate('email')}</h3>
                  <p className="text-gray-600">{translate('emailValue')}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">{translate('workingHours')}</h3>
                  <p className="text-gray-600">{translate('workingHoursValue')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{translate('sendMessage')}</h2>
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  {translate('contactSuccessMessage')}
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {translate('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {translate('email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {translate('subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {translate('messageContent')}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    {translate('uploadImage')}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">{translate('imageTypes')}</p>
                  <p className="text-xs text-gray-500 mb-2">{translate('uploadImageEmailNote')}</p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt={translate('previewLabel')}
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>{translate('imageUploadHint')}</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                              />
                            </label>
                            <p className="pl-1">{translate('dragImageHint')}</p>
                          </div>
                          <p className="text-xs text-gray-500">{translate('imageTypes')}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                  >
                    {loading ? translate('contactSending') : translate('sendBtn')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {translate('subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {translate('messageContent')}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    {translate('uploadImage')}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">{translate('imageTypes')}</p>
                  <p className="text-xs text-gray-500 mb-2">{translate('uploadImageEmailNote')}</p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt={translate('previewLabel')}
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>{translate('imageUploadHint')}</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                              />
                            </label>
                            <p className="pl-1">{translate('dragImageHint')}</p>
                          </div>
                          <p className="text-xs text-gray-500">{translate('imageTypes')}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                  >
                    {loading ? translate('contactSending') : translate('sendBtn')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 