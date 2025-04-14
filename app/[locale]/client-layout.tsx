'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          {children}
        </main>
      </LanguageProvider>
    </SessionProvider>
  );
} 