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
          <div className="w-8 h-8 rounded-full border-2 border-[#E6E8EC] border-t-[#5B4BDB] animate-spin"></div>
          <p className="text-xs font-mono text-[#667085]">Loading NovaCloud workspace...</p>
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
    <div className="space-y-12 pb-16">
      
      {/* 1. OPERATIONAL INTRO HEADER */}
      <ScrollReveal yOffset={20} duration={0.8}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E6E8EC] pb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#111318] tracking-tight">
            Good morning, NovaCloud.
          </h1>
          <p className="text-base text-[#667085] mt-1 font-normal">
            Your customer base is stable, but <strong className="text-[#F04438] font-bold">35 accounts</strong> need attention.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block font-mono text-xs text-[#667085]">
            <span>Last analysis: <strong>4 minutes ago</strong></span>
            <span className="block text-emerald-600 font-semibold">● RocketRide pipeline active</span>
          </div>

          <button
            onClick={onOpenBatchModal}
            className="px-4 py-2.5 rounded-lg bg-[#5B4BDB] hover:bg-[#4C38CA] text-white font-semibold text-xs shadow-subtle transition-all active:scale-[0.98] flex items-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run analysis</span>
          </button>
        </div>
      </div>
      </ScrollReveal>

      {/* 2. EDITORIAL KPI AREA & HEALTH DISTRIBUTION */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Customers Monitored */}
          <ScrollReveal delay={0.1} className="p-8 rounded-2xl glass-card space-y-2">
            <span className="text-xs text-[#667085] font-bold block uppercase tracking-widest">Customers monitored</span>
            <p className="text-4xl lg:text-5xl font-black text-[#111318] tracking-tighter">10,000</p>
            <span className="text-xs text-[#667085] block font-mono pt-1">Active NovaCloud accounts</span>
          </ScrollReveal>

          {/* Accounts at Risk */}
          <ScrollReveal delay={0.2} className="p-8 rounded-2xl glass-card space-y-2">
            <span className="text-xs text-[#667085] font-bold block uppercase tracking-widest">Accounts at risk</span>
            <p className="text-4xl lg:text-5xl font-black text-[#F79009] tracking-tighter">{data.at_risk_customers}</p>
            <span className="text-xs text-[#F04438] font-bold block font-mono pt-1">{data.critical_customers} Critical tier</span>
          </ScrollReveal>

          {/* Revenue at Risk */}
          <ScrollReveal delay={0.3} className="p-8 rounded-2xl glass-card space-y-2 bg-[#FAF5FF] border-[#E9D5FF]">
            <span className="text-xs text-[#5B4BDB] font-bold block uppercase tracking-widest">Revenue at risk</span>
            <p className="text-4xl lg:text-5xl font-black text-[#5B4BDB] tracking-tighter">₹38.4L</p>
            <span className="text-xs text-[#667085] font-mono block pt-1 font-bold">${data.arr_at_risk_usd.toLocaleString()} USD</span>
          </ScrollReveal>

          {/* Intervention Success */}
          <ScrollReveal delay={0.4} className="p-8 rounded-2xl glass-card space-y-2">
            <span className="text-xs text-[#667085] font-bold block uppercase tracking-widest">Intervention success</span>
            <div className="flex items-baseline space-x-2">
              <p className="text-4xl lg:text-5xl font-black text-[#12B76A] tracking-tighter">84.5%</p>
              <span className="text-xs font-bold text-[#12B76A] flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> 8.2%
              </span>
            </div>
            <span className="text-xs text-[#667085] block font-mono pt-1">Saved ₹98.6L this quarter</span>
          </ScrollReveal>

        </div>

        {/* Customer Health Horizontal Distribution Bar */}
        <ScrollReveal delay={0.5} className="p-8 rounded-2xl glass-card space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#667085]">
            <span className="uppercase tracking-wider">CUSTOMER HEALTH DISTRIBUTION</span>
            <span className="font-mono text-[#111318]">10,000 Total Monitored Accounts</span>
          </div>

          {/* Distribution Bar */}
          <div className="w-full h-3 rounded-full bg-[#F2F4F7] overflow-hidden flex">
            <div className="bg-[#12B76A] h-full" style={{ width: '99.65%' }} title="Healthy: 9,965"></div>
            <div className="bg-[#F79009] h-full" style={{ width: '0.22%' }} title="At Risk: 22"></div>
            <div className="bg-[#F04438] h-full" style={{ width: '0.13%' }} title="Critical: 13"></div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 font-mono">
            <span className="flex items-center space-x-1.5 text-[#111318] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]"></span>
              <span>Healthy: <strong>9,965</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#F79009] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F79009]"></span>
              <span>At risk: <strong>22</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#F04438] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F04438]"></span>
              <span>Critical: <strong>13</strong></span>
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 3. REVENUE EXPOSURE & LIVE AI ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Exposure Chart */}
        <ScrollReveal delay={0.2} className="lg:col-span-2 p-8 rounded-2xl glass-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
            <div>
              <span className="text-xs text-[#667085] font-semibold uppercase tracking-wider block">REVENUE EXPOSURE</span>
              <div className="flex items-baseline space-x-2 mt-0.5">
                <h3 className="text-2xl font-bold text-[#111318]">₹38.4L currently at risk</h3>
                <span className="text-xs font-semibold text-[#12B76A] flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" /> 12.4% from last week
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#667085]">
              <span className="px-2 py-1 rounded bg-[#F2F4F7] font-semibold text-[#111318]">30d trend</span>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <XAxis dataKey="day" stroke="#98A2B3" fontSize={11} tickLine={false} />
                <YAxis stroke="#98A2B3" fontSize={11} tickLine={false} unit="L" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E8EC', borderRadius: '8px', color: '#111318', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="arr" stroke="#5B4BDB" strokeWidth={2} fillOpacity={0.1} fill="#5B4BDB" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>

        {/* Live AI Activity Timeline */}
        <ScrollReveal delay={0.4} className="p-8 rounded-2xl glass-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
            <h3 className="font-bold text-sm text-[#111318] uppercase tracking-wider">SaveFlow Activity Feed</h3>
            <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse"></span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <TimelineEvent text="Usage Agent analyzed Acme Corp" time="2.4s ago" color="bg-[#2E90FA]" />
            <TimelineEvent text="Billing Agent flagged overdue invoice" time="14s ago" color="bg-[#F79009]" />
            <TimelineEvent text="Churn Agent updated risk → 94%" time="28s ago" color="bg-[#F04438]" />
            <TimelineEvent text="Playbook Agent recommended Executive Rescue" time="31s ago" color="bg-[#5B4BDB]" />
            <TimelineEvent text="Human approval requested" time="42s ago" color="bg-[#F04438]" highlight />
          </div>
        </ScrollReveal>

      </div>

      {/* 4. AI WORKFLOW VISUALIZATION: WATCH -> PREDICT -> EXPLAIN -> DECIDE -> ACT -> LEARN */}
      <ScrollReveal delay={0.2} className="p-8 lg:p-10 rounded-2xl glass-card space-y-8">
        <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
          <div>
            <span className="text-xs text-[#5B4BDB] font-bold uppercase tracking-wider block">ROCKETRIDE AI WORKFLOW</span>
            <h3 className="text-xl font-bold text-[#111318]">Autonomous 6-Stage Retention Loop</h3>
          </div>
          <span className="text-xs text-[#667085] font-mono">master_churn.pipe</span>
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
        <div className="p-4 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC] text-xs font-mono text-[#667085] flex items-center justify-between">
          <span>
            {activeStage === 'PREDICT' ? 'PREDICT Stage: Usage, Billing, Support, Contact specialists score parameters in parallel → 94% Risk.' :
             activeStage === 'ACT' ? 'ACT Stage: Low risk auto-executes; discounts & critical risk stop at Human Gate.' :
             activeStage === 'LEARN' ? 'LEARN Stage: Compounding memory stores outcome (Saved vs Churned) for future recommendations.' :
             'Hover over any workflow stage above to inspect RocketRide node details.'}
          </span>
          <span className="text-[#5B4BDB] font-semibold">RocketRide Engine Node</span>
        </div>
      </ScrollReveal>

      {/* 5. FEATURED AT-RISK CUSTOMER CASE INVESTIGATION (ACME CORP) */}
      <ScrollReveal delay={0.3} className="p-8 lg:p-10 rounded-2xl glass-card space-y-8 border-2 border-[#E6E8EC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E8EC] pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F04438]/10 text-[#F04438]">
                CRITICAL INVESTIGATION
              </span>
              <span className="text-xs text-[#667085] font-mono">CUST-001</span>
            </div>
            <h2 className="text-2xl font-black text-[#111318]">ACME CORP</h2>
            <p className="text-xs text-[#667085]">Enterprise Plan • $221k ARR (₹18.4L)</p>
          </div>

          <div className="text-right">
            <span className="text-4xl font-black text-[#F04438] block tracking-tight">94%</span>
            <span className="text-xs font-semibold text-[#667085] uppercase">Churn Risk Probability</span>
          </div>
        </div>

        {/* Why this account is at risk */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider">WHY THIS ACCOUNT IS AT RISK</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC]">
              <span className="text-[#F04438] font-bold block text-sm">↓ 31%</span>
              <span className="text-[#667085]">Product usage decline</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC]">
              <span className="text-[#F04438] font-bold block text-sm">4</span>
              <span className="text-[#667085]">Unresolved support tickets</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC]">
              <span className="text-[#F79009] font-bold block text-sm">45 days</span>
              <span className="text-[#667085]">Invoice overdue</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC]">
              <span className="text-[#F79009] font-bold block text-sm">⚠</span>
              <span className="text-[#667085]">Primary champion departed</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation & Action */}
        <div className="p-5 rounded-xl bg-[#F5F3FF] border border-[#ECE9FE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#5B4BDB] font-bold uppercase tracking-wider block">AI RECOMMENDATION</span>
            <h4 className="text-lg font-bold text-[#111318]">Executive Rescue & 15% Retention Offer</h4>
            <p className="text-xs text-[#667085] mt-0.5">Personalized outreach + CSM escalation + 15% retention offer</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-[#F79009]">15% discount requires approval</span>
            <NavLink
              to="/review"
              className="px-4 py-2 rounded-lg bg-[#5B4BDB] hover:bg-[#4C38CA] text-white font-semibold text-xs transition-all shadow-subtle"
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
        <span className={`block ${highlight ? 'font-bold text-[#F04438]' : 'text-[#111318]'}`}>{text}</span>
        <span className="text-[10px] text-[#98A2B3]">{time}</span>
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
          ? 'bg-[#5B4BDB] text-white border-[#5B4BDB] shadow-accent'
          : 'bg-[#FFFFFF] border-[#E6E8EC] hover:border-[#5B4BDB]/40'
      }`}
    >
      <span className={`text-[10px] font-mono block ${active ? 'text-white/80' : 'text-[#98A2B3]'}`}>{stage}</span>
      <h4 className={`font-bold text-xs ${active ? 'text-white' : 'text-[#111318]'}`}>{title}</h4>
      <span className={`text-[10px] block truncate ${active ? 'text-white/80' : 'text-[#667085]'}`}>{desc}</span>
    </div>
  );
}
