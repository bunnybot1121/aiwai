import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ReviveIntroSplash({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef(null);

  // Auto transition timers
  useEffect(() => {
    // Start fade out at 2.8s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2800);

    // Complete intro at 3.5s
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Pure Pitch Black Starfield Particles Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Drifting background dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.15
    }));

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Pure Pitch Black Background Fill (#000000)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // 2. Drifting Starfield Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Pitch Black Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Center Foreground Content with Perfect Modern Sans Alignment */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl space-y-4 sm:space-y-6">
        
        {/* Main Modern Ultra-Bold Title */}
        <h1 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[11rem] font-black font-sans tracking-tighter text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] leading-none select-none">
          REVIVE
        </h1>

        {/* Modern Wide-Tracked Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-sans font-semibold tracking-[0.3em] sm:tracking-[0.45em] text-white/70 uppercase select-none">
          Autonomous Churn Rescue Desk
        </p>

      </div>

      {/* Skip Hint at Bottom */}
      <div className="absolute bottom-10 z-20 flex items-center space-x-2 text-xs font-sans text-white/50 hover:text-white transition-colors">
        <span>Click anywhere to enter</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
