import type { Metadata } from "next"
import Link from "next/link"

// SEO Metadata optimized for AEO and GEO
export const metadata: Metadata = {
  title: "Contact Nabil Thange | Web Developer from Mumbai, India",
  description: "Connect with Nabil Thange, a Next.js and React developer based in Mumbai, India. Collaborate or get in touch for projects, freelance work, and opportunities.",
  keywords: [
    "Contact Nabil Thange",
    "Hire Web Developer Mumbai",
    "React Developer Contact",
    "Next.js Developer Mumbai",
    "Freelance Developer India",
    "Web Development Services",
  ],
  openGraph: {
    title: "Contact Nabil Thange | Full-Stack Developer from Mumbai",
    description: "Get in touch for projects, collaborations, and opportunities. Based in Mumbai, India.",
    url: "https://nabil-thange.vercel.app/contact",
    siteName: "Nabil Thange Portfolio",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://nabil-thange.vercel.app/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  // Structured Data for Contact Page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Nabil Thange",
    "description": "Get in touch with Nabil Thange for web development projects and collaborations",
    "url": "https://nabil-thange.vercel.app/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Nabil Salim Thange",
      "email": "thangenabil@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "India",
      },
    },
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-32">
          <section className="space-y-12">
            {/* Header */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">CONTACT</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Let's Connect
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Always interested in ambitious projects, collaborations, and conversations about technology, AI,
                design, and building products that matter.
              </p>
            </div>

            {/* Connect Section - matching home page */}
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-6">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Based in <span className="text-foreground">Mumbai, India</span>, available for remote work, freelance projects, and full-time opportunities worldwide.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="mailto:thangenabil@gmail.com"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg">thangenabil@gmail.com</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "GitHub", handle: "@NabilThange", url: "https://github.com/NabilThange" },
                    { name: "LinkedIn", handle: "/in/nabil-thange", url: "https://www.linkedin.com/in/nabil-thange/" },
                    { name: "X (Twitter)", handle: "@THEONLYNABIL", url: "https://x.com/THEONLYNABIL" },
                    { name: "Dev.to", handle: "@nabil_thange", url: "https://dev.to/nabil_thange" },
                    { name: "Devpost", handle: "thangenabil", url: "https://devpost.com/thangenabil" },
                    { name: "HuggingFace", handle: "Nabil-Oc", url: "https://huggingface.co/Nabil-Oc" },
                    { name: "Instagram", handle: "@nabil_thange", url: "https://www.instagram.com/nabil_thange/" },
                    { name: "lablab.ai", handle: "@NabilT", url: "https://lablab.ai/u/@NabilT" },
                    { name: "Medium", handle: "@thangenabil", url: "https://medium.com/@thangenabil" },
                    { name: "Kaggle", handle: "nabilthange", url: "https://www.kaggle.com/nabilthange" },
                    { name: "StackOverflow", handle: "nabil-thange", url: "https://stackoverflow.com/users/32129529/nabil-thange?tab=profile" },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                      aria-label={`Connect with Nabil Thange on ${social.name}`}
                    >
                      <div className="space-y-2">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
              <Link
                href="/about"
                className="group px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm inline-flex items-center gap-2 justify-center"
              >
                <span>About Me</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/gallery"
                className="group px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm inline-flex items-center gap-2 justify-center"
              >
                <span>View Projects</span>
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
          </section>
        </div>
      </main>
    </>
  )
}
