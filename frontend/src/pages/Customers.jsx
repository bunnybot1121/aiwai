import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCustomers } from '../services/api';

export default function Customers() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [riskLevel, setRiskLevel] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, [search, riskLevel]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetchCustomers({ search, risk_level: riskLevel });
      setData(res);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getHealthDot = (level) => {
    if (level === 'CRITICAL') return <span className="text-white font-bold">● Critical</span>;
    if (level === 'HIGH') return <span className="text-white font-semibold">● High</span>;
    if (level === 'MEDIUM') return <span className="text-[#A1A1AA] font-medium">● Medium</span>;
    return <span className="text-[#A1A1AA] font-medium">● Healthy</span>;
  };

  return (
    <div className="space-y-6 pb-16 text-white">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Customers</h1>
          <p className="text-sm text-[#A1A1AA]">10,000 monitored SaaS customer accounts.</p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search customer name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl bg-[#121316] border border-[#27272A] text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-white"
          />
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#121316] border border-[#27272A] text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Healthy / Low</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="rounded-2xl card-mono-dark overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#090A0B] text-[#A1A1AA] font-bold border-b border-[#27272A]">
            <tr>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">ARR</th>
              <th className="px-6 py-3.5">Health</th>
              <th className="px-6 py-3.5">Churn risk</th>
              <th className="px-6 py-3.5">Renewal</th>
              <th className="px-6 py-3.5">Last signal</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A] text-white font-sans">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-[#A1A1AA] font-mono">Loading customers...</td>
              </tr>
            ) : data?.customers?.map((cust) => (
              <tr key={cust.id} className="hover:bg-[#18181B] transition-colors">
                <td className="px-6 py-4 font-bold">
                  <NavLink to={`/customers/${cust.id}`} className="hover:underline text-white">
                    {cust.company_name}
                  </NavLink>
                  <span className="block text-[11px] font-mono text-[#A1A1AA] font-normal">{cust.id}</span>
                </td>
                <td className="px-6 py-4 font-mono font-bold">${Math.round(cust.arr / 83.0).toLocaleString()}k</td>
                <td className="px-6 py-4">{getHealthDot(cust.current_risk_level)}</td>
                <td className="px-6 py-4 font-mono font-bold text-white">{cust.current_risk_score}%</td>
                <td className="px-6 py-4 font-mono text-[#A1A1AA]">{cust.renewal_date}</td>
                <td className="px-6 py-4 text-xs text-[#A1A1AA]">
                  {cust.key_contact_status === 'departed' ? 'Champion departed' :
                   cust.usage_change_pct < -20 ? 'Usage decline' :
                   cust.invoice_status === 'overdue' ? 'Invoice overdue' : 'Telemetry normal'}
                </td>
                <td className="px-6 py-4 text-right">
                  <NavLink
                    to={`/customers/${cust.id}`}
                    className="px-3 py-1 rounded-xl bg-white hover:bg-[#E4E4E7] text-xs font-bold text-[#090A0B]"
                  >
                    Review
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
