'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useLanguage, supportedLanguages, type Language } from '../context/LanguageContext';

// 定义翻译内容
const translations = {
  'sportsInjuryWiki': {
    'en': 'Sports Injury Wiki',
    'zh-CN': '运动损伤百科',
    'zh-TW': '運動損傷百科'
  },
  'home': {
    'en': 'Home',
    'zh-CN': '首页',
    'zh-TW': '首頁'
  },
  'injuryTypes': {
    'en': 'Injuries',
    'zh-CN': '受伤类型',
    'zh-TW': '受傷類型'
  },
  'rehabilitationMethods': {
    'en': 'Rehab',
    'zh-CN': '康复方法',
    'zh-TW': '康復方法'
  },
  'emergency': {
    'en': 'Emergency',
    'zh-CN': '紧急情况',
    'zh-TW': '緊急情況'
  },
  'symptomChecker': {
    'en': 'Symptoms',
    'zh-CN': '症状检查器',
    'zh-TW': '症狀檢查器'
  },
  'community': {
    'en': 'Community',
    'zh-CN': '社区',
    'zh-TW': '社區'
  },
  'contactUs': {
    'en': 'Contact',
    'zh-CN': '联系我们',
    'zh-TW': '聯繫我們'
  },
  'profile': {
    'en': 'Profile',
    'zh-CN': '个人中心',
    'zh-TW': '個人中心'
  },
  'adminPanel': {
    'en': 'Admin',
    'zh-CN': '管理后台',
    'zh-TW': '管理後台'
  },
  'login': {
    'en': 'Login',
    'zh-CN': '登录',
    'zh-TW': '登入'
  },
  'register': {
    'en': 'Register',
    'zh-CN': '注册',
    'zh-TW': '註冊'
  },
  'logout': {
    'en': 'Logout',
    'zh-CN': '退出登录',
    'zh-TW': '登出'
  },
  'language': {
    'en': 'Language',
    'zh-CN': '切换语言',
    'zh-TW': '切換語言'
  }
};

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // 改变语言
  const changeLanguage = (lang: string) => {
    setLanguage(lang as Language);
    setIsLanguageMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };
  
  // 获取当前语言信息
  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  // 获取语言显示代码
  const getLanguageDisplay = (code: string) => {
    switch(code) {
      case 'en': return 'ENG';
      case 'zh-CN': return 'CN';
      case 'zh-TW': return 'TW';
      default: return code.toUpperCase();
    }
  };

  // 导航项定义
  const navigationItems = [
    { name: t('home'), href: '/' },
    { name: t('injuryTypes'), href: '/injuries' },
    { name: t('rehabilitationMethods'), href: '/rehabilitation' },
    { name: t('emergency'), href: '/emergency' },
    { name: t('symptomChecker'), href: '/symptom-checker' },
    { name: t('community'), href: '/community' },
    { name: t('contactUs'), href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* 桌面导航 */}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center mr-2 lg:mr-4">
              <Link href="/" className="text-lg md:text-xl font-bold text-indigo-600 whitespace-nowrap transition-colors hover:text-indigo-700">
                {t('sportsInjuryWiki')}
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-1 lg:space-x-3 xl:space-x-5 overflow-x-auto">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-700 inline-flex items-center px-2 py-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 whitespace-nowrap text-sm lg:text-base"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {/* 语言选择 */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center text-gray-700 hover:text-indigo-600 focus:outline-none px-3 py-2 rounded-lg transition-all duration-200 hover:bg-indigo-50 whitespace-nowrap"
              >
                <span className="mr-1 text-lg">{currentLanguage?.flag || '🌐'}</span>
                <span className="hidden sm:inline">{getLanguageDisplay(currentLanguage?.code || 'en')}</span>
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 ring-1 ring-black ring-opacity-5 fade-in">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${language === lang.code ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="mr-2 text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* 用户菜单 */}
            {session ? (
              <div className="flex items-center space-x-1 lg:space-x-2">
                <Link 
                  href="/profile" 
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap text-sm lg:text-base"
                >
                  {t('profile')}
                </Link>
                {session.user?.role === 'admin' && (
                  <>
                    <Link 
                      href="/admin" 
                      className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap text-sm lg:text-base"
                    >
                      {t('adminPanel')}
                    </Link>
                  </>
                )}
                <button
                  onClick={() => signOut()}
                  className="btn btn-outline text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="btn btn-outline text-sm">
                  {t('login')}
                </Link>
                <Link href="/register" className="btn btn-primary text-sm">
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleLanguageMenu} 
              className="px-2 py-1 mr-1 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <span className="text-lg">{currentLanguage?.flag || '🌐'}</span>
            </button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 语言菜单（移动端） */}
      {isLanguageMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base ${language === lang.code ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 移动端菜单 */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg border-t border-gray-100 fade-in`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-base text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {session ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-lg text-base text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('profile')}
              </Link>
              
              {session.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-lg text-base text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('adminPanel')}
                </Link>
              )}
              
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-base text-red-600 hover:bg-red-50 transition-colors"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <div className="pt-2 pb-1 flex flex-col space-y-2">
              <Link 
                href="/login" 
                className="btn btn-outline w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                {t('login')}
              </Link>
              <Link 
                href="/register" 
                className="btn btn-primary w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 