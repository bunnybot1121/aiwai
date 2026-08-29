# REVIVE ROCKETRIDE + GROQ FINAL VERIFICATION REPORT

## RocketRide SDK Version
`0.1.0` (installed `rocketride` Python package)

## RocketRide Cloud Endpoint
`wss://api.rocketride.ai`

## Pipeline Provider
`master_churn_workflow.pipe` → `risk_intelligence.pipe`

## AI Node Provider
`llm_openai` (configured with `profile: "gpt-oss-120b"` natively registered in RocketRide Cloud)

## Groq Model
`openai/gpt-oss-120b`

## Async Execution Mechanism
WebSocket DAP protocol (`client.use()`, `client.send()`, `client.get_task_status()`) with live task completion validation (`serviceUp=True`, `completedCount > 0`, `failedCount = 0`).

## Task/Object ID
`523cf87b-853b-5a34-b349-888f2e62513e`

## Completion State
`state: 3` (`serviceUp: true`, `exitCode: 0`, `completedCount > 0`, `failedCount: 0`)

## Actual AI Output
Acme Corp (ARR $221k / ₹18.4L, usage drop -35%, 4 open tickets, negative sentiment, overdue invoice, champion departed):
- `ai_risk_score`: 99%
- `risk_level`: CRITICAL
- `evidence_confidence`: 0.95
- `recommended_playbook`: EXECUTIVE RESCUE & RETENTION OFFER
- `human_approval_required`: true
- `execution_path`: HUMAN_APPROVAL_GATE

## FastAPI Output
`POST /api/analyze` returns structured execution result:
```json
{
  "customer_id": "CUST-001",
  "company_name": "Acme Corp",
  "risk_score": 99,
  "ai_risk_score": 99,
  "baseline_risk_score": 93,
  "risk_disagreement": false,
  "risk_level": "CRITICAL",
  "evidence_confidence": 0.95,
  "rocketride_status": "connected",
  "execution_engine": "RocketRide Live Engine (wss://api.rocketride.ai)",
  "fallback_used": false,
  "rocketride_execution_id": "523cf87b-853b-5a34-b349-888f2e62513e"
}
```

## Database Output
`RiskScore` record stores:
- `ai_risk_score`: 99
- `baseline_risk_score`: 93
- `llm_provider`: "groq"
- `llm_model`: "openai/gpt-oss-120b"
- `fallback_used`: false
- `rocketride_execution_id`: "523cf87b-853b-5a34-b349-888f2e62513e"

## Baseline Score
`93` (deterministic formula calculation based on weighted signal penalties + 18pt collision bonus, stored separately from AI score).

## AI Score
`99` (AI risk score from RocketRide + Groq execution).

## Fallback Status
- **Live State**: `fallback_used = false`, `rocketride_status = "connected"`, `execution_engine = "RocketRide Live Engine (wss://api.rocketride.ai)"`.
- **Unreachable State**: `fallback_used = true`, `rocketride_status = "fallback"`, `execution_engine = "RocketRide Local Python Fallback Engine"`.

## Exact Execution Chain

```
FastAPI (POST /api/analyze)
  ↓
RocketRideClient (wss://api.rocketride.ai)
  ↓
master_churn_workflow.pipe
  ↓
risk_intelligence.pipe
  ↓
ai_risk_analyst (llm_openai / gpt-oss-120b profile)
  ↓
Groq (openai/gpt-oss-120b)
  ↓
Structured AI result (99% CRITICAL)
  ↓
RocketRide Cloud
  ↓
FastAPI Transport
  ↓
Database (saveflow.db)
  ↓
React Frontend UI
```

---

## FINAL VERDICT

🟢 **FULLY VERIFIED**
