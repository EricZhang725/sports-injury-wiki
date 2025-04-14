'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PencilSquareIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/app/context/LanguageContext';
import Navigation from '@/app/components/Navigation';

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [renderKey, setRenderKey] = useState(0);

  // Force rerender when language changes
  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1);
  }, [language]);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error(t('please_enter_title'));
      }
      
      if (!formData.content.trim()) {
        throw new Error(t('please_enter_content'));
      }

      // Submit the post
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || t('failed_to_create_post'));
      }

      // Navigate to the new post
      router.push(`/community/post/${data._id}`);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : t('unknown_error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="animate-pulse text-lg text-gray-600">{t('loading')}...</div>
        </div>
      </div>
    );
  }

  return (
    <div key={renderKey} className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <PencilSquareIcon className="h-6 w-6 text-blue-600" />
              {t('create_new_post')}
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-start">
                <XMarkIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {t('post_title')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('enter_post_title')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                {t('post_content')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('enter_post_content')}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => router.push('/community')}
                disabled={isLoading}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? `${t('creating')}...` : t('create_post')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 