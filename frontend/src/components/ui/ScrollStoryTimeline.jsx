import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock, UserMinus, ShieldAlert, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ScrollStoryTimeline() {
  const [expandedIndex, setExpandedIndex] = useState(5); // Default expand TODAY

  const events = [
    {
      time: '30 DAYS AGO',
      title: 'Healthy Baseline',
      desc: 'Normal platform activity across 140 active seats.',
      icon: CheckCircle,
      badgeColor: 'bg-white/10 text-white border-white/20',
      dotColor: 'bg-white',
      status: 'Healthy',
      details: 'Weekly active sessions: 4,120. API requests: 1.2M. Zero unresolved support tickets. Finance health score: 98/100.'
    },
    {
      time: '21 DAYS AGO',
      title: 'Product Usage Decline',
      desc: 'Weekly active sessions dropped by 31% after quarterly release.',
      icon: TrendingDown,
      badgeColor: 'bg-white/10 text-[#A1A1AA] border-white/20',
      dotColor: 'bg-[#A1A1AA]',
      status: 'Warning',
      details: 'Telemetry flagged 4 enterprise teams stopping feature adoption of Workflow Engine. Active seats dropped from 140 to 96.'
    },
    {
      time: '14 DAYS AGO',
      title: 'Support Deterioration',
      desc: '4 high-severity tickets opened regarding API latencies.',
      icon: Clock,
      badgeColor: 'bg-white/10 text-[#A1A1AA] border-white/20',
      dotColor: 'bg-[#A1A1AA]',
      status: 'Warning',
      details: 'Ticket #8492 sentiment: "System timeout breaking our daily payroll pipeline." First response delayed by 18 hours.'
    },
    {
      time: '7 DAYS AGO',
      title: 'Invoice 45 Days Overdue',
      desc: 'Annual enterprise renewal invoice unpaid by finance department.',
      icon: AlertCircle,
      badgeColor: 'bg-white text-[#090A0B] border-white font-bold',
      dotColor: 'bg-white',
      status: 'Critical',
      details: 'Invoice #INV-2026-081 ($221,000 / ₹18.4L) overdue. Stripe dunning email sequence #3 triggered with no response.'
    },
    {
      time: '3 DAYS AGO',
      title: 'Primary Champion Departed',
      desc: 'VP of Engineering (Executive Sponsor) left the company.',
      icon: UserMinus,
      badgeColor: 'bg-white text-[#090A0B] border-white font-bold',
      dotColor: 'bg-white',
      status: 'Critical',
      details: 'LinkedIn & Clearbit telemetry detected VP of Eng transitioned to new company. Key internal champion lost.'
    },
    {
      time: 'TODAY',
      title: '94% Critical Risk Triggered',
      desc: 'Multi-agent evaluation flags high churn probability.',
      icon: ShieldAlert,
      badgeColor: 'bg-white text-[#090A0B] border-white font-bold',
      dotColor: 'bg-white',
      status: 'Critical Risk',
      isCurrent: true,
      details: 'Master Churn Scorer aggregated Usage (-31%), Billing (45d Overdue), Support (Negative), and Champion Loss into a 94% churn risk.'
    }
  ];

  return (
    <div className="card-mono-dark p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      
      {/* Acme Corp Case Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#27272A] pb-5 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="text-3xl font-extrabold tracking-tight text-white">ACME CORP</h3>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
              CUST-001
            </span>
          </div>
          <p className="text-sm font-mono text-[#A1A1AA] mt-1">Enterprise Subscription • ₹18.4L ARR ($221k)</p>
        </div>

        <div className="text-left sm:text-right">
          <span className="block text-4xl font-extrabold text-white leading-none">94%</span>
          <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-widest block mt-1">
            Calculated Churn Risk
          </span>
        </div>
      </div>

      {/* Interactive Monochromatic Vertical Timeline */}
      <div className="relative border-l-2 border-[#27272A] ml-4 md:ml-6 space-y-6 pl-6 md:pl-8">
        {events.map((evt, idx) => {
          const IconComponent = evt.icon;
          const isExpanded = expandedIndex === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative cursor-pointer group"
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
            >
              {/* Timeline Dot Indicator */}
              <div className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-[#090A0B] ${evt.dotColor} shadow-sm group-hover:scale-125 transition-transform`} />

              <div className="p-4 rounded-2xl bg-[#121316] hover:bg-[#18181B] border border-[#27272A] transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#A1A1AA] tracking-wider">
                    {evt.time}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${evt.badgeColor}`}>
                      {evt.status}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#A1A1AA]" /> : <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${evt.isCurrent ? 'text-white' : 'text-[#A1A1AA]'}`} />
                  <div>
                    <h4 className={`text-base font-bold tracking-tight ${evt.isCurrent ? 'text-white' : 'text-[#D4D4D8]'}`}>
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] font-medium mt-0.5">
                      {evt.desc}
                    </p>
                  </div>
                </div>

                {/* Expanded Telemetry Detail Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-[#27272A] mt-3 text-xs font-mono text-white bg-[#090A0B] p-3 rounded-xl space-y-1"
                    >
                      <span className="text-[10px] font-bold text-[#A1A1AA] uppercase block">TELEMETRY DEEP-DIVE LOG</span>
                      <p className="text-[#D4D4D8] font-sans text-xs leading-relaxed">{evt.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          );
        })}
      </div>

      <p className="text-center font-mono text-xs text-[#A1A1AA]">
        Click any timeline event above to expand raw telemetry logs and system evidence.
      </p>

    </div>
  );
}
