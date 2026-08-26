import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog-posts'

/**
 * Dynamic Sitemap Generation
 * 
 * Automatically generates sitemap.xml with all routes for optimal crawling
 * by search engines and AI platforms. Updates on every build.
 * 
 * Priority levels:
 * - 1.0: Homepage (highest priority)
 * - 0.9: Gallery/Portfolio pages
 * - 0.8: About/Contact pages
 * - 0.7: Blog posts
 * - 0.6: Other pages
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nabil-thange.vercel.app'
  const currentDate = new Date()

  // Static routes
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Intro/Landing Page
    },
    {
      url: `${baseUrl}/home`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Main Portfolio Dashboard (Critical for indexing)
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // About page - high priority for SEO/GEO
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Contact page - important for conversions
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9, // Portfolio showcase
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8, // Blog hub page
    },
    // AI Discovery Resources (for AI crawlers and answer engines)
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // High priority for AI model discovery
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/humans.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/.well-known/ai-policy.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic blog post routes
  const blogPosts = getAllBlogPosts()
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Example for projects:
  // const projects = await getAllProjects()
  // const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: new Date(project.updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.8,
  // }))

  return [
    ...staticPages,
    ...blogPostPages,
    // ...projectPages, // Uncomment when individual project pages are added
  ]
}
