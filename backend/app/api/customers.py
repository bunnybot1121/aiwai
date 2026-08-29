from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from ..database import get_db
from ..services import customer_service

router = APIRouter(prefix="/api/customers", tags=["Customers"])

@router.get("")
async def list_customers(
    search: Optional[str] = None,
    risk_level: Optional[str] = None,
    status: Optional[str] = None,
    sort_by: str = Query("risk_score", description="risk_score, arr, name, active_users"),
    sort_dir: str = Query("desc", description="asc or desc"),
    limit: int = 100,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    """
    List customers with search, filter by risk level, and sorting options.
    """
    return await customer_service.get_customers(
        db, search=search, risk_level=risk_level, status=status,
        sort_by=sort_by, sort_dir=sort_dir, limit=limit, offset=offset
    )

@router.get("/{customer_id}")
async def get_customer(customer_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get customer detail profile.
    """
    customer = await customer_service.get_customer_by_id(db, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail=f"Customer {customer_id} not found")
    return customer

@router.get("/{customer_id}/history")
async def get_customer_history_endpoint(customer_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get temporal risk history time-series for a customer.
    """
    history = await customer_service.get_customer_history(db, customer_id)
    return {
        "customer_id": customer_id,
        "total_records": len(history),
        "history": [
            {
                "id": h.id,
                "risk_score": h.risk_score,
                "risk_level": h.risk_level,
                "confidence": h.confidence,
                "created_at": h.created_at.isoformat() if h.created_at else None
            }
            for h in history
        ]
    }

