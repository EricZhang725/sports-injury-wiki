import '../globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '../i18n';
import { notFound } from 'next/navigation';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return {
    title: 'Sports Injury Wiki',
    description: '体育损伤知识百科全书',
  };
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 验证 locale 参数
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  // 加载语言文件
  let messages;
  try {
    messages = require(`../messages/${locale}.json`);
  } catch (error) {
    console.error(`Failed to load messages for ${locale}`, error);
    // 回退到默认语言
    messages = require(`../messages/${defaultLocale}.json`);
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClientLayout>
      </body>
    </html>
  );
} 