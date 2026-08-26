import time
from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Customer, RiskScore, Intervention
from ..rocketride.sdk import rocketride_sdk

async def run_batch_analysis(
    db: AsyncSession,
    custom_records: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    """
    Executes batch churn analysis for NovaCloud customer accounts using RocketRide pipeline.
    """
    if custom_records and len(custom_records) > 0:
        records_to_process = custom_records
    else:
        # Load customers from DB
        res = await db.execute(select(Customer))
        customers = res.scalars().all()
        records_to_process = [
            {
                "customer_id": c.id,
                "company_name": c.company_name,
                "arr": c.arr,
                "active_users": c.active_users,
                "usage_change_pct": c.usage_change_pct,
                "support_tickets_open": c.support_tickets_open,
                "support_sentiment": c.support_sentiment,
                "invoice_status": c.invoice_status,
                "key_contact_status": c.key_contact_status
            }
            for c in customers
        ]

    # Execute batch via RocketRide SDK
    batch_res = await rocketride_sdk.analyze_batch(records_to_process)

    # Persist updated risk scores into database
    for result in batch_res.get("results", []):
        cid = result.get("customer_id")
        if not cid or "error" in result:
            continue

        c_res = await db.execute(select(Customer).filter_by(id=cid))
        cust = c_res.scalars().first()
        if cust:
            cust.current_risk_score = result.get("risk_score", 50)
            cust.current_risk_level = result.get("risk_level", "MEDIUM")
            cust.current_confidence = result.get("confidence", 0.90)

            # Store risk score audit log
            r_score = RiskScore(
                customer_id=cid,
                risk_score=result["risk_score"],
                risk_level=result["risk_level"],
                confidence=result["confidence"],
                reasons_json=result["reasons"],
                specialists_json=result["specialists"],
                dag_nodes_json=result["dag_nodes"]
            )
            db.add(r_score)

            # If human approval is required, create or update intervention
            if result.get("human_approval_required", False):
                existing_int = await db.execute(select(Intervention).filter_by(customer_id=cid, approval_status="pending"))
                interv = existing_int.scalars().first()
                if not interv:
                    new_interv = Intervention(
                        id=f"INT-{int(time.time()*1000) % 100000}",
                        customer_id=cid,
                        company_name=result["company_name"],
                        arr=result["arr"],
                        risk_score=result["risk_score"],
                        risk_level=result["risk_level"],
                        confidence=result["confidence"],
                        recommended_playbook=result["recommended_playbook"],
                        proposed_actions_json=result["proposed_actions"],
                        financial_impact=result["financial_impact"],
                        human_approval_required=True,
                        approval_status="pending",
                        execution_status="scheduled",
                        outcome_status="pending_outcome",
                        reviewer_notes="Triggered by batch analysis run."
                    )
                    db.add(new_interv)

    await db.commit()

    return {
        "status": "completed",
        "total_records": batch_res["total_records"],
        "completed": batch_res["completed"],
        "failed": batch_res["failed"],
        "at_risk_count": batch_res["at_risk_count"],
        "critical_count": batch_res["critical_count"],
        "arr_at_risk_inr": batch_res["arr_at_risk"],
        "arr_at_risk_usd": round(batch_res["arr_at_risk"] / 83.0, 2),
        "runtime_wall_clock_seconds": batch_res["wall_clock_seconds"],
        "total_tokens_used": batch_res["total_tokens_used"],
        "total_estimated_cost_usd": batch_res["total_estimated_cost_usd"]
    }
