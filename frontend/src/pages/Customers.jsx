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
    if (level === 'CRITICAL') return <span className="text-[#F04438] font-bold">● Critical</span>;
    if (level === 'HIGH') return <span className="text-[#F79009] font-semibold">● High</span>;
    if (level === 'MEDIUM') return <span className="text-[#2E90FA] font-medium">● Medium</span>;
    return <span className="text-[#12B76A] font-medium">● Healthy</span>;
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E8EC] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111318] tracking-tight">Customers</h1>
          <p className="text-sm text-[#667085]">10,000 monitored SaaS customer accounts.</p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search customer name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E6E8EC] text-xs text-[#111318] focus:outline-none focus:border-[#5B4BDB]"
          />
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E6E8EC] text-xs text-[#111318] focus:outline-none"
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
      <div className="rounded-xl surface-card overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAFAFC] text-[#667085] font-bold border-b border-[#E6E8EC]">
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
          <tbody className="divide-y divide-[#E6E8EC] text-[#111318] font-sans">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-[#667085] font-mono">Loading customers...</td>
              </tr>
            ) : data?.customers?.map((cust) => (
              <tr key={cust.id} className="hover:bg-[#FAFAFC] transition-colors">
                <td className="px-6 py-4 font-bold">
                  <NavLink to={`/customers/${cust.id}`} className="hover:text-[#5B4BDB]">
                    {cust.company_name}
                  </NavLink>
                  <span className="block text-[11px] font-mono text-[#667085] font-normal">{cust.id}</span>
                </td>
                <td className="px-6 py-4 font-mono font-bold">${Math.round(cust.arr / 83.0).toLocaleString()}k</td>
                <td className="px-6 py-4">{getHealthDot(cust.current_risk_level)}</td>
                <td className="px-6 py-4 font-mono font-bold text-[#111318]">{cust.current_risk_score}%</td>
                <td className="px-6 py-4 font-mono text-[#667085]">{cust.renewal_date}</td>
                <td className="px-6 py-4 text-xs text-[#667085]">
                  {cust.key_contact_status === 'departed' ? 'Champion departed' :
                   cust.usage_change_pct < -20 ? 'Usage decline' :
                   cust.invoice_status === 'overdue' ? 'Invoice overdue' : 'Telemetry normal'}
                </td>
                <td className="px-6 py-4 text-right">
                  <NavLink
                    to={`/customers/${cust.id}`}
                    className="px-3 py-1 rounded bg-[#F2F4F7] hover:bg-[#E6E8EC] text-xs font-semibold text-[#111318]"
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
