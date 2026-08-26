import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Play, Sparkles } from 'lucide-react';

export default function Header({ onOpenBatchModal, pendingApprovalsCount = 12 }) {
  const [showPopout, setShowPopout] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Customers', path: '/customers' },
    { 
      label: 'Reviews', 
      path: '/review', 
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null 
    },
    { label: 'Interventions', path: '/interventions' },
    { label: 'Insights', path: '/analytics' },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-4 backdrop-blur-md">
      <div className="max-w-6xl mx-auto glass-card rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Left: Logo + Work/Workspace Popout Button */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onMouseEnter={() => setShowPopout(true)}
              onMouseLeave={() => setShowPopout(false)}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#5B4BDB] flex items-center justify-center text-white font-extrabold text-xs shadow-accent group-hover:scale-105 transition-transform">
                SF
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm text-[#111318] tracking-tight group-hover:text-[#5B4BDB] transition-colors flex items-center space-x-1">
                  <span>SaveFlow AI</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#667085] group-hover:rotate-180 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-[#12B76A] font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-pulse"></span>
                  <span>RocketRide Online</span>
                </span>
              </div>
            </button>

            {/* Hover Popout Drawer inspired by Nabil-main */}
            {showPopout && (
              <div
                onMouseEnter={() => setShowPopout(true)}
                onMouseLeave={() => setShowPopout(false)}
                className="absolute top-full left-0 mt-2 w-80 p-4 bg-white border border-[#E6E8EC] rounded-2xl shadow-dropdown z-50 animate-blur-fade space-y-3"
              >
                <div className="text-[11px] font-mono font-bold text-[#667085] uppercase tracking-wider">
                  MONITORED WORKSPACE
                </div>

                <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#E6E8EC] space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111318]">
                    <span>NovaCloud SaaS</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#12B76A]/10 text-[#12B76A] font-mono">
                      10,000 Accounts Monitored
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085]">
                    ₹38.4L ARR at risk across 35 accounts.
                  </p>
                </div>

                <NavLink
                  to="/customers/CUST-001"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2F4F7] transition-colors group text-xs font-bold text-[#111318]"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#F04438]"></span>
                    <span>Acme Corp Case Study</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#F04438]">94% Risk</span>
                </NavLink>

                <div className="pt-2 border-t border-[#E6E8EC] flex items-center justify-between text-[11px] font-mono text-[#667085]">
                  <span>Pipeline: master_churn.pipe</span>
                  <Sparkles className="w-3 h-3 text-[#5B4BDB]" />
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#F2F4F7] text-[#111318]'
                      : 'text-[#667085] hover:text-[#111318] hover:bg-[#FAFAFC]'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#F04438]/10 text-[#F04438] rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Rolling Text Action Button (from Nabil-main AnimatedButton pattern) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenBatchModal}
            className="rolling-button px-4 py-2 rounded-xl bg-[#5B4BDB] hover:bg-[#4C38CA] text-white font-extrabold text-xs shadow-accent transition-all active:scale-[0.98]"
          >
            <span className="btn-text-primary flex items-center space-x-1.5">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run batch analysis</span>
            </span>
            <span className="btn-text-clone flex items-center space-x-1.5">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Execute RocketRide →</span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
