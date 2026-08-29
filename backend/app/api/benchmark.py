from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..adapters.ravenstack_adapter import ravenstack_adapter
from ..rocketride.sdk import rocketride_sdk

router = APIRouter(prefix="/api/benchmark", tags=["Benchmark"])

@router.get("")
async def get_ravenstack_benchmark(db: AsyncSession = Depends(get_db)):
    """
    Executes Retrospective Benchmark evaluation on the RavenStack Dataset.
    Enforces strict zero data leakage (ground truth labels isolated from prediction inputs).
    Returns Precision, Recall, F1, Accuracy, Confusion Matrix, and High-Risk Capture Rate.
    """
    benchmark_records = ravenstack_adapter.load_benchmark_records()
    evaluation_results = []

    for item in benchmark_records:
        ground_truth = item.get("_ground_truth_churn", 0)
        inference_input = ravenstack_adapter.sanitize_input_for_inference(item)
        
        # Execute prediction through RocketRide AI pipeline
        analysis_res = await rocketride_sdk.analyze_customer(inference_input)
        predicted_score = analysis_res.get("risk_score", 0)

        evaluation_results.append({
            "customer_id": item.get("customer_id"),
            "company_name": item.get("company_name"),
            "arr": item.get("arr", 0.0),
            "ground_truth_churn": ground_truth,
            "predicted_risk_score": predicted_score,
            "predicted_risk_level": analysis_res.get("risk_level", "LOW")
        })

    metrics = ravenstack_adapter.calculate_benchmark_metrics(evaluation_results)
    metrics["evaluations_sample"] = evaluation_results[:5]
    return metrics
