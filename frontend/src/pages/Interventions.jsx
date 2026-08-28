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
    <div className="space-y-6 pb-16 text-white">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Interventions Tracker</h1>
          <p className="text-sm text-[#A1A1AA]">Track rescue actions and compounding memory results.</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl card-mono-dark overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#090A0B] text-[#A1A1AA] font-bold border-b border-[#27272A]">
            <tr>
              <th className="px-6 py-3.5">ID</th>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">Recommended Strategy</th>
              <th className="px-6 py-3.5">Approval</th>
              <th className="px-6 py-3.5">Outcome</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A] text-white font-sans">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[#A1A1AA] font-mono">Loading interventions...</td>
              </tr>
            ) : interventions.map((item) => (
              <tr key={item.id} className="hover:bg-[#18181B] transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-white">{item.id}</td>
                <td className="px-6 py-4 font-bold">
                  <NavLink to={`/customers/${item.customer_id}`} className="hover:underline text-white">
                    {item.company_name}
                  </NavLink>
                  <span className="block text-[11px] font-mono text-[#A1A1AA] font-normal">₹{item.arr.toLocaleString('en-IN')}</span>
                </td>
                <td className="px-6 py-4 text-xs text-white font-medium">{item.recommended_playbook}</td>
                <td className="px-6 py-4 font-mono font-bold">
                  <span className={`px-2 py-0.5 rounded text-[11px] border ${
                    item.approval_status === 'approved' ? 'bg-white text-[#090A0B] border-white' :
                    item.approval_status === 'rejected' ? 'bg-[#18181B] text-[#A1A1AA] border-[#27272A]' :
                    'bg-[#18181B] text-white border-white/50'
                  }`}>
                    {item.approval_status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[11px] border ${
                    item.outcome_status === 'Saved' ? 'bg-white text-[#090A0B] border-white font-bold' :
                    item.outcome_status === 'Churned' ? 'bg-[#18181B] text-[#A1A1AA] border-[#27272A]' :
                    'text-[#A1A1AA]'
                  }`}>
                    {item.outcome_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setModalItem(item)}
                    className="px-3 py-1 rounded-xl bg-white hover:bg-[#E4E4E7] text-xs font-extrabold text-[#090A0B]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl card-mono-dark space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Record Intervention Outcome</h3>
            <p className="text-xs text-[#A1A1AA]">Record result for <strong className="text-white">{modalItem.company_name}</strong> to update memory store.</p>

            <div className="space-y-3 font-mono">
              <span className="text-xs text-white font-semibold block uppercase">Result</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOutcome('Saved')}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    outcome === 'Saved' ? 'bg-white text-[#090A0B] border-white' : 'bg-[#090A0B] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  ✓ CUSTOMER SAVED
                </button>
                <button
                  type="button"
                  onClick={() => setOutcome('Churned')}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    outcome === 'Churned' ? 'bg-white text-[#090A0B] border-white' : 'bg-[#090A0B] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  ✕ CHURNED
                </button>
              </div>

              <textarea
                placeholder="Optional notes on customer resolution..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#090A0B] border border-[#27272A] text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-white h-24 font-sans"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setModalItem(null)} className="px-4 py-2 text-xs font-semibold text-[#A1A1AA]">
                Cancel
              </button>
              <button onClick={handleSaveOutcome} className="px-5 py-2.5 rounded-xl bg-white text-[#090A0B] font-extrabold text-xs shadow-md hover:bg-[#E4E4E7]">
                Save & Update Memory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
