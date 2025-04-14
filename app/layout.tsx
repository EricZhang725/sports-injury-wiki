'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '运动损伤百科',
  description: '专业的运动损伤预防、治疗和康复知识平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <SessionProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
              {children}
            </main>
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 