# REVIVE — RocketRide Cloud Pipeline Architecture

## Overview
RocketRide Cloud orchestrates REVIVE's AI pipeline workflows over WebSocket connection (`wss://api.rocketride.ai`) using the `rocketride==1.3.0` Python SDK.

---

## Load-Bearing Execution Architecture

1. **Pipeline Registration:**
   `client.use(filepath="pipelines/master_churn_workflow.pipe", use_existing=True)` registers and compiles the pipeline workflow on RocketRide Cloud, returning task token `tk_...`.

2. **RPC Execution & State Transmission:**
   `client.send(token=task_token, data=json.dumps(payload))` transmits raw customer telemetry, executes specialist LLM nodes, and returns the pipeline result object.

3. **Fallback Resilience:**
   If a network exception or timeout occurs, `RocketRideEngine` seamlessly transitions to local Python execution and explicitly tags `rocketride.status = "fallback"`.

---

## Registered `.pipe` Workflows

| Pipeline File | Target Function | Primary Component Providers |
|---|---|---|
| `pipelines/risk_intelligence.pipe` | Specialist signal analysis, evidence synthesis, LLM risk reasoning | `agent_llm`, `preprocessor_code`, `response_json` |
| `pipelines/master_churn_workflow.pipe` | End-to-end master retention workflow orchestration | `webhook`, `agent_llm`, `preprocessor_code`, `response_json` |
| `pipelines/usage_analysis.pipe` | Standalone Usage Specialist | `agent_llm`, `preprocessor_code` |
| `pipelines/billing_analysis.pipe` | Standalone Billing Specialist | `agent_llm`, `preprocessor_code` |
| `pipelines/support_analysis.pipe` | Standalone Support Specialist | `agent_llm`, `preprocessor_code` |
| `pipelines/contact_analysis.pipe` | Standalone Contact Specialist | `agent_llm`, `preprocessor_code` |
| `pipelines/playbook.pipe` | Standalone Playbook Selector | `agent_llm`, `preprocessor_code` |
| `pipelines/validator.pipe` | Standalone Human Policy Validator | `preprocessor_code` |
