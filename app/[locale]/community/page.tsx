'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

export default function CommunityPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/community/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">{t('loading')}</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('community')}</h1>
        <Link 
          href="/community/new"
          className="btn btn-primary"
        >
          {t('create_post')}
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            key={post._id} 
            href={`/community/post/${post._id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.author.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

export default function CommunityPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/community/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">{t('loading')}</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('community')}</h1>
        <Link 
          href="/community/new"
          className="btn btn-primary"
        >
          {t('create_post')}
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            key={post._id} 
            href={`/community/post/${post._id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.author.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 