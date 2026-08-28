import React from 'react';
import { motion } from 'framer-motion';

export default function LiveSignalTicker() {
  const tickerItems = [
    { text: 'USAGE DROP -31%', badge: 'PRODUCT', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { text: 'INVOICE 45D OVERDUE', badge: 'FINANCE', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { text: 'PRIMARY CHAMPION LEFT', badge: 'CONTACT', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { text: '4 HIGH-SEVERITY TICKETS', badge: 'SUPPORT', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { text: 'ACME CORP 94% RISK', badge: 'ALERT', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { text: '15% CREDIT RECOMMENDED', badge: 'PLAYBOOK', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { text: 'VECTOR MEMORY MATCH 96%', badge: 'AI ENGINE', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' }
  ];

  return (
    <div className="w-full bg-[#111318] text-white py-3 overflow-hidden border-y border-white/10 relative shadow-inner z-20">
      <div className="flex whitespace-nowrap">
        
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
          className="flex space-x-6 items-center shrink-0 font-mono text-xs font-bold tracking-wider"
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#635BFF] animate-pulse"></span>
              <span className={`px-2 py-0.5 rounded text-[9px] border ${item.color}`}>
                {item.badge}
              </span>
              <span className="text-white">{item.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
