import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, FileText, MessageSquare, Check, Lock, ArrowRight, 
  Brain, ShieldAlert, Cpu, Sparkles, Database, PlayCircle, Layers, CheckCircle2, Zap 
} from 'lucide-react';
import { TextAnimationCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import ReviveIntroSplash from '../components/ui/ReviveIntroSplash';
import LandingPageNav from '../components/ui/LandingPageNav';
import Text3DAnimationCanvas from '../components/ui/Text3DAnimationCanvas';
import ScrollTextReveal from '../components/ui/ScrollTextReveal';
import ScrollStorySignals from '../components/ui/ScrollStorySignals';
import ScrollStoryTimeline from '../components/ui/ScrollStoryTimeline';
import RocketRideEngineGraph from '../components/ui/RocketRideEngineGraph';

export default function LandingPage() {
  return (
    <div className="bg-[#090A0B] min-h-screen text-white selection:bg-white selection:text-[#090A0B] font-sans overflow-x-hidden relative">
      
      {/* 00 — FULL-SCREEN BLACK OPENING CHROMATIC INTRO FOR REVIVE */}
      <ReviveIntroSplash />

      {/* Top Sable Dock Navigation */}
      <LandingPageNav />

      {/* 00 — HERO SECTION WITH 3D TEXT & ANIMATION CANVAS */}
      <HeroSection />

      {/* 01 — SIGNALS CONVERGENCE */}
      <SignalsSection />

      {/* 02 — WATCH */}
      <WatchSection />

      {/* 03 — PREDICT */}
      <PredictSection />

      {/* 04 — EXPLAIN */}
      <ExplainSection />

      {/* 05 — DECIDE */}
      <DecideSection />

      {/* 06 — MEMORY */}
      <MemorySection />

      {/* 07 — ACT */}
      <ActSection />

      {/* 08 & 09 — HUMAN GATE & LEARN */}
      <HumanGateAndLearnSection />

      {/* 10 — ROCKETRIDE ARCHITECTURE */}
      <RocketRideSection />

      {/* 11 — CONTROL ROOM CTA */}
      <ControlRoomSection />

    </div>
  );
}

// ----------------------------------------------------------------------
// 00 — HERO SECTION WITH PERFECT SPACING & ALIGNMENT
// ----------------------------------------------------------------------
function HeroSection() {
  const [heroSignals, setHeroSignals] = useState([
    { id: 1, label: 'usage drop -31%', color: 'border-white text-white bg-white/5' },
    { id: 2, label: 'invoice 45d overdue', color: 'border-[#A1A1AA] text-[#A1A1AA] bg-white/5' },
    { id: 3, label: 'champion VP left', color: 'border-white text-white bg-white/5' }
  ]);

  const addSignal = () => {
    const newSignalsList = [
      { label: 'support sentiment drop', color: 'border-white text-white bg-white/5' },
      { label: 'active seats -40%', color: 'border-[#A1A1AA] text-[#A1A1AA] bg-white/5' },
      { label: 'ticket SLA breach', color: 'border-white text-white bg-white/5' },
      { label: 'renewal in 30 days', color: 'border-white text-white bg-white/5' }
    ];
    const randomSignal = newSignalsList[Math.floor(Math.random() * newSignalsList.length)];
    setHeroSignals((prev) => [...prev, { id: Date.now(), ...randomSignal }]);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-10 max-w-[1380px] mx-auto overflow-hidden">
      
      {/* Background Silver Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-gradient-to-tr from-white/10 via-zinc-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />



      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
        
        {/* Left Column: Hero Monochromatic Typography */}
        <div className="lg:col-span-7 text-left space-y-4 z-10 flex flex-col justify-center">
          <ScrollTextReveal yOffset={20}>
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-[#A1A1AA]">Revive AI • Autonomous Churn Rescue Desk</span>
            </div>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={30}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[0.98]">
              CHURN DOESN'T START AT RENEWAL.
            </h1>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={40}>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gradient-silver tracking-tight leading-tight">
              It starts much earlier.
            </p>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={50}>
            <p className="text-sm sm:text-base lg:text-lg text-[#A1A1AA] max-w-xl font-normal leading-relaxed">
              Your customers are already telling you they're leaving. Revive monitors signals, predicts churn risk, explains why, and executes safe interventions.
            </p>
          </ScrollTextReveal>

          {/* Hero Action Buttons */}
          <ScrollTextReveal yOffset={60}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <NavLink
                to="/dashboard"
                className="px-8 py-4 rounded-full bg-white hover:bg-[#E4E4E7] text-[#090A0B] font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                <span>Launch Control Room →</span>
              </NavLink>
              <a
                href="#watch"
                className="px-8 py-4 rounded-full bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A] font-extrabold text-sm sm:text-base shadow-sm transition-all hover:border-white"
              >
                Explore Scroll Story ↓
              </a>
            </div>
          </ScrollTextReveal>
        </div>

        {/* Right Column: Three.js 3D Text & Particle WebGL Canvas */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[350px]">
          <Text3DAnimationCanvas />
        </div>

      </div>

      {/* Interactive Telemetry Card */}
      <ScrollTextReveal yOffset={50} className="mt-8 sm:mt-10 w-full max-w-5xl">
        <div className="card-mono-dark p-6 md:p-8 space-y-5 text-left shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#27272A] pb-4 gap-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#A1A1AA]">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <span className="font-bold text-white">Live Telemetry Stream</span>
              <span>•</span>
              <span className="text-white font-bold">Acme Corp ($221k ARR)</span>
            </div>

            <button
              onClick={addSignal}
              className="px-4 py-2 rounded-xl bg-white text-[#090A0B] font-mono font-bold text-xs shadow-md flex items-center space-x-2 self-start sm:self-auto hover:bg-[#E4E4E7] transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-[#090A0B]" />
              <span>Emit Signal Pulse +</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-white min-h-[50px]">
            <AnimatePresence>
              {heroSignals.map((sig) => (
                <motion.span
                  key={sig.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`px-4 py-2 rounded-2xl border ${sig.color} shadow-sm font-bold`}
                >
                  {sig.label}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-3 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#A1A1AA] gap-2">
            <span className="font-bold text-white">Current Status: 94% Critical Risk</span>
            <span className="text-white font-bold">RocketRide Multi-Agent Pipeline Active</span>
          </div>
        </div>
      </ScrollTextReveal>

    </section>
  );
}

// ----------------------------------------------------------------------
// 01 — SIGNALS SECTION WITH SCROLL REVEAL
// ----------------------------------------------------------------------
function SignalsSection() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const signalTags = [
    { label: "login_drop -40%", category: "USAGE", color: "#FFFFFF" },
    { label: "feature_unused_workflow", category: "PRODUCT", color: "#A1A1AA" },
    { label: "invoice_overdue_45d", category: "BILLING", color: "#FFFFFF" },
    { label: "ticket_opened_urgent", category: "SUPPORT", color: "#A1A1AA" },
    { label: "champion_departed", category: "CONTACT", color: "#71717A" },
    { label: "session_frequency_down", category: "USAGE", color: "#A1A1AA" },
    { label: "renewal_in_60_days", category: "BILLING", color: "#FFFFFF" },
    { label: "sentiment_negative_csat", category: "SUPPORT", color: "#FFFFFF" }
  ];

  const filtered = selectedFilter === 'ALL' ? signalTags : signalTags.filter(t => t.category === selectedFilter);

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto text-center space-y-12">
      <ScrollTextReveal yOffset={30}>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          10,000 customers.<br />Millions of signals.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto mt-4 leading-relaxed">
          Your customers don't suddenly churn. The warning signals accumulate weeks in advance across disconnected systems.
        </p>
      </ScrollTextReveal>

      {/* Filter Pills */}
      <ScrollTextReveal yOffset={35}>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold">
          {['ALL', 'USAGE', 'BILLING', 'SUPPORT', 'CONTACT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-2xl transition-all ${
                selectedFilter === cat
                  ? 'bg-white text-[#090A0B] shadow-lg scale-105'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollTextReveal>

      <ScrollTextReveal yOffset={40}>
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-3xl mx-auto pt-2">
          <AnimatePresence>
            {filtered.map((tag) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="px-5 py-3 rounded-2xl bg-[#121316] border border-[#27272A] shadow-sm flex items-center space-x-3 font-mono text-xs font-bold text-white hover:border-white transition-all"
              >
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: tag.color }}></span>
                <span>{tag.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollTextReveal>
    </section>
  );
}

// ----------------------------------------------------------------------
// 02 — WATCH SECTION
// ----------------------------------------------------------------------
function WatchSection() {
  return (
    <section id="watch" className="py-28 px-6 sm:px-12 lg:px-16 max-w-[1380px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text */}
        <div className="lg:col-span-5 space-y-6 text-left flex flex-col justify-center">
          <ScrollTextReveal yOffset={20}>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
              01 WATCH
            </span>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={30}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              We watch<br />everything<br />that matters.
            </h2>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={40}>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              Revive ingests product analytics, Stripe billing state, support tickets, and executive CRM contacts into a unified observation stream.
            </p>
          </ScrollTextReveal>

          <ScrollTextReveal yOffset={50}>
            <ul className="space-y-3.5 pt-2 font-medium text-white">
              <li className="flex items-center space-x-3 text-sm">
                <Activity className="w-4 h-4 text-white shrink-0" /> <span>Product Usage Telemetry</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <FileText className="w-4 h-4 text-[#A1A1AA] shrink-0" /> <span>Billing & Payment Status</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <MessageSquare className="w-4 h-4 text-white shrink-0" /> <span>Support Ticket Sentiment</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Users className="w-4 h-4 text-[#A1A1AA] shrink-0" /> <span>Executive Champion Changes</span>
              </li>
            </ul>
          </ScrollTextReveal>
        </div>

        {/* Right Column Signal Convergence Visualizer */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <ScrollStorySignals />
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 03 — PREDICT SECTION
// ----------------------------------------------------------------------
function PredictSection() {
  const [selectedAgent, setSelectedAgent] = useState('Usage');

  const agentDetails = {
    Usage: { desc: 'Analyzes user logins, feature engagement, and API endpoint usage.', output: '-31% weekly active user drop' },
    Billing: { desc: 'Tracks Stripe invoice state, payment attempts, and contract end dates.', output: 'Invoice #INV-081 overdue 45 days' },
    Support: { desc: 'Evaluates Zendesk ticket volume, response latency, and sentiment.', output: '4 unresolved high-prio tickets' },
    Contact: { desc: 'Monitors LinkedIn/Clearbit executive role transitions for key sponsors.', output: 'VP of Engineering departed' }
  };

  return (
    <section id="predict" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto text-center space-y-12">
      <ScrollTextReveal yOffset={30}>
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block mb-3">
          02 PREDICT
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Scattered signals collapse into a single risk score.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto mt-3 leading-relaxed">
          RocketRide parallel specialist agents evaluate distinct telemetry vectors and aggregate them into an explicit risk score.
        </p>
      </ScrollTextReveal>

      {/* Specialist Flow Diagram */}
      <ScrollTextReveal yOffset={40}>
        <div className="card-mono-dark p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-2xl">
          
          {/* Specialists Column */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {['Usage', 'Billing', 'Support', 'Contact'].map((name) => (
              <button
                key={name}
                onClick={() => setSelectedAgent(name)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedAgent === name
                    ? 'bg-white text-[#090A0B] border-white shadow-lg scale-105'
                    : 'bg-[#18181B] text-white border-[#27272A] hover:border-white'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-80">{name} Agent</span>
                <span className="text-xs font-bold font-mono mt-1 block">{agentDetails[name].output}</span>
              </button>
            ))}
          </div>

          <ArrowRight className="w-6 h-6 text-[#A1A1AA] hidden md:block shrink-0" />

          {/* Aggregated Score Result Node */}
          <div className="w-48 h-48 rounded-full bg-white text-[#090A0B] border-4 border-[#27272A] shadow-2xl flex flex-col items-center justify-center shrink-0">
            <span className="text-[64px] font-black text-[#090A0B] leading-none tracking-tighter">94%</span>
            <span className="text-[11px] font-mono font-bold text-[#090A0B] uppercase tracking-widest mt-1">
              Churn Risk
            </span>
          </div>

        </div>
      </ScrollTextReveal>
    </section>
  );
}

// ----------------------------------------------------------------------
// 04 — EXPLAIN SECTION
// ----------------------------------------------------------------------
function ExplainSection() {
  return (
    <section id="explain" className="py-28 px-6 sm:px-12 lg:px-16 max-w-[1380px] mx-auto space-y-12">
      <ScrollTextReveal yOffset={30} className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
          03 EXPLAIN
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          A number isn't enough.<br />We show you why.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Revive reconstructs the exact timeline of events leading to risk so Customer Success leads can intervene with total clarity.
        </p>
      </ScrollTextReveal>

      <ScrollStoryTimeline />
    </section>
  );
}

// ----------------------------------------------------------------------
// 05 — DECIDE SECTION
// ----------------------------------------------------------------------
function DecideSection() {
  return (
    <section id="decide" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto text-center space-y-12">
      <ScrollTextReveal yOffset={30} className="space-y-4">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
          04 DECIDE
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          So what should we do?
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Revive compares competing strategy playbooks and selects the highest-probability rescue intervention based on historical context.
        </p>
      </ScrollTextReveal>

      {/* Playbook Selection Grid */}
      <ScrollTextReveal yOffset={40}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left items-stretch">
          
          {/* Unsuitable Option 1 */}
          <div className="bg-[#121316] border border-[#27272A] p-6 rounded-2xl opacity-40 line-through space-y-3 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase">STRATEGY 01</span>
              <h4 className="text-xl font-bold text-white mt-1">MONITOR</h4>
            </div>
            <p className="text-xs text-[#A1A1AA]">Passive observation rejected due to critical 94% risk and high ARR tier.</p>
          </div>

          {/* Unsuitable Option 2 */}
          <div className="bg-[#121316] border border-[#27272A] p-6 rounded-2xl opacity-60 space-y-3 border-dashed flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase">STRATEGY 02</span>
              <h4 className="text-xl font-bold text-white mt-1">STANDARD CSM OUTREACH</h4>
            </div>
            <p className="text-xs text-[#A1A1AA]">Email check-in insufficient for VP-level champion departure.</p>
          </div>

          {/* Selected Option */}
          <div className="p-7 rounded-2xl bg-white text-[#090A0B] shadow-2xl space-y-4 relative flex flex-col justify-between h-full">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#090A0B] text-white uppercase tracking-wider">
                RECOMMENDED PLAYBOOK
              </span>
              <h4 className="text-2xl font-black text-[#090A0B] mt-2">EXECUTIVE RESCUE</h4>
            </div>
            <div className="space-y-3">
              <div className="h-px bg-[#090A0B]/20 w-full" />
              <ul className="text-xs font-medium space-y-2.5 text-[#090A0B]">
                <li>✓ Executive Sponsor intro via VP Sales</li>
                <li>✓ Priority technical resolution task</li>
                <li>✓ 15% Annual Retention Offer</li>
              </ul>
            </div>
          </div>

        </div>
      </ScrollTextReveal>
    </section>
  );
}

// ----------------------------------------------------------------------
// 06 — MEMORY SECTION
// ----------------------------------------------------------------------
function MemorySection() {
  const precedentNodes = [
    { name: 'Beta Systems', score: '92%', status: 'Saved', match: '96% Vector Match', color: 'text-white border-white/30 bg-white/5' },
    { name: 'Gamma Inc.', score: '90%', status: 'Saved', match: '94% Vector Match', color: 'text-white border-white/30 bg-white/5' },
    { name: 'Delta Co.', score: '87%', status: 'Churned', match: '88% Vector Match', color: 'text-[#A1A1AA] border-white/20 bg-white/5' }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
      <ScrollTextReveal yOffset={30} className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
          COMPOUNDING VECTOR MEMORY
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Revive doesn't just predict.<br />It remembers what worked.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Every rescue outcome feeds into Revive's vector memory store, continuously improving future strategy selections.
        </p>
      </ScrollTextReveal>

      <ScrollTextReveal yOffset={40}>
        <div className="card-mono-dark p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-xl">
          
          <div className="space-y-3 w-full md:w-72">
            <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider block">HISTORICAL MATCHES</span>
            {precedentNodes.map((node, i) => (
              <div key={i} className={`p-3.5 rounded-2xl border ${node.color} flex items-center justify-between text-xs font-mono font-bold shadow-sm`}>
                <div>
                  <span className="block text-white">{node.name}</span>
                  <span className="text-[10px] opacity-75">{node.match}</span>
                </div>
                <span className="uppercase">{node.status}</span>
              </div>
            ))}
          </div>

          <ArrowRight className="w-6 h-6 text-[#A1A1AA] hidden md:block shrink-0" />

          <div className="p-8 rounded-2xl bg-[#090A0B] border border-[#27272A] text-center space-y-3 shadow-md w-full md:w-auto">
            <div className="w-14 h-14 rounded-full bg-white text-[#090A0B] flex items-center justify-center mx-auto shadow-lg">
              <Brain className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Vector Memory Engine</h4>
            <p className="text-xs text-[#A1A1AA] font-medium max-w-xs mx-auto">
              1,200+ historical outcomes indexed for similarity retrieval.
            </p>
          </div>

        </div>
      </ScrollTextReveal>
    </section>
  );
}

// ----------------------------------------------------------------------
// 07 — ACT SECTION
// ----------------------------------------------------------------------
function ActSection() {
  return (
    <section className="py-28 px-6 sm:px-12 max-w-5xl mx-auto space-y-12">
      <ScrollTextReveal yOffset={30} className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
          05 ACT
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Knowing what to do isn't enough.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Revive automatically executes safe operational tasks while placing high-impact actions into a human approval gate.
        </p>
      </ScrollTextReveal>

      <ScrollTextReveal yOffset={40}>
        <div className="space-y-4 max-w-md mx-auto font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#121316] border border-[#27272A] shadow-sm flex items-center justify-between font-bold text-white">
            <span>✓ CSM TASK CREATED IN HUBSPOT</span>
            <Check className="w-5 h-5 text-white" />
          </div>

          <div className="p-4 rounded-2xl bg-[#121316] border border-[#27272A] shadow-sm flex items-center justify-between font-bold text-white">
            <span>✓ VP EXECUTIVE OUTREACH PREPARED</span>
            <Check className="w-5 h-5 text-white" />
          </div>

          <div className="p-4 rounded-2xl bg-[#121316] border border-[#27272A] shadow-sm flex items-center justify-between font-bold text-white">
            <span>✓ PRIORITY TECH ESCALATION LOGGED</span>
            <Check className="w-5 h-5 text-white" />
          </div>

          {/* Interruption Gate Indicator */}
          <div className="p-6 rounded-2xl bg-white text-[#090A0B] border-2 border-white text-center space-y-3 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-[#090A0B] text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold block">15% RETENTION DISCOUNT</span>
              <span className="text-[11px] font-bold uppercase tracking-wider block mt-0.5 opacity-80">
                HIGH-IMPACT FINANCIAL ACTION STOPPED
              </span>
            </div>
            <span className="inline-block px-3 py-1 bg-[#090A0B] rounded-full text-[10px] font-mono font-bold text-white border border-[#090A0B]">
              HUMAN APPROVAL REQUIRED
            </span>
          </div>
        </div>
      </ScrollTextReveal>
    </section>
  );
}

// ----------------------------------------------------------------------
// 08 & 09 — HUMAN GATE & LEARN SECTION
// ----------------------------------------------------------------------
function HumanGateAndLearnSection() {
  const [approved, setApproved] = useState(false);

  return (
    <section className="py-32 px-6 bg-[#090A0B] border-y border-[#27272A]">
      <div className="max-w-5xl mx-auto text-center space-y-12 px-6 sm:px-12">
        
        {!approved ? (
          <div className="space-y-12">
            <ScrollTextReveal yOffset={30}>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block mb-4">
                06 HUMAN GATE
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                THE AI KNOWS WHAT IT WANTS TO DO.<br />
                <span className="text-[#A1A1AA]">BUT YOU HAVE THE FINAL SAY.</span>
              </h2>
            </ScrollTextReveal>

            {/* Dark Mode High-Contrast Decision Card */}
            <ScrollTextReveal yOffset={40}>
              <div className="card-mono-dark p-8 md:p-10 max-w-md mx-auto text-left space-y-6 shadow-2xl">
                <div className="flex justify-between items-start border-b border-[#27272A] pb-5">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">ACME CORP</h3>
                    <span className="text-xs font-mono text-[#A1A1AA]">$221k ARR • Enterprise</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-extrabold text-white">94%</span>
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest block mt-0.5">
                      Churn Risk
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-[#A1A1AA] block mb-1">PROPOSED INTERVENTION</span>
                  <p className="text-xl font-extrabold text-white">15% Renewal Retention Credit</p>
                  <p className="text-xs text-[#A1A1AA] mt-1 font-mono">RocketRide Confidence: 93%</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button 
                    onClick={() => alert("Action rejected. Revive logged reviewer notes.")}
                    className="py-3.5 rounded-xl border border-[#3F3F46] text-[#A1A1AA] font-bold text-xs hover:bg-[#27272A] transition-colors"
                  >
                    REJECT
                  </button>
                  <button 
                    onClick={() => setApproved(true)}
                    className="py-3.5 rounded-xl bg-white hover:bg-[#E4E4E7] text-[#090A0B] font-extrabold text-xs shadow-xl transition-transform active:scale-95"
                  >
                    APPROVE INTERVENTION
                  </button>
                </div>
              </div>
            </ScrollTextReveal>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-12 py-10"
          >
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
              07 LEARN • CLOSED FEEDBACK LOOP
            </span>

            <div className="flex flex-col items-center justify-center space-y-4 font-mono text-xs font-bold text-white max-w-sm mx-auto">
              <div className="px-6 py-3 bg-[#121316] border border-[#27272A] rounded-full shadow-sm w-full">
                INTERVENTION EXECUTED
              </div>
              <div className="h-6 w-px bg-[#27272A]"></div>
              <div className="px-6 py-3 bg-white text-[#090A0B] rounded-full shadow-lg w-full">
                CUSTOMER SAVED (RENEWED AT $221k ARR)
              </div>
              <div className="h-6 w-px bg-[#27272A]"></div>
              <div className="px-6 py-3 bg-[#121316] border border-[#27272A] rounded-full shadow-sm w-full">
                OUTCOME RECORDED IN DATABASE
              </div>
              <div className="h-6 w-px bg-[#27272A]"></div>
              <div className="px-6 py-3 bg-[#18181B] border border-white text-white rounded-full shadow-sm flex items-center justify-center space-x-2 w-full">
                <Brain className="w-4 h-4 text-white" />
                <span>VECTOR MEMORY UPDATED</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight pt-6">
              NEXT TIME,<br />REVIVE KNOWS MORE.
            </h2>
          </motion.div>
        )}

      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 10 — ROCKETRIDE ARCHITECTURE SECTION
// ----------------------------------------------------------------------
function RocketRideSection() {
  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-16 max-w-[1380px] mx-auto space-y-12 overflow-hidden">
      <ScrollTextReveal yOffset={30} className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
          THE ENGINE
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Powered by RocketRide.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Not just an isolated LLM prompt. A deterministic, stateful multi-agent pipeline DAG performing continuous work.
        </p>
      </ScrollTextReveal>

      <RocketRideEngineGraph />
    </section>
  );
}

// ----------------------------------------------------------------------
// 11 — CONTROL ROOM SECTION
// ----------------------------------------------------------------------
function ControlRoomSection() {
  return (
    <section className="py-32 px-6 sm:px-12 max-w-5xl mx-auto text-center space-y-12">
      <ScrollTextReveal yOffset={30} className="space-y-4">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Everything you've seen<br />comes together here.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Enter the Revive workspace control room to monitor live accounts, review human policy gates, and analyze churn metrics.
        </p>
      </ScrollTextReveal>

      <ScrollTextReveal yOffset={40}>
        <div className="card-mono-dark p-10 space-y-8 max-w-xl mx-auto shadow-2xl">
          <div className="p-8 rounded-2xl bg-[#090A0B] border border-[#27272A] space-y-4 text-left font-mono text-xs">
            <div className="flex items-center justify-between font-bold border-b border-[#27272A] pb-3">
              <span>REVIVE CONTROL ROOM</span>
              <span className="text-white">● Live</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <span className="text-[#A1A1AA] block">Monitored Accounts</span>
                <span className="text-lg font-bold">10,000</span>
              </div>
              <div>
                <span className="text-[#A1A1AA] block">Pending Reviews</span>
                <span className="text-lg font-bold text-white">12</span>
              </div>
            </div>
          </div>

          <NavLink
            to="/dashboard"
            className="inline-flex items-center justify-center space-x-2.5 px-10 py-5 rounded-full bg-white hover:bg-[#E4E4E7] text-[#090A0B] font-extrabold text-sm shadow-2xl transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span>Enter Revive Control Room</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </ScrollTextReveal>
    </section>
  );
}
