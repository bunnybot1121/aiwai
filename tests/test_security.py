import pytest
import os
from backend.app.rocketride.config import llm_config

def test_groq_api_key_server_side_only():
    """Verify that GROQ_API_KEY is restricted server-side and git-ignored."""
    assert os.path.exists(".env")
    assert ".env" in open(".gitignore").read()
    
    # Ensure config metadata does NOT expose the actual secret key value
    meta = llm_config.get_metadata()
    assert "groq_api_key" not in meta
    assert meta["has_api_key"] is True or meta["has_api_key"] is False
