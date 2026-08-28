import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Cpu, ArrowUpRight, Activity, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Text3DAnimationCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeSignal, setActiveSignal] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executedCount, setExecutedCount] = useState(142);

  // Signals dataset for cursor interactive cycle
  const signals = [
    { type: 'USAGE_DROP', label: 'login_frequency -45%', risk: 'HIGH', arr: '$180,000 ARR', client: 'Acme Corp' },
    { type: 'CHAMPION_LEFT', label: 'champion_departed (VP Product)', risk: 'CRITICAL', arr: '$240,000 ARR', client: 'Stripe Inc' },
    { type: 'TICKET_SPIKE', label: 'urgent_support_tickets +3', risk: 'HIGH', arr: '$95,000 ARR', client: 'Linear Labs' },
    { type: 'BILLING_DELAY', label: 'invoice_overdue_60d', risk: 'MEDIUM', arr: '$120,000 ARR', client: 'Vercel Co' }
  ];

  // 3D Perspective Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -12; // tilt up/down
    const ry = ((x - centerX) / centerX) * 12;  // tilt left/right

    setRotateX(rx);
    setRotateY(ry);

    // Change active signal based on mouse position
    const signalIdx = Math.min(Math.floor((x / rect.width) * signals.length), signals.length - 1);
    setActiveSignal(Math.max(0, signalIdx));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Trigger Intervention Simulation
  const handleTriggerIntervention = (e) => {
    e.stopPropagation();
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutedCount((prev) => prev + 1);
    }, 1200);
  };

  // Ambient Starfield Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const currentSig = signals[activeSignal];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] sm:h-[480px] flex items-center justify-center select-none perspective-1000"
    >
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* 3D Glassmorphic Interactive Control Room Card */}
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full max-w-lg p-6 rounded-3xl bg-[#090A0B]/85 border border-white/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:border-white/40 transition-colors duration-300"
      >
        
        {/* Card Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              REVIVE SENTINEL v2.4
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white border border-white/20">
            <Activity className="w-3 h-3 text-white animate-pulse" />
            <span>94% CRITICAL RISK</span>
          </div>
        </div>

        {/* Dynamic Interactive Signal Focus */}
        <div className="bg-gradient-to-br from-white/10 to-transparent p-5 rounded-2xl border border-white/15 mb-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/50">TARGET ACCOUNT</span>
            <span className="text-white font-bold">{currentSig.client}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-white/50">ACTIVE SIGNAL</div>
              <div className="text-base sm:text-lg font-mono font-extrabold text-white">
                {currentSig.label}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-white/50">ARR AT RISK</div>
              <div className="text-sm font-mono font-bold text-white">
                {currentSig.arr}
              </div>
            </div>
          </div>

          {/* Interactive Cursor Signal Selector Pills */}
          <div className="pt-2 flex items-center justify-between gap-1.5">
            {signals.map((sig, idx) => (
              <button
                key={sig.type}
                onClick={() => setActiveSignal(idx)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  activeSignal === idx
                    ? 'bg-white text-[#090A0B] shadow-md scale-105'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Autonomous Rescue Execution Bar */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-[10px] font-mono text-white/50">RESCUES EXECUTED</div>
            <div className="text-sm font-mono font-bold text-white">
              {executedCount} Interventions Safe
            </div>
          </div>

          <button
            onClick={handleTriggerIntervention}
            disabled={isExecuting}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#E4E4E7] text-[#090A0B] font-mono font-extrabold text-xs shadow-xl flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Rescue...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 fill-[#090A0B]" />
                <span>Execute AI Rescue</span>
              </>
            )}
          </button>
        </div>

        {/* Ambient Corner Frame Indicators */}
        <div className="absolute top-2 left-2 text-[9px] font-mono text-white/30">+</div>
        <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30">+</div>
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/30">+</div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/30">+</div>

      </motion.div>
    </div>
  );
}
