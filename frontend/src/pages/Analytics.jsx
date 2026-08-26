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
        <div className="text-xs font-mono text-[#667085]">Loading analytics...</div>
      </div>
    );
  }

  const riskData = [
    { name: 'Healthy (0-39%)', count: analytics.risk_distribution.LOW, color: '#12B76A' },
    { name: 'Medium (40-69%)', count: analytics.risk_distribution.MEDIUM, color: '#2E90FA' },
    { name: 'High (70-84%)', count: analytics.risk_distribution.HIGH, color: '#F79009' },
    { name: 'Critical (85-100%)', count: analytics.risk_distribution.CRITICAL, color: '#F04438' },
  ];

  const playbookData = analytics.playbook_performance.map((p) => ({
    name: p.playbook.split(' ')[0] + ' ' + (p.playbook.split(' ')[1] || ''),
    rate: p.success_rate,
  }));

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Title */}
      <div className="border-b border-[#E6E8EC] pb-4">
        <h1 className="text-2xl font-extrabold text-[#111318] tracking-tight">Insights & Analytics</h1>
        <p className="text-sm text-[#667085]">System-wide customer health distribution and playbook conversion metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl surface-card space-y-1">
          <span className="text-xs text-[#667085] font-medium uppercase tracking-wider block">Total Saved Revenue</span>
          <p className="text-3xl font-black text-[#12B76A] tracking-tight">₹98.6L</p>
          <span className="text-xs text-[#667085] font-mono">84.5% Playbook Conversion</span>
        </div>
        <div className="p-6 rounded-xl surface-card space-y-1">
          <span className="text-xs text-[#667085] font-medium uppercase tracking-wider block">ARR Still At Risk</span>
          <p className="text-3xl font-black text-[#F04438] tracking-tight">₹38.4L</p>
          <span className="text-xs text-[#667085] font-mono">35 Accounts at Risk</span>
        </div>
        <div className="p-6 rounded-xl surface-card space-y-1">
          <span className="text-xs text-[#667085] font-medium uppercase tracking-wider block">Human Reviews</span>
          <p className="text-3xl font-black text-[#F79009] tracking-tight">{analytics.pending_approvals} Pending</p>
          <span className="text-xs text-[#667085] font-mono">100% Policy Enforced</span>
        </div>
        <div className="p-6 rounded-xl surface-card space-y-1">
          <span className="text-xs text-[#667085] font-medium uppercase tracking-wider block">RocketRide Avg Latency</span>
          <p className="text-3xl font-black text-[#5B4BDB] tracking-tight">42ms / Node</p>
          <span className="text-xs text-[#667085] font-mono">$0.0034 / Run</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="p-6 rounded-xl surface-card space-y-4">
          <h3 className="font-bold text-sm text-[#111318] uppercase tracking-wider">Risk Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <XAxis dataKey="name" stroke="#98A2B3" fontSize={11} />
                <YAxis stroke="#98A2B3" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E8EC', borderRadius: '8px', color: '#111318' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl surface-card space-y-4">
          <h3 className="font-bold text-sm text-[#111318] uppercase tracking-wider">Playbook Success Rate (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={playbookData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#98A2B3" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#98A2B3" fontSize={11} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E8EC', borderRadius: '8px', color: '#111318' }} />
                <Bar dataKey="rate" fill="#5B4BDB" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
