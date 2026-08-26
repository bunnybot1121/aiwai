# SaveFlow AI — Architecture & RocketRide Pipeline Workflow

SaveFlow AI is an autonomous customer-retention workflow system built for NovaCloud for the **RocketRide Buildathon**.

## Core System Architecture

```
                                NOVA CLOUD CUSTOMER TELEMETRY
                                  (CSV Upload / Webhook API)
                                              │
                                              ▼
                                    FASTAPI BACKEND API
                                              │
                                              ▼
                                  ROCKETRIDE PYTHON SDK
                                 (`RocketRideClient` Runner)
                                              │
                                              ▼
                        ROCKETRIDE .PIPE PIPELINE ENGINE (`/pipelines`)
     ┌──────────────────────────────────────────────────────────────────────────────────┐
     │ 1. Input Validator Node (`usage_input`, `billing_input`, `support_input`)        │
     │ 2. Parallel Specialist Agents:                                                   │
     │    ├── Usage Agent (login drop, session decay, feature adoption)                 │
     │    ├── Billing Agent (invoice overdue, contract renewal timeline)                │
     │    ├── Support Agent (open ticket velocity, conversation sentiment)              │
     │    └── Contact Agent (primary champion departure events)                         │
     │ 3. Master Churn Risk Agent (0–100 score, CRITICAL/HIGH/MEDIUM/LOW, reasons)     │
     │ 4. Vector Outcome Memory Retrieval (`memory_retriever`)                          │
     │ 5. Rescue Playbook Agent (matching churn drivers to past outcomes)               │
     │ 6. Policy & Confidence Threshold Validator (`validator.pipe`)                    │
     └──────────────────────────────────────────────────────────────────────────────────┘
                                              │
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
              SAFE AUTOMATIC ACTION                       HUMAN APPROVAL GATE
       (CSM Task / Outreach Brief Draft)             (15% Discount / High Risk Score)
                         │                                         │
                         └────────────────────┬────────────────────┘
                                              ▼
                                 INTERVENTION TRACKING DESK
                                              │
                                              ▼
                             OUTCOME RECORDING (Saved / Churned)
                                              │
                                              ▼
                             ROCKETRIDE COMPOUNDING MEMORY STORE
```

## Specialist Agent Nodes & Pipelines

1. **`usage_analysis.pipe`**: Evaluates login drop %, session volume decay, and feature adoption drop.
2. **`billing_analysis.pipe`**: Evaluates invoice payment overdue status, contract length, and renewal proximity.
3. **`support_analysis.pipe`**: Evaluates open ticket count, resolution delays, and negative conversation sentiment tone.
4. **`contact_analysis.pipe`**: Detects primary champion departures and organizational stakeholder shifts.
5. **`churn_analysis.pipe`**: Combines specialist outputs into a unified 0–100 churn risk score, risk level tier, confidence rating, and 5 evidence bullet points.
6. **`playbook.pipe`**: Selects rescue playbooks by evaluating risk drivers alongside retrieved historical outcome memory.
7. **`validator.pipe`**: Policy validator deciding whether action can execute automatically or must route to the Human Approval Gate desk.
8. **`master_churn_workflow.pipe`**: Master end-to-end DAG orchestrating all sub-stages, batch handling, and outcome storage.

## Policy & Human Gate Rules

- **Safe Automatic Execution Allowed**: Low/Medium risk score, high AI confidence (>= 0.75), and non-financial action (e.g. creating CSM task or drafting outreach email).
- **Human Approval Gate Required**:
  1. Action involves financial impact or contract retention discount (e.g. 15% retention offer).
  2. Customer is in the CRITICAL risk tier (risk score >= 85%).
  3. AI confidence drops below 0.75 due to missing telemetry signals.
