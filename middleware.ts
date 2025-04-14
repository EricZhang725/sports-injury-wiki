import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 中间件函数
export function middleware(request: NextRequest) {
  // 获取请求的路径
  const path = request.nextUrl.pathname;

  // 定义需要保护的路径
  const isProtectedPath = path.startsWith('/api/admin') || 
                         path.startsWith('/profile') ||
                         path.startsWith('/admin');

  // 定义公开的 API 路径
  const isPublicApiPath = path.startsWith('/api/auth') ||
                         path.startsWith('/api/register') ||
                         path.startsWith('/api/login') ||
                         path.startsWith('/api/simple-test');

  // 如果是公开的 API 路径，直接放行
  if (isPublicApiPath) {
    return NextResponse.next();
  }

  // 获取 token
  const token = request.cookies.get('next-auth.session-token')?.value;

  // 如果是受保护的路径但没有 token，重定向到登录页面
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  // 其他情况直接放行
  return NextResponse.next();
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 