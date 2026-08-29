import pytest
import asyncio
from backend.app.rocketride.sdk import RocketRideEngine

@pytest.mark.asyncio
async def test_rocketride_fallback_transparency():
    """Verify system fallback transparency when RocketRide is unreachable."""
    engine = RocketRideEngine()
    test_payload = {"customer_id": "FALLBACK-01", "company_name": "Fallback Inc", "usage_change_pct": -10.0}

    # Execute local fallback directly
    fallback_res = await engine._execute_local_pipeline(
        test_payload,
        rocketride_status="fallback",
        execution_engine="RocketRide Local Python Fallback Engine",
        fallback_used=True
    )

    assert fallback_res["rocketride_status"] == "fallback"
    assert fallback_res["fallback_used"] is True
    assert "Fallback" in fallback_res["execution_engine"]
    assert fallback_res["rocketride"]["status"] == "fallback"
