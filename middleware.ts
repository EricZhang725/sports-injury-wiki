import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './app/i18n'

// Create internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
})

// Combined middleware function
export async function middleware(request: NextRequest) {
  // Handle authentication first
  const token = await getToken({ req: request })
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isAuthPath = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')

  // Redirect authenticated users away from auth pages
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protect admin routes
  if (isAdminPath) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Then handle internationalization
  return intlMiddleware(request)
}

// Configure middleware matching paths
export const config = {
  matcher: [
    // Auth protection paths
    '/admin/:path*',
    '/login',
    '/register',
    '/profile/:path*',
    // Internationalization paths (excluding static files and API routes)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
} 