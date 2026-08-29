# REVIVE — Groq LLM Integration Documentation

## Overview

Revive uses **Groq** as its primary AI reasoning engine for SaaS customer churn risk intelligence. The model used is **`openai/gpt-oss-120b`**, configurable server-side via `GROQ_MODEL`.

Gemini has been completely removed from active intelligence. No direct Gemini integrations exist, and all inference requests are orchestrated through RocketRide pipelines.

---

## Architectural Flow

```
POST /api/analyze
  ↓
RocketRideClient
  ↓
RocketRide Cloud (wss://api.rocketride.ai)
  ↓
master_churn_workflow.pipe
  ↓
risk_intelligence.pipe
  ↓
AI Risk Analyst Node (Groq provider / openai/gpt-oss-120b)
  ↓
Structured AI Risk Result
  ↓
FastAPI Transport Layer
  ↓
SQLite Database (saveflow.db)
  ↓
React Frontend UI (Customer Detail & Dashboard)
```

---

## Environment Configuration

Groq settings are managed server-side only via `.env` (included in `.gitignore`):

```bash
GROQ_API_KEY=gsk_secret_key_here
GROQ_MODEL=openai/gpt-oss-120b
LLM_PROVIDER=groq
```

### Security Directives
- `GROQ_API_KEY` is maintained strictly server-side.
- The API key is NEVER returned in HTTP responses, logs, or exposed to the React frontend.
- Model selection (`GROQ_MODEL`) is dynamic and can be switched to `openai/gpt-oss-20b` without changing application code.

---

## System Prompt

```
You are Revive's SaaS Customer Risk Analyst. Analyze customer-health evidence to determine the likelihood and severity of churn risk. Use ONLY the information supplied in the input. Never invent customer facts. Never assume missing information. Never treat unknown information as negative evidence. Distinguish observed facts from inference. Consider multiple independent signals together. Identify the strongest risk drivers. Identify protective signals. Identify conflicting or insufficient evidence. Use historical precedents only as contextual evidence. Do not use future churn outcomes when performing prediction. Do not blindly follow a deterministic baseline score. Return a structured JSON risk assessment.
```

---

## Required Response Schema

```json
{
  "risk_score": 94,
  "risk_level": "CRITICAL",
  "evidence_confidence": 0.93,
  "risk_drivers": [
    "Product usage declined by 35%",
    "Invoice payment overdue",
    "4 unresolved support tickets",
    "Primary key contact departed"
  ],
  "protective_signals": [],
  "reasoning": "Account Acme Corp exhibits CRITICAL churn risk driven by multi-vector signal collision.",
  "recommended_playbook": "EXECUTIVE RESCUE & RETENTION OFFER"
}
```

---

## Evidence Grounding & Disagreement Detection

- **Evidence Grounding**: Every risk driver must correspond to actual input evidence. Fact vs inference vs unknown is strictly enforced.
- **Baseline Risk Score**: The Python formula is kept as an independent `baseline_risk_score`. It does NOT overwrite the AI risk score returned from RocketRide.
- **Risk Disagreement Detector**:
  $$\text{difference} = |\text{ai\_risk\_score} - \text{baseline\_risk\_score}|$$
  If $\text{difference} \ge 25$, `risk_disagreement = true` is set, automatically raising human-review priority in the Policy Gate.
