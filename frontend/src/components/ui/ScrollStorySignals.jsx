import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollStorySignals() {
  const [activeAccount, setActiveAccount] = useState('ACME');

  const accountsData = {
    ACME: {
      name: 'ACME CORP',
      id: 'CUST-001',
      arr: '$221k ARR',
      risk: '94%',
      signals: [
        { label: 'USAGE DROP -31%', cat: 'Product', color: '#FFFFFF', pos: 'top-6 left-6' },
        { label: 'BILLING 45D OVERDUE', cat: 'Finance', color: '#A1A1AA', pos: 'top-6 right-6' },
        { label: 'SUPPORT: 4 TICKETS', cat: 'Support', color: '#FFFFFF', pos: 'bottom-16 left-6' },
        { label: 'CHAMPION DEPARTED', cat: 'Contact', color: '#71717A', pos: 'bottom-16 right-6' }
      ]
    },
    NOVA: {
      name: 'NOVA LABS',
      id: 'CUST-042',
      arr: '$146k ARR',
      risk: '87%',
      signals: [
        { label: 'LICENSE UNUSED -25%', cat: 'Product', color: '#A1A1AA', pos: 'top-6 left-6' },
        { label: 'INVOICE UNPAID 15D', cat: 'Finance', color: '#A1A1AA', pos: 'top-6 right-6' },
        { label: 'API LIMIT REACHED', cat: 'Support', color: '#FFFFFF', pos: 'bottom-16 left-6' },
        { label: 'SPONSOR CHANGED ROLE', cat: 'Contact', color: '#71717A', pos: 'bottom-16 right-6' }
      ]
    },
    ORBIT: {
      name: 'ORBIT INC',
      id: 'CUST-089',
      arr: '$288k ARR',
      risk: '91%',
      signals: [
        { label: 'SESSIONS DOWN -50%', cat: 'Product', color: '#FFFFFF', pos: 'top-6 left-6' },
        { label: 'PAYMENT FAILED 2X', cat: 'Finance', color: '#FFFFFF', pos: 'top-6 right-6' },
        { label: 'CSM MEETINGS CANCELED', cat: 'Support', color: '#A1A1AA', pos: 'bottom-16 left-6' },
        { label: 'VP ENG LEFT', cat: 'Contact', color: '#FFFFFF', pos: 'bottom-16 right-6' }
      ]
    }
  };

  const current = accountsData[activeAccount];

  return (
    <div className="card-mono-dark p-6 md:p-8 space-y-6 relative overflow-hidden">
      
      {/* Account Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#27272A] pb-4 gap-3">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
          INTERACTIVE MONITORING STREAM
        </span>

        {/* Account Selector Tabs */}
        <div className="flex items-center space-x-1.5 font-mono text-xs">
          {Object.keys(accountsData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveAccount(key)}
              className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                activeAccount === key
                  ? 'bg-white text-[#090A0B] shadow-md'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A]'
              }`}
            >
              {key} ({accountsData[key].risk})
            </button>
          ))}
        </div>
      </div>

      {/* SVG Connection Network Canvas */}
      <div className="relative w-full h-[380px] sm:h-[420px] bg-[#090A0B] rounded-2xl border border-[#27272A] flex items-center justify-center overflow-hidden p-4">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" overflow="visible">
          <motion.path
            d="M 120 70 Q 240 160 340 210"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M 560 70 Q 440 160 340 210"
            stroke="#A1A1AA"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />
          <motion.path
            d="M 120 350 Q 240 260 340 210"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.path
            d="M 560 350 Q 440 260 340 210"
            stroke="#71717A"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          />
        </svg>

        {/* Central Monochromatic Customer Node */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white text-[#090A0B] flex flex-col items-center justify-center shadow-2xl p-4 text-center border-4 border-[#27272A]"
          >
            <span className="font-mono text-[9px] text-[#71717A] uppercase tracking-wider block mb-0.5">MONITORED ACCOUNT</span>
            <span className="font-black text-base sm:text-xl tracking-tight text-[#090A0B] block">{current.name}</span>
            <span className="text-[10px] font-mono text-[#71717A] mt-0.5 block">{current.arr}</span>
            <span className="text-xs font-mono font-black mt-1 px-2 py-0.5 rounded bg-[#090A0B] text-white">
              {current.risk} RISK
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Peripheral Signal Chips */}
        {current.signals.map((sig, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`absolute ${sig.pos} z-10 px-3.5 py-2 rounded-xl bg-[#18181B] border border-[#3F3F46] shadow-md flex items-center space-x-2.5`}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: sig.color }}></span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">{sig.cat}</span>
              <span className="text-xs font-mono font-bold text-white">{sig.label}</span>
            </div>
          </motion.div>
        ))}

      </div>

      <p className="text-center font-mono text-xs text-[#A1A1AA]">
        Click account tabs above to evaluate multi-signal customer topology.
      </p>

    </div>
  );
}
