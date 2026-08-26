"use client"

import { CodeBlock as CultCodeBlock } from "@/components/ui/code-block"

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export function CodeBlock({ children, language = "bash", className }: CodeBlockProps) {
  return <CultCodeBlock code={children} language={language} className={className} />
}
