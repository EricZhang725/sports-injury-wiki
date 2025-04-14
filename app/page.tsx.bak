'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 定义首页展示的卡片内容
const cardData = {
  'zh-CN': [
    {
      title: '受伤类型',
      description: '了解各种常见的运动损伤类型、症状和原因。',
      link: '/injuries',
      linkText: '查看更多 →',
      category: 'injury'
    },
    {
      title: '康复方法',
      description: '探索有效的康复方法和技术，帮助您从运动损伤中恢复。',
      link: '/treatments',
      linkText: '查看更多 →',
      category: 'rehab'
    },
    {
      title: '紧急情况',
      description: '掌握运动损伤的急救知识和应对方法，确保及时正确处理。',
      link: '/emergency',
      linkText: '了解更多 →',
      category: 'emergency'
    },
    {
      title: '症状检查',
      description: '通过症状判断可能的损伤类型，获取相应的处理建议。',
      link: '/symptom-checker',
      linkText: '开始检查 →',
      category: 'symptom'
    }
  ],
  'zh-TW': [
    {
      title: '受傷類型',
      description: '了解各種常見的運動損傷類型、症狀和原因。',
      link: '/injuries',
      linkText: '查看更多 →',
      category: 'injury'
    },
    {
      title: '康復方法',
      description: '探索有效的康復方法和技術，幫助您從運動損傷中恢復。',
      link: '/treatments',
      linkText: '查看更多 →',
      category: 'rehab'
    },
    {
      title: '緊急情況',
      description: '掌握運動損傷的急救知識和應對方法，確保及時正確處理。',
      link: '/emergency',
      linkText: '了解更多 →',
      category: 'emergency'
    },
    {
      title: '症狀檢查',
      description: '通過症狀判斷可能的損傷類型，獲取相應的處理建議。',
      link: '/symptom-checker',
      linkText: '開始檢查 →',
      category: 'symptom'
    }
  ],
  'en': [
    {
      title: 'Injury Types',
      description: 'Learn about common types of sports injuries, their symptoms, and causes.',
      link: '/injuries',
      linkText: 'Learn more →',
      category: 'injury'
    },
    {
      title: 'Rehab Methods',
      description: 'Explore effective rehabilitation methods and techniques to help you recover from sports injuries.',
      link: '/treatments',
      linkText: 'Learn more →',
      category: 'rehab'
    },
    {
      title: 'Emergency',
      description: 'Master first aid knowledge for sports injuries to ensure timely and proper treatment.',
      link: '/emergency',
      linkText: 'Learn more →',
      category: 'emergency'
    },
    {
      title: 'Symptom Checker',
      description: 'Identify possible injury types based on symptoms and get appropriate treatment suggestions.',
      link: '/symptom-checker',
      linkText: 'Start checking →',
      category: 'symptom'
    }
  ]
};

// 翻译内容
const searchTranslations = {
  searchPlaceholder: {
    'en': 'Search injuries, treatments, emergency...',
    'zh-CN': '搜索损伤、治疗方法、急救处理...',
    'zh-TW': '搜索損傷、治療方法、急救處理...'
  },
  searchButton: {
    'en': 'Search',
    'zh-CN': '搜索',
    'zh-TW': '搜索'
  },
  noResults: {
    'en': 'No results found',
    'zh-CN': '未找到相关结果',
    'zh-TW': '未找到相關結果'
  },
  featuredContent: {
    'en': 'Featured Content',
    'zh-CN': '精选内容',
    'zh-TW': '精選內容'
  }
};

export default function Home() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [showAllCards, setShowAllCards] = useState(true);

  // 获取当前语言的卡片数据
  const cards = cardData[language as keyof typeof cardData] || cardData['en'];

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowAllCards(true);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = cards.filter(card => {
      return (
        card.title.toLowerCase().includes(query) || 
        card.description.toLowerCase().includes(query)
      );
    });

    setFilteredCards(filtered);
    setShowAllCards(false);
  };

  // 当语言变化时重置搜索
  useEffect(() => {
    setShowAllCards(true);
    setSearchQuery('');
  }, [language]);

  // 翻译函数
  const tSearch = (key: string) => {
    return searchTranslations[key as keyof typeof searchTranslations]?.[language as keyof typeof searchTranslations[keyof typeof searchTranslations]] || key;
  };

  // 获取卡片对应的背景颜色
  const getCardBackground = (category: string) => {
    switch(category) {
      case 'injury': return 'from-rose-100 to-rose-50 shadow-rose-200/60';
      case 'rehab': return 'from-emerald-100 to-emerald-50 shadow-emerald-200/60';
      case 'emergency': return 'from-amber-100 to-amber-50 shadow-amber-200/60';
      case 'symptom': return 'from-blue-100 to-blue-50 shadow-blue-200/60';
      default: return 'from-gray-100 to-gray-50 shadow-gray-200/60';
    }
  };

  // 获取卡片对应的图标颜色
  const getCardIconColor = (category: string) => {
    switch(category) {
      case 'injury': return 'text-rose-600';
      case 'rehab': return 'text-emerald-600';
      case 'emergency': return 'text-amber-600';
      case 'symptom': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };
  
  // 获取卡片对应的按钮颜色
  const getCardButtonColor = (category: string) => {
    switch(category) {
      case 'injury': return 'bg-rose-600 hover:bg-rose-700';
      case 'rehab': return 'bg-emerald-600 hover:bg-emerald-700';
      case 'emergency': return 'bg-amber-600 hover:bg-amber-700';
      case 'symptom': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('welcome')}
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
            
            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto mb-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tSearch('searchPlaceholder')}
                  className="flex-grow px-5 py-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none border-0 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700"
                  aria-label={tSearch('searchPlaceholder')}
                />
                <button
                  type="submit"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none font-medium transition-colors duration-200"
                  aria-label={tSearch('searchButton')}
                >
                  {tSearch('searchButton')}
                </button>
              </form>
            </div>

            {/* 主要行动按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link href="/injuries"
                className="px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-200 shadow-md"
              >
                {t('view_injuries')}
              </Link>
              <Link href="/rehabilitation"
                className="px-8 py-3 bg-indigo-800 text-white rounded-full font-medium hover:bg-indigo-900 transition-colors duration-200 shadow-md"
              >
                {t('view_rehab')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {tSearch('featuredContent')}
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* 显示卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(showAllCards ? cards : filteredCards).map((card, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden bg-gradient-to-br ${getCardBackground(card.category)} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1`}
            >
              <div className="p-6 flex-grow">
                <div className={`text-xl font-bold mb-3 flex items-center ${getCardIconColor(card.category)}`}>
                  {card.title}
                </div>
                <p className="text-gray-700 mb-4">
                  {card.description}
                </p>
              </div>
              <div className="px-6 pb-6">
                <Link href={card.link}
                  className={`inline-block ${getCardButtonColor(card.category)} text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200`}
                >
                  {card.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 无搜索结果提示 */}
        {!showAllCards && filteredCards.length === 0 && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600">{tSearch('noResults')}</p>
          </div>
        )}

        {/* 特点区域 */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {t('why_use')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('why_use_desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('feature_1_title')}</h3>
              <p className="text-gray-600">{t('feature_1_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('feature_2_title')}</h3>
              <p className="text-gray-600">{t('feature_2_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('feature_3_title')}</h3>
              <p className="text-gray-600">{t('feature_3_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 