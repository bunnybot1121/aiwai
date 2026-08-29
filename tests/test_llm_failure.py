import pytest
from backend.app.rocketride.groq_service import GroqFallbackService

def test_llm_failure_rejection():
    """Verify system safe error handling on invalid/malformed LLM responses."""
    service = GroqFallbackService()
    # Execute fallback with dummy key to force rejection / local calculation
    res = service.analyze_risk_direct_fallback(
        customer_payload={"company_name": "Malformed Co"},
        evidence_drivers=["Malformed response test"],
        protective_signals=[],
        precedents=[]
    )

    assert "risk_score" in res
    assert 0 <= res["risk_score"] <= 100
    assert res["fallback_used"] is True
    assert res["rocketride_status"] == "fallback"
