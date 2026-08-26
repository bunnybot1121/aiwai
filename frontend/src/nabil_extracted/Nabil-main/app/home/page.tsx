"use client"

import Dither from "@/components/ui/Dither"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { blogPosts } from "@/lib/blog-posts"

import { BlurFade } from "@/components/ui/blur-fade"
import { Tooltip } from "@/components/ui/tooltip-card"
import { useTheme } from "next-themes"
import StructuredData, { createPortfolioSchema } from "@/components/StructuredData"
import { siteConfig } from "@/components/SEOManager"

const TooltipCard = ({ title, description, image }: { title: string, description: string, image: string }) => {
  return (
    <div>
      <img
        src={image}
        alt={title}
        className="aspect-square w-full rounded-sm object-cover"
      />
      <div className="my-4 flex flex-col">
        <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{title}</p>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};

const projects = [
  {
    year: "2026",
    role: "Lead Developer & Security Architect",
    company: "Sentient",
    description:
      "B2B cybersecurity tool for banking institutions with automated APK/URL vulnerability detection. Won IIT Hyderabad hackathon with ₹60,000+ prize, Special Valor Award, and fully-sponsored campus invitation. Uses AST-based code indexing and GenAI for RBI-compliant reports.",
    tech: ["Python", "FastAPI", "Docker", "PostgreSQL", "MobSF"],
    image: "/sentinel.png"
  },
  {
    year: "2025",
    role: "System Architect & Lead Developer",
    company: "ARIA",
    description:
      "Multi-agent autonomous computer control system with 8 specialized agents. Redis-backed shared memory for real-time state sync. Achieved ~20% accuracy improvement over open-source competitors with live VNC desktop automation.",
    tech: ["Python", "Docker", "Redis", "Multi-Agent Systems", "VNC"],
    image: "/aria.png"
  },
  {
    year: "2025",
    role: "Founder & Creator",
    company: "Gitskinz",
    description:
      "Platform with 70+ brutalist GitHub README templates. Organically grew to 2,000+ monthly active users with zero paid marketing. Built with modern web stack and deployed globally.",
    tech: ["Next.js", "React", "Netlify", "Vite"],
    image: "/gitskinz.jpg"
  },
  {
    year: "2025",
    role: "AI Engineer & Full-Stack Developer",
    company: "NbAIl",
    description:
      "HackHazards 2025 Winner. AI-powered assistant with real-time voice control and desktop automation featuring multimodal capabilities powered by Groq for ultra-fast responses.",
    tech: ["Next.js", "Three.js", "Groq", "Voice Recognition"],
    image: "/nbail.jpg"
  },
  {
    year: "2024-Present",
    role: "Freelance Full-Stack Developer",
    company: "RafRaf International",
    description:
      "Complete production website for international import/export client. End-to-end delivery from Figma design to deployment with AEO/GEO optimization for global discoverability.",
    tech: ["Next.js", "React", "Figma", "SEO"],
    image: "/rafraf.png"
  },
  {
    year: "2025",
    role: "AI Engineer",
    company: "Style",
    description:
      "AI-powered fashion design tool that instantly generates outfit variations. Upload images of a person and garments to visualize endless combinations with a single click.",
    tech: ["AI", "Fashion Tech", "Generative Design"],
    image: "/style.jpg"
  },
];

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        // TWEAK HERE: Controls when the section reveals
        // threshold: 0.1 means trigger when 10% of the item is visible (0.5 would be 50%)
        // rootMargin: "-10%" effectively moves the trigger line up from the bottom. 
        //             Change -10% to -5% or 0px to make it appear even sooner.
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const isDark = !mounted || resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const portfolioSchema = createPortfolioSchema({
    name: "Nabil Thange - Portfolio",
    url: siteConfig.url,
    description: siteConfig.description,
    creator: {
      name: siteConfig.author.name,
      url: siteConfig.url,
      jobTitle: "Full-Stack Developer",
      image: `${siteConfig.url}/profile.png`,
    },
    works: projects.map((project) => ({
      name: project.company,
      url: `${siteConfig.url}/#work`,
      description: project.description,
      image: `${siteConfig.url}${project.image}`,
    })),
  })

  return (
    <>
      <StructuredData data={portfolioSchema} />
      <div className="fixed inset-0 z-0">
        <Dither
          waveColor={isDark ? [0.15, 0.15, 0.15] : [0.2, 0.2, 0.2]}
          colorNum={3}
          waveSpeed={0.01}
          waveAmplitude={0.6}
          waveFrequency={0.06}
          pixelSize={1}
          enableMouseInteraction={false}
        />
      </div>
      <div>
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex flex-col gap-4">
            {["intro", "work", "thoughts", "connect"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
                }}
                className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                aria-label={`Navigate to ${section}`}
              />
            ))}
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          <header
            id="intro"
            ref={(el) => { sectionsRef.current[0] = el }}
            className="min-h-screen flex items-center opacity-0"
          >
            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-2">
                  <div className="text-sm text-muted-foreground font-mono tracking-wider">FULL-STACK DEVELOPER MUMBAI</div>
                  <BlurFade delay={0.25} inView>
                    <h1 className="cursor-target text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                      React • Next.js • AI
                      <br />
                      <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">Full-Stack Developer Mumbai</span>
                    </h1>
                  </BlurFade>
                  <p className="sr-only">Nabil Thange - Full-Stack Developer based in Mumbai, India specializing in React, Next.js, and AI-powered web applications</p>
                </div>

                <BlurFade delay={0.5} inView>
                  <div className="space-y-6 max-w-md">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      I'm <span className="text-foreground font-medium">Nabil Thange</span>, a full-stack developer based in Mumbai, India, specializing in
                      <span className="text-foreground"> React</span>,
                      <span className="text-foreground"> Next.js</span>, and
                      <span className="text-foreground"> AI-powered web applications</span>. Available for freelance projects worldwide.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Available for work
                      </div>
                      <div className="flex items-center gap-3">
                        <div>Mumbai, India</div>
                        <div className="scale-75 origin-left">
                          <Link
                            href="/about"
                            className="cursor-target group relative px-5 py-2.5 text-sm font-medium border-2 border-foreground rounded-lg bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
                          >
                            <span className="relative z-10">More</span>
                            <svg
                              className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </div>
                </BlurFade>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                <BlurFade delay={0.75} inView>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                    <div className="space-y-2">
                      <div className="text-foreground">Frontend AI Development Intern</div>
                      <div className="text-muted-foreground">@ FlyRank AI</div>
                      <div className="text-xs text-muted-foreground">Feb 2026 — Present</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground font-mono">RESUME</div>
                    <Link
                      href="/resume"
                      className="cursor-target group relative px-5 py-2.5 text-sm font-medium border-2 border-foreground rounded-lg bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 inline-flex items-center gap-2 w-fit"
                    >
                      <svg
                        className="w-4 h-4 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="relative z-10">View Resume</span>
                      <svg
                        className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  <div className="space-y-4 mt-8">
                    <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "React", "Three.js", "AI/ML", "Python", "FastAPI", "Multi-Agent Systems", "LangChain", "Docker", "Redis"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </header>

          <section
            id="work"
            ref={(el) => { sectionsRef.current[1] = el }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-row items-center justify-between gap-4">
                <BlurFade delay={0.25} inView>
                  <h2 className="text-3xl sm:text-4xl font-light">{"My Work"} </h2>
                </BlurFade>
                <Link
                  href="/gallery"
                  className="cursor-target group relative px-5 py-2.5 text-sm font-medium border-2 border-foreground rounded-lg bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="relative z-10">View All Projects</span>
                  <svg
                    className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <BlurFade delay={0.5} inView>
                <div className="space-y-8 sm:space-y-12">
                  {projects.map((job, index) => (
                    <Tooltip
                      key={index}
                      content={<TooltipCard title={job.company} description={job.description} image={job.image} />}
                      containerClassName="w-full"
                    >
                      <div
                        className="cursor-target group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                      >
                        <div className="lg:col-span-2">
                          <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                            {job.year}
                          </div>
                        </div>

                        <div className="lg:col-span-6 space-y-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                            <div className="text-muted-foreground">{job.company}</div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                        </div>

                        <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                          {job.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Tooltip>
                  ))
                  }
                </div>
              </BlurFade>
            </div>
          </section>

          <section
            id="thoughts"
            ref={(el) => { sectionsRef.current[2] = el }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-row items-center justify-between gap-4">
                <BlurFade delay={0.25} inView>
                  <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>
                </BlurFade>
                <Link
                  href="/blog"
                  className="cursor-target group relative px-5 py-2.5 text-sm font-medium border-2 border-foreground rounded-lg bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="relative z-10">Show More</span>
                  <svg
                    className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <BlurFade delay={0.5} inView>
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                  {blogPosts.slice(0, 4).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
                      <article
                        className="cursor-target group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer h-full flex flex-col"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            <span>Read more</span>
                            <svg
                              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </BlurFade>
            </div>
          </section>

          <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <BlurFade delay={0.25} inView>
                  <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>
                </BlurFade>

                <BlurFade delay={0.5} inView>
                  <div className="space-y-6">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      Always interested in ambitious projects, collaborations, and conversations about technology, AI,
                      design, and building products that matter.
                    </p>

                    <div className="space-y-4">
                      <Link
                        href="mailto:thangenabil@gmail.com"
                        className="cursor-target group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
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
                </BlurFade>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <BlurFade delay={0.75} inView>
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
                        className="cursor-target group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
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
                </BlurFade>
              </div>
            </div>
          </section>

          <footer className="py-12 sm:py-16 border-t border-border">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">© 2025 Nabil Thange. All rights reserved.</div>
                <div className="text-xs text-muted-foreground">by Nabil Thange</div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </main>

        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
      </div>
    </>
  )
}
