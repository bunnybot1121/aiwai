import os
import json
from typing import Dict, Any, List, Optional
import urllib.request
from .config import llm_config

class GroqFallbackService:
    """
    DIRECT GROQ FALLBACK SERVICE (Development & Offline Utility).
    
    WARNING: THIS IS NOT ROCKETRIDE LLM EXECUTION.
    This module provides direct server-side fallback execution to Groq LLM
    ONLY when the primary RocketRide Cloud orchestration engine is unreachable.
    """
    GROQ_SYSTEM_PROMPT = (
        "You are Revive's SaaS Customer Risk Analyst. "
        "Analyze customer-health evidence to determine the likelihood and severity of churn risk. "
        "Use ONLY the information supplied in the input. "
        "Never invent customer facts. Never assume missing information. "
        "Never treat unknown information as negative evidence. "
        "Distinguish observed facts from inference. "
        "Consider multiple independent signals together. "
        "Identify the strongest risk drivers. Identify protective signals. "
        "Identify conflicting or insufficient evidence. "
        "Use historical precedents only as contextual evidence. "
        "Do not use future churn outcomes when performing prediction. "
        "Do not blindly follow a deterministic baseline score. "
        "Return a structured JSON risk assessment."
    )

    def __init__(self):
        self.api_key = os.environ.get("GROQ_API_KEY", "")
        self.model = os.environ.get("GROQ_MODEL", llm_config.groq_model)

    def analyze_risk_direct_fallback(
        self,
        customer_payload: Dict[str, Any],
        evidence_drivers: List[str],
        protective_signals: List[str],
        precedents: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Direct Groq call used ONLY as a local fallback when RocketRide pipeline execution fails.
        Clearly tags result with execution_engine='DIRECT GROQ FALLBACK (ROCKETRIDE OFFLINE)'.
        """
        api_key = os.environ.get("GROQ_API_KEY", self.api_key)
        model_name = os.environ.get("GROQ_MODEL", self.model)
        company = customer_payload.get("company_name", "Unknown Account")

        user_content = (
            f"Customer: {company}\n"
            f"Observed Risk Drivers: {json.dumps(evidence_drivers)}\n"
            f"Protective Signals: {json.dumps(protective_signals)}\n"
            f"Contextual Historical Precedents: {json.dumps(precedents)}\n"
            f"Raw Telemetry Input: {json.dumps(customer_payload)}"
        )

        if api_key and not api_key.startswith("gsk_demo"):
            try:
                req_data = json.dumps({
                    "model": model_name,
                    "messages": [
                        {"role": "system", "content": self.GROQ_SYSTEM_PROMPT},
                        {"role": "user", "content": user_content}
                    ],
                    "temperature": 0.2,
                    "response_format": {"type": "json_object"}
                }).encode("utf-8")

                req = urllib.request.Request(
                    "https://api.groq.com/openai/v1/chat/completions",
                    data=req_data,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    }
                )

                with urllib.request.urlopen(req, timeout=10) as resp:
                    resp_json = json.loads(resp.read().decode("utf-8"))
                    content_str = resp_json["choices"][0]["message"]["content"]
                    parsed = json.loads(content_str)

                    # Validate required schema fields
                    risk_score = max(0, min(100, int(parsed.get("risk_score", 50))))
                    risk_level = str(parsed.get("risk_level", "MEDIUM")).upper()
                    if risk_level not in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
                        risk_level = "CRITICAL" if risk_score >= 75 else ("HIGH" if risk_score >= 50 else ("MEDIUM" if risk_score >= 25 else "LOW"))

                    confidence = float(parsed.get("evidence_confidence", 0.90))

                    return {
                        "risk_score": risk_score,
                        "ai_risk_score": risk_score,
                        "risk_level": risk_level,
                        "evidence_confidence": max(0.0, min(1.0, confidence)),
                        "risk_drivers": parsed.get("risk_drivers", evidence_drivers),
                        "protective_signals": parsed.get("protective_signals", protective_signals),
                        "reasoning": str(parsed.get("reasoning", f"Direct Groq fallback risk assessment for {company}.")),
                        "recommended_playbook": str(parsed.get("recommended_playbook", "STANDARD MONITORING")),
                        "llm_provider": "groq",
                        "llm_model": model_name,
                        "rocketride_status": "fallback",
                        "execution_engine": "DIRECT GROQ FALLBACK (ROCKETRIDE OFFLINE)",
                        "fallback_used": True
                    }
            except Exception as e:
                print(f"[GroqFallbackService] Direct API call error: {e}")

        # Deterministic local calculation fallback if key invalid or API error
        u_drop = abs(int(customer_payload.get("usage_change_pct", 0.0))) if float(customer_payload.get("usage_change_pct", 0.0)) < 0 else 0
        tickets = int(customer_payload.get("support_tickets_open", 0))
        inv_overdue = 30 if str(customer_payload.get("invoice_status", "paid")).lower() == "overdue" else 0
        contact_departed = 35 if str(customer_payload.get("key_contact_status", "stable")).lower() == "departed" else 0
        
        calc_score = max(5, min(99, int(15 + (u_drop * 1.4) + (tickets * 8) + inv_overdue + contact_departed)))
        calc_level = "CRITICAL" if calc_score >= 75 else ("HIGH" if calc_score >= 50 else ("MEDIUM" if calc_score >= 25 else "LOW"))
        
        return {
            "risk_score": calc_score,
            "ai_risk_score": calc_score,
            "risk_level": calc_level,
            "evidence_confidence": 0.90,
            "risk_drivers": evidence_drivers if evidence_drivers else ["Account parameters normal"],
            "protective_signals": protective_signals,
            "reasoning": f"Local fallback calculation for {company}. RocketRide & Groq APIs unreachable.",
            "recommended_playbook": "EXECUTIVE RESCUE & RETENTION OFFER" if calc_level == "CRITICAL" else ("CSM OUTREACH & RETENTION OFFER" if calc_level == "HIGH" else "STANDARD MONITORING"),
            "llm_provider": "groq",
            "llm_model": model_name,
            "rocketride_status": "fallback",
            "execution_engine": "LOCAL PYTHON FALLBACK ENGINE",
            "fallback_used": True
        }

groq_fallback_service = GroqFallbackService()
