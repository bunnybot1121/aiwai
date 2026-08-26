import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Edge Middleware for SEO/AEO/GEO Optimization
 * 
 * Runs at the edge for:
 * - Fast response times for crawlers
 * - User-agent detection and optimization
 * - Security headers
 * - Performance optimization
 * - Redirect management
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  
  // Create response
  const response = NextResponse.next()
  
  // Security Headers (following OWASP recommendations)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy (restrict sensitive features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  
  // Content Security Policy (adjust as needed for your scripts/styles)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Adjust based on your needs
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https:",
  ].join('; ')
  response.headers.set('Content-Security-Policy', csp)
  
  // Cache Control for optimal performance
  // Static assets are cached by Vercel automatically, this is for HTML
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/public/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  } else {
    // For HTML pages: short cache but allow stale-while-revalidate
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
  }
  
  // Preload hints for AI crawlers to improve crawl efficiency
  if (isAICrawler(userAgent)) {
    // Add link preload headers for critical resources
    response.headers.set(
      'Link',
      '</fonts/geist.woff2>; rel=preload; as=font; crossorigin'
    )
  }
  
  // Handle trailing slashes (prevent duplicate content issues)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }
  
  // Optional: Block specific crawlers if needed
  // Uncomment to block unwanted bots
  // const blockedCrawlers = ['SemrushBot', 'AhrefsBot', 'DotBot']
  // if (blockedCrawlers.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()))) {
  //   return new NextResponse('Access Denied', { status: 403 })
  // }
  
  return response
}

/**
 * Helper function to detect AI crawlers
 */
function isAICrawler(userAgent: string): boolean {
  const aiCrawlers = [
    'GPTBot',
    'ChatGPT',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'Googlebot',
    'Bingbot',
    'Meta-ExternalAgent',
    'Applebot',
    'OAI-SearchBot',
  ]
  
  return aiCrawlers.some(crawler => 
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  )
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
}
