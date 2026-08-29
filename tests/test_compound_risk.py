import pytest
import asyncio
from backend.app.rocketride.sdk import rocketride_sdk

@pytest.mark.asyncio
async def test_compound_risk_collision():
    """Verify that multi-vector signal collision produces higher risk than single risk vector."""
    # Customer A: Only usage drop (-30%), billing paid, support normal, champion active
    cust_a = {
        "customer_id": "COMP-A",
        "company_name": "Single Risk Co",
        "arr": 120000.0,
        "usage_change_pct": -30.0,
        "invoice_status": "paid",
        "support_tickets_open": 0,
        "support_sentiment": "neutral",
        "key_contact_status": "stable"
    }

    # Customer B: Usage drop (-30%) PLUS overdue billing, negative sentiment, champion departed
    cust_b = {
        "customer_id": "COMP-B",
        "company_name": "Compound Risk Co",
        "arr": 120000.0,
        "usage_change_pct": -30.0,
        "invoice_status": "overdue",
        "support_tickets_open": 4,
        "support_sentiment": "negative",
        "key_contact_status": "departed"
    }

    res_a = await rocketride_sdk.analyze_customer(cust_a)
    res_b = await rocketride_sdk.analyze_customer(cust_b)

    assert res_a["risk_score"] < res_b["risk_score"]
    assert res_b["risk_level"] == "CRITICAL"
    assert len(res_b["risk_drivers"]) >= 3
