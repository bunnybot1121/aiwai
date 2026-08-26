from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_, desc, asc
from ..models import Customer

async def get_customers(
    db: AsyncSession,
    search: Optional[str] = None,
    risk_level: Optional[str] = None,
    status: Optional[str] = None,
    sort_by: str = "risk_score",
    sort_dir: str = "desc",
    limit: int = 100,
    offset: int = 0
):
    """
    Query customer table with search, filtering, and sorting.
    """
    query = select(Customer)

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Customer.company_name.ilike(search_pattern),
                Customer.id.ilike(search_pattern),
                Customer.plan.ilike(search_pattern)
            )
        )

    if risk_level and risk_level.upper() != "ALL":
        query = query.filter(Customer.current_risk_level == risk_level.upper())

    if status and status.lower() != "all":
        query = query.filter(Customer.status == status.lower())

    # Sorting
    if sort_by == "arr":
        sort_col = Customer.arr
    elif sort_by == "name":
        sort_col = Customer.company_name
    elif sort_by == "active_users":
        sort_col = Customer.active_users
    else:
        sort_col = Customer.current_risk_score

    if sort_dir.lower() == "asc":
        query = query.order_by(asc(sort_col))
    else:
        query = query.order_by(desc(sort_col))

    query = query.limit(limit).offset(offset)
    result = await db.execute(query)
    customers = result.scalars().all()

    # Total counts and aggregate risk metrics
    total_query = select(func.count(Customer.id))
    total_count = (await db.execute(total_query)).scalar() or 0

    at_risk_query = select(func.count(Customer.id)).filter(Customer.current_risk_score >= 70)
    at_risk_count = (await db.execute(at_risk_query)).scalar() or 0

    critical_query = select(func.count(Customer.id)).filter(Customer.current_risk_level == "CRITICAL")
    critical_count = (await db.execute(critical_query)).scalar() or 0

    arr_risk_query = select(func.sum(Customer.arr)).filter(Customer.current_risk_score >= 70)
    arr_at_risk = (await db.execute(arr_risk_query)).scalar() or 0.0

    return {
        "total": total_count,
        "at_risk_count": at_risk_count,
        "critical_count": critical_count,
        "arr_at_risk": arr_at_risk,
        "customers": customers
    }

async def get_customer_by_id(db: AsyncSession, customer_id: str):
    """Retrieves a single customer profile by ID."""
    result = await db.execute(select(Customer).filter_by(id=customer_id))
    return result.scalars().first()
