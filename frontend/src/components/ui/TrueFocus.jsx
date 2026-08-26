import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrueFocus({
    sentence = 'True Focus',
    autoAnimate = true,
    blurAmount = 5,
    borderColor = '#5B4BDB',
    glowColor = 'rgba(91, 75, 219, 0.4)',
    animationDuration = 1.5,
    pauseBetweenAnimations = 1,
    onFinish
}) {
    const words = sentence.split(' ');
    // Handle focus state for one word at a time, or all
    const [currentIndices, setCurrentIndices] = useState([0]);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const wordRefs = useRef([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!autoAnimate || isFinished) return;

        // Create a sequence that focuses each word sequentially, then all words
        const sequence = words.map((_, i) => [i]);
        sequence.push(words.map((_, i) => i)); // All words at the end

        const interval = setTimeout(() => {
            if (step < sequence.length - 1) {
                setStep(prev => prev + 1);
                setCurrentIndices(sequence[step + 1]);
            } else {
                setIsFinished(true);
                if (onFinish) onFinish();
            }
        }, (animationDuration + pauseBetweenAnimations) * 1000);

        return () => clearTimeout(interval);
    }, [step, autoAnimate, animationDuration, pauseBetweenAnimations, isFinished, onFinish, words.length]);

    useEffect(() => {
        if (currentIndices.length > 0 && currentIndices.every(i => i >= 0 && i < wordRefs.current.length) && containerRef.current) {
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
                // Add a little padding to the rect
                setFocusRect({
                    x: minX - 8,
                    y: minY - 8,
                    width: (maxX - minX) + 16,
                    height: (maxY - minY) + 16
                });
            }
        }
    }, [currentIndices, words.length]);

    return (
        <div
            className="relative flex gap-3 sm:gap-4 justify-center items-center flex-wrap"
            ref={containerRef}
            style={{ outline: 'none', userSelect: 'none' }}
        >
            {words.map((word, index) => {
                const isActive = currentIndices.includes(index) || isFinished;
                return (
                    <span
                        key={index}
                        ref={el => {
                            wordRefs.current[index] = el;
                        }}
                        className="relative text-5xl sm:text-7xl lg:text-[100px] font-black tracking-tight text-[#111318]"
                        style={{
                            filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                            opacity: isActive ? 1 : 0.4,
                            transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
                        }}
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
                    opacity: isFinished ? 0 : 1
                }}
                transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                }}
                style={{
                    '--border-color': borderColor,
                    '--glow-color': glowColor
                }}
            >
                <span className="absolute w-5 h-5 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                    style={{ borderColor: 'var(--border-color)', filter: 'drop-shadow(0 0 4px var(--glow-color))' }}></span>
                <span className="absolute w-5 h-5 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{ borderColor: 'var(--border-color)', filter: 'drop-shadow(0 0 4px var(--glow-color))' }}></span>
                <span className="absolute w-5 h-5 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{ borderColor: 'var(--border-color)', filter: 'drop-shadow(0 0 4px var(--glow-color))' }}></span>
                <span className="absolute w-5 h-5 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{ borderColor: 'var(--border-color)', filter: 'drop-shadow(0 0 4px var(--glow-color))' }}></span>
            </motion.div>
        </div>
    );
}
