import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getBlogPost, getAllBlogPosts, isSEOSeriesPost, getSEOSeriesNavigation, seriesOrder } from "@/lib/blog-posts"
import { siteConfig } from "@/components/SEOManager"
import { SeriesNavigation } from "@/components/blog/SeriesNavigation"
import { CodeBlock } from "@/components/blog/CodeBlock"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { slugify } from "@/utils/slugify"
import { TableOfContents, type HeadingItem } from "@/components/blog/TableOfContents"

const COURSE_BASE_URL = "https://nabil-thange.vercel.app"
const COURSE_URL = `${COURSE_BASE_URL}/blog`
const COURSE_NAME = "The Complete SEO, AEO & GEO Course 2026"
const COURSE_DESCRIPTION = "A 37-chapter free course covering modern SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) — from fundamentals to AI search ranking strategies."

// Parse headings from markdown content, ignoring code blocks
function parseHeadings(markdown: string): HeadingItem[] {
  const cleanedMarkdown = markdown.replace(/```[\s\S]*?```/g, "")
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: HeadingItem[] = []
  let match

  while ((match = headingRegex.exec(cleanedMarkdown)) !== null) {
    const level = match[1].length
    let text = match[2].trim()

    // Strip inline markdown formatting
    text = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip links
      .replace(/\*\*([^*]+)\*\*/g, "$1")         // Strip bold
      .replace(/\*([^*]+)\*/g, "$1")           // Strip italics
      .replace(/`([^`]+)`/g, "$1")             // Strip inline code

    headings.push({
      id: slugify(text),
      text,
      level,
    })
  }

  return headings
}

// Extract plain text from React node children
function getHeadingText(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) {
    return children.map(getHeadingText).join("")
  }
  if (children && typeof children === "object" && "props" in children) {
    return getHeadingText((children as any).props.children)
  }
  return ""
}


// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const isInSeries = isSEOSeriesPost(post.slug)
  const chapterIndex = seriesOrder.indexOf(post.slug)
  // Chapter 0 is the intro prompts post; chapters 1–36 are the main content
  const chapterNumber = chapterIndex // 0-based index = chapter number used in content

  return {
    title: isInSeries
      ? `Chapter ${chapterNumber}: ${post.title} | ${COURSE_NAME}`
      : post.title,
    description: post.excerpt,
    keywords: isInSeries
      ? [...post.tags, "Nabil Thange", "SEO Course", "AEO", "GEO", `Chapter ${chapterNumber}`, COURSE_NAME]
      : [...post.tags, "Nabil Thange", "Blog", "Web Development"],
    openGraph: {
      title: isInSeries
        ? `Chapter ${chapterNumber}: ${post.title}`
        : post.title,
      description: post.excerpt,
      url: `${COURSE_BASE_URL}/blog/${post.slug}`,
      siteName: "Nabil Thange Portfolio",
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
      authors: ["Nabil Thange"],
      tags: isInSeries ? [...post.tags, "SEO Course", "AEO", "GEO"] : post.tags,
      section: isInSeries ? COURSE_NAME : undefined,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isInSeries ? `Chapter ${chapterNumber}: ${post.title}` : post.title,
      description: post.excerpt,
      creator: "@THEONLYNABIL",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `${COURSE_BASE_URL}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Custom meta tags for AI crawlers & search engines
    other: isInSeries ? {
      "article:series": COURSE_NAME,
      "article:chapter": String(chapterNumber),
      "article:chapter-count": String(seriesOrder.length),
      "article:course-url": COURSE_URL,
      "dc.isPartOf": COURSE_NAME,
      "dc.relation": COURSE_URL,
    } : {},
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Check if this is part of the SEO series
  const isSeriesPost = isSEOSeriesPost(slug)
  const seriesNav = isSeriesPost ? getSEOSeriesNavigation(slug) : { prev: null, next: null }
  const chapterIndex = seriesOrder.indexOf(slug) // -1 if not in series

  // Extract headings for Table of Contents
  const headings = parseHeadings(post.content)

  // Resolve all chapter posts for the Course schema (only titles + slugs needed)
  const allChapterPosts = seriesOrder.map((s, i) => {
    const p = getBlogPost(s)
    return {
      "@type": "Chapter",
      position: i,
      name: p?.title ?? s,
      url: `${COURSE_BASE_URL}/blog/${s}`,
      description: p?.excerpt ?? "",
    }
  })

  // Article structured data — enriched with course context for series posts
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    additionalType: "BlogPosting",
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    url: `${COURSE_BASE_URL}/blog/${slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Nabil Thange",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Nabil Thange",
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
    ...(isSeriesPost && {
      educationalLevel: "Beginner to Advanced",
      learningResourceType: "Course Chapter",
      teaches: post.tags.join(", "),
      isPartOf: {
        "@type": "Course",
        name: COURSE_NAME,
        url: COURSE_URL,
        description: COURSE_DESCRIPTION,
        provider: {
          "@type": "Person",
          name: "Nabil Thange",
          url: siteConfig.url,
        },
      },
      position: chapterIndex,
    }),
  }

  // Course schema — only injected on series chapter pages
  const courseSchema = isSeriesPost ? {
    "@context": "https://schema.org",
    "@type": "Course",
    name: COURSE_NAME,
    description: COURSE_DESCRIPTION,
    url: COURSE_URL,
    inLanguage: "en",
    educationalLevel: "Beginner to Advanced",
    learningResourceType: "Online Course",
    isAccessibleForFree: true,
    teaches: "SEO, AEO, GEO, Technical SEO, AI Search Optimization, Structured Data, Content Strategy",
    provider: {
      "@type": "Person",
      name: "Nabil Thange",
      url: siteConfig.url,
      sameAs: [
        "https://github.com/NabilThange",
        "https://twitter.com/THEONLYNABIL",
      ],
    },
    hasPart: allChapterPosts,
    numberOfCredits: seriesOrder.length,
  } : null

  // Breadcrumb structured data — includes course for series posts
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${COURSE_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${COURSE_BASE_URL}/blog` },
      ...(isSeriesPost ? [{
        "@type": "ListItem", position: 3, name: COURSE_NAME, item: COURSE_URL,
      }, {
        "@type": "ListItem", position: 4, name: `Chapter ${chapterIndex}: ${post.title}`, item: `${COURSE_BASE_URL}/blog/${slug}`,
      }] : [{
        "@type": "ListItem", position: 3, name: post.title, item: `${COURSE_BASE_URL}/blog/${slug}`,
      }]),
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {courseSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c") }}
        />
      )}

      <main className="min-h-screen relative">
        {/* Navigation */}
        <nav className="fixed top-8 left-8 z-10">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back to Blog</span>
          </Link>
        </nav>

        {/* Series Navigation - Top Right */}
        {isSeriesPost && <SeriesNavigation prev={seriesNav.prev} next={seriesNav.next} position="top" />}

        {/* Main Content Container with Table of Contents */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-32 flex flex-col xl:flex-row gap-12 xl:justify-between items-start">
          {/* Main Content */}
          <article className="max-w-3xl w-full min-w-0">
          {/* Header */}
          <header className="space-y-6 sm:space-y-8 pb-12 border-b border-border">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-3 py-1 text-xs hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none py-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-12 mb-6 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => {
                  const text = getHeadingText(props.children)
                  const id = slugify(text)
                  return (
                    <h2
                      id={id}
                      className="text-3xl sm:text-4xl font-semibold tracking-tight mt-10 mb-5 text-foreground scroll-mt-20"
                      {...props}
                    />
                  )
                },
                h3: ({ node, ...props }) => {
                  const text = getHeadingText(props.children)
                  const id = slugify(text)
                  return (
                    <h3
                      id={id}
                      className="text-2xl sm:text-3xl font-medium tracking-tight mt-8 mb-4 text-foreground scroll-mt-20"
                      {...props}
                    />
                  )
                },
                h4: ({ node, ...props }) => (
                  <h4 className="text-xl sm:text-2xl font-medium tracking-tight mt-6 mb-3 text-foreground" {...props} />
                ),
                p: ({ node, ...props }) => {
                  const text = String(props.children || '')
                  
                  // Check if this is a chapter/series indicator (starts with emoji and contains "Chapter")
                  if (text.includes('📖') && text.includes('Chapter')) {
                    const cleanText = text.replace(/📖\s*/, '')
                    return (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-muted/50 to-transparent border-l-4 border-primary/50 mb-8 not-prose">
                        <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm font-medium text-foreground">{cleanText}</span>
                      </div>
                    )
                  }
                  
                  return (
                    <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg" {...props} />
                  )
                },
                a: ({ node, href, ...props }) => {
                  const isInternal = href?.startsWith('/blog/')
                  const isSeriesLink = href === '/blog'
                  const text = String(props.children || '')
                  
                  // Remove emoji from text
                  const cleanText = text.replace(/^[📖←→]+\s*/, '')
                  
                  if (isInternal || isSeriesLink) {
                    return (
                      <Link
                        href={href || "#"}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
                          "bg-muted/50 hover:bg-muted border border-border/50 hover:border-border",
                          "text-foreground hover:text-foreground font-medium text-sm",
                          "no-underline hover:shadow-sm"
                        )}
                        {...props}
                      >
                        {text.includes('←') && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                        )}
                        <span>{cleanText}</span>
                        {text.includes('→') && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </Link>
                    )
                  }
                  
                  return (
                    <Link
                      href={href || "#"}
                      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-200 font-medium"
                      {...props}
                    />
                  )
                },
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground mb-6 marker:text-primary" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-outside ml-6 space-y-3 text-muted-foreground mb-6 marker:text-primary marker:font-semibold" {...props} />
                ),
                li: ({ node, ...props }) => <li className="text-base sm:text-lg leading-relaxed pl-2" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary/50 pl-6 pr-4 py-3 italic text-muted-foreground my-8 bg-muted/50 rounded-r-lg"
                    {...props}
                  />
                ),
                code: (() => {
                  const counter = { n: 0 }
                  return ({ node, inline, children, ...props }: any) => {
                    const content = String(children).replace(/\n$/, '')
                    if (inline) {
                      return (
                        <code
                          className="px-2 py-0.5 bg-muted text-foreground rounded-md text-sm font-mono border border-border"
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    }
                    const isFirst = counter.n === 0
                    counter.n++
                    return (
                      <CodeBlock
                        language={props.className?.replace(/language-/, '')}
                        className={isFirst ? "max-h-[500px] overflow-y-auto" : undefined}
                      >
                        {content}
                      </CodeBlock>
                    )
                  }
                })(),
                pre: ({ node, children, ...props }) => <>{children}</>,
                strong: ({ node, ...props }) => <strong className="text-foreground font-bold" {...props} />,
                em: ({ node, ...props }) => <em className="text-foreground/90 italic" {...props} />,
                hr: ({ node, ...props }) => <Separator className="my-12" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-lg border border-border">
                    <table className="w-full border-collapse" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted/50" {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className="divide-y divide-border" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className="hover:bg-muted/30 transition-colors" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 text-sm text-muted-foreground" {...props} />
                ),
                img: ({ node, src, alt, ...props }) => (
                  <img
                    src={src}
                    alt={alt || ''}
                    className="rounded-lg my-8 w-full border border-border shadow-sm"
                    loading="lazy"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Series Navigation - Bottom */}
          {isSeriesPost && <SeriesNavigation prev={seriesNav.prev} next={seriesNav.next} position="bottom" />}

          {/* Footer */}
          <footer className="pt-12 border-t border-border space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="group px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm inline-flex items-center gap-2 justify-center"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>All Posts</span>
              </Link>
              <Link
                href="/"
                className="group px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm inline-flex items-center gap-2 justify-center"
              >
                <span>Back to Home</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Written by{" "}
                <Link href="/about" className="text-foreground hover:text-muted-foreground transition-colors">
                  Nabil Thange
                </Link>{" "}
                • {post.date}
              </p>
            </div>
          </footer>
        </article>

        {/* Table of Contents Sidebar */}
        <aside className="hidden xl:block w-48 shrink-0 sticky top-32 self-start">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </main>
    </>
  )
}
