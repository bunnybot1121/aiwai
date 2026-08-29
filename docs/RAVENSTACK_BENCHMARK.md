# REVIVE — RavenStack Retrospective Benchmark Documentation

## Overview
The **RavenStack Retrospective Benchmark** enables quantitative evaluation of REVIVE's RocketRide AI Risk Intelligence pipeline against historical benchmark dataset accounts with ground-truth churn outcomes.

---

## Retrospective Evaluation Metrics

```
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
Accuracy = (TP + TN) / Total
High-Risk Capture Rate = (TP / Total Churners) * 100%
```

---

## Data Leakage Prevention

To prevent future target leakage:
1. `retrospective_churn_label` is strictly isolated from inference payloads via `RavenStackAdapter.sanitize_input_for_inference()`.
2. The RocketRide AI pipeline receives only pre-cutoff telemetry (usage change %, overdue status, ticket volume, champion status).
3. Post-inference predictions ($\text{risk\_score} \ge 70 \implies \text{High Risk}$) are evaluated against ground truth labels retrospectively.

---

## API Endpoint Access

- **`GET /api/benchmark`**: Executes Retrospective Benchmark evaluation across RavenStack records and returns Precision, Recall, F1, Accuracy, Confusion Matrix, and High-Risk Capture Rate.
