import '../globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '../i18n';
import { notFound } from 'next/navigation';
import Providers from '../providers';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return {
    title: 'Sports Injury Wiki',
    description: '体育损伤知识百科全书',
  };
}

export default async function LocaleLayout({
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
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}`, error);
    // 回退到默认语言
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
} 