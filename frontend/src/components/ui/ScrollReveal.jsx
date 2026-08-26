import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
    children,
    className = "",
    duration = 0.6,
    delay = 0,
    yOffset = 30,
    xOffset = 0,
    blur = "8px",
    once = true,
    amount = "some" // 'some' | 'all' | number
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const variants = {
        hidden: { 
            opacity: 0, 
            y: yOffset,
            x: xOffset,
            filter: `blur(${blur})`
        },
        visible: { 
            opacity: 1, 
            y: 0, 
            x: 0,
            filter: 'blur(0px)'
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // premium cubic-bezier ease
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
