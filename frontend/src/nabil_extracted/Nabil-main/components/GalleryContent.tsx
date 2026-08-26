"use client"

import { useState } from "react"
import InfiniteGallery, { type Project } from "@/components/InfiniteGallery"
import { ChevronLeft } from "lucide-react"
import ProjectModal from "@/components/ProjectModal"
import CursorFollower from "@/components/CursorFollower"
const projects: Project[] = [
  {
    id: "style",
    title: "Style",
    description: "An AI-powered fashion design tool that instantly generates outfit variations. Upload images of a person and garments to visualize endless combinations with a single click.",
    src: "/style.jpg",
    link: "https://styl-ai.vercel.app/",
    githubUrl: "",
    tags: ["AI", "Fashion Tech", "Generative Design"],
    year: "Dec 2025"
  },
  {
    id: "vyx",
    title: "Vyx",
    description: "A comprehensive content repurposing platform. Transform YouTube videos into blogs, social posts, and short-form videos with captions and predicted virality scores across 7+ formats.",
    src: "/vyx.jpg",
    link: "https://vyx.vercel.app/",
    githubUrl: "",
    tags: ["AI", "Content Automation", "Video Processing"],
    year: "Nov 2025"
  },
  {
    id: "flowgenie",
    title: "Flowgenie",
    description: "The 'Cursor AI' for n8n workflows. Describe your automation needs, and Flowgenie generates and edits complex n8n workflows directly within the interface suitable for automation engineers.",
    src: "/flowgenie.jpg",
    link: "https://flowgenie.vercel.app/",
    githubUrl: "",
    tags: ["AI", "Automation", "n8n", "Developer Tools"],
    year: "Jan 2025"
  },
  {
    id: "nabil-portfolio",
    title: "Nabil's Portfolio",
    description: "My personal portfolio showcasing my journey and projects.",
    src: "/portfolio.jpg",
    link: "https://nabilthange.vercel.app/",
    githubUrl: "",
    tags: ["Portfolio", "3D", "Creative"],
    year: "Oct 2025"
  },
  {
    id: "trippack",
    title: "trippack",
    description: "A collaborative group travel planner. Create shared packing lists and itineraries with private/public rooms, real-time checklist synchronization, and unique invite links for simplified group coordination.",
    src: "/trippack.jpg",
    link: "https://trippack.vercel.app/",
    githubUrl: "https://github.com/NabilThange/Trippack",
    tags: ["Travel", "Real-time Collaboration", "Utility"],
    year: "Dec 2025"
  },
  {
    id: "gitskinz",
    title: "Gitskinz",
    description: "The 'Pinterest for GitHub Readmes'. Discover 60+ customizable templates and 12+ themes, or generate unique, project-specific READMEs using AI by simply describing your code.",
    src: "/gitskinz.jpg",
    link: "https://gitskinz.netlify.app/",
    githubUrl: "",
    tags: ["React", "AI", "Open Source", "Developer Tools"],
    year: "Jul 2025"
  },
  {
    id: "shopwiz",
    title: "Shopwiz",
    description: "Conversational shopping assistant transforming e-commerce interaction.",
    src: "/shopwiz.jpg",
    link: "https://shopwz.vercel.app/",
    githubUrl: "https://github.com/NabilThange/Shopwiz",
    tags: ["AI", "E-commerce", "Chatbot"],
    year: "Jul 2025"
  },
  {
    id: "techwiser",
    title: "Techwiser",
    description: "Modern tech blog UI delivering content with clarity and style.",
    src: "/techwiser.jpg",
    link: "https://techwiser.vercel.app/",
    githubUrl: "https://github.com/NabilThange/techwisercms",
    tags: ["Next.js", "Blog", "UI/UX"],
    year: "Oct 2025"
  },
  {
    id: "hungryzhub",
    title: "HungryzHub",
    description: "A smart vending machine network for university campuses. Briing the gap between students and quick access to snacks and essentials through IoT-enabled machines.",
    src: "/hungryzhub.jpg",
    link: "https://hungryzhub.vercel.app/",
    githubUrl: "https://github.com/NabilThange/Hungryzhub",
    tags: ["IoT", "Startup", "Hardware Integration"],
    year: "Aug 2025"
  },
  {
    id: "studenza",
    title: "Studenza",
    description: "Comprehensive student portal for academic management. (Also known as ClgSphere)",
    src: "/studenza.jpg",
    link: "https://clgsphere.vercel.app/",
    githubUrl: "",
    tags: ["Education", "Dashboard", "Management"],
    year: "Sept 2025"
  },
  {
    id: "nutrisnap",
    title: "NutriSnap",
    description: "AI-powered nutrition tracking app using image recognition.",
    src: "/nutrisnap.jpg",
    link: "https://nutrisnapp-ai.vercel.app/",
    githubUrl: "https://github.com/NabilThange/Nutrisnap",
    tags: ["AI", "Health", "Image Recognition"],
    year: "Jun 2025"
  },
  {
    id: "snippetsphere",
    title: "SnippetSphere",
    description: "A code snippet library for developers to store and share solutions.",
    src: "/snippetsphere.jpg",
    link: "https://snippetsphere.vercel.app/",
    githubUrl: "",
    tags: ["DevTools", "Community", "Database"],
    year: "Jun 2025"
  },
  {
    id: "techwiser-cms",
    title: "Techwiser CMS",
    description: "Custom content management system built for the Techwiser blog.",
    src: "/techwiser-cms.jpg",
    link: "https://techwisercms.vercel.app/",
    githubUrl: "",
    tags: ["CMS", "Admin Panel", "Full Stack"],
    year: "Oct 2025"
  },
  {
    id: "musty-mu",
    title: "Musty MU",
    description: "A comprehensive academic resource hub for Mumbai University students. Free access to syllabus, notes, previous papers, and AI-assisted learning tools.",
    src: "/musty.jpg",
    link: "https://musty-mu.vercel.app/",
    githubUrl: "https://github.com/NabilThange/MUSTY",
    tags: ["EdTech", "Resource Platform", "Community"],
    year: "Jun 2025"
  },
  {
    id: "nbail",
    title: "NbAIl",
    description: "A pioneering multimodal AI assistant featuring live-vision capabilities, allowing users to interact with the world through real-time visual analysis and voice interaction.",
    src: "/nbail.jpg",
    link: "https://nbail-v4.vercel.app/",
    githubUrl: "",
    tags: ["AI", "Computer Vision", "Multimodal"],
    year: "Apr 2024"
  },
  {
    id: "snipiq",
    title: "Snipiq",
    description: "Smart code snippet manager with intelligence features.",
    src: "/snipiq.jpg",
    link: "https://snipiq.vercel.app/",
    githubUrl: "",
    tags: ["DevTools", "Productivity"],
    year: "Aug 2025"
  },
  {
    id: "cantio",
    title: "Cantio",
    description: "Music or audio application platform.",
    src: "/cantio.jpg",
    link: "https://cantioo.vercel.app/",
    githubUrl: "",
    tags: ["Audio", "Streaming"],
    year: "Aug 2025"
  },
  {
    id: "techwiser-shop",
    title: "Techwiser Shop",
    description: "E-commerce extension for the Techwiser brand.",
    src: "/techwiser.jpg",
    link: "https://techwiser.vercel.app/",
    githubUrl: "https://github.com/NabilThange/techwisershop",
    tags: ["E-commerce", "Retail"],
    year: "Oct 2025"
  },
  {
    id: "calc",
    title: "calc",
    description: "A minimalist yet powerful calculator application.",
    src: "/calc.jpg",
    link: "https://hungryzhub-calc.vercel.app/",
    githubUrl: "",
    tags: ["Utility", "Design"],
    year: "Oct 2025"
  },
  {
    id: "meta-xr",
    title: "Meta XR",
    description: "Explorations in Extended Reality and spatial computing.",
    src: "/meta-xr.jpg",
    link: "https://meta-games-silk.vercel.app/",
    githubUrl: "",
    tags: ["XR", "VR/AR", "Spatial"],
    year: "Dec 2025"
  },
  {
    id: "interrogate",
    title: "Interrogate",
    description: "An AI career coach that helps you craft ATS-friendly resumes through natural conversation, analyzing your experience to highlight the most relevant skills for your target roles.",
    src: "/interrogate.jpg",
    link: "https://ai.studio/apps/drive/1KmsnUjr5oaZ8vGBEpi3jzHpiMsMcyUea?fullscreenApplet=true",
    githubUrl: "",
    tags: ["AI", "CareerTech", "NLP"],
    year: "Dec 2025"
  }
]

export default function GalleryContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)

  const handleBack = () => {
    window.history.back()
  }

  // Consolidate duplicates logic is implicit as I manually curated the list above.

  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      <button
        onClick={handleBack}
        className="cursor-target fixed top-6 left-6 z-50 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white/60 hover:text-white/90"
        aria-label="Go back"
      >
        <ChevronLeft size={20} />
      </button>

      <InfiniteGallery
        items={projects}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full rounded-lg overflow-hidden"
        onItemSelect={setSelectedProject}
        onItemHover={setHoveredProject}
      />

      <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-0">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight opacity-20">
          <span className="italic">I create;</span> therefore I am
        </h1>
      </div>

      <div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold text-white/40 pointer-events-none z-0">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">Click to view project details</p>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <CursorFollower hoveredProject={hoveredProject} />
    </main>
  )
}
