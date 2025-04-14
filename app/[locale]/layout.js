'use client';

import '../globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '../i18n';
import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

// 元数据函数
export function generateMetadata({ params }) {
  const locale = params.locale;
  
  return {
    title: locale === 'en' ? 'Sports Injury Wiki' : '运动损伤百科',
    description: locale === 'en' 
      ? 'Your comprehensive guide to sports injuries, treatments, and prevention' 
      : '专业的运动损伤预防、治疗和康复知识平台',
  };
}

export default function Layout(props) {
  const locale = props.params.locale;

  // 验证locale
  if (!locales.includes(locale)) {
    notFound();
  }
  
  // 加载消息
  let messages;
  try {
    messages = require(`../messages/${locale}.json`);
  } catch (error) {
    console.error(`Failed to load messages for ${locale}`, error);
    messages = require(`../messages/${defaultLocale}.json`);
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SessionProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
              <NextIntlClientProvider locale={locale} messages={messages}>
                {props.children}
              </NextIntlClientProvider>
            </main>
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 