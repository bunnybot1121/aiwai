import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedSVGPath({ 
    pathD, 
    strokeWidth = 2, 
    stroke = "#5B4BDB",
    className = ""
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 50%"]
    });
    
    return (
        <svg ref={ref} className={className} overflow="visible" preserveAspectRatio="none">
            <motion.path
                d={pathD}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill="none"
                style={{
                    pathLength: scrollYProgress
                }}
            />
        </svg>
    );
}
