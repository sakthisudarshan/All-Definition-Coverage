# All Definition Coverage Metrics

A testbed repository for validating **All Definition Coverage** technique metrics across an 11-branch matrix.

Every branch implements the same Angular 20 + Node.js Express application — only the **metrics present in `backend/src/data/metrics.json`** differ between branches.

## Tech Stack

- **Frontend**: Angular 20
- **Backend**: Node.js + Express

## Technique: All Definition Coverage

## Metrics (A–F)

| ID | Classification | Metric Name |
|----|---------------|-------------|
| **A** | Variable Definition Detection | All-Defs Coverage % |
| **B** | Definition-Use Mapping | Data Path Correlation |
| **C** | Coverage Measurement | DU-Path Validation |
| **D** | Uncovered Definition Detection | Dead Data Identification |
| **E** | Edge Case Handling | Null and Boundary Flow Analysis |
| **F** | Reporting Validation | Audit Trail Verification |

## Branch Strategy (11 Branches)

| Type | Strategy | Count |
|------|----------|-------|
| 🟢 **Full** | All 6 metrics | 1 |
| 🟡 **R1** | Remove 1 metric each | 6 |
| 🟡 **R2** | Remove any 2 metrics | 1 |
| 🟠 **R3** | Remove any 3 metrics | 1 |
| 🔴 **R4** | Remove any 4 metrics | 1 |
| 🔴 **R5** | Remove any 5 metrics | 1 |
| **Total** | | **11** |

## Running

```bash
# Backend
cd backend && npm install && npm run dev   # http://localhost:3000

# Frontend
cd frontend && npm install && ng serve    # http://localhost:4200
```

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/metrics` | All metrics on this branch |
| `GET` | `/api/metrics/:id` | Single metric by ID (A–F) |
