import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, ArrowRight } from 'lucide-react';

export default function RocketRideEngineGraph() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const pipelineStages = [
    {
      id: 'input',
      name: 'INPUT',
      sub: 'Telemetry Stream',
      color: 'bg-[#18181B] text-white border-[#27272A]',
      detail: 'Validates raw telemetry streams (Stripe billing events, product session logs, Zendesk support tickets).'
    },
    {
      id: 'specialists',
      name: 'SPECIALIST AGENTS',
      sub: '4 Micro-Agents',
      color: 'bg-[#18181B] text-white border-[#27272A]',
      detail: 'Executes parallel sub-agent analysis for Usage (-31%), Billing (45d Overdue), Support (Negative), and Contact (VP Left).'
    },
    {
      id: 'churn_agent',
      name: 'CHURN SCORER',
      sub: 'Master Scorer',
      color: 'bg-white text-[#090A0B] border-white font-bold',
      detail: 'Calculates overall account risk score (94%) and primary risk driver weights.'
    },
    {
      id: 'memory',
      name: 'VECTOR MEMORY',
      sub: 'Precedent Store',
      color: 'bg-[#18181B] text-white border-[#27272A]',
      detail: 'Retrieves top-3 historical precedent outcomes with 96% vector similarity match.'
    },
    {
      id: 'playbook',
      name: 'PLAYBOOK AGENT',
      sub: 'Strategy Gen',
      color: 'bg-[#18181B] text-white border-[#27272A]',
      detail: 'Formulates Executive Rescue strategy and multi-touch operational play.'
    },
    {
      id: 'policy_gate',
      name: 'POLICY GATE',
      sub: 'Human Gate',
      color: 'bg-white text-[#090A0B] border-white font-bold',
      detail: 'Halts financial discount execution pending human authorization.'
    },
    {
      id: 'action',
      name: 'ACTION',
      sub: 'Safe Execution',
      color: 'bg-[#18181B] text-white border-[#27272A]',
      detail: 'Executes CSM tasks in CRM and schedules executive sponsor outreach.'
    }
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipelineStages.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setActiveStep(-1);
      }
    }, 600);
  };

  return (
    <div className="card-mono-dark p-6 md:p-10 space-y-8 relative overflow-hidden">
      
      {/* Header with Simulate Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#27272A] pb-5 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-white text-[#090A0B] shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold text-white">master_churn.pipe</span>
              <span className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-black bg-white px-2.5 py-0.5 rounded-full border border-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#090A0B] animate-pulse"></span>
                <span>Pipeline Active</span>
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-0.5">RocketRide Multi-Agent Pipeline DAG Execution Trace</p>
          </div>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="px-5 py-2.5 rounded-full bg-white text-[#090A0B] hover:bg-[#E4E4E7] font-extrabold text-xs shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-[#090A0B]" />
          <span>{isSimulating ? `Processing Stage 0${activeStep + 1}...` : 'Simulate Signal Pulse →'}</span>
        </button>
      </div>

      {/* Pipeline Graph Nodes */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center space-x-3 min-w-[960px] py-4">
          {pipelineStages.map((stage, idx) => {
            const isActive = activeStep === idx;
            return (
              <React.Fragment key={stage.id}>
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    borderColor: isActive ? '#FFFFFF' : undefined
                  }}
                  onClick={() => setSelectedNode(stage)}
                  className={`p-4 rounded-2xl border ${stage.color} cursor-pointer transition-all hover:scale-105 shadow-sm min-w-[125px] flex flex-col justify-between h-[115px] relative ${
                    isActive ? 'ring-4 ring-white/30 shadow-2xl' : ''
                  }`}
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider block opacity-70">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="font-extrabold text-xs tracking-tight block mt-1">
                      {stage.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-semibold block opacity-80">
                    {stage.sub}
                  </span>

                  {isActive && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#090A0B] text-[9px] font-bold animate-ping"></span>
                  )}
                </motion.div>

                {idx < pipelineStages.length - 1 && (
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${activeStep > idx ? 'text-white' : 'text-[#667085]'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Inspection */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-[#090A0B] border border-[#27272A] font-mono text-xs text-white space-y-1"
        >
          <div className="flex items-center justify-between font-bold">
            <span className="text-white uppercase">{selectedNode.name} SPECIFICATION</span>
            <button onClick={() => setSelectedNode(null)} className="text-[#A1A1AA] hover:text-white">✕</button>
          </div>
          <p className="text-[#A1A1AA] font-sans text-xs leading-relaxed">{selectedNode.detail}</p>
        </motion.div>
      )}

      <p className="text-center font-mono text-xs text-[#A1A1AA]">
        Click "Simulate Signal Pulse" or select any stage box above to inspect DAG node specs.
      </p>

    </div>
  );
}
