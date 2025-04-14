import { NextResponse } from 'next/server';

// 确保middleware可以动态运行
export const dynamic = 'force-dynamic';

export function middleware(request) {
  // 获取请求的路径
  const path = request.nextUrl.pathname;

  // 定义需要保护的路径
  const isProtectedPath = path.startsWith('/api/admin') || 
                         path.startsWith('/profile') ||
                         path.startsWith('/admin');

  // 定义公开的 API 路径
  const isPublicApiPath = path.startsWith('/api/auth') ||
                         path.startsWith('/api/register') ||
                         path.startsWith('/api/direct-register') ||
                         path.startsWith('/api/login') || 
                         path.startsWith('/api/echo') ||
                         path.startsWith('/api/reset-password') ||
                         path.startsWith('/api/forgot-password') ||
                         path.startsWith('/api/simple-test');

  // 如果是公开的 API 路径，直接放行
  if (isPublicApiPath) {
    return NextResponse.next();
  }

  // 获取 token (兼容不同环境下的cookie名称)
  const token = request.cookies.get('next-auth.session-token')?.value ||
                request.cookies.get('__Secure-next-auth.session-token')?.value;

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
    /*
     * 匹配所有路径除了:
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (网站图标)
     * - public 文件夹
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 

// 确保middleware可以动态运行
export const dynamic = 'force-dynamic';

export function middleware(request) {
  // 获取请求的路径
  const path = request.nextUrl.pathname;

  // 定义需要保护的路径
  const isProtectedPath = path.startsWith('/api/admin') || 
                         path.startsWith('/profile') ||
                         path.startsWith('/admin');

  // 定义公开的 API 路径
  const isPublicApiPath = path.startsWith('/api/auth') ||
                         path.startsWith('/api/register') ||
                         path.startsWith('/api/direct-register') ||
                         path.startsWith('/api/login') || 
                         path.startsWith('/api/echo') ||
                         path.startsWith('/api/reset-password') ||
                         path.startsWith('/api/forgot-password') ||
                         path.startsWith('/api/simple-test');

  // 如果是公开的 API 路径，直接放行
  if (isPublicApiPath) {
    return NextResponse.next();
  }

  // 获取 token (兼容不同环境下的cookie名称)
  const token = request.cookies.get('next-auth.session-token')?.value ||
                request.cookies.get('__Secure-next-auth.session-token')?.value;

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
    /*
     * 匹配所有路径除了:
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (网站图标)
     * - public 文件夹
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 