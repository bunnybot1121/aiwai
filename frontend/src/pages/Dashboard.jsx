import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAnalytics } from '../services/api';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Dashboard({ onOpenBatchModal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetchAnalytics();
      setData(res);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#27272A] border-t-white animate-spin"></div>
          <p className="text-xs font-mono text-[#A1A1AA]">Loading Revive workspace...</p>
        </div>
      </div>
    );
  }

  // Sample revenue exposure chart data over time
  const revenueChartData = [
    { day: '7d ago', arr: 44.2 },
    { day: '5d ago', arr: 41.8 },
    { day: '3d ago', arr: 39.5 },
    { day: 'Today', arr: 38.4 },
  ];

  return (
    <div className="space-y-12 pb-16 text-white">
      
      {/* 1. OPERATIONAL INTRO HEADER */}
      <ScrollReveal yOffset={20} duration={0.8}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#27272A] pb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Good morning, Revive.
          </h1>
          <p className="text-base text-[#A1A1AA] mt-1 font-normal">
            Your customer base is stable, but <strong className="text-white font-bold underline">35 accounts</strong> need attention.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block font-mono text-xs text-[#A1A1AA]">
            <span>Last analysis: <strong>4 minutes ago</strong></span>
            <span className="block text-white font-semibold">● RocketRide pipeline active</span>
          </div>

          <button
            onClick={onOpenBatchModal}
            className="px-5 py-2.5 rounded-full bg-white text-[#090A0B] hover:bg-[#E4E4E7] font-extrabold text-xs shadow-md transition-all active:scale-[0.98] flex items-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 fill-[#090A0B]" />
            <span>Run analysis</span>
          </button>
        </div>
      </div>
      </ScrollReveal>

      {/* 2. EDITORIAL KPI AREA & HEALTH DISTRIBUTION */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Customers Monitored */}
          <ScrollReveal delay={0.1} className="p-8 rounded-2xl card-mono-dark space-y-2">
            <span className="text-xs text-[#A1A1AA] font-bold block uppercase tracking-widest">Customers monitored</span>
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{data?.total_customers_in_db || 119}</p>
            <span className="text-xs text-[#A1A1AA] block font-mono pt-1">Active database accounts</span>
          </ScrollReveal>

          {/* Accounts at Risk */}
          <ScrollReveal delay={0.2} className="p-8 rounded-2xl card-mono-dark space-y-2">
            <span className="text-xs text-[#A1A1AA] font-bold block uppercase tracking-widest">Accounts at risk</span>
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{data.at_risk_customers}</p>
            <span className="text-xs text-white font-bold block font-mono pt-1">{data.critical_customers} Critical tier</span>
          </ScrollReveal>

          {/* Revenue at Risk */}
          <ScrollReveal delay={0.3} className="p-8 rounded-2xl card-mono-dark space-y-2 border-white/40 bg-[#18181B]">
            <span className="text-xs text-white font-bold block uppercase tracking-widest">Revenue at risk</span>
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">${Math.round(data.arr_at_risk_usd / 1000)}k</p>
            <span className="text-xs text-[#A1A1AA] font-mono block pt-1 font-bold">₹{Math.round(data.arr_at_risk_inr / 100000) / 10}L ARR</span>
          </ScrollReveal>

          {/* Intervention Success */}
          <ScrollReveal delay={0.4} className="p-8 rounded-2xl card-mono-dark space-y-2">
            <span className="text-xs text-[#A1A1AA] font-bold block uppercase tracking-widest">Intervention success</span>
            <div className="flex items-baseline space-x-2">
              <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{data.intervention_success_rate || 84.5}%</p>
              <span className="text-xs font-bold text-white flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" /> 8.2%
              </span>
            </div>
            <span className="text-xs text-[#A1A1AA] block font-mono pt-1">Saved ₹98.6L this quarter</span>
          </ScrollReveal>

        </div>

        {/* Customer Health Horizontal Distribution Bar */}
        <ScrollReveal delay={0.5} className="p-8 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#A1A1AA]">
            <span className="uppercase tracking-wider">CUSTOMER HEALTH DISTRIBUTION</span>
            <span className="font-mono text-white">{data?.total_customers_in_db || 119} Total Monitored Accounts</span>
          </div>

          {/* Distribution Bar */}
          <div className="w-full h-3 rounded-full bg-[#18181B] border border-[#27272A] overflow-hidden flex">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${((data?.risk_distribution?.LOW || 74) / (data?.total_customers_in_db || 119) * 100).toFixed(1)}%` }} 
              title={`Healthy: ${data?.risk_distribution?.LOW || 74}`}
            ></div>
            <div 
              className="bg-[#A1A1AA] h-full transition-all duration-500" 
              style={{ width: `${((data?.risk_distribution?.MEDIUM || 9) / (data?.total_customers_in_db || 119) * 100).toFixed(1)}%` }} 
              title={`Medium: ${data?.risk_distribution?.MEDIUM || 9}`}
            ></div>
            <div 
              className="bg-amber-400 h-full transition-all duration-500" 
              style={{ width: `${((data?.risk_distribution?.HIGH || 27) / (data?.total_customers_in_db || 119) * 100).toFixed(1)}%` }} 
              title={`High Risk: ${data?.risk_distribution?.HIGH || 27}`}
            ></div>
            <div 
              className="bg-rose-500 h-full transition-all duration-500" 
              style={{ width: `${((data?.risk_distribution?.CRITICAL || 9) / (data?.total_customers_in_db || 119) * 100).toFixed(1)}%` }} 
              title={`Critical: ${data?.risk_distribution?.CRITICAL || 9}`}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 font-mono flex-wrap gap-2">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              <span>Healthy (Low): <strong>{data?.risk_distribution?.LOW || 74} clients</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 text-zinc-300 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A1A1AA]"></span>
              <span>Medium Risk: <strong>{data?.risk_distribution?.MEDIUM || 9} clients</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 text-amber-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50"></span>
              <span>High Risk: <strong>{data?.risk_distribution?.HIGH || 27} clients</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 text-rose-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
              <span>Critical: <strong>{data?.risk_distribution?.CRITICAL || 9} clients</strong></span>
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 3. REVENUE EXPOSURE & LIVE AI ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Exposure Chart */}
        <ScrollReveal delay={0.2} className="lg:col-span-2 p-8 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <div>
              <span className="text-xs text-[#A1A1AA] font-semibold uppercase tracking-wider block">REVENUE EXPOSURE</span>
              <div className="flex items-baseline space-x-2 mt-0.5">
                <h3 className="text-2xl font-bold text-white">$221k currently at risk</h3>
                <span className="text-xs font-semibold text-white flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" /> 12.4% from last week
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#A1A1AA]">
              <span className="px-2 py-1 rounded bg-[#18181B] border border-[#27272A] font-semibold text-white">30d trend</span>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <XAxis dataKey="day" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} unit="k" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121316', borderColor: '#27272A', borderRadius: '8px', color: '#FFFFFF', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="arr" stroke="#FFFFFF" strokeWidth={2} fillOpacity={0.15} fill="#FFFFFF" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>

        {/* Live AI Activity Timeline */}
        <ScrollReveal delay={0.4} className="p-8 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Revive Activity Feed</h3>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <TimelineEvent text="Usage Agent analyzed Acme Corp" time="2.4s ago" color="bg-white" />
            <TimelineEvent text="Billing Agent flagged overdue invoice" time="14s ago" color="bg-[#A1A1AA]" />
            <TimelineEvent text="Churn Agent updated risk → 94%" time="28s ago" color="bg-white" />
            <TimelineEvent text="Playbook Agent recommended Executive Rescue" time="31s ago" color="bg-white" />
            <TimelineEvent text="Human approval requested" time="42s ago" color="bg-white" highlight />
          </div>
        </ScrollReveal>

      </div>

      {/* 4. AI WORKFLOW VISUALIZATION */}
      <ScrollReveal delay={0.2} className="p-8 lg:p-10 rounded-2xl card-mono-dark space-y-8">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
          <div>
            <span className="text-xs text-white font-bold uppercase tracking-wider block">ROCKETRIDE AI WORKFLOW</span>
            <h3 className="text-xl font-bold text-white">Autonomous 6-Stage Retention Loop</h3>
          </div>
          <span className="text-xs text-[#A1A1AA] font-mono">master_churn.pipe</span>
        </div>

        {/* Horizontal Workflow Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative">
          <WorkflowNode
            stage="01"
            title="WATCH"
            desc="Telemetry ingestion"
            active={activeStage === 'WATCH'}
            onHover={() => setActiveStage('WATCH')}
          />
          <WorkflowNode
            stage="02"
            title="PREDICT"
            desc="Multi-agent scoring"
            active={activeStage === 'PREDICT'}
            onHover={() => setActiveStage('PREDICT')}
          />
          <WorkflowNode
            stage="03"
            title="EXPLAIN"
            desc="Risk evidence factor"
            active={activeStage === 'EXPLAIN'}
            onHover={() => setActiveStage('EXPLAIN')}
          />
          <WorkflowNode
            stage="04"
            title="DECIDE"
            desc="Vector memory match"
            active={activeStage === 'DECIDE'}
            onHover={() => setActiveStage('DECIDE')}
          />
          <WorkflowNode
            stage="05"
            title="ACT"
            desc="Policy gate & human approval"
            active={activeStage === 'ACT'}
            onHover={() => setActiveStage('ACT')}
          />
          <WorkflowNode
            stage="06"
            title="LEARN"
            desc="Outcome memory logging"
            active={activeStage === 'LEARN'}
            onHover={() => setActiveStage('LEARN')}
          />
        </div>

        {/* Hover Explanation Box */}
        <div className="p-4 rounded-lg bg-[#090A0B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] flex items-center justify-between">
          <span>
            {activeStage === 'PREDICT' ? 'PREDICT Stage: Usage, Billing, Support, Contact specialists score parameters in parallel → 94% Risk.' :
             activeStage === 'ACT' ? 'ACT Stage: Low risk auto-executes; discounts & critical risk stop at Human Gate.' :
             activeStage === 'LEARN' ? 'LEARN Stage: Compounding memory stores outcome (Saved vs Churned) for future recommendations.' :
             'Hover over any workflow stage above to inspect RocketRide node details.'}
          </span>
          <span className="text-white font-semibold">RocketRide Engine Node</span>
        </div>
      </ScrollReveal>

      {/* 5. FEATURED AT-RISK CUSTOMER CASE INVESTIGATION (ACME CORP) */}
      <ScrollReveal delay={0.3} className="p-8 lg:p-10 rounded-2xl card-mono-dark space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#090A0B]">
                CRITICAL INVESTIGATION
              </span>
              <span className="text-xs text-[#A1A1AA] font-mono">CUST-001</span>
            </div>
            <h2 className="text-2xl font-black text-white">ACME CORP</h2>
            <p className="text-xs text-[#A1A1AA]">Enterprise Plan • $221k ARR (₹18.4L)</p>
          </div>

          <div className="text-right">
            <span className="text-4xl font-black text-white block tracking-tight">94%</span>
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase">Churn Risk Probability</span>
          </div>
        </div>

        {/* Why this account is at risk */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">WHY THIS ACCOUNT IS AT RISK</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-[#090A0B] border border-[#27272A]">
              <span className="text-white font-bold block text-sm">↓ 31%</span>
              <span className="text-[#A1A1AA]">Product usage decline</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#090A0B] border border-[#27272A]">
              <span className="text-white font-bold block text-sm">4</span>
              <span className="text-[#A1A1AA]">Unresolved support tickets</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#090A0B] border border-[#27272A]">
              <span className="text-[#A1A1AA] font-bold block text-sm">45 days</span>
              <span className="text-[#A1A1AA]">Invoice overdue</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#090A0B] border border-[#27272A]">
              <span className="text-[#A1A1AA] font-bold block text-sm">⚠</span>
              <span className="text-[#A1A1AA]">Primary champion departed</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation & Action */}
        <div className="p-5 rounded-xl bg-[#090A0B] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-white font-bold uppercase tracking-wider block">AI RECOMMENDATION</span>
            <h4 className="text-lg font-bold text-white">Executive Rescue & 15% Retention Offer</h4>
            <p className="text-xs text-[#A1A1AA] mt-0.5">Personalized outreach + CSM escalation + 15% retention offer</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-[#A1A1AA]">15% discount requires approval</span>
            <NavLink
              to="/review"
              className="px-4 py-2 rounded-lg bg-white text-[#090A0B] font-bold text-xs hover:bg-[#E4E4E7] transition-all shadow-md"
            >
              Review decision →
            </NavLink>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}

function TimelineEvent({ text, time, color, highlight }) {
  return (
    <div className="flex items-start space-x-2.5">
      <span className={`w-2 h-2 rounded-full ${color} mt-1 flex-shrink-0`}></span>
      <div className="flex-1">
        <span className={`block ${highlight ? 'font-bold text-white' : 'text-[#D4D4D8]'}`}>{text}</span>
        <span className="text-[10px] text-[#71717A]">{time}</span>
      </div>
    </div>
  );
}

function WorkflowNode({ stage, title, desc, active, onHover }) {
  return (
    <div
      onMouseEnter={onHover}
      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
        active
          ? 'bg-white text-[#090A0B] border-white shadow-xl font-bold'
          : 'bg-[#18181B] text-white border-[#27272A] hover:border-white'
      }`}
    >
      <span className={`text-[10px] font-mono block ${active ? 'text-[#090A0B]/80' : 'text-[#71717A]'}`}>{stage}</span>
      <h4 className={`font-bold text-xs ${active ? 'text-[#090A0B]' : 'text-white'}`}>{title}</h4>
      <span className={`text-[10px] block truncate ${active ? 'text-[#090A0B]/80' : 'text-[#A1A1AA]'}`}>{desc}</span>
    </div>
  );
}
