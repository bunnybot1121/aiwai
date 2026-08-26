import type { Metadata } from "next"
import Link from "next/link"
import { getSortedBlogPosts } from "@/lib/blog-posts"
import Blog2 from "@/components/ui/blog-2"

// SEO Metadata optimized for AEO and GEO
export const metadata: Metadata = {
  title: "Blog — Recent Thoughts by Nabil Thange",
  description:
    "Read recent thoughts from Nabil Thange — Full-stack developer and AI engineer based in Mumbai, India. Articles on AI, product development, hackathons, and learning.",
  keywords: [
    "Nabil Thange Blog",
    "Web Development Blog",
    "AI Product Development",
    "Hackathons",
    "Next.js Articles",
    "React Developer Blog",
    "Mumbai Developer Blog",
    "Nabil Salim Thange",
    "Nabil Thange Saraswati College of Engineering",
    "Saraswati College of Engineering",
    "Saraswati College of Engineering,Kharghar",
    "Nabil",
    "Mumbai Developer",
  ],
  openGraph: {
    title: "Blog — Recent Thoughts by Nabil Thange",
    description:
      "Essays and notes on AI, building products, hackathons, and the journey as a self-taught developer from Mumbai, India.",
    url: "https://nabil-thange.vercel.app/blog",
    siteName: "Nabil Thange Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nabil Thange — Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Recent Thoughts by Nabil Thange",
    description: "Articles on AI, product development, and learning by Nabil Thange.",
    creator: "@THEONLYNABIL",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://nabil-thange.vercel.app/blog",
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
}

export default function BlogPage() {
  const blogPosts = getSortedBlogPosts()
  
  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nabil-thange.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://nabil-thange.vercel.app/blog" },
    ],
  }

  // WebPage structured data
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog — Recent Thoughts",
    url: "https://nabil-thange.vercel.app/blog",
    description:
      "Recent thoughts and essays by Nabil Thange on AI, web development, hackathons, and building products.",
  }

  // Transform blog posts to match Blog2 component structure
  const blog2Posts = blogPosts.map((post) => ({
    meta: `${post.date} · ${post.readTime}`,
    title: post.title,
    author: {
      name: "Nabil Thange",
      role: "Developer & AI Engineer",
      avatar: "/og-image.png", // You can update this with your actual avatar
    },
    href: `/blog/${post.slug}`,
  }))

  const blog2Header = {
    heading: "Recent Thoughts",
    description: "Ideas on AI, product development, hackathons, and learning — from Mumbai, India.",
    ctaText: "View All Posts",
    ctaHref: "/blog",
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema).replace(/</g, "\\u003c") }}
      />

      <main className="min-h-screen relative">
        {/* Navigation */}
        <nav className="fixed top-8 left-8 z-10">
          <Link
            href="/"
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
            <span className="text-sm">Back</span>
          </Link>
        </nav>

        {/* Blog2 Component */}
        <Blog2
          header={blog2Header}
          posts={blog2Posts}
          renderCardLink={({ href, children }) => (
            <Link href={href}>{children}</Link>
          )}
        />
      </main>
    </>
  )
}
