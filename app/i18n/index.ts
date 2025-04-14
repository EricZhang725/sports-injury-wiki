export const locales = ['en', 'zh-CN', 'zh-TW'] as const;
export const defaultLocale = 'zh-CN';

export type Locale = (typeof locales)[number]; 
export const defaultLocale = 'zh-CN';

export type Locale = (typeof locales)[number]; 