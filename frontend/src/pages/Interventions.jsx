import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchInterventions, recordOutcome } from '../services/api';

export default function Interventions() {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [outcome, setOutcome] = useState('Saved');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadInterventions();
  }, []);

  const loadInterventions = async () => {
    try {
      setLoading(true);
      const data = await fetchInterventions('all', 'all');
      setInterventions(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSaveOutcome = async () => {
    if (!modalItem) return;
    try {
      await recordOutcome(modalItem.id, outcome, notes);
      setModalItem(null);
      setNotes('');
      await loadInterventions();
    } catch (err) {
      alert('Error recording outcome: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E8EC] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111318] tracking-tight">Interventions Tracker</h1>
          <p className="text-sm text-[#667085]">Track rescue actions and compounding memory results.</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl surface-card overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAFAFC] text-[#667085] font-bold border-b border-[#E6E8EC]">
            <tr>
              <th className="px-6 py-3.5">ID</th>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">Recommended Strategy</th>
              <th className="px-6 py-3.5">Approval</th>
              <th className="px-6 py-3.5">Outcome</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E8EC] text-[#111318] font-sans">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[#667085] font-mono">Loading interventions...</td>
              </tr>
            ) : interventions.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAFAFC] transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[#5B4BDB]">{item.id}</td>
                <td className="px-6 py-4 font-bold">
                  <NavLink to={`/customers/${item.customer_id}`} className="hover:text-[#5B4BDB]">
                    {item.company_name}
                  </NavLink>
                  <span className="block text-[11px] font-mono text-[#667085] font-normal">₹{item.arr.toLocaleString('en-IN')}</span>
                </td>
                <td className="px-6 py-4 text-xs text-[#111318] font-medium">{item.recommended_playbook}</td>
                <td className="px-6 py-4 font-mono font-bold">
                  <span className={`px-2 py-0.5 rounded text-[11px] ${
                    item.approval_status === 'approved' ? 'bg-[#12B76A]/10 text-[#12B76A]' :
                    item.approval_status === 'rejected' ? 'bg-[#F04438]/10 text-[#F04438]' :
                    'bg-[#F79009]/10 text-[#F79009]'
                  }`}>
                    {item.approval_status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[11px] ${
                    item.outcome_status === 'Saved' ? 'bg-[#12B76A]/10 text-[#12B76A] font-bold' :
                    item.outcome_status === 'Churned' ? 'bg-[#F04438]/10 text-[#F04438] font-bold' :
                    'text-[#667085]'
                  }`}>
                    {item.outcome_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setModalItem(item)}
                    className="px-3 py-1 rounded bg-[#F2F4F7] hover:bg-[#E6E8EC] text-xs font-semibold text-[#111318]"
                  >
                    Record outcome
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outcome Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111318]/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl surface-card space-y-4 shadow-dropdown">
            <h3 className="font-bold text-lg text-[#111318]">Record Intervention Outcome</h3>
            <p className="text-xs text-[#667085]">Record result for <strong className="text-[#111318]">{modalItem.company_name}</strong> to update memory store.</p>

            <div className="space-y-3">
              <span className="text-xs text-[#111318] font-semibold block">Result</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOutcome('Saved')}
                  className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                    outcome === 'Saved' ? 'bg-[#12B76A]/10 text-[#12B76A] border-[#12B76A]' : 'bg-white border-[#E6E8EC] text-[#667085]'
                  }`}
                >
                  ✓ CUSTOMER SAVED
                </button>
                <button
                  type="button"
                  onClick={() => setOutcome('Churned')}
                  className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                    outcome === 'Churned' ? 'bg-[#F04438]/10 text-[#F04438] border-[#F04438]' : 'bg-white border-[#E6E8EC] text-[#667085]'
                  }`}
                >
                  ✕ CHURNED
                </button>
              </div>

              <textarea
                placeholder="Optional notes on customer resolution..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#E6E8EC] text-xs text-[#111318] focus:outline-none focus:border-[#5B4BDB] h-24"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setModalItem(null)} className="px-4 py-2 text-xs font-semibold text-[#667085]">
                Cancel
              </button>
              <button onClick={handleSaveOutcome} className="px-5 py-2 rounded-lg bg-[#5B4BDB] text-white font-bold text-xs">
                Save & Update Memory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
