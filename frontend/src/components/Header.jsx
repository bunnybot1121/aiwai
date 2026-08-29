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
      <div className="max-w-6xl mx-auto bg-[#121316]/95 border border-[#27272A] rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Left: Logo + Work/Workspace Popout Button */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onMouseEnter={() => setShowPopout(true)}
              onMouseLeave={() => setShowPopout(false)}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#090A0B] flex items-center justify-center font-extrabold text-xs shadow-md group-hover:scale-105 transition-transform">
                REV
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm text-white tracking-tight group-hover:text-[#A1A1AA] transition-colors flex items-center space-x-1">
                  <span>Revive AI</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:rotate-180 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-white font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>RocketRide Online</span>
                </span>
              </div>
            </button>

            {/* Hover Popout Drawer */}
            {showPopout && (
              <div
                onMouseEnter={() => setShowPopout(true)}
                onMouseLeave={() => setShowPopout(false)}
                className="absolute top-full left-0 mt-2 w-80 p-4 bg-[#121316] border border-[#27272A] rounded-2xl shadow-2xl z-50 space-y-3"
              >
                <div className="text-[11px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">
                  MONITORED WORKSPACE
                </div>

                <div className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A] space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Revive SaaS</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white text-[#090A0B] font-mono">
                      119 Accounts Monitored
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA]">
                    $221k ARR at risk across enterprise cohort.
                  </p>
                </div>

                <NavLink
                  to="/customers/CUST-001"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#18181B] transition-colors group text-xs font-bold text-white border border-transparent hover:border-[#27272A]"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>Acme Corp Case Study</span>
                  </div>
                  <span className="text-[10px] font-mono text-white font-bold">94% Risk</span>
                </NavLink>

                <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                  <span>Pipeline: master_churn_workflow.pipe</span>
                  <Sparkles className="w-3 h-3 text-white" />
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
                      ? 'bg-white text-[#090A0B] font-bold shadow-md'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#18181B] text-white rounded-full border border-[#27272A]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Rolling Text Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenBatchModal}
            className="rolling-button px-4 py-2 rounded-xl bg-white text-[#090A0B] font-extrabold text-xs shadow-md transition-all active:scale-[0.98] hover:bg-[#E4E4E7]"
          >
            <span className="btn-text-primary flex items-center space-x-1.5">
              <Play className="w-3.5 h-3.5 fill-[#090A0B]" />
              <span>Run batch analysis</span>
            </span>
            <span className="btn-text-clone flex items-center space-x-1.5">
              <Play className="w-3.5 h-3.5 fill-[#090A0B]" />
              <span>Execute RocketRide →</span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
