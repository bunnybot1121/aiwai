/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {},
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'postprocessing'],
  // Exclude pdfjs-dist from bundling to avoid SSR issues
  serverExternalPackages: ['pdfjs-dist'],
}

export default nextConfig
