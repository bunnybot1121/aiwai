"use client"

import { useCallback } from "react"
import { useSound } from "@/context/SoundContext"

export const useClickSound = () => {
    const { soundEnabled } = useSound()

    const playClickSound = useCallback(() => {
        if (soundEnabled) {
            const audio = new Audio("/click.mp3")
            audio.volume = 0.5
            audio.play().catch((e) => {
                // Ignore error if user hasn't interacted with document yet, though this should be triggered by interaction
                console.error("Audio play failed", e)
            })
        }
    }, [soundEnabled])

    return playClickSound
}
