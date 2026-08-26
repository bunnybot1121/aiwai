"use client"

import Link from "next/link"
import { useClickSound } from "@/hooks/useClickSound"

interface AnimatedButtonProps {
  href: string
  text: string[]
}

export default function AnimatedButton({ href, text }: AnimatedButtonProps) {
  const playClickSound = useClickSound()
  return (
    <Link href={href} className="animated-button-wrapper" onClick={playClickSound}>
      <button className="animated-button">
        <div className="text">
          {text.map((word, i) => (
            <span key={`text-${i}`}>{word}</span>
          ))}
        </div>
        <div className="clone">
          {text.map((word, i) => (
            <span key={`clone-${i}`}>{word}</span>
          ))}
        </div>
        <svg
          strokeWidth={2}
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </button>
      <style jsx>{`
        .animated-button-wrapper {
          display: inline-block;
        }

        .animated-button {
          width: 140px;
          height: 56px;
          overflow: hidden;
          border: none;
          color: white;
          background: none;
          position: relative;
          padding-bottom: 2em;
          cursor: pointer;
        }

        .animated-button > div,
        .animated-button > svg {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
        }

        .animated-button:before {
          content: "";
          position: absolute;
          height: 2px;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: scaleX(0);
          transform-origin: bottom right;
          background: white;
          transition: transform 0.25s ease-out;
        }

        .animated-button:hover:before {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .animated-button .clone > *,
        .animated-button .text > * {
          opacity: 1;
          font-size: 1.3rem;
          transition: 0.2s;
          margin-left: 4px;
        }

        .animated-button .clone > * {
          transform: translateY(60px);
        }

        .animated-button:hover .clone > * {
          opacity: 1;
          transform: translateY(0px);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        }

        .animated-button:hover .text > * {
          opacity: 1;
          transform: translateY(-60px);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        }

        .animated-button:hover .clone > :nth-child(1) {
          transition-delay: 0.15s;
        }

        .animated-button:hover .clone > :nth-child(2) {
          transition-delay: 0.2s;
        }

        .animated-button:hover .clone > :nth-child(3) {
          transition-delay: 0.25s;
        }

        .animated-button:hover .clone > :nth-child(4) {
          transition-delay: 0.3s;
        }

        .animated-button svg {
          width: 20px;
          right: 0;
          top: 50%;
          transform: translateY(-50%) rotate(-50deg);
          transition: 0.2s ease-out;
        }

        .animated-button:hover svg {
          transform: translateY(-50%) rotate(-90deg);
        }
      `}</style>
    </Link>
  )
}
