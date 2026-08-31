# All Definition Coverage Metrics — Branch: `ADC-R1-A`

## Technique
**All Definition Coverage**

## Branch Summary
| Field | Value |
|-------|-------|
| **Branch** | `ADC-R1-A` |
| **Metrics Present** | `B`, `C`, `D`, `E`, `F` |
| **Metrics Removed** | ~~`A`~~ |
| **Present Count** | 5 / 6 |

## ✅ Metrics Present on This Branch

| ID | Classification | Metric Name |
|----|---------------|-------------|
| **[B]** | Definition-Use Mapping | Data Path Correlation |
| **[C]** | Coverage Measurement | DU-Path Validation |
| **[D]** | Uncovered Definition Detection | Dead Data Identification |
| **[E]** | Edge Case Handling | Null and Boundary Flow Analysis |
| **[F]** | Reporting Validation | Audit Trail Verification |

## ❌ Metrics Removed on This Branch

| ID | Classification | Metric Name |
|----|---------------|-------------|
| ~~**[A]**~~ | ~~Variable Definition Detection~~ | ~~All-Defs Coverage %~~ |

## All 6 Metrics Reference

| ID | Classification | Metric Name | Status on This Branch |
|----|---------------|-------------|----------------------|
| A | Variable Definition Detection | All-Defs Coverage % | ❌ Removed |
| B | Definition-Use Mapping | Data Path Correlation | ✅ Present |
| C | Coverage Measurement | DU-Path Validation | ✅ Present |
| D | Uncovered Definition Detection | Dead Data Identification | ✅ Present |
| E | Edge Case Handling | Null and Boundary Flow Analysis | ✅ Present |
| F | Reporting Validation | Audit Trail Verification | ✅ Present |

## Stack
- **Frontend**: Angular 20
- **Backend**: Node.js + Express

## API
```
GET /api/metrics      → returns only metrics present on this branch
GET /api/metrics/:id  → returns single metric by ID (A–F)
```

## Run
```bash
cd backend && npm install && npm run dev    # http://localhost:3000
cd frontend && npm install && ng serve     # http://localhost:4200
```
