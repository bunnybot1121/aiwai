import pytest
import asyncio
from backend.app.rocketride.sdk import rocketride_sdk

@pytest.mark.asyncio
async def test_signal_sensitivity_usage_drops():
    """Verify that risk scores increase proportionally as product usage drops."""
    cust_a = {"customer_id": "SENS-A", "company_name": "Cust A", "arr": 100000.0, "usage_change_pct": -5.0}
    cust_b = {"customer_id": "SENS-B", "company_name": "Cust B", "arr": 100000.0, "usage_change_pct": -20.0}
    cust_c = {"customer_id": "SENS-C", "company_name": "Cust C", "arr": 100000.0, "usage_change_pct": -40.0}

    res_a = await rocketride_sdk.analyze_customer(cust_a)
    res_b = await rocketride_sdk.analyze_customer(cust_b)
    res_c = await rocketride_sdk.analyze_customer(cust_c)

    assert res_a["risk_score"] < res_b["risk_score"]
    assert res_b["risk_score"] < res_c["risk_score"]

@pytest.mark.asyncio
async def test_signal_sensitivity_billing_status():
    """Verify that overdue billing increases churn risk score."""
    paid_cust = {"customer_id": "BILL-1", "company_name": "Paid Co", "arr": 100000.0, "invoice_status": "paid"}
    overdue_cust = {"customer_id": "BILL-2", "company_name": "Overdue Co", "arr": 100000.0, "invoice_status": "overdue"}

    res_paid = await rocketride_sdk.analyze_customer(paid_cust)
    res_overdue = await rocketride_sdk.analyze_customer(overdue_cust)

    assert res_paid["risk_score"] < res_overdue["risk_score"]
