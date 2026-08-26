import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | Nabil Thange - Full-Stack Developer',
  description: 'View and download the resume of Nabil Thange, a full-stack developer from Mumbai specializing in React, Next.js, and AI-powered applications.',
  openGraph: {
    title: 'Resume | Nabil Thange - Full-Stack Developer',
    description: 'View and download the resume of Nabil Thange, a full-stack developer from Mumbai specializing in React, Next.js, and AI-powered applications.',
    type: 'profile',
  },
  alternates: {
    canonical: 'https://nabil-thange.vercel.app/resume',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
