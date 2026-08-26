import type { Metadata } from "next"
import GalleryContent from "@/components/GalleryContent"
import { siteConfig } from "@/components/SEOManager"

// SEO Metadata for Gallery
export const metadata: Metadata = {
  title: "Gallery — Projects by Nabil Thange",
  description:
    "Explore selected work by Nabil Thange — interactive, AI-powered, and web experiences. Built with Next.js, React, and Three.js.",
  keywords: [
    "Nabil Thange Gallery",
    "Web Projects",
    "Three.js",
    "Next.js Portfolio",
    "Nabil Salim Thange",
    "Nabil Thange Saraswati College of Engineering",
    "Nabil",
    "Mumbai Developer",
  ],
  openGraph: {
    title: "Gallery — Projects by Nabil Thange",
    description:
      "A curated selection of interactive projects and visual explorations.",
    url: `${siteConfig.url}/gallery`,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Nabil Thange — Gallery" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — Projects by Nabil Thange",
    description: "Interactive and AI-powered projects by Nabil Thange.",
    creator: "@THEONLYNABIL",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
  },
}

export default function GalleryPage() {
  // ImageGallery structured data
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Portfolio Gallery — Nabil Thange",
    url: `${siteConfig.url}/gallery`,
    locationCreated: {
      "@type": "Place",
      name: "Mumbai, India",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "India",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema).replace(/</g, "\\u003c") }}
      />
      <GalleryContent />
    </>
  )
}
