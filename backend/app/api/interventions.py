from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from ..database import get_db
from ..schemas import HumanReviewActionRequest, RecordOutcomeRequest
from ..services import intervention_service

router = APIRouter(prefix="/api/interventions", tags=["Interventions"])

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
    db: AsyncSession = Depends(get_db)
):
    """
    Approve a rescue intervention in the Human Approval Gate desk.
    """
    result = await intervention_service.approve_intervention(
        db, intervention_id=intervention_id, reviewer=payload.reviewer, notes=payload.notes
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"Intervention {intervention_id} not found")
    return {"status": "success", "message": "Intervention approved and executed", "intervention": result}

@router.post("/{intervention_id}/reject")
async def reject_intervention_endpoint(
    intervention_id: str,
    payload: HumanReviewActionRequest,
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
