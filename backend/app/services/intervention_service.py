import time
from datetime import datetime
from typing import Optional, List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from ..models import Intervention, HumanReview, Customer, HistoricalOutcome
from ..rocketride.memory import memory_store

async def get_interventions(
    db: AsyncSession,
    approval_status: Optional[str] = None,
    outcome_status: Optional[str] = None
):
    """
    Get list of interventions, optionally filtered by approval or outcome status.
    """
    query = select(Intervention).order_by(desc(Intervention.created_at))
    if approval_status and approval_status != "all":
        query = query.filter(Intervention.approval_status == approval_status)
    if outcome_status and outcome_status != "all":
        query = query.filter(Intervention.outcome_status == outcome_status)

    result = await db.execute(query)
    return result.scalars().all()

async def approve_intervention(
    db: AsyncSession,
    intervention_id: str,
    reviewer: str = "Customer Success Lead",
    notes: Optional[str] = None
):
    """
    Approve an intervention in the Human Approval Gate desk and dispatch simulated action payloads.
    """
    result = await db.execute(select(Intervention).filter_by(id=intervention_id))
    intervention = result.scalars().first()
    if not intervention:
        return None, None

    intervention.approval_status = "approved"
    intervention.execution_status = "simulation_executed"

    # Generate transparent simulated action dispatcher payloads
    clean_domain = intervention.company_name.lower().replace(" ", "")
    simulated_action_payloads = {
        "execution_mode": "simulation_executed",
        "timestamp": datetime.utcnow().isoformat(),
        "simulated_csm_task": {
            "task_id": f"TASK-{int(time.time())}",
            "assignee": "Senior CSM (Priority Remediation)",
            "customer": intervention.company_name,
            "arr_inr": f"₹{intervention.arr:,.0f}",
            "action": "Schedule Executive Rescue Alignment Call"
        },
        "simulated_email_payload": {
            "to": f"executive-sponsor@{clean_domain}.com",
            "subject": f"NovaCloud Executive Partnership Brief & Renewal Credit — {intervention.company_name}",
            "body": f"Dear Executive Team,\n\nWe have prepared a dedicated resolution brief and 15% annual renewal credit for {intervention.company_name}.\n\nBest,\nNovaCloud CS Team"
        },
        "simulated_slack_notification": {
            "channel": "#revive-churn-rescue-desk",
            "message": f"🚨 [RESCUE APPROVED] {intervention.company_name} (₹{intervention.arr:,.0f} ARR) — 15% Discount Authorized by {reviewer}"
        }
    }

    intervention.reviewer_notes = notes or f"Approved by {reviewer}. Simulation executed."

    review_log = HumanReview(
        intervention_id=intervention_id,
        customer_id=intervention.customer_id,
        action="APPROVED",
        reviewer=reviewer,
        notes=notes
    )
    db.add(review_log)
    await db.commit()
    await db.refresh(intervention)
    return intervention, simulated_action_payloads

async def reject_intervention(
    db: AsyncSession,
    intervention_id: str,
    reviewer: str = "Customer Success Lead",
    notes: Optional[str] = None
):
    """
    Reject a proposed intervention.
    """
    result = await db.execute(select(Intervention).filter_by(id=intervention_id))
    intervention = result.scalars().first()
    if not intervention:
        return None

    intervention.approval_status = "rejected"
    intervention.execution_status = "cancelled"
    intervention.reviewer_notes = notes or f"Rejected by {reviewer}"

    review_log = HumanReview(
        intervention_id=intervention_id,
        customer_id=intervention.customer_id,
        action="REJECTED",
        reviewer=reviewer,
        notes=notes
    )
    db.add(review_log)
    await db.commit()
    await db.refresh(intervention)
    return intervention

async def escalate_intervention(
    db: AsyncSession,
    intervention_id: str,
    reviewer: str = "Customer Success Lead",
    notes: Optional[str] = None
):
    """
    Escalate intervention for higher executive review.
    """
    result = await db.execute(select(Intervention).filter_by(id=intervention_id))
    intervention = result.scalars().first()
    if not intervention:
        return None

    intervention.approval_status = "escalated"
    intervention.reviewer_notes = notes or f"Escalated by {reviewer} to VP of CS"

    review_log = HumanReview(
        intervention_id=intervention_id,
        customer_id=intervention.customer_id,
        action="ESCALATED",
        reviewer=reviewer,
        notes=notes
    )
    db.add(review_log)
    await db.commit()
    await db.refresh(intervention)
    return intervention

async def record_intervention_outcome(
    db: AsyncSession,
    intervention_id: str,
    outcome: str,
    notes: Optional[str] = None
):
    """
    Records outcome of a rescue intervention and updates RocketRide compounding memory.
    """
    result = await db.execute(select(Intervention).filter_by(id=intervention_id))
    intervention = result.scalars().first()
    if not intervention:
        return None

    outcome_clean = "Saved" if outcome.lower() == "saved" else "Churned"
    intervention.outcome_status = outcome_clean

    cust_res = await db.execute(select(Customer).filter_by(id=intervention.customer_id))
    customer = cust_res.scalars().first()
    if customer:
        customer.status = "saved" if outcome_clean == "Saved" else "churned"

    saved_arr_val = intervention.arr if outcome_clean == "Saved" else 0.0
    hist_entry = memory_store.add_outcome(
        customer_name=intervention.company_name,
        risk_score=intervention.risk_score,
        risk_level=intervention.risk_level,
        signals=[f"Risk score {intervention.risk_score}%", f"Playbook {intervention.recommended_playbook}"],
        playbook=intervention.recommended_playbook,
        action=f"Intervention {intervention_id} Executed",
        outcome=outcome_clean,
        saved_arr=saved_arr_val,
        notes=notes or f"Recorded outcome {outcome_clean} for {intervention.company_name}"
    )

    db_hist = HistoricalOutcome(
        id=hist_entry["id"],
        customer_name=hist_entry["customer_name"],
        risk_score=hist_entry["risk_score"],
        risk_level=hist_entry["risk_level"],
        signals_json=hist_entry["signals"],
        playbook=hist_entry["playbook"],
        action=hist_entry["action"],
        outcome=hist_entry["outcome"],
        saved_arr=hist_entry["saved_arr"],
        notes=hist_entry["notes"]
    )
    db.add(db_hist)

    await db.commit()
    await db.refresh(intervention)
    return intervention
