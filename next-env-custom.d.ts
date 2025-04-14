// 为 Next.js App Router 的布局组件扩展类型定义
import 'next'
import type { ReactNode } from 'react'

declare module 'next' {
  interface LayoutProps {
    children: ReactNode
    params: Record<string, string>
  }
} 