import pytest
import os
from backend.app.rocketride.config import llm_config
from backend.app.rocketride.groq_service import groq_fallback_service

def test_groq_config_defaults():
    """Verify Groq default configuration and model settings."""
    assert llm_config.provider == "groq"
    assert llm_config.groq_model == "openai/gpt-oss-120b"
    assert llm_config.model == os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
    assert ".env" in open(".gitignore").read()

def test_groq_system_prompt_content():
    """Verify Groq system prompt instructions."""
    prompt = groq_fallback_service.GROQ_SYSTEM_PROMPT
    assert "SaaS Customer Risk Analyst" in prompt
    assert "ONLY the information supplied" in prompt
    assert "Never invent customer facts" in prompt
    assert "Distinguish observed facts from inference" in prompt

def test_groq_fallback_output_structure():
    """Verify structured response schema output validation."""
    customer_payload = {"company_name": "Test Co", "usage_change_pct": -30.0}
    result = groq_fallback_service.analyze_risk_direct_fallback(
        customer_payload,
        evidence_drivers=["Product usage dropped 30%"],
        protective_signals=[],
        precedents=[]
    )
    
    assert "risk_score" in result
    assert 0 <= result["risk_score"] <= 100
    assert result["risk_level"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    assert 0.0 <= result["evidence_confidence"] <= 1.0
    assert isinstance(result["risk_drivers"], list)
    assert isinstance(result["protective_signals"], list)
    assert isinstance(result["reasoning"], str)
    assert result["llm_provider"] == "groq"
    assert result["fallback_used"] is True
