import { Metadata } from 'next'
import { generatePageMetadata } from '@/components/SEOManager'

export const metadata: Metadata = generatePageMetadata({
  title: 'Portfolio Dashboard',
  description: 'Explore the full-stack developer portfolio of Nabil Thange in Mumbai. Showcasing AI-powered tools, Three.js 3D web applications, Next.js and React architecture, and B2B cybersecurity platforms.',
  path: '/home',
})

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
