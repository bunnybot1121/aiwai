import pytest
import asyncio
from backend.app.rocketride.sdk import rocketride_sdk

@pytest.mark.asyncio
async def test_rocketride_pipeline_execution():
    """Verify customer churn analysis workflow execution through RocketRide."""
    test_payload = {
        "customer_id": "TEST-001",
        "company_name": "Test Account Inc",
        "arr": 150000.0,
        "active_users": 10,
        "usage_change_pct": -25.0,
        "support_tickets_open": 2,
        "support_sentiment": "negative",
        "invoice_status": "paid",
        "key_contact_status": "stable"
    }

    result = await rocketride_sdk.analyze_customer(test_payload)
    
    assert "risk_score" in result
    assert "ai_risk_score" in result
    assert "baseline_risk_score" in result
    assert "risk_level" in result
    assert "evidence_confidence" in result
    assert "rocketride_status" in result
    assert "llm_provider" in result["rocketride"]
    assert result["rocketride"]["llm_provider"] == "groq"
    assert "master_churn_workflow.pipe" in result["pipeline_file"]
