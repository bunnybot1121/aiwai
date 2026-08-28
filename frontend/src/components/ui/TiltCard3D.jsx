import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard3D({ children, className = '', glowColor = 'rgba(99, 91, 255, 0.25)' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // rotate deg X
    const rotY = ((x - centerX) / centerX) * 12;  // rotate deg Y

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {/* 3D Dynamic Glow aura */}
      {isHovered && (
        <div
          className="absolute -inset-1 rounded-3xl blur-xl opacity-70 pointer-events-none transition-all duration-300 -z-10"
          style={{ background: glowColor }}
        />
      )}

      {children}
    </motion.div>
  );
}
