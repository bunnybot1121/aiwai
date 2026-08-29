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
    ai_risk_score: Optional[int] = None
    baseline_risk_score: Optional[int] = None
    risk_disagreement: Optional[bool] = False
    evidence_confidence: Optional[float] = 0.95

    class Config:
        from_attributes = True

class CustomerListResponse(BaseModel):
    total: int
    at_risk_count: int
    critical_count: int
    arr_at_risk: float
    customers: List[CustomerResponse]

class AnalyzeRequest(BaseModel):
    customer_id: str = Field(..., min_length=1, description="Customer Identifier")
    company_name: Optional[str] = Field(None, description="Company Name")
    arr: Optional[float] = Field(None, ge=0.0, description="Annual Recurring Revenue")
    active_users: Optional[int] = Field(None, ge=0, description="Active Users Count")
    usage_change_pct: Optional[float] = Field(None, ge=-100.0, le=100.0, description="Usage Change Percentage")
    support_tickets_open: Optional[int] = Field(None, ge=0, description="Open Support Tickets")
    support_sentiment: Optional[str] = Field(None, description="Support Conversation Sentiment")
    invoice_status: Optional[str] = Field(None, description="Invoice Status")
    key_contact_status: Optional[str] = Field(None, description="Key Contact Status")

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
    total_customers_in_db: int
    at_risk_customers: int
    critical_customers: int
    arr_at_risk_inr: float
    arr_at_risk_usd: float
    pending_approvals: int
    intervention_success_rate: float
    total_interventions: int
    saved_arr_inr: float
    churned_arr_inr: float
    risk_distribution: Dict[str, int]
    playbook_performance: List[Dict[str, Any]]
    recent_alerts: List[Dict[str, Any]]

class BenchmarkMetricsResponse(BaseModel):
    dataset_name: str
    total_benchmark_accounts: int
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    high_risk_capture_rate_pct: float
    arr_at_risk_captured_inr: float
    confusion_matrix: Dict[str, int]
    data_leakage_prevented: bool
