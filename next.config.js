/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  typescript: {
    // 完全忽略类型检查错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 忽略 ESLint 错误
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 