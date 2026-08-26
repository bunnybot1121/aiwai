import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog-posts'

/**
 * RSS Feed Generator for Blog Posts
 * 
 * Purpose:
 * - AI tools crawl RSS feeds aggressively
 * - Better content discovery
 * - Automated syndication
 * - Used by Perplexity, news aggregators, and AI training
 * 
 * Standards: RSS 2.0 compliant
 * Updated: January 2025
 */

function escapeXml(unsafe: string): string {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Convert blog post date format ("Dec 2024") to proper Date
function parseBlogDate(dateStr: string): Date {
  // Handle formats like "Dec 2024", "Nov 2024", etc.
  const match = dateStr.match(/(\w{3})\s+(\d{4})/)
  if (match) {
    const [, month, year] = match
    return new Date(`${month} 1, ${year}`)
  }
  // Fallback to current date if parsing fails
  return new Date()
}

export async function GET() {
  const posts = getAllBlogPosts()
  const baseUrl = 'https://nabil-thange.vercel.app'
  const currentDate = new Date().toUTCString()
  
  // Get the most recent post date for lastBuildDate
  const latestPostDate = posts.length > 0 
    ? parseBlogDate(posts[0].date).toUTCString()
    : currentDate
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Nabil Thange - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Full-stack developer and AI engineer from Mumbai, India. Sharing insights on web development, AI integration, hackathons, and building products that matter.</description>
    <language>en-IN</language>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>3600</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>thangenabil@gmail.com (Nabil Salim Thange)</managingEditor>
    <webMaster>thangenabil@gmail.com (Nabil Salim Thange)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Nabil Salim Thange. All rights reserved.</copyright>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Nabil Thange</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${posts.map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const postDate = parseBlogDate(post.date).toUTCString()
      
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content || post.excerpt}]]></content:encoded>
      <pubDate>${postDate}</pubDate>
      <dc:creator>Nabil Salim Thange</dc:creator>
      <author>thangenabil@gmail.com (Nabil Salim Thange)</author>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'all',
    },
  })
}
