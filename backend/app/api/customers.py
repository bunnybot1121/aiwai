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
