import React, { useState } from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Database, Zap, Sparkles, Layers, ArrowRight, Activity, Clock } from 'lucide-react';

export default function DAGVisualizer({ dagNodes = [], executionPath = 'HUMAN_APPROVAL_GATE' }) {
  const [activeNode, setActiveNode] = useState(null);

  const defaultNodes = [
    { id: 'validator_input', label: 'Input Validator', type: 'validator', status: 'success', latency_ms: 12, output: 'Schema & Telemetry verified' },
    { id: 'usage_agent', label: 'Usage Specialist', type: 'specialist', status: 'success', latency_ms: 25, output: 'Usage decline (-35%)' },
    { id: 'billing_agent', label: 'Billing Specialist', type: 'specialist', status: 'success', latency_ms: 20, output: 'Invoice Overdue' },
    { id: 'support_agent', label: 'Support Sentiment', type: 'specialist', status: 'success', latency_ms: 22, output: '4 Unresolved Tickets (Negative)' },
    { id: 'contact_agent', label: 'Contact Champion', type: 'specialist', status: 'success', latency_ms: 18, output: 'Primary Champion Departed' },
    { id: 'ai_risk_analyst', label: 'Groq AI Risk Analyst (GPT-OSS 120B)', type: 'aggregator', status: 'success', latency_ms: 180, output: 'Groq Churn Risk 94% (CRITICAL)' },
    { id: 'memory_store', label: 'Vector Precedent Store', type: 'memory', status: 'success', latency_ms: 25, output: 'Retrieved 3 Precedent Outcomes' },
    { id: 'playbook_agent', label: 'Rescue Playbook', type: 'playbook', status: 'success', latency_ms: 30, output: 'Executive Rescue & 15% Offer' },
    { id: 'policy_validator', label: 'Human Policy Gate', type: 'gate', status: 'warning', latency_ms: 18, output: 'Human Approval Required' }
  ];

  const nodesToRender = dagNodes.length > 0 ? dagNodes : defaultNodes;

  return (
    <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-purple text-white shadow-glow-indigo">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-lg text-white">RocketRide Pipeline DAG Execution Trace</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                master_churn.pipe
              </span>
            </div>
            <p className="text-xs text-slate-400">Live multi-agent execution graph & token latency analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-black border tracking-wider shadow-lg ${
            executionPath === 'HUMAN_APPROVAL_GATE'
              ? 'bg-accent-amber/20 text-amber-300 border-amber-500/40 animate-pulse'
              : 'bg-accent-emerald/20 text-emerald-300 border-emerald-500/40'
          }`}>
            {executionPath === 'HUMAN_APPROVAL_GATE' ? 'HUMAN APPROVAL GATE REQUIRED' : 'SAFE AUTOMATIC ACTION'}
          </span>
        </div>
      </div>

      {/* DAG Workflow Pipeline Stage Wires */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
        
        {/* Stage 1: Input Validation */}
        <div 
          onMouseEnter={() => setActiveNode('stage1')}
          onMouseLeave={() => setActiveNode(null)}
          className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3 relative group hover:border-accent-cyan/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-accent-cyan tracking-widest uppercase">STAGE 1 • INPUT</span>
            <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">Validator Node</h4>
            <p className="text-xs text-slate-400">Schema & Integrity Telemetry</p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Latency: 12ms</span>
            <span className="text-accent-emerald font-bold">Pass</span>
          </div>
        </div>

        {/* Stage 2: Parallel Specialist Agents */}
        <div 
          onMouseEnter={() => setActiveNode('stage2')}
          onMouseLeave={() => setActiveNode(null)}
          className="p-5 rounded-2xl glass-card border border-brand-500/40 space-y-3 relative group shadow-glow-indigo"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-brand-400 tracking-widest uppercase">STAGE 2 • PARALLEL</span>
            <Zap className="w-4 h-4 text-brand-400 animate-bounce" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">4 Specialist Agents</h4>
            <p className="text-xs text-slate-400">Usage, Billing, Support, Contact</p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Parallel Exec</span>
            <span className="text-brand-300 font-bold">165ms Total</span>
          </div>
        </div>

        {/* Stage 3: Churn Risk & Outcome Memory */}
        <div 
          onMouseEnter={() => setActiveNode('stage3')}
          onMouseLeave={() => setActiveNode(null)}
          className="p-5 rounded-2xl glass-card border border-accent-purple/40 space-y-3 relative group shadow-glow-purple"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-accent-purple tracking-widest uppercase">STAGE 3 • AGGREGATION</span>
            <Database className="w-4 h-4 text-accent-purple" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">Risk & Memory Store</h4>
            <p className="text-xs text-slate-400">Score 94% + Vector Retrieval</p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Memory Top-K: 3</span>
            <span className="text-accent-purple font-bold">93% Conf</span>
          </div>
        </div>

        {/* Stage 4: Policy Gate */}
        <div 
          onMouseEnter={() => setActiveNode('stage4')}
          onMouseLeave={() => setActiveNode(null)}
          className="p-5 rounded-2xl glass-card border border-accent-amber/50 space-y-3 relative group shadow-glow-rose"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-accent-amber tracking-widest uppercase">STAGE 4 • POLICY</span>
            <ShieldCheck className="w-4 h-4 text-accent-amber" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">Human Policy Gate</h4>
            <p className="text-xs text-slate-400">15% Retention Credit Approval</p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500">Policy Check</span>
            <span className="text-amber-400 font-bold">Approval Required</span>
          </div>
        </div>

      </div>

      {/* Specialist Node Details List */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-400 font-bold flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-brand-400" />
            <span>RocketRide Node Evaluation Details</span>
          </span>
          <span className="text-slate-500 text-[11px]">Total Workflow Execution: 328ms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-300">
          {nodesToRender.map((node, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1 hover:border-brand-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{node.label}</span>
                <span className="text-[10px] text-slate-500">{node.latency_ms || 35}ms</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{node.output || 'Execution Completed'}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
