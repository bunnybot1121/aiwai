from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class CustomerBase(BaseModel):
    customer_id: str = Field(..., alias="id")
    company_name: str
    arr: float
    plan: str = "Enterprise"
    renewal_date: str
    active_users: int = 12
    usage_change_pct: float = -5.0
    support_tickets_open: int = 0
    support_sentiment: str = "neutral"
    invoice_status: str = "paid"
    key_contact_status: str = "stable"

    class Config:
        populate_by_name = True

class CustomerResponse(BaseModel):
    id: str
    company_name: str
    arr: float
    plan: str
    renewal_date: str
    active_users: int
    usage_change_pct: float
    support_tickets_open: int
    support_sentiment: str
    invoice_status: str
    key_contact_status: str
    current_risk_score: int
    current_risk_level: str
    current_confidence: float
    status: str
    last_analyzed_at: Optional[str] = None

    class Config:
        from_attributes = True

class CustomerListResponse(BaseModel):
    total: int
    at_risk_count: int
    critical_count: int
    arr_at_risk: float
    customers: List[CustomerResponse]

class AnalyzeRequest(BaseModel):
    customer_id: str
    company_name: Optional[str] = None
    arr: Optional[float] = None
    active_users: Optional[int] = None
    usage_change_pct: Optional[float] = None
    support_tickets_open: Optional[int] = None
    support_sentiment: Optional[str] = None
    invoice_status: Optional[str] = None
    key_contact_status: Optional[str] = None

class BatchAnalyzeRequest(BaseModel):
    customers: Optional[List[AnalyzeRequest]] = None

class HumanReviewActionRequest(BaseModel):
    reviewer: str = "Customer Success Lead"
    notes: Optional[str] = None

class RecordOutcomeRequest(BaseModel):
    outcome: str # "Saved" or "Churned"
    notes: Optional[str] = None

class AnalyticsSummary(BaseModel):
    total_customers: int
    at_risk_customers: int
    critical_customers: int
    arr_at_risk_inr: float
    arr_at_risk_usd: float
    pending_approvals: int
    intervention_success_rate: float
    total_interventions: int
    saved_arr: float
    churned_arr: float
    risk_distribution: Dict[str, int]
    playbook_performance: List[Dict[str, Any]]
    recent_alerts: List[Dict[str, Any]]
