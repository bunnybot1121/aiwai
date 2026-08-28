import math
from typing import List, Dict, Any

class HistoricalMemoryStore:
    """
    Compounding outcome memory store for RocketRide pipeline.
    Retrieves past customer rescue interventions and their eventual outcomes (Saved vs Churned)
    to inform current playbook selection.
    Hydrates directly from SQLite database to persist across server restarts.
    """

    def __init__(self):
        # Initial seed items
        self._memory_items: List[Dict[str, Any]] = [
            {
                "id": "HIST-001",
                "customer_name": "TechCorp Global",
                "risk_score": 91,
                "risk_level": "critical",
                "signals": ["Usage declined 35%", "Invoice overdue 45 days", "Champion departed"],
                "playbook": "Executive Rescue + 15% Retention Offer",
                "action": "Executive Outreach & 15% Discount",
                "outcome": "Saved",
                "saved_arr": 1500000,
                "notes": "VP of Customer Success called new VP. Applied 15% annual renewal credit."
            },
            {
                "id": "HIST-002",
                "customer_name": "DataDynamics Inc",
                "risk_score": 89,
                "risk_level": "critical",
                "signals": ["5 unresolved support tickets", "Negative sentiment", "Declining users"],
                "playbook": "Standard Email Discount",
                "action": "10% Automated Discount Email",
                "outcome": "Churned",
                "saved_arr": 0,
                "notes": "Generic discount email was ignored because unresolved technical blocker remained."
            },
            {
                "id": "HIST-003",
                "customer_name": "CloudScale Logistics",
                "risk_score": 78,
                "risk_level": "high",
                "signals": ["Primary champion left", "Product usage flat"],
                "playbook": "CSM Onboarding Check-in",
                "action": "New Executive Sponsor Onboarding",
                "outcome": "Saved",
                "saved_arr": 850000,
                "notes": "CSM quickly scheduled onboarding session with incoming Director of Ops."
            },
            {
                "id": "HIST-004",
                "customer_name": "FinPulse Enterprise",
                "risk_score": 95,
                "risk_level": "critical",
                "signals": ["Usage dropped 40%", "Overdue invoice", "6 support complaints", "Champion departed"],
                "playbook": "Executive Rescue + CSM Technical Sprint",
                "action": "Dedicated Technical Support + Executive Meeting",
                "outcome": "Saved",
                "saved_arr": 2400000,
                "notes": "Cleared technical tickets in 48 hours and rescheduled renewal timeline."
            },
            {
                "id": "HIST-005",
                "customer_name": "Apex Commerce",
                "risk_score": 82,
                "risk_level": "high",
                "signals": ["Invoice overdue 30 days", "Support ticket unresolved"],
                "playbook": "Billing Assistance + CSM Outreach",
                "action": "Payment Plan Restructure",
                "outcome": "Saved",
                "saved_arr": 620000,
                "notes": "Customer had ERP integration glitch causing delayed payment; issue fixed."
            }
        ]

    def hydrate_from_db(self, db_outcomes: List[Dict[str, Any]]):
        """
        Rehydrates memory store from SQLite HistoricalOutcome database records on backend startup.
        Ensures historical outcomes persist across backend server restarts.
        """
        existing_ids = {item["id"] for item in self._memory_items}
        for outcome in db_outcomes:
            if outcome["id"] not in existing_ids:
                self._memory_items.append(outcome)
                existing_ids.add(outcome["id"])

    def retrieve_similar_precedents(
        self,
        risk_score: int,
        usage_change_pct: float,
        support_tickets_open: int,
        invoice_status: str,
        champion_departed: bool,
        top_k: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Retrieves top_k historical precedents based on similarity to current customer signals.
        """
        scored_items = []
        for item in self._memory_items:
            sim = 0.0
            score_diff = abs(item["risk_score"] - risk_score)
            sim += max(0, (30 - score_diff) / 30) * 0.4

            signals_str = " ".join(item.get("signals", [])).lower()
            if champion_departed and "champion" in signals_str:
                sim += 0.2
            if usage_change_pct < -20 and "usage" in signals_str:
                sim += 0.2
            if support_tickets_open > 2 and "support" in signals_str:
                sim += 0.2
            if invoice_status == "overdue" and ("invoice" in signals_str or "billing" in signals_str):
                sim += 0.2

            scored_items.append((sim, item))

        scored_items.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in scored_items[:top_k]]

    def add_outcome(
        self,
        customer_name: str,
        risk_score: int,
        risk_level: str,
        signals: List[str],
        playbook: str,
        action: str,
        outcome: str,
        saved_arr: float,
        notes: str
    ) -> Dict[str, Any]:
        """
        Adds a new outcome memory entry (compounding system learning).
        """
        new_entry = {
            "id": f"HIST-00{len(self._memory_items) + 1}",
            "customer_name": customer_name,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "signals": signals,
            "playbook": playbook,
            "action": action,
            "outcome": outcome,
            "saved_arr": saved_arr,
            "notes": notes
        }
        self._memory_items.append(new_entry)
        return new_entry

memory_store = HistoricalMemoryStore()
