import React, { useState } from 'react';
import { X, Play, CheckCircle2 } from 'lucide-react';
import { runBatchAnalysis } from '../services/api';

export default function BatchModal({ isOpen, onClose, onBatchCompleted }) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  if (!isOpen) return null;

  const handleStartBatch = async () => {
    setIsRunning(true);
    setProgress(10);
    setLogs([
      '[RocketRide] Loading pipeline: master_churn_workflow.pipe...',
      '[Engine] Connecting to RocketRide Cloud (wss://api.rocketride.ai)...',
      '[Validator] Executing data schema verification on batch inputs...'
    ]);

    let step = 0;
    const stepLogs = [
      '[Specialist Agents] Dispatching parallel Usage, Billing, Support & Contact analysis...',
      '[DAG Engine] Executing Master Churn Scoring & Risk Tiering...',
      '[Vector Store] Searching historical precedent outcome memory...',
      '[Policy Gate] Evaluating Human Approval Policy Rules...'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (step < stepLogs.length) {
          setLogs((l) => [...l, stepLogs[step]]);
          step++;
        }
        if (prev >= 90) {
          return 90;
        }
        return prev + 20;
      });
    }, 400);

    try {
      const batchData = await runBatchAnalysis();
      clearInterval(interval);
      setProgress(100);
      setResult(batchData);
      setLogs((prev) => [
        ...prev,
        `[Specialists] Usage, Billing, Support & Contact analysis completed for ${batchData.completed} accounts.`,
        `[Vector Store] Precedent outcomes retrieved from historical memory.`,
        `[Policy Gate] ${batchData.critical_count} critical accounts routed to Human Approval Gate.`,
        `[Done] Batch completed in ${batchData.runtime_wall_clock_seconds}s. AI Token Cost: $${batchData.total_estimated_cost_usd}.`
      ]);
      setIsRunning(false);
      if (onBatchCompleted) onBatchCompleted();
    } catch (err) {
      clearInterval(interval);
      setIsRunning(false);
      setLogs((prev) => [...prev, `[ERROR] Batch run failed: ${err.message}`]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl p-6 md:p-8 rounded-2xl card-mono-dark space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-white">RocketRide Batch Analysis</h3>
            <p className="text-xs text-[#A1A1AA]">Execute master_churn.pipe workflow across 10,000 accounts</p>
          </div>
          <button onClick={onClose} className="text-[#A1A1AA] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target info */}
        <div className="p-4 rounded-xl bg-[#090A0B] border border-[#27272A] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#A1A1AA] block">Target Workspace</span>
            <span className="font-bold text-white">Revive SaaS</span>
          </div>
          <div>
            <span className="text-[#A1A1AA] block">Account Volume</span>
            <span className="font-bold text-white">10,000 Accounts</span>
          </div>
          <div>
            <span className="text-[#A1A1AA] block">Pipeline File</span>
            <span className="font-bold text-white">master_churn.pipe</span>
          </div>
          <div>
            <span className="text-[#A1A1AA] block">Policy Gate</span>
            <span className="font-bold text-white">Active</span>
          </div>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between text-xs text-[#A1A1AA]">
              <span>Executing specialist nodes...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#090A0B] rounded-full overflow-hidden border border-[#27272A]">
              <div className="h-full bg-white transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Results Overview */}
        {result && (
          <div className="p-4 rounded-xl bg-[#090A0B] border border-white/40 space-y-2 font-mono">
            <div className="flex items-center space-x-2 text-white font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Processing Completed</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span className="text-[#A1A1AA] text-[10px] block uppercase">Processed</span>
                <span className="font-bold text-white">{result.completed} Accounts</span>
              </div>
              <div>
                <span className="text-[#A1A1AA] text-[10px] block uppercase">At-Risk</span>
                <span className="font-bold text-white">{result.at_risk_count} Accounts</span>
              </div>
              <div>
                <span className="text-[#A1A1AA] text-[10px] block uppercase">Runtime</span>
                <span className="font-bold text-white">{result.runtime_wall_clock_seconds}s</span>
              </div>
              <div>
                <span className="text-[#A1A1AA] text-[10px] block uppercase">AI Cost</span>
                <span className="font-bold text-white">${result.total_estimated_cost_usd}</span>
              </div>
            </div>
          </div>
        )}

        {/* Logs */}
        <div className="space-y-1 font-mono">
          <span className="text-xs font-semibold text-[#A1A1AA] block">Execution Logs</span>
          <div className="h-32 overflow-y-auto p-3 rounded-xl bg-[#090A0B] text-[11px] text-[#A1A1AA] border border-[#27272A] space-y-1">
            {logs.length === 0 ? (
              <span>Click 'Run batch analysis' to start...</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx}>› {log}</div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-2 border-t border-[#27272A]">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-[#A1A1AA]">
            Close
          </button>
          <button
            disabled={isRunning}
            onClick={handleStartBatch}
            className="px-5 py-2.5 rounded-xl bg-white text-[#090A0B] hover:bg-[#E4E4E7] font-extrabold text-xs shadow-md flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-[#090A0B]" />
            <span>{isRunning ? 'Processing...' : 'Run batch analysis'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
