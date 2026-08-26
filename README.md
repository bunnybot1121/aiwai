# SaveFlow AI — Churn Rescue Desk 🚀

> **RocketRide Buildathon Project** — Autonomous Customer Retention System for NovaCloud SaaS.

SaveFlow AI is an autonomous customer-retention workflow engine built for NovaCloud. It continuously monitors customer telemetry (usage decay, invoice status, support sentiment, champion departure), predicts churn probability, explains risk factors, retrieves historical rescue outcomes, selects response playbooks, auto-executes safe actions, routes high-stake decisions to a **Human Approval Gate**, and compounds memory from intervention results — with **RocketRide** powering the AI pipeline workflow.

---

## Core Loop
```
WATCH → PREDICT → EXPLAIN → DECIDE → ACT → LEARN
```

---

## Key Features

1. **Load-Bearing RocketRide Integration**: Core AI orchestration runs inside RocketRide `.pipe` files (`/pipelines`) executed via `RocketRideClient` Python SDK.
2. **Specialist Multi-Agent Analysis**:
   - **Usage Agent**: Detects product adoption drop & session decay.
   - **Billing Agent**: Evaluates overdue invoices & renewal timeline.
   - **Support Agent**: Analyzes ticket velocity & negative tone sentiment.
   - **Contact Agent**: Tracks primary champion departures.
3. **Historical Outcome Memory**: Compounding vector memory store retrieves past rescue outcomes to inform future playbook selections.
4. **Human-in-the-Loop Policy Gate**: Automatic execution for safe actions; mandatory human approval for financial retention discounts or critical risk accounts.
5. **Batch Processing Engine**: Processes 10,000 customer accounts with real-time wall-clock execution time, record counts, and AI token cost reporting.
6. **Polished SaaS Web Application**: Dark-mode control room built with React 18, Vite, Tailwind CSS, Recharts, and Lucide icons.

---

## Project Structure

```
saveflow-ai/
├── frontend/                     # React 18 + Vite + Tailwind CSS Control Room UI
│   ├── src/
│   │   ├── components/           # Header, BatchModal, DAGVisualizer
│   │   ├── pages/                # Dashboard, Customers, CustomerDetail, HumanReview, Interventions, Analytics
│   │   └── services/api.js       # FastAPI API client
├── backend/                      # Python FastAPI Backend
│   ├── app/
│   │   ├── api/                  # Customers, Analyze, Interventions, Analytics, Webhook API endpoints
│   │   ├── models.py             # SQLAlchemy ORM models
│   │   ├── database.py           # Async SQLite / PostgreSQL session engine
│   │   ├── rocketride/           # RocketRide Python SDK wrapper & Memory store
│   │   └── main.py               # FastAPI application entrypoint
├── pipelines/                    # RocketRide .pipe pipeline files (committed to GitHub)
│   ├── master_churn_workflow.pipe
│   ├── usage_analysis.pipe
│   ├── billing_analysis.pipe
│   ├── support_analysis.pipe
│   ├── contact_analysis.pipe
│   ├── churn_analysis.pipe
│   ├── playbook.pipe
│   └── validator.pipe
├── data/                         # Synthetic NovaCloud datasets & sample CSVs
│   ├── customers.csv
│   └── historical_outcomes.csv
├── docs/                         # Architecture documentation
│   └── architecture.md
├── .env.example                  # Environment template
└── README.md                     # Project documentation
```

---

## Quick Start (Run from Clean Clone)

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### 1. Backend Setup
```bash
# Navigate to workspace root
cd saveflow-ai

# Copy environment variables
cp .env.example .env

# Install backend dependencies
pip install fastapi uvicorn sqlalchemy aiosqlite pydantic rocketride

# Start FastAPI server (serves API & pre-built SPA)
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup (Development Mode)
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## Demo Walkthrough (2-3 Minutes)

1. **Scene 1: NovaCloud Control Room Overview**
   - Open SaveFlow AI (`http://localhost:5173`).
   - View NovaCloud workspace: 10,000 accounts, 327 at-risk, 84 critical, ₹38.4L ARR at risk, 12 pending approvals.
2. **Scene 2: Run Batch Analysis**
   - Click **Run Batch Analysis** button.
   - Watch real-time execution progress, wall-clock processing time (s), record count, and AI cost ($) reporting.
3. **Scene 3: Inspect Acme Corp (CUST-001)**
   - Click on **Acme Corp (CUST-001)**.
   - View 94% Churn Risk, 93% Confidence, and 5 structured risk reasons (31% usage drop, 4 open tickets, invoice overdue 45 days, champion departed).
4. **Scene 4: RocketRide Execution Trace Visualizer**
   - View live DAG node execution: Validator → Usage/Billing/Support/Contact Specialists → Churn Aggregator → Vector Memory → Playbook Selector → Policy Gate.
5. **Scene 5: Human Approval Gate**
   - Navigate to **Human Review** (`/review`).
   - Review Acme Corp's proposed 15% retention offer.
   - Click `[ APPROVE ACTION ]`.
6. **Scene 6: Intervention Tracking & Outcome Memory Update**
   - Navigate to **Interventions** (`/interventions`).
   - Click `Record Outcome` → Tag as `Saved`.
   - Observe outcome recorded and RocketRide compounding memory updated for future recommendations!

---

## Environment Variables (`.env`)

| Variable | Description | Default |
|---|---|---|
| `ROCKETRIDE_URI` | RocketRide engine WebSocket URI | `ws://localhost:5565` |
| `ROCKETRIDE_APIKEY` | RocketRide API authentication key | `local_key_buildathon` |
| `DATABASE_URL` | Async SQLite or PostgreSQL connection string | `sqlite+aiosqlite:///./saveflow.db` |
| `COMPANY_ID` | Modeled SaaS company workspace ID | `NOVACLOUD` |
