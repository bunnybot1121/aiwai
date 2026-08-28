import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchInterventions, approveIntervention, rejectIntervention } from '../services/api';

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
    <div className="space-y-8 pb-16 max-w-4xl mx-auto text-white">
      
      {/* Header */}
      <div className="border-b border-[#27272A] pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Review required</h1>
        <p className="text-base text-[#A1A1AA] mt-1 font-normal">
          <strong className="text-white underline">{interventions.length} interventions</strong> need your attention before execution.
        </p>
      </div>

      {/* Queue List */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-[#A1A1AA]">Loading decision queue...</div>
      ) : interventions.length === 0 ? (
        <div className="p-12 rounded-2xl card-mono-dark text-center space-y-2">
          <h3 className="text-xl font-bold text-white">All Reviews Completed</h3>
          <p className="text-sm text-[#A1A1AA]">No pending actions require human sign-off right now.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {interventions.map((item) => (
            <div key={item.id} className="p-6 md:p-8 rounded-2xl card-mono-dark space-y-6">
              
              {/* Account Title & Risk */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-4">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{item.company_name}</h3>
                  <span className="text-xs font-mono text-[#A1A1AA]">{item.customer_id} • ${Math.round(item.arr / 83.0).toLocaleString()} ARR (₹{item.arr.toLocaleString('en-IN')})</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">{item.risk_score}%</span>
                  <span className="text-xs font-semibold text-[#A1A1AA] uppercase block">Churn Risk ({item.risk_level})</span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-5 rounded-xl bg-[#090A0B] border border-[#27272A] space-y-1">
                <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block">AI RECOMMENDS</span>
                <p className="text-lg font-bold text-white">{item.recommended_playbook}</p>
                <ul className="text-xs text-[#A1A1AA] space-y-1 pt-1 font-mono">
                  {(item.proposed_actions_json || []).map((act, i) => (
                    <li key={i}>• {act}</li>
                  ))}
                </ul>
              </div>

              {/* WHY & EXPECTED IMPACT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#090A0B] border border-[#27272A] space-y-1">
                  <span className="text-[#A1A1AA] font-bold block uppercase">WHY</span>
                  <ul className="text-white space-y-1">
                    <li>• Usage down 31%</li>
                    <li>• 4 unresolved support tickets</li>
                    <li>• Invoice overdue 45 days</li>
                    <li>• Primary champion departed</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#090A0B] border border-[#27272A] space-y-2">
                  <span className="text-[#A1A1AA] font-bold block uppercase">EXPECTED IMPACT</span>
                  <div>
                    <span className="text-[#A1A1AA] block">Potential revenue protected:</span>
                    <span className="text-base font-bold text-white">${Math.round((item.arr / 83.0) * 0.15).toLocaleString()} ARR</span>
                  </div>
                  <div>
                    <span className="text-[#A1A1AA] block">AI Confidence:</span>
                    <span className="font-bold text-white">{Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Decision Controls */}
              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-[#27272A]">
                <button
                  onClick={() => handleReject(item.id)}
                  className="px-5 py-2.5 rounded-xl border border-[#3F3F46] hover:bg-[#27272A] text-[#A1A1AA] font-semibold text-xs transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-[#E4E4E7] text-[#090A0B] font-extrabold text-xs shadow-xl transition-transform active:scale-[0.98]"
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
