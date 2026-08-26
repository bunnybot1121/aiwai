from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any
from ..database import get_db
from ..models import Customer
from ..rocketride.sdk import rocketride_sdk

router = APIRouter(prefix="/api/webhook", tags=["Webhook"])

@router.post("/customer")
async def customer_event_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """
    Webhook endpoint receiving real-time customer activity events, support tickets, billing updates, or contact changes.
    Immediately triggers RocketRide churn analysis and updates account health.
    """
    payload = await request.json()
    cid = payload.get("customer_id") or payload.get("id")
    if not cid:
        raise HTTPException(status_code=400, detail="Missing customer_id in webhook payload")

    # Run analysis through RocketRide workflow
    result = await rocketride_sdk.analyze_customer(payload)

    # Upsert customer record in DB
    existing = await db.execute(select(Customer).filter_by(id=cid))
    cust = existing.scalars().first()
    if not cust:
        cust = Customer(
            id=cid,
            company_name=payload.get("company_name", f"Account {cid}"),
            arr=float(payload.get("arr", 500000.0)),
            plan=payload.get("plan", "Enterprise"),
            renewal_date=payload.get("renewal_date", "2026-12-31"),
            active_users=payload.get("active_users", 10),
            usage_change_pct=payload.get("usage_change_pct", 0.0),
            support_tickets_open=payload.get("support_tickets_open", 0),
            support_sentiment=payload.get("support_sentiment", "neutral"),
            invoice_status=payload.get("invoice_status", "paid"),
            key_contact_status=payload.get("key_contact_status", "stable")
        )
        db.add(cust)

    cust.current_risk_score = result["risk_score"]
    cust.current_risk_level = result["risk_level"]
    cust.current_confidence = result["confidence"]
    await db.commit()

    return {
        "status": "received",
        "customer_id": cid,
        "rocketride_analysis": result
    }
