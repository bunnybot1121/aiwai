"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { SoundProvider, useSound } from "@/context/SoundContext"

function GlobalClickSound() {
    const { soundEnabled } = useSound()
    const pathname = usePathname()

    useEffect(() => {
        const handleClick = () => {
            // Don't play click sound on the intro page
            if (pathname === "/") return

            if (soundEnabled) {
                const audio = new Audio("/click.mp3")
                audio.volume = 0.5
                audio.currentTime = 0
                audio.play().catch((e) => console.error("Audio play failed", e))
            }
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [soundEnabled, pathname])

    return null
}

import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SoundProvider>
                <GlobalClickSound />
                {children}
            </SoundProvider>
        </ThemeProvider>
    )
}
