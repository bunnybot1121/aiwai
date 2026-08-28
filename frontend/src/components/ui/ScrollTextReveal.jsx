import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollTextReveal({ children, className = '', delay = 0, yOffset = 40 }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"]
  });

  const opacityRaw = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.85]);
  const yRaw = useTransform(scrollYProgress, [0, 0.3], [yOffset, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.3], [0.96, 1]);

  const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 20 });
  const y = useSpring(yRaw, { stiffness: 100, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
