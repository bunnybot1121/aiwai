from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from ..database import get_db
from ..schemas import HumanReviewActionRequest, RecordOutcomeRequest
from ..services import intervention_service

router = APIRouter(prefix="/api/interventions", tags=["Interventions"])

import os

def verify_reviewer_auth(x_reviewer_token: Optional[str] = Header(None, alias="X-Reviewer-Token", description="Reviewer API Token")):
    """
    Enforces authorization check on human approval endpoints using REVIEWER_API_TOKEN.
    Rejects with 401 if token is missing or mismatched.
    """
    expected_token = os.environ.get("REVIEWER_API_TOKEN", "revive_cs_lead_secret_2026")
    if not x_reviewer_token:
        raise HTTPException(status_code=401, detail="Missing X-Reviewer-Token header. Authorization required.")
    if x_reviewer_token != expected_token:
        raise HTTPException(status_code=401, detail="Invalid reviewer token. Unauthorized access.")
    return True

@router.get("")
async def list_interventions(
    approval_status: Optional[str] = Query("all", description="all, pending, approved, rejected, escalated"),
    outcome_status: Optional[str] = Query("all", description="all, pending_outcome, saved, churned"),
    db: AsyncSession = Depends(get_db)
):
    """
    List rescue interventions with optional status filters.
    """
    return await intervention_service.get_interventions(
        db, approval_status=approval_status, outcome_status=outcome_status
    )

@router.post("/{intervention_id}/approve")
async def approve_intervention_endpoint(
    intervention_id: str,
    payload: HumanReviewActionRequest,
    authorized: bool = Depends(verify_reviewer_auth),
    db: AsyncSession = Depends(get_db)
):
    """
    Approve a rescue intervention in the Human Approval Gate desk.
    Returns executed intervention and transparent simulated action dispatcher payloads.
    """
    intervention, action_payloads = await intervention_service.approve_intervention(
        db, intervention_id=intervention_id, reviewer=payload.reviewer, notes=payload.notes
    )
    if not intervention:
        raise HTTPException(status_code=404, detail=f"Intervention {intervention_id} not found")
    return {
        "status": "success",
        "message": "Intervention approved and simulated actions dispatched",
        "intervention": intervention,
        "simulated_actions": action_payloads
    }

@router.post("/{intervention_id}/reject")
async def reject_intervention_endpoint(
    intervention_id: str,
    payload: HumanReviewActionRequest,
    authorized: bool = Depends(verify_reviewer_auth),
    db: AsyncSession = Depends(get_db)
):
    """
    Reject a rescue intervention proposal.
    """
    result = await intervention_service.reject_intervention(
        db, intervention_id=intervention_id, reviewer=payload.reviewer, notes=payload.notes
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"Intervention {intervention_id} not found")
    return {"status": "success", "message": "Intervention rejected", "intervention": result}

@router.post("/{intervention_id}/escalate")
async def escalate_intervention_endpoint(
    intervention_id: str,
    payload: HumanReviewActionRequest,
    authorized: bool = Depends(verify_reviewer_auth),
    db: AsyncSession = Depends(get_db)
):
    """
    Escalate a rescue intervention to executive leadership.
    """
    result = await intervention_service.escalate_intervention(
        db, intervention_id=intervention_id, reviewer=payload.reviewer, notes=payload.notes
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"Intervention {intervention_id} not found")
    return {"status": "success", "message": "Intervention escalated to VP of CS", "intervention": result}

@router.post("/{intervention_id}/outcome")
async def record_outcome_endpoint(
    intervention_id: str,
    payload: RecordOutcomeRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Records customer retention outcome (Saved vs Churned) and updates RocketRide compounding memory.
    """
    result = await intervention_service.record_intervention_outcome(
        db, intervention_id=intervention_id, outcome=payload.outcome, notes=payload.notes
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"Intervention {intervention_id} not found")
    return {"status": "success", "message": f"Outcome recorded as {payload.outcome}. RocketRide memory updated.", "intervention": result}
