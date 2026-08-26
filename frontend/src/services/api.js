const API_BASE = '/api';

export async function fetchCustomers(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.risk_level) query.append('risk_level', params.risk_level);
  if (params.status) query.append('status', params.status);
  if (params.sort_by) query.append('sort_by', params.sort_by);
  if (params.sort_dir) query.append('sort_dir', params.sort_dir);

  const res = await fetch(`${API_BASE}/customers?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return await res.json();
}

export async function fetchCustomerById(id) {
  const res = await fetch(`${API_BASE}/customers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch customer ${id}`);
  return await res.json();
}

export async function runSingleAnalysis(customerPayload) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerPayload),
  });
  if (!res.ok) throw new Error('Failed to run RocketRide analysis');
  return await res.json();
}

export async function runBatchAnalysis() {
  const res = await fetch(`${API_BASE}/analyze/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Failed to run batch analysis');
  return await res.json();
}

export async function fetchInterventions(approval_status = 'all', outcome_status = 'all') {
  const res = await fetch(`${API_BASE}/interventions?approval_status=${approval_status}&outcome_status=${outcome_status}`);
  if (!res.ok) throw new Error('Failed to fetch interventions');
  return await res.json();
}

export async function approveIntervention(id, reviewer = 'Customer Success Lead', notes = '') {
  const res = await fetch(`${API_BASE}/interventions/${id}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewer, notes }),
  });
  if (!res.ok) throw new Error('Failed to approve intervention');
  return await res.json();
}

export async function rejectIntervention(id, reviewer = 'Customer Success Lead', notes = '') {
  const res = await fetch(`${API_BASE}/interventions/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewer, notes }),
  });
  if (!res.ok) throw new Error('Failed to reject intervention');
  return await res.json();
}

export async function escalateIntervention(id, reviewer = 'Customer Success Lead', notes = '') {
  const res = await fetch(`${API_BASE}/interventions/${id}/escalate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewer, notes }),
  });
  if (!res.ok) throw new Error('Failed to escalate intervention');
  return await res.json();
}

export async function recordOutcome(id, outcome, notes = '') {
  const res = await fetch(`${API_BASE}/interventions/${id}/outcome`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ outcome, notes }),
  });
  if (!res.ok) throw new Error('Failed to record outcome');
  return await res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return await res.json();
}
