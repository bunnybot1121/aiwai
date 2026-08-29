import pytest
from backend.app.adapters.ravenstack_adapter import ravenstack_adapter

def test_ravenstack_zero_data_leakage():
    """Verify that retrospective ground-truth churn labels are stripped prior to inference."""
    raw_records = ravenstack_adapter.load_benchmark_records()
    assert len(raw_records) > 0

    for item in raw_records:
        sanitized = ravenstack_adapter.sanitize_input_for_inference(item)
        assert "retrospective_churn_label" not in sanitized
        assert "churn_label" not in sanitized
        assert "actual_churn" not in sanitized
        assert "_ground_truth_churn" not in sanitized
        assert all(not k.startswith("_") for k in sanitized.keys())
