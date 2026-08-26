import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { fetchCustomerById, runSingleAnalysis } from '../services/api';
import DAGVisualizer from '../components/DAGVisualizer';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const custData = await fetchCustomerById(id || 'CUST-001');
      setCustomer(custData);

      const result = await runSingleAnalysis({
        customer_id: custData.id,
        company_name: custData.company_name,
        arr: custData.arr,
        active_users: custData.active_users,
        usage_change_pct: custData.usage_change_pct,
        support_tickets_open: custData.support_tickets_open,
        support_sentiment: custData.support_sentiment,
        invoice_status: custData.invoice_status,
        key_contact_status: custData.key_contact_status
      });

      setAnalysis(result);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading || !customer) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xs font-mono text-[#667085]">Loading account workspace...</div>
      </div>
    );
  }

  const arrUsd = Math.round(customer.arr / 83.0);

  return (
    <div className="space-y-10 pb-16 animate-fade-in max-w-5xl mx-auto">
      
      {/* Back Link */}
      <NavLink to="/customers" className="text-xs font-semibold text-[#5B4BDB] hover:underline">
        ← Back to Customers
      </NavLink>

      {/* Top Header */}
      <div className="p-8 rounded-xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-[#667085] uppercase block">{customer.id} • {customer.plan} Plan</span>
          <h1 className="text-3xl lg:text-4xl font-black text-[#111318] tracking-tight">{customer.company_name}</h1>
          <p className="text-sm text-[#667085] mt-1 font-mono">
            <strong>${arrUsd.toLocaleString()} ARR</strong> (₹{customer.arr.toLocaleString('en-IN')}) • Renewal in 51 days ({customer.renewal_date})
          </p>
        </div>

        <div className="text-right">
          <span className="text-4xl font-black text-[#F04438] block tracking-tight">{analysis?.risk_score || customer.current_risk_score}%</span>
          <span className="text-xs font-bold text-[#F04438] uppercase">Critical Churn Risk</span>
        </div>
      </div>

      {/* RISK TIMELINE SECTION (CRITICAL REQUIREMENT) */}
      <div className="p-6 lg:p-8 rounded-xl surface-card space-y-6">
        <h2 className="text-xs font-bold text-[#667085] uppercase tracking-wider">RISK TIMELINE STORY</h2>
        
        <div className="relative border-l-2 border-[#E6E8EC] pl-6 space-y-6 text-xs font-mono">
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-[#12B76A] absolute -left-[31px] top-0.5 border-2 border-white"></span>
            <span className="text-[#98A2B3]">30 days ago</span>
            <p className="font-bold text-[#111318] text-sm">Account Healthy</p>
            <span className="text-[#667085]">Telemetry normal, logins active across 24 seats.</span>
          </div>

          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-[#F79009] absolute -left-[31px] top-0.5 border-2 border-white"></span>
            <span className="text-[#98A2B3]">21 days ago</span>
            <p className="font-bold text-[#111318] text-sm">Usage decline detected</p>
            <span className="text-[#667085]">Product usage dropped 31% over 14-day window.</span>
          </div>

          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-[#F79009] absolute -left-[31px] top-0.5 border-2 border-white"></span>
            <span className="text-[#98A2B3]">14 days ago</span>
            <p className="font-bold text-[#111318] text-sm">Support sentiment deteriorated</p>
            <span className="text-[#667085]">4 unresolved technical tickets filed with negative tone.</span>
          </div>

          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-[#F04438] absolute -left-[31px] top-0.5 border-2 border-white"></span>
            <span className="text-[#98A2B3]">7 days ago</span>
            <p className="font-bold text-[#111318] text-sm">Champion departed</p>
            <span className="text-[#667085]">Primary executive sponsor left the organization.</span>
          </div>

          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-[#F04438] absolute -left-[31px] top-0.5 border-2 border-white"></span>
            <span className="text-[#98A2B3]">Today</span>
            <p className="font-bold text-[#F04438] text-sm">94% Critical Churn Risk</p>
            <span className="text-[#667085]">Executive Rescue & 15% Retention Offer recommended by Playbook Agent.</span>
          </div>
        </div>
      </div>

      {/* RocketRide Pipeline DAG Trace */}
      <DAGVisualizer
        dagNodes={analysis?.dag_nodes || []}
        executionPath={analysis?.execution_path || 'HUMAN_APPROVAL_GATE'}
      />

    </div>
  );
}
