import os
from typing import Dict, Any

class LLMConfig:
    """
    Configuration layer for AI Risk Intelligence models.
    Supports dynamic provider and model switching via environment variables.
    Primary Provider: Groq (Model: GROQ_MODEL / openai/gpt-oss-120b).
    """
    def __init__(self):
        self.provider = os.environ.get("LLM_PROVIDER", "groq").lower()
        self.groq_model = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
        self.model = os.environ.get("LLM_MODEL", self.groq_model)
        self.groq_api_key = os.environ.get("GROQ_API_KEY", "")

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "provider": self.provider,
            "model": self.model,
            "groq_model": self.groq_model,
            "has_api_key": bool(self.groq_api_key)
        }

llm_config = LLMConfig()

