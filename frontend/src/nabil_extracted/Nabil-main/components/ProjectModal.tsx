"use client"

import { X, ExternalLink, Github } from "lucide-react"
import { useEffect, useState } from "react"
import type { Project } from "./InfiniteGallery"

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
    project: Project | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const [show, setShow] = useState(false)
    const [showPrivateMessage, setShowPrivateMessage] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShow(true)
            document.body.style.overflow = "hidden"
        } else {
            // Delay unmounting for fade out
            const timer = setTimeout(() => {
                setShow(false)
                setShowPrivateMessage(false)
            }, 300)
            document.body.style.overflow = ""
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const handleGithubClick = () => {
        if (project?.githubUrl) {
            window.open(project.githubUrl, "_blank", "noopener,noreferrer")
        } else {
            setShowPrivateMessage(true)
            setTimeout(() => {
                setShowPrivateMessage(false)
            }, 3000)
        }
    }

    if (!show && !isOpen) return null

    // Ensure we render something to animate out even if project is null during close
    if (!project && !show) return null

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center px-4 transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative z-10 w-full max-w-3xl bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-target absolute top-6 right-6 p-2.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-all duration-300 z-20 group"
                    aria-label="Close modal"
                >
                    <X size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {project && (
                    <div className="flex flex-col max-h-[90vh] overflow-y-auto">
                        {/* Image Section */}
                        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-zinc-900">
                            <img
                                src={project.src}
                                alt={project.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-10 space-y-8">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <h2 className="text-3xl md:text-4xl font-light text-white">
                                        {project.title}
                                    </h2>
                                    {project.year && (
                                        <span className="text-zinc-500 font-mono text-sm border border-zinc-900 px-3 py-1.5 rounded-lg">
                                            {project.year}
                                        </span>
                                    )}
                                </div>

                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs font-mono text-zinc-500 border border-zinc-900 px-3 py-1.5 rounded-lg hover:border-zinc-700 transition-colors duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                                {project.description}
                            </p>

                            {/* Private Message */}
                            {showPrivateMessage && (
                                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Sorry, this project is not open source and is private to Nabil
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-target group relative px-6 py-3 text-sm font-medium rounded-lg bg-white text-black hover:bg-zinc-200 transition-all duration-300 inline-flex items-center justify-center gap-2"
                                >
                                    <span className="relative z-10">Visit Project</span>
                                    <ExternalLink size={16} className="relative z-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </a>

                                <button
                                    onClick={handleGithubClick}
                                    className="cursor-target group relative px-6 py-3 text-sm font-medium border border-zinc-800 rounded-lg hover:border-white transition-all duration-300 inline-flex items-center justify-center gap-2 bg-transparent text-white"
                                >
                                    <Github size={16} className="transform group-hover:rotate-12 transition-transform duration-300" />
                                    <span>View GitHub Repo</span>
                                    <svg
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
