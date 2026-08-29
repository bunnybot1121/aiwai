import pytest
import asyncio
from backend.app.rocketride.sdk import rocketride_sdk

@pytest.mark.asyncio
async def test_acme_corp_end_to_end():
    """
    Critical End-to-End Test for Acme Corp (CUST-001).
    Telemetry: ARR 120,000, active_users 3, usage_change_pct -35, support_tickets 4,
    support_sentiment negative, invoice overdue, key_contact departed.
    """
    acme_payload = {
        "customer_id": "CUST-001",
        "company_name": "Acme Corp",
        "arr": 120000.0,
        "active_users": 3,
        "usage_change_pct": -35.0,
        "support_tickets_open": 4,
        "support_sentiment": "negative",
        "invoice_status": "overdue",
        "key_contact_status": "departed"
    }

    result = await rocketride_sdk.analyze_customer(acme_payload)

    assert result["customer_id"] == "CUST-001"
    assert result["company_name"] == "Acme Corp"
    assert result["risk_score"] >= 85
    assert result["risk_level"] == "CRITICAL"
    assert result["evidence_confidence"] >= 0.85
    assert len(result["risk_drivers"]) >= 3
    assert result["recommended_playbook"] == "EXECUTIVE RESCUE & RETENTION OFFER"
    assert result["human_approval_required"] is True
    assert "rocketride_status" in result
    assert result["rocketride"]["llm_provider"] == "groq"
