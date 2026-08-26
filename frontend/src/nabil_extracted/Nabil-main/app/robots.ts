import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration
 * 
 * Optimized for:
 * - Traditional search engines (Google, Bing)
 * - AI crawlers for training (GPTBot, ClaudeBot, etc.)
 * - AI search engines (Perplexity, ChatGPT Search)
 * - Generative engines for content extraction
 * 
 * Updated: October 2025 with latest AI crawler user-agents
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nabil-thange.vercel.app'

  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/humans.txt',
          '/about.txt',
          '/faq.json',
          '/feed.xml',
          '/.well-known/ai-policy.txt',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },

      // OpenAI Crawlers (ChatGPT, GPT-4, etc.)
      {
        userAgent: 'GPTBot', // OpenAI training crawler
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // User-triggered browsing in ChatGPT
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot', // ChatGPT Search (shows clickable links)
        allow: '/',
      },

      // Anthropic (Claude)
      {
        userAgent: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'],
        allow: '/',
      },

      // Perplexity AI
      {
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
      },

      // Google AI & Gemini
      {
        userAgent: 'Google-Extended', // Gemini training & Bard
        allow: '/',
      },
      {
        userAgent: 'Googlebot', // Traditional Google search
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },

      // Meta AI (Facebook/Instagram AI)
      {
        userAgent: ['Meta-ExternalAgent', 'Meta-ExternalFetcher', 'FacebookBot'],
        allow: '/',
      },

      // Apple Intelligence
      {
        userAgent: ['Applebot', 'Applebot-Extended'],
        allow: '/',
      },

      // Microsoft Bing & Copilot
      {
        userAgent: ['Bingbot', 'BingPreview'],
        allow: '/',
      },

      // Amazon Alexa
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },

      // Other AI crawlers
      {
        userAgent: 'cohere-ai', // Cohere AI
        allow: '/',
      },
      {
        userAgent: 'YouBot', // You.com AI search
        allow: '/',
      },

      // Optional: Block specific crawlers if needed
      // Uncomment to block CommonCrawl (used for many AI training datasets)
      {
        userAgent: 'CCBot',
        disallow: '/',
      },

      // Block ByteDance/TikTok crawler if desired
      // {
      //   userAgent: 'Bytespider',
      //   disallow: '/',
      // },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/feed.xml`,
    ],
    host: baseUrl,
  }
}
