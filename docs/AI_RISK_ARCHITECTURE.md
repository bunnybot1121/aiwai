# REVIVE — AI Risk Intelligence Architecture

## Overview
REVIVE uses a RocketRide-orchestrated AI pipeline (`pipelines/risk_intelligence.pipe`) powered by **Groq (`openai/gpt-oss-120b`)** to transform raw customer telemetry signals into grounded evidence, specialist insights, historical precedent context, and evidence-supported churn risk predictions.


```
                    REVIVE
                       │
                       ▼
              Customer Telemetry
                       │
                       ▼
              RocketRide Cloud
                       │
                       ▼
             risk_intelligence.pipe
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   Usage Agent    Billing Agent   Support Agent
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
              Relationship Agent
                       │
                       ▼
             Evidence Synthesizer
                       │
                       ▼
             Historical Context
                       │
                       ▼
              AI Risk Analyst
                       │
                       ▼
              Risk Validation
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
        AI Risk Score      Evidence Report
              │                 │
              └────────┬────────┘
                       │
                       ▼
             master_churn_workflow
                       │
                       ▼
               Playbook Selector
                       │
                       ▼
                 Policy Gate
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
         Human Approval     Safe Action
                       │
                       ▼
                 Outcome Memory
```

---

## Dual Risk Scoring & Governance Model

| Risk Metric | Calculation Method | Purpose | Disagreement Threshold |
|---|---|---|---|
| **AI Risk Score (`ai_risk_score`)** | Multi-vector reasoning by LLM analyst + memory lookup | Primary intelligence score | $| \text{ai} - \text{baseline} | \ge 25$ triggers `risk_disagreement = True` |
| **Baseline Score (`baseline_risk_score`)** | Weighted penalty math (0.35/0.25/0.25/0.15 + 18pt collision bonus) | Deterministic sanity check & fallback | Baseline never overwrites AI score |
| **Evidence Confidence (`evidence_confidence`)** | Signal completeness evaluation (0.40 – 0.95 scale) | Governs policy gate threshold | $< 0.75$ triggers mandatory Human Review Gate |

---

## Specialist Analysis Domains

1. **Usage Agent (`usage_analysis`):** Evaluates adoption change %, active users, and session decay.
2. **Billing Agent (`billing_analysis`):** Evaluates invoice status, overdue payment days, and contract renewal window.
3. **Support Agent (`support_analysis`):** Evaluates open support ticket volume, ticket velocity, and conversation sentiment.
4. **Relationship Agent (`relationship_analysis`):** Evaluates champion departure status and account stakeholder stability.

---

## Safety & Anti-Hallucination Controls

- **Strict Grounding:** Model prompts strictly restrict reasoning to provided telemetry fields.
- **Data Leakage Shield:** Retrospective ground-truth churn labels are stripped from inference inputs.
- **Backend Policy Enforcer:** Financial retention offers and high-risk actions stop at the Human Approval Gate regardless of AI confidence.
