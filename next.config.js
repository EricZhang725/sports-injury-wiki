/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: process.env.NODE_ENV !== 'production'
  },
  // 适用于Vercel部署的输出配置
  output: 'standalone'
};

module.exports = nextConfig; 