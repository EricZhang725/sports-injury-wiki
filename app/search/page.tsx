'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { allContent, SearchContent } from '../data/searchContent';

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // 模拟搜索延迟
      setTimeout(() => {
        const searchResults = allContent.filter(item => {
          const searchText = `${item.title} ${item.description} ${item.content}`.toLowerCase();
          const searchTerms = query.toLowerCase().split(' ');
          return searchTerms.every(term => searchText.includes(term));
        });
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return '首页';
      case 'treatment':
        return '康复方法';
      case 'emergency':
        return '紧急情况';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            搜索结果: {query}
          </h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">正在搜索中...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">没有找到相关结果</p>
              <p className="text-gray-400 mt-2">请尝试使用其他关键词搜索</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {result.title}
                    </h2>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{result.description}</p>
                  <p className="text-gray-500 mt-4 line-clamp-2">{result.content}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 