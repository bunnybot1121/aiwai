"use client"

import { useEffect, useState, useRef } from "react"

export interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: HeadingItem[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    // Set the first heading as active by default
    setActiveId(headings[0].id)

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find all intersecting elements
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      
      if (visibleEntries.length > 0) {
        // Sort visible entries by their bounding rect top to find the highest visible one
        const sorted = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )
        setActiveId(sorted[0].target.id)
      }
    }

    // Set up the IntersectionObserver with a custom rootMargin.
    // The top value (-80px) accounts for any fixed headers.
    // The bottom value (-60%) determines how far down the page a header has to scroll to trigger.
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 1.0],
    })

    // Observe each heading element
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [headings])

  // Fallback scroll spy for page bounds (e.g. top of page, bottom of page)
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      // If at the very top of the page, set first heading active
      if (window.scrollY < 120) {
        setActiveId(headings[0].id)
        return
      }

      // If at the very bottom of the page, set last heading active
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      if (isAtBottom) {
        setActiveId(headings[headings.length - 1].id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <h4 className="text-[11px] font-semibold tracking-widest text-muted-foreground/80 uppercase font-mono">
        On This Page
      </h4>
      <nav className="relative border-l border-border/40 pl-0">
        <ul className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(heading.id)
                    if (element) {
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.scrollY - 90
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                      
                      setActiveId(heading.id)
                      window.history.pushState(null, "", `#${heading.id}`)
                    }
                  }}
                  className={`block transition-all duration-200 border-l-2 -ml-[1px] ${
                    heading.level === 3 
                      ? "pl-5 text-xs py-1 leading-normal" 
                      : "pl-3 text-[13px] py-1 font-medium leading-normal"
                  } ${
                    isActive
                      ? "border-foreground text-foreground dark:text-white font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
