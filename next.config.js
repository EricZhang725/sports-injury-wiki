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
  },
  // 自定义输出目录
  distDir: '.next',
  // 跳过类型检查阶段
  skipTypeChecking: true,
  // 跳过全文件系统检查
  skipTraceFileDependencies: true
};

module.exports = nextConfig; 