"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface SoundContextType {
    soundEnabled: boolean
    setSoundEnabled: (enabled: boolean) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [soundEnabled, setSoundEnabled] = useState(false)

    useEffect(() => {
        // Load preference from localStorage on mount
        const savedPreference = localStorage.getItem("soundEnabled")
        if (savedPreference !== null) {
            setSoundEnabled(JSON.parse(savedPreference))
        }
    }, [])

    const updateSoundEnabled = (enabled: boolean) => {
        setSoundEnabled(enabled)
        localStorage.setItem("soundEnabled", JSON.stringify(enabled))
    }

    return (
        <SoundContext.Provider value={{ soundEnabled, setSoundEnabled: updateSoundEnabled }}>
            {children}
        </SoundContext.Provider>
    )
}

export const useSound = () => {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider")
    }
    return context
}
