"use client"

import { useEffect, useState } from "react"
import type { Project } from "./InfiniteGallery"

interface CursorFollowerProps {
    hoveredProject: Project | null
}

export default function CursorFollower({ hoveredProject }: CursorFollowerProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile) return

        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", moveCursor)
        return () => window.removeEventListener("mousemove", moveCursor)
    }, [])

    // Delay visibility slightly to avoid flicker or handle smooth entry
    useEffect(() => {
        if (hoveredProject && !isMobile) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [hoveredProject, isMobile])

    if (isMobile) return null

    return (
        <div
            className={`fixed pointer-events-none z-[100] transition-opacity duration-300 ease-out flex flex-col gap-1 items-center justify-center ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(15px, 15px)",
            }}
        >
            <div className="relative bg-zinc-900/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-2xl">
                {/* Corner brackets mimicking TargetCursor */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white"></div>

                <p className="text-white font-medium whitespace-nowrap text-sm tracking-wide">
                    {hoveredProject?.title}
                </p>
            </div>
        </div>
    )
}
