import asyncio
import os
import sys

# Add workspace root to sys.path
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if workspace_root not in sys.path:
    sys.path.insert(0, workspace_root)

from backend.app.rocketride.config import llm_config
from backend.app.rocketride.groq_service import groq_fallback_service
from backend.app.rocketride.sdk import rocketride_sdk, RocketRideEngine
from backend.app.adapters.ravenstack_adapter import ravenstack_adapter

def test_groq_config():
    print("Running test_groq_config...")
    assert llm_config.provider == "groq", f"Expected groq, got {llm_config.provider}"
    assert llm_config.groq_model == "openai/gpt-oss-120b"
    assert ".env" in open(".gitignore").read()
    print("  [PASS] test_groq_config")

def test_groq_system_prompt():
    print("Running test_groq_system_prompt...")
    prompt = groq_fallback_service.GROQ_SYSTEM_PROMPT
    assert "SaaS Customer Risk Analyst" in prompt
    assert "ONLY the information supplied" in prompt
    assert "Never invent customer facts" in prompt
    print("  [PASS] test_groq_system_prompt")

def test_groq_fallback_schema():
    print("Running test_groq_fallback_schema...")
    result = groq_fallback_service.analyze_risk_direct_fallback(
        {"company_name": "Test Co", "usage_change_pct": -30.0},
        ["Product usage dropped 30%"],
        [],
        []
    )
    assert 0 <= result["risk_score"] <= 100
    assert result["risk_level"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    assert 0.0 <= result["evidence_confidence"] <= 1.0
    assert result["llm_provider"] == "groq"
    assert result["fallback_used"] is True
    print("  [PASS] test_groq_fallback_schema")

def test_data_leakage():
    print("Running test_data_leakage...")
    records = ravenstack_adapter.load_benchmark_records()
    assert len(records) > 0
    for r in records:
        sanitized = ravenstack_adapter.sanitize_input_for_inference(r)
        assert "retrospective_churn_label" not in sanitized
        assert "churn_label" not in sanitized
        assert "actual_churn" not in sanitized
        assert "_ground_truth_churn" not in sanitized
    print("  [PASS] test_data_leakage")

def test_security():
    print("Running test_security...")
    assert os.path.exists(".env")
    assert ".env" in open(".gitignore").read()
    meta = llm_config.get_metadata()
    assert "groq_api_key" not in meta
    print("  [PASS] test_security")

async def test_acme_corp():
    print("Running test_acme_corp...")
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
    res = await rocketride_sdk.analyze_customer(acme_payload)
    assert res["customer_id"] == "CUST-001"
    assert res["risk_score"] >= 85
    assert res["risk_level"] == "CRITICAL"
    assert res["evidence_confidence"] >= 0.85
    assert len(res["risk_drivers"]) >= 3
    assert res["recommended_playbook"] == "EXECUTIVE RESCUE & RETENTION OFFER"
    assert res["human_approval_required"] is True
    print("  [PASS] test_acme_corp")

async def test_signal_sensitivity():
    print("Running test_signal_sensitivity...")
    c_a = {"customer_id": "S-A", "company_name": "Cust A", "arr": 100000.0, "usage_change_pct": -5.0}
    c_b = {"customer_id": "S-B", "company_name": "Cust B", "arr": 100000.0, "usage_change_pct": -20.0}
    c_c = {"customer_id": "S-C", "company_name": "Cust C", "arr": 100000.0, "usage_change_pct": -40.0}
    res_a = await rocketride_sdk.analyze_customer(c_a)
    res_b = await rocketride_sdk.analyze_customer(c_b)
    res_c = await rocketride_sdk.analyze_customer(c_c)
    assert res_a["risk_score"] < res_b["risk_score"]
    assert res_b["risk_score"] < res_c["risk_score"]
    print("  [PASS] test_signal_sensitivity")

async def test_compound_risk():
    print("Running test_compound_risk...")
    c_a = {"customer_id": "C-A", "company_name": "Single Co", "arr": 100000.0, "usage_change_pct": -30.0}
    c_b = {"customer_id": "C-B", "company_name": "Compound Co", "arr": 100000.0, "usage_change_pct": -30.0, "invoice_status": "overdue", "support_tickets_open": 4, "support_sentiment": "negative", "key_contact_status": "departed"}
    res_a = await rocketride_sdk.analyze_customer(c_a)
    res_b = await rocketride_sdk.analyze_customer(c_b)
    assert res_a["risk_score"] < res_b["risk_score"]
    assert res_b["risk_level"] == "CRITICAL"
    print("  [PASS] test_compound_risk")

async def test_fallback():
    print("Running test_fallback...")
    engine = RocketRideEngine()
    res = await engine._execute_local_pipeline({"customer_id": "F-1", "company_name": "Fallback Co"}, rocketride_status="fallback", execution_engine="RocketRide Local Python Fallback Engine", fallback_used=True)
    assert res["rocketride_status"] == "fallback"
    assert res["fallback_used"] is True
    print("  [PASS] test_fallback")

async def main():
    print("==================================================")
    print("      REVIVE AUTOMATED TEST SUITE RUNNER         ")
    print("==================================================")
    test_groq_config()
    test_groq_system_prompt()
    test_groq_fallback_schema()
    test_data_leakage()
    test_security()
    await test_acme_corp()
    await test_signal_sensitivity()
    await test_compound_risk()
    await test_fallback()
    print("==================================================")
    print("      ALL 9 AUTOMATED TESTS PASSED CLEANLY!       ")
    print("==================================================")

if __name__ == "__main__":
    asyncio.run(main())
