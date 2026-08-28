import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchAnalytics } from '../services/api';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const data = await fetchAnalytics();
      setAnalytics(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xs font-mono text-[#A1A1AA]">Loading analytics...</div>
      </div>
    );
  }

  const riskData = [
    { name: 'Healthy (0-39%)', count: analytics.risk_distribution.LOW, color: '#FFFFFF' },
    { name: 'Medium (40-69%)', count: analytics.risk_distribution.MEDIUM, color: '#D4D4D8' },
    { name: 'High (70-84%)', count: analytics.risk_distribution.HIGH, color: '#A1A1AA' },
    { name: 'Critical (85-100%)', count: analytics.risk_distribution.CRITICAL, color: '#52525B' },
  ];

  const playbookData = analytics.playbook_performance.map((p) => ({
    name: p.playbook.split(' ')[0] + ' ' + (p.playbook.split(' ')[1] || ''),
    rate: p.success_rate,
  }));

  return (
    <div className="space-y-8 pb-16 text-white">
      
      {/* Title */}
      <div className="border-b border-[#27272A] pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Insights & Analytics</h1>
        <p className="text-sm text-[#A1A1AA]">System-wide customer health distribution and playbook conversion metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl card-mono-dark space-y-1">
          <span className="text-xs text-[#A1A1AA] font-medium uppercase tracking-wider block">Total Saved Revenue</span>
          <p className="text-3xl font-black text-white tracking-tight">₹98.6L</p>
          <span className="text-xs text-[#A1A1AA] font-mono">84.5% Playbook Conversion</span>
        </div>
        <div className="p-6 rounded-2xl card-mono-dark space-y-1">
          <span className="text-xs text-[#A1A1AA] font-medium uppercase tracking-wider block">ARR Still At Risk</span>
          <p className="text-3xl font-black text-white tracking-tight">$221k</p>
          <span className="text-xs text-[#A1A1AA] font-mono">35 Accounts at Risk</span>
        </div>
        <div className="p-6 rounded-2xl card-mono-dark space-y-1">
          <span className="text-xs text-[#A1A1AA] font-medium uppercase tracking-wider block">Human Reviews</span>
          <p className="text-3xl font-black text-white tracking-tight">{analytics.pending_approvals} Pending</p>
          <span className="text-xs text-[#A1A1AA] font-mono">100% Policy Enforced</span>
        </div>
        <div className="p-6 rounded-2xl card-mono-dark space-y-1">
          <span className="text-xs text-[#A1A1AA] font-medium uppercase tracking-wider block">RocketRide Avg Latency</span>
          <p className="text-3xl font-black text-white tracking-tight">42ms / Node</p>
          <span className="text-xs text-[#A1A1AA] font-mono">$0.0034 / Run</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Risk Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <XAxis dataKey="name" stroke="#71717A" fontSize={11} />
                <YAxis stroke="#71717A" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#121316', borderColor: '#27272A', borderRadius: '8px', color: '#FFFFFF' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl card-mono-dark space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Playbook Success Rate (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={playbookData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#71717A" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#71717A" fontSize={11} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#121316', borderColor: '#27272A', borderRadius: '8px', color: '#FFFFFF' }} />
                <Bar dataKey="rate" fill="#FFFFFF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
