import React, { useState } from 'react';
import { X, Play, CheckCircle2, FileText } from 'lucide-react';
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
      '[Engine] Initializing 10,000 NovaCloud accounts workspace...',
      '[Validator] Executing data schema verification on batch inputs...'
    ]);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 20;
        });
      }, 400);

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
      setIsRunning(false);
      setLogs((prev) => [...prev, `[ERROR] Batch run failed: ${err.message}`]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111318]/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl p-6 rounded-xl surface-card space-y-6 shadow-dropdown border border-[#E6E8EC]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-[#111318]">RocketRide Batch Analysis</h3>
            <p className="text-xs text-[#667085]">Execute master_churn.pipe workflow across 10,000 accounts</p>
          </div>
          <button onClick={onClose} className="text-[#667085] hover:text-[#111318]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target info */}
        <div className="p-4 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#667085] block">Target Workspace</span>
            <span className="font-bold text-[#111318]">NovaCloud SaaS</span>
          </div>
          <div>
            <span className="text-[#667085] block">Account Volume</span>
            <span className="font-bold text-[#5B4BDB]">10,000 Accounts</span>
          </div>
          <div>
            <span className="text-[#667085] block">Pipeline File</span>
            <span className="font-bold text-[#111318]">master_churn.pipe</span>
          </div>
          <div>
            <span className="text-[#667085] block">Policy Gate</span>
            <span className="font-bold text-[#F79009]">Active</span>
          </div>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-[#667085]">
              <span>Executing specialist nodes...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
              <div className="h-full bg-[#5B4BDB] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Results Overview */}
        {result && (
          <div className="p-4 rounded-lg bg-[#12B76A]/10 border border-[#12B76A]/30 space-y-2">
            <div className="flex items-center space-x-2 text-[#12B76A] font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Processing Completed</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
              <div>
                <span className="text-[#667085] text-[10px] block uppercase">Processed</span>
                <span className="font-bold text-[#111318]">{result.completed} Accounts</span>
              </div>
              <div>
                <span className="text-[#667085] text-[10px] block uppercase">At-Risk</span>
                <span className="font-bold text-[#F04438]">{result.at_risk_count} Accounts</span>
              </div>
              <div>
                <span className="text-[#667085] text-[10px] block uppercase">Runtime</span>
                <span className="font-bold text-[#111318]">{result.runtime_wall_clock_seconds}s</span>
              </div>
              <div>
                <span className="text-[#667085] text-[10px] block uppercase">AI Cost</span>
                <span className="font-bold text-[#12B76A]">${result.total_estimated_cost_usd}</span>
              </div>
            </div>
          </div>
        )}

        {/* Logs */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#667085] block">Execution Logs</span>
          <div className="h-32 overflow-y-auto p-3 rounded-lg bg-[#FAFAFC] font-mono text-[11px] text-[#667085] border border-[#E6E8EC] space-y-1">
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
        <div className="flex justify-end space-x-3 pt-2 border-t border-[#E6E8EC]">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-[#667085]">
            Close
          </button>
          <button
            disabled={isRunning}
            onClick={handleStartBatch}
            className="px-5 py-2 rounded-lg bg-[#5B4BDB] hover:bg-[#4C38CA] text-white font-bold text-xs shadow-subtle flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Processing...' : 'Run batch analysis'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
