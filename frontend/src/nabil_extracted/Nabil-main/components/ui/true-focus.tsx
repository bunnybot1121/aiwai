"use client"

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TrueFocusProps {
    sentence?: string;
    autoAnimate?: boolean; // Replaces manualMode for better clarity in this use case
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    onFinish?: () => void;
}

interface FocusRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence = 'True Focus',
    autoAnimate = true,
    blurAmount = 5,
    borderColor = 'green',
    glowColor = 'rgba(0, 255, 0, 0.6)',
    animationDuration = 2,
    pauseBetweenAnimations = 2,
    onFinish
}) => {
    const words = sentence.split(' ');
    // Use array of indices to support multiple words focus
    const [currentIndices, setCurrentIndices] = useState<number[]>([0]);
    const [step, setStep] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!autoAnimate || isFinished) return;

        // Sequence: 0 -> 1 -> [0, 1] -> Finish
        const sequence = [
            [0],     // Nabil
            [1],     // Thange
            [0, 1]   // Both
        ];

        const interval = setTimeout(() => {
            if (step < sequence.length - 1) {
                setStep(prev => prev + 1);
                setCurrentIndices(sequence[step + 1]);
            } else {
                // Finished
                setIsFinished(true);
                if (onFinish) onFinish();
            }
        }, (animationDuration + pauseBetweenAnimations) * 1000);

        return () => clearTimeout(interval);
    }, [step, autoAnimate, animationDuration, pauseBetweenAnimations, isFinished, onFinish]);

    useEffect(() => {
        if (currentIndicesValid(currentIndices) && containerRef.current) {
            // Calculate union rect
            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;

            const parentRect = containerRef.current.getBoundingClientRect();

            let hasValidRef = false;
            currentIndices.forEach(index => {
                const el = wordRefs.current[index];
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const relativeX = rect.left - parentRect.left;
                    const relativeY = rect.top - parentRect.top;

                    minX = Math.min(minX, relativeX);
                    minY = Math.min(minY, relativeY);
                    maxX = Math.max(maxX, relativeX + rect.width);
                    maxY = Math.max(maxY, relativeY + rect.height);
                    hasValidRef = true;
                }
            });

            if (hasValidRef) {
                setFocusRect({
                    x: minX,
                    y: minY,
                    width: maxX - minX,
                    height: maxY - minY
                });
            }
        }
    }, [currentIndices, words.length]);

    const currentIndicesValid = (indices: number[]) => {
        return indices.length > 0 && indices.every(i => i >= 0 && i < wordRefs.current.length);
    }

    return (
        <div
            className="relative flex gap-4 justify-center items-center flex-wrap"
            ref={containerRef}
            style={{ outline: 'none', userSelect: 'none' }}
        >
            {words.map((word, index) => {
                const isActive = currentIndices.includes(index);
                return (
                    <span
                        key={index}
                        ref={el => {
                            wordRefs.current[index] = el;
                        }}
                        className="relative text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight cursor-pointer text-white font-['var(--font-space-grotesk)']"
                        style={
                            {
                                filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                                transition: `filter ${animationDuration}s ease`,
                                outline: 'none',
                                userSelect: 'none',
                                fontFamily: 'var(--font-space-grotesk)'
                            } as React.CSSProperties
                        }
                    >
                        {word}
                    </span>
                );
            })}

            <motion.div
                className="absolute top-0 left-0 pointer-events-none box-border border-0"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: 1
                }}
                transition={{
                    duration: animationDuration
                }}
                style={
                    {
                        '--border-color': borderColor,
                        '--glow-color': glowColor
                    } as React.CSSProperties
                }
            >
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                    style={{
                        borderColor: 'var(--border-color)',
                        filter: 'drop-shadow(0 0 4px var(--border-color))'
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{
                        borderColor: 'var(--border-color)',
                        filter: 'drop-shadow(0 0 4px var(--border-color))'
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{
                        borderColor: 'var(--border-color)',
                        filter: 'drop-shadow(0 0 4px var(--border-color))'
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{
                        borderColor: 'var(--border-color)',
                        filter: 'drop-shadow(0 0 4px var(--border-color))'
                    }}
                ></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;
