import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingSignals({ signals }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"]
    });

    return (
        <div ref={containerRef} className="relative w-full h-[150vh]">
            <div className="sticky top-1/2 -translate-y-1/2 left-0 right-0 h-[600px] flex items-center justify-center overflow-hidden">
                {/* Center Node (The Customer) */}
                <motion.div 
                    className="w-4 h-4 rounded-full bg-[#111318] z-10 shadow-[0_0_20px_rgba(17,19,24,0.2)]"
                    style={{
                        scale: useTransform(scrollYProgress, [0, 0.8], [0.5, 2]),
                    }}
                />
                
                {/* Floating Signals */}
                {signals.map((sig, i) => {
                    // Start far out at random angles
                    const angle = (i / signals.length) * Math.PI * 2;
                    const distance = 300 + Math.random() * 200;
                    const startX = Math.cos(angle) * distance;
                    const startY = Math.sin(angle) * distance;
                    
                    // Transform to center (0,0)
                    const x = useTransform(scrollYProgress, [0, 0.8], [startX, 0]);
                    const y = useTransform(scrollYProgress, [0, 0.8], [startY, 0]);
                    const opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);
                    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

                    return (
                        <motion.div
                            key={i}
                            className={`absolute px-3 py-1.5 rounded-md text-[10px] font-mono font-bold tracking-wider ${sig.color} shadow-sm border border-black/5 backdrop-blur-md whitespace-nowrap`}
                            style={{ x, y, opacity, scale }}
                        >
                            {sig.label}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
