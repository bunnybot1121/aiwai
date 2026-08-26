"use client"

import { useRouter } from "next/navigation"
import TrueFocus from "@/components/ui/true-focus"
import Prism from "@/components/Prism"
import { useSound } from "@/context/SoundContext"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

// Custom hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Check on resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, mounted }
}

export default function IntroPage() {
  const router = useRouter()
  const { setSoundEnabled } = useSound()
  const [showButtons, setShowButtons] = useState(false)
  const [startAnimation, setStartAnimation] = useState(false)
  const { isMobile, mounted } = useIsMobile()

  useEffect(() => {
    // Play glitch sound on load
    const audio = new Audio("/glitch.mp3")
    audio.volume = 0.5
    audio.play().catch((e) => {
      // Autoplay might be blocked by browser
      console.log("Autoplay blocked/failed", e)
    })

    const timer = setTimeout(() => {
      setStartAnimation(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = (sound: boolean) => {
    setSoundEnabled(sound)

    if (sound) {
      // Play glitch sound immediately as feedback
      try {
        const audio = new Audio("/glitch.mp3")
        audio.volume = 0.5
        audio.play()
      } catch (e) {
        console.error("Failed to play sound", e)
      }
    }

    // Delay navigation slightly to allow sound to play
    setTimeout(() => {
      router.push("/home")
    }, 300)
  }

  // Mobile-optimized Prism configuration
  // Use desktop config during SSR/initial render to avoid hydration mismatch
  const prismConfig = !mounted ? {
    // Default (desktop) configuration for SSR
    animationType: "3drotate" as const,
    timeScale: 0.5,
    height: 3.5,
    baseWidth: 5.5,
    scale: 3.6,
    hueShift: 0,
    colorFrequency: 1,
    noise: 0.4,
    glow: 1,
    bloom: 1,
    mobileSteps: 20,
    desktopSteps: 100,
    mobileDpr: 1,
    desktopDpr: 2,
    suspendWhenOffscreen: true
  } : isMobile ? {
    // Mobile-specific configuration
    animationType: "3drotate" as const,
    timeScale: 0.5,
    height: 3.5,
    baseWidth: 5.5,
    scale: 3.45,              // Match desktop scale
    hueShift: 0,
    colorFrequency: 1,
    noise: 0.2,              // Reduced for mobile
    glow: 0.9,                 // Match desktop glow
    bloom: 0.8,              // Added for mobile
    mobileSteps: 35,         // Increased from 20 to ensure visibility
    desktopSteps: 100,
    mobileDpr: 1,
    desktopDpr: 2,
    suspendWhenOffscreen: true
  } : {
    // Desktop-optimized configuration
    animationType: "3drotate" as const,
    timeScale: 0.5,
    height: 3.5,
    baseWidth: 5.5,
    scale: 3.6,
    hueShift: 0,
    colorFrequency: 1,
    noise: 0.4,
    glow: 1,
    bloom: 1,
    mobileSteps: 20,
    desktopSteps: 100,
    mobileDpr: 1,
    desktopDpr: 2,
    suspendWhenOffscreen: true
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Prism {...prismConfig} />
      </div>

      <div className="mb-12 relative z-10 w-full flex justify-center">
        {/* H1 for SEO - Hidden visually but accessible to search engines and screen readers */}
        <h1 className="sr-only">Nabil Thange</h1>
        <TrueFocus
          sentence="Nabil Thange"
          borderColor="#ffffff"
          glowColor="rgba(255, 255, 255, 0.6)"
          animationDuration={0.3}
          pauseBetweenAnimations={0.2}
          autoAnimate={startAnimation}
          onFinish={() => setShowButtons(true)}
        />
      </div>

      <div
        className={cn(
          "flex gap-8 transition-opacity duration-1000 z-10",
          showButtons ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={() => handleEnter(true)}
          className="cursor-target group relative px-6 py-3 font-semibold text-white border border-transparent hover:border-white transition-all duration-300"
        >
          Enter with sound <ArrowUpRight className="inline-block w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>

        <button
          onClick={() => handleEnter(false)}
          className="cursor-target px-6 py-3 font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-2 after:left-6 after:w-0 after:h-[1px] after:bg-white hover:after:w-[calc(100%-48px)] after:transition-all after:duration-300"
        >
          Enter without sound
        </button>
      </div>
    </div>
  )
}
