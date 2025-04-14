'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { rehabMethods, rehabCategories } from '../data/rehabilitation';

export default function RehabilitationPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedMethods, setExpandedMethods] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (methodId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [methodId]: true
    }));
  };

  const toggleExpand = (methodId: string) => {
    setExpandedMethods(prev => ({
      ...prev,
      [methodId]: !prev[methodId]
    }));
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'exercise_therapy':
        return '🏋️‍♂️';
      case 'physical_therapy':
        return '💆‍♂️';
      case 'therapeutic_equipment':
        return '🧰';
      case 'nutritional_support':
        return '🍎';
      default:
        return '📋';
    }
  };
  
  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'exercise_therapy':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'physical_therapy':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'therapeutic_equipment':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'nutritional_support':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getCategoryBadgeColor = (categoryId: string) => {
    switch (categoryId) {
      case 'exercise_therapy':
        return 'bg-blue-100 text-blue-800';
      case 'physical_therapy':
        return 'bg-purple-100 text-purple-800';
      case 'therapeutic_equipment':
        return 'bg-yellow-100 text-yellow-800';
      case 'nutritional_support':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMethods = rehabMethods.filter(method => {
    const matchesCategory = selectedCategory ? method.category === selectedCategory : true;
    const matchesSearch = searchTerm 
      ? (t(method.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) || 
         method.description[language as keyof typeof method.description].toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('rehabilitation')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Evidence-based rehabilitation methods to help you recover from sports injuries'
              : language === 'zh-CN'
              ? '基于证据的康复方法，帮助您从运动损伤中恢复'
              : '基於證據的康復方法，幫助您從運動損傷中恢復'}
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_rehab')}
              className="w-full p-4 pl-14 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
              selectedCategory === null 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('all_categories')}
          </button>
          {rehabCategories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? `${getCategoryColor(category.id)} text-white shadow-lg` 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-xl">{getCategoryIcon(category.id)}</span>
              {t(category.id)}
            </button>
          ))}
        </div>
        
        {/* Rehab Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMethods.map(method => (
            <div 
              key={method.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              {/* Method Image */}
              <div className="relative h-56 bg-gray-100">
                {method.imagePath && !imageErrors[method.id] ? (
                  <Image
                    src={method.imagePath}
                    alt={t(method.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    onError={() => handleImageError(method.id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 text-gray-400">
                    <span className="text-6xl mb-2">{getCategoryIcon(method.category)}</span>
                    <span className="text-sm text-gray-500 max-w-[80%] text-center">
                      {t(method.titleKey)}
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(method.category)}`}>
                    {t(method.category)}
                  </span>
                </div>
              </div>
              
              {/* Method Content */}
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{t(method.titleKey)}</h2>
                <p className="text-gray-600 mb-5 line-clamp-3">{method.description[language as keyof typeof method.description]}</p>
                
                {/* Show more/less button */}
                <button
                  className={`inline-flex items-center gap-1 font-medium transition-colors ${
                    expandedMethods[method.id] ? 'text-indigo-600 hover:text-indigo-800' : 'text-blue-500 hover:text-blue-700'
                  }`}
                  onClick={() => toggleExpand(method.id)}
                >
                  {expandedMethods[method.id] ? (
                    <>
                      <span>{t('show_less')}</span>
                      <span className="text-sm">▲</span>
                    </>
                  ) : (
                    <>
                      <span>{t('show_more')}</span>
                      <span className="text-sm">▼</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Expanded details */}
              {expandedMethods[method.id] && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Steps */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-indigo-500">•</span>
                        {t('steps')}
                      </h3>
                      <ol className="list-decimal list-inside space-y-2">
                        {method.steps[language as keyof typeof method.steps].map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {/* Cautions */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-red-500">⚠</span>
                        {t('cautions')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {method.cautions[language as keyof typeof method.cautions].map((caution, index) => (
                          <li key={index} className="text-gray-700">{caution}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Timeline */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-blue-500">⏱</span>
                        {t('timeline')}
                      </h3>
                      <p className="text-gray-700">{method.timeline[language as keyof typeof method.timeline]}</p>
                    </div>
                    
                    {/* Effectiveness */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {t('effectiveness')}
                      </h3>
                      <p className="text-gray-700">{method.effectiveness[language as keyof typeof method.effectiveness]}</p>
                    </div>
                    
                    {/* References */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-purple-500">📚</span>
                        {t('references')}
                      </h3>
                      <ul className="space-y-3">
                        {method.references.map((ref, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            <p><span className="font-medium">{ref.author}</span>, "{ref.title}", <i>{ref.publication}</i>, {ref.year}</p>
                            {ref.url && (
                              <a 
                                href={ref.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-blue-500 hover:text-blue-700 hover:underline mt-1"
                              >
                                {language === 'en' ? 'View Publication' : language === 'zh-CN' ? '查看出版物' : '查看出版物'} →
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredMethods.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-gray-500 text-xl">
              {language === 'en'
                ? 'No rehabilitation methods found matching your criteria.'
                : language === 'zh-CN'
                ? '未找到符合您条件的康复方法。'
                : '未找到符合您條件的康復方法。'}
            </p>
            <button
              onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
              className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {language === 'en'
                ? 'Clear Filters'
                : language === 'zh-CN'
                ? '清除筛选条件'
                : '清除篩選條件'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 