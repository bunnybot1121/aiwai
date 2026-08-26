from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any
from ..database import get_db
from ..schemas import AnalyzeRequest, BatchAnalyzeRequest
from ..rocketride.sdk import rocketride_sdk
from ..services import batch_service

router = APIRouter(prefix="/api/analyze", tags=["Analysis"])

@router.post("")
async def analyze_single_customer(payload: AnalyzeRequest, db: AsyncSession = Depends(get_db)):
    """
    Executes single customer churn analysis through RocketRide pipeline workflow.
    """
    customer_dict = payload.dict(exclude_none=True)
    if not customer_dict.get("company_name"):
        customer_dict["company_name"] = f"Account {customer_dict.get('customer_id')}"
    if "arr" not in customer_dict:
        customer_dict["arr"] = 500000.0

    analysis_res = await rocketride_sdk.analyze_customer(customer_dict)
    return analysis_res

@router.post("/batch")
async def analyze_batch_customers(payload: Optional[BatchAnalyzeRequest] = None, db: AsyncSession = Depends(get_db)):
    """
    Executes batch customer churn analysis through RocketRide pipeline across accounts.
    """
    custom_records = [c.dict(exclude_none=True) for c in payload.customers] if (payload and payload.customers) else None
    batch_res = await batch_service.run_batch_analysis(db, custom_records=custom_records)
    return batch_res
