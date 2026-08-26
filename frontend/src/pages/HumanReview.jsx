import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchInterventions, approveIntervention, rejectIntervention, escalateIntervention } from '../services/api';

export default function HumanReview() {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    loadPendingInterventions();
  }, []);

  const loadPendingInterventions = async () => {
    try {
      setLoading(true);
      const data = await fetchInterventions('pending');
      setInterventions(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const note = notes[id] || 'Approved retention offer after reviewing churn signals.';
      await approveIntervention(id, 'Customer Success Lead', note);
      await loadPendingInterventions();
    } catch (err) {
      alert('Error approving intervention: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const note = notes[id] || 'Rejected intervention proposal.';
      await rejectIntervention(id, 'Customer Success Lead', note);
      await loadPendingInterventions();
    } catch (err) {
      alert('Error rejecting intervention: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#E6E8EC] pb-6">
        <h1 className="text-3xl font-extrabold text-[#111318] tracking-tight">Review required</h1>
        <p className="text-base text-[#667085] mt-1 font-normal">
          <strong className="text-[#F04438]">{interventions.length} interventions</strong> need your attention before execution.
        </p>
      </div>

      {/* Queue List */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-[#667085]">Loading decision queue...</div>
      ) : interventions.length === 0 ? (
        <div className="p-12 rounded-xl surface-card text-center space-y-2">
          <h3 className="text-xl font-bold text-[#111318]">All Reviews Completed</h3>
          <p className="text-sm text-[#667085]">No pending actions require human sign-off right now.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {interventions.map((item) => (
            <div key={item.id} className="p-6 rounded-xl surface-card space-y-6">
              
              {/* Account Title & Risk */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E8EC] pb-4">
                <div>
                  <h3 className="text-2xl font-black text-[#111318] uppercase tracking-tight">{item.company_name}</h3>
                  <span className="text-xs font-mono text-[#667085]">{item.customer_id} • ${Math.round(item.arr / 83.0).toLocaleString()} ARR (₹{item.arr.toLocaleString('en-IN')})</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-[#F04438]">{item.risk_score}%</span>
                  <span className="text-xs font-semibold text-[#667085] uppercase block">Churn Risk ({item.risk_level})</span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-lg bg-[#F5F3FF] border border-[#ECE9FE] space-y-1">
                <span className="text-xs font-bold text-[#5B4BDB] uppercase tracking-wider block">AI RECOMMENDS</span>
                <p className="text-base font-bold text-[#111318]">{item.recommended_playbook}</p>
                <ul className="text-xs text-[#667085] space-y-1 pt-1">
                  {(item.proposed_actions_json || []).map((act, i) => (
                    <li key={i}>• {act}</li>
                  ))}
                </ul>
              </div>

              {/* WHY & EXPECTED IMPACT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC] space-y-1">
                  <span className="text-[#667085] font-bold block uppercase">WHY</span>
                  <ul className="text-[#111318] space-y-1">
                    <li>• Usage down 31%</li>
                    <li>• 4 unresolved support tickets</li>
                    <li>• Invoice overdue 45 days</li>
                    <li>• Primary champion departed</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#FAFAFC] border border-[#E6E8EC] space-y-2">
                  <span className="text-[#667085] font-bold block uppercase">EXPECTED IMPACT</span>
                  <div>
                    <span className="text-[#667085] block">Potential revenue protected:</span>
                    <span className="text-base font-bold text-[#12B76A]">${Math.round((item.arr / 83.0) * 0.15).toLocaleString()} ARR</span>
                  </div>
                  <div>
                    <span className="text-[#667085] block">AI Confidence:</span>
                    <span className="font-bold text-[#111318]">{Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Decision Controls */}
              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-[#E6E8EC]">
                <button
                  onClick={() => handleReject(item.id)}
                  className="px-4 py-2 rounded-lg bg-[#F2F4F7] hover:bg-[#E6E8EC] text-[#111318] font-semibold text-xs transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="px-6 py-2.5 rounded-lg bg-[#5B4BDB] hover:bg-[#4C38CA] text-white font-bold text-xs shadow-accent transition-all active:scale-[0.98]"
                >
                  Approve intervention →
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
