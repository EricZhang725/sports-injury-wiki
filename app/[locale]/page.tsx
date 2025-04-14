'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { locales } from '../i18n';

export default function LocalizedPage() {
  const t = useTranslations();
  const params = useParams();
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="mt-10 flex justify-center space-x-4">
          <h2 className="text-xl">选择语言 / Choose Language / 選擇語言：</h2>
          {locales.map((l) => (
            <Link 
              key={l} 
              href={`/${l}`} 
              className={`px-4 py-2 rounded ${locale === l ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {l === 'en' ? 'English' : l === 'zh-CN' ? '简体中文' : '繁體中文'}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 