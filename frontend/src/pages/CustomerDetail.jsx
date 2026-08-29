import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { fetchCustomerById, runSingleAnalysis } from '../services/api';
import DAGVisualizer from '../components/DAGVisualizer';
import { Cpu, CheckCircle2, ShieldAlert, AlertTriangle, X, Terminal, Sparkles, Layers, History, Shield, Brain } from 'lucide-react';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInspector, setShowInspector] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const custData = await fetchCustomerById(id || 'CUST-001');
      setCustomer(custData);

      const result = await runSingleAnalysis({
        customer_id: custData.id,
        company_name: custData.company_name,
        arr: custData.arr,
        active_users: custData.active_users,
        usage_change_pct: custData.usage_change_pct,
        support_tickets_open: custData.support_tickets_open,
        support_sentiment: custData.support_sentiment,
        invoice_status: custData.invoice_status,
        key_contact_status: custData.key_contact_status
      });

      setAnalysis(result);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading || !customer) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xs font-mono text-[#A1A1AA]">Loading account workspace...</div>
      </div>
    );
  }

  const arrUsd = Math.round(customer.arr / 83.0);
  const isLive = analysis?.rocketride_status === 'connected';
  const aiRiskScore = analysis?.ai_risk_score ?? analysis?.risk_score ?? customer.current_risk_score;
  const baselineScore = analysis?.baseline_risk_score ?? aiRiskScore;
  const disagreement = analysis?.risk_disagreement ?? (Math.abs(aiRiskScore - baselineScore) >= 25);
  const riskLevel = analysis?.risk_level || customer.current_risk_level || 'CRITICAL';
  const confidencePct = Math.round((analysis?.evidence_confidence ?? 0.95) * 100);
  const llmProvider = analysis?.rocketride?.llm_provider || 'groq';
  const llmModel = analysis?.rocketride?.llm_model || 'openai/gpt-oss-120b';

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto text-white">
      
      {/* Back Link & RocketRide Inspector Button */}
      <div className="flex items-center justify-between">
        <NavLink to="/customers" className="text-xs font-semibold text-white hover:underline flex items-center space-x-1">
          <span>← Back to Customers</span>
        </NavLink>

        <button
          onClick={() => setShowInspector(true)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold flex items-center space-x-2 transition-all shadow-md active:scale-95"
        >
          <Cpu className="w-4 h-4 text-white" />
          <span>View RocketRide Execution</span>
        </button>
      </div>

      {/* Top Header */}
      <div className="p-8 rounded-2xl card-mono-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">{customer.id} • {customer.plan} Plan</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              isLive ? 'bg-emerald-500 text-black font-extrabold' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {isLive ? 'ROCKETRIDE LIVE' : 'LOCAL FALLBACK'}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">{customer.company_name}</h1>
          <p className="text-sm text-[#A1A1AA] mt-1 font-mono">
            <strong className="text-white">${arrUsd.toLocaleString()} ARR</strong> (₹{customer.arr.toLocaleString('en-IN')}) • Renewal in 51 days ({customer.renewal_date})
          </p>
        </div>

        <div className="text-right">
          <span className="text-4xl font-black text-white block tracking-tight">{aiRiskScore}%</span>
          <span className="text-xs font-bold text-[#A1A1AA] uppercase">{riskLevel} Churn Risk</span>
        </div>
      </div>

      {/* 1. KEY AI RISK INTELLIGENCE METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121316] border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">AI RISK SCORE</span>
          <p className="text-3xl font-black text-white">{aiRiskScore}%</p>
          <span className="text-[11px] text-emerald-400 font-mono font-semibold">Groq Reasoning</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121316] border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">RISK LEVEL</span>
          <p className="text-3xl font-black text-white">{riskLevel}</p>
          <span className="text-[11px] text-[#A1A1AA] font-mono">Evidence-Based</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121316] border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">EVIDENCE CONFIDENCE</span>
          <p className="text-3xl font-black text-white">{confidencePct}%</p>
          <span className="text-[11px] text-[#A1A1AA] font-mono">Data Completeness</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121316] border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">BASELINE RISK</span>
          <p className="text-3xl font-black text-[#A1A1AA]">{baselineScore}%</p>
          <span className="text-[11px] text-[#A1A1AA] font-mono">Deterministic Formula</span>
        </div>
      </div>

      {/* 2. BASELINE VS AI DISAGREEMENT DETECTOR BANNER */}
      {disagreement && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="font-bold block text-white">AI VS BASELINE DISAGREEMENT DETECTED</span>
              <span className="text-amber-300/80">
                AI Score ({aiRiskScore}%) and Baseline ({baselineScore}%) differ by {Math.abs(aiRiskScore - baselineScore)} points (threshold &ge; 25). Human review priority raised.
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold uppercase text-[10px]">
            POLICY GATE ESCALATED
          </span>
        </div>
      )}

      {/* 3. AI REASONING & GROUNDED EVIDENCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Grounded Risk Drivers & Turnaround Actions */}
        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>Risk Drivers & Action to Reduce Churn</span>
            </h3>
            <span className="text-[10px] font-mono text-[#A1A1AA]">{(analysis?.risk_drivers || []).length} Signals</span>
          </div>

          <div className="space-y-3">
            {(analysis?.driver_remedies || (analysis?.risk_drivers || ["35% product usage decline", "4 unresolved support tickets", "Invoice overdue 45 days", "Primary champion departed"]).map(d => ({
              risk_driver: d,
              category: "Risk Telemetry",
              action_to_reduce_churn: d.includes("usage") ? "Schedule Product Re-onboarding Sprint & Feature Adoption Workshop" :
                                      d.includes("invoice") || d.includes("overdue") ? "Issue 14-Day Temporary Billing Extension & Restructured Payment Plan" :
                                      d.includes("ticket") || d.includes("support") ? "Escalate Open Support Tickets to Tier-3 CS Engineers with 48h SLA Resolution" :
                                      d.includes("champion") || d.includes("departed") ? "Conduct Executive Stakeholder Mapping & Schedule Alignment Call with New Leadership" :
                                      "Dispatch Senior CSM for Proactive Account Review & Health Alignment Sync",
              expected_churn_reduction: d.includes("usage") ? "-35% Churn Risk" : d.includes("champion") ? "-40% Churn Risk" : "-25% Churn Risk"
            }))).map((remedy, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#090A0B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                    <span>{remedy.risk_driver}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18181B] text-emerald-400 font-bold border border-emerald-500/20">
                    {remedy.expected_churn_reduction || '-25% Churn Risk'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#121316] border border-[#27272A]/80 text-[11px] text-[#A1A1AA] flex items-start space-x-2 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-[10px] uppercase tracking-wider">ACTION TO SAVE ACCOUNT</span>
                    <span className="text-zinc-200">{remedy.action_to_reduce_churn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protective Signals & AI Reasoning */}
        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center space-x-2">
              <Brain className="w-4 h-4 text-white" />
              <span>AI Risk Reasoning</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Groq LLM</span>
          </div>

          <p className="text-xs font-mono text-[#D4D4D8] leading-relaxed p-3 rounded-xl bg-[#090A0B] border border-[#27272A]">
            {analysis?.reasoning || `Account ${customer.company_name} presents a ${riskLevel} churn risk profile (AI Score ${aiRiskScore}%, Baseline ${baselineScore}%). Multi-vector collision between severe product usage drop, open billing friction, negative sentiment, and executive sponsor departure.`}
          </p>

          <div className="pt-2">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">PROTECTIVE SIGNALS</span>
            <div className="space-y-1 text-xs font-mono text-[#A1A1AA]">
              {(analysis?.protective_signals || ["Active enterprise license"]).map((signal, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4. ROCKETRIDE EXECUTION & PROVENANCE DETAILS */}
      <div className="p-6 rounded-2xl card-mono-dark space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
          <h3 className="font-bold text-xs text-[#A1A1AA] uppercase tracking-wider flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-white" />
            <span>RocketRide Execution & Provenance</span>
          </h3>
          <span className="text-[#A1A1AA] text-[11px]">{analysis?.rocketride_status === 'connected' ? 'ROCKETRIDE LIVE' : 'LOCAL FALLBACK'}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
          <div className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A]">
            <div className="text-[10px] text-[#A1A1AA]">LLM PROVIDER</div>
            <div className="font-bold text-white uppercase">{llmProvider}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A]">
            <div className="text-[10px] text-[#A1A1AA]">LLM MODEL</div>
            <div className="font-bold text-white truncate">{llmModel}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A]">
            <div className="text-[10px] text-[#A1A1AA]">MASTER PIPELINE</div>
            <div className="font-bold text-white truncate">master_churn_workflow.pipe</div>
          </div>
          <div className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A]">
            <div className="text-[10px] text-[#A1A1AA]">RISK PIPELINE</div>
            <div className="font-bold text-white truncate">risk_intelligence.pipe</div>
          </div>
        </div>
      </div>

      {/* 5. HISTORICAL PRECEDENTS & PLAYBOOK RECOMMENDATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Historical Precedents */}
        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center space-x-2">
              <History className="w-4 h-4 text-white" />
              <span>Historical Precedents</span>
            </h3>
            <span className="text-[10px] font-mono text-[#A1A1AA]">Context Memory</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {(analysis?.historical_precedents || [
              { customer_name: 'FinPulse Enterprise', risk_score: 92, outcome: 'Saved', action: 'Executive Rescue' },
              { customer_name: 'Hyperion Logistics', risk_score: 95, outcome: 'Churned', action: 'Standard Outreach' }
            ]).map((prec, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#090A0B] border border-[#27272A] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{prec.customer_name}</span>
                  <span className="text-[10px] text-[#A1A1AA]">Action: {prec.action || prec.playbook}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  prec.outcome === 'Saved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {prec.outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Playbook & Human Approval */}
        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-white" />
              <span>Recommended Playbook</span>
            </h3>
            <span className="text-[10px] font-mono text-amber-400 font-bold">
              {analysis?.human_approval_required ? 'HUMAN GATE' : 'AUTO ACTION'}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold text-white text-sm block">
              {analysis?.recommended_playbook || 'EXECUTIVE RESCUE & RETENTION OFFER'}
            </span>

            <ul className="space-y-1.5 pt-2 text-[#A1A1AA]">
              {(analysis?.proposed_actions || [
                "Schedule Executive-to-Executive Rescue Call with VP of CS",
                "Offer Pre-approved 15% Annual Contract Retention Discount"
              ]).map((act, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-white"></span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>

            {analysis?.human_approval_required && (
              <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
                <span className="text-[11px] text-amber-300">Requires CS Lead approval</span>
                <NavLink
                  to="/review"
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-[#E4E4E7] transition-all"
                >
                  Review Decision →
                </NavLink>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* RocketRide Pipeline DAG Trace */}
      <DAGVisualizer
        dagNodes={analysis?.dag_nodes || []}
        executionPath={analysis?.execution_path || 'HUMAN_APPROVAL_GATE'}
      />

      {/* ROCKETRIDE PIPELINE INSPECTOR MODAL */}
      {showInspector && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090A0B] border border-white/20 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <Terminal className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-mono text-base font-bold text-white">ROCKETRIDE PIPELINE INSPECTOR</h3>
                  <span className="text-xs font-mono text-white/50">Technical Verification Panel</span>
                </div>
              </div>

              <button
                onClick={() => setShowInspector(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Telemetry Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white/50 text-[10px]">PIPELINE FILE</div>
                <div className="text-white font-bold truncate">master_churn_workflow.pipe</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white/50 text-[10px]">STATUS</div>
                <div className={`font-bold ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isLive ? 'ROCKETRIDE LIVE' : 'LOCAL FALLBACK'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white/50 text-[10px]">LLM PROVIDER</div>
                <div className="text-white font-bold uppercase">{llmProvider}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white/50 text-[10px]">LLM MODEL</div>
                <div className="text-white font-bold truncate">{llmModel}</div>
              </div>
            </div>

            {/* DAG Execution / Structure Nodes */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>{isLive ? 'LIVE ROCKETRIDE EXECUTION TRACE' : 'PIPELINE STRUCTURE'}</span>
                <span className="text-white/40">{analysis?.dag_nodes?.length || 9} Pipeline Nodes</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {(analysis?.dag_nodes || []).map((node, i) => (
                  <div key={node.id || i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-bold text-white">{node.label}</div>
                        <div className="text-white/60 text-[11px]">{node.output}</div>
                      </div>
                    </div>
                    <span className="text-white/40 text-[10px]">{node.latency_ms}ms</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Architecture Schema */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                PIPELINE ARCHITECTURE SCHEMA
              </div>
              <pre className="p-4 rounded-xl bg-black border border-white/10 text-[11px] font-mono text-white/80 overflow-x-auto">
{`{
  "name": "SaveFlow Master Churn Rescue Workflow",
  "pipeline": "master_churn_workflow.pipe",
  "risk_pipeline": "risk_intelligence.pipe",
  "components": [
    { "id": "master_input", "provider": "webhook" },
    { "id": "risk_intelligence_stage", "provider": "subpipe", "config": { "pipeline": "pipelines/risk_intelligence.pipe" } },
    { "id": "ai_risk_analyst", "provider": "preprocessor_code", "config": { "llm_provider": "groq", "model": "openai/gpt-oss-120b" } },
    { "id": "playbook_selector", "provider": "preprocessor_code" },
    { "id": "policy_validator", "provider": "preprocessor_code" }
  ]
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
