export const locales = ['en', 'zh-CN', 'zh-TW'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number]; 