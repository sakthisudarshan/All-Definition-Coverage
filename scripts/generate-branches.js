#!/usr/bin/env node
/**
 * Branch Generator — Coverage Delta Metrics
 * Pattern: Same as Digital-Sippoy — only data/metrics.json changes per branch
 *
 * 11 branches total:
 *   CD-FULL     — all 6 metrics
 *   CD-R1-A..F  — remove 1 metric each (6 branches)
 *   CD-R2       — remove any 2 metrics (B, D)
 *   CD-R3       — remove any 3 metrics (A, C, E)
 *   CD-R4       — remove any 4 metrics (A, B, C, D)
 *   CD-R5       — remove any 5 metrics (A, B, C, D, E)
 */

const fs = require('fs');
const path = require('path');

// ── All 6 metric objects (flat array — same as Digital-Sippoy items.json) ──
const ALL_METRICS = [
  {
    id: "A",
    technique: "Coverage Delta",
    classification: "Regression Testing Monitoring",
    metric: "Coverage Delta %",
    measure: "Change in test coverage percentage between current build and previous baseline — monitors coverage trends",
    value: 4.7, unit: "%", baseline: 78.3, current: 83.0,
    status: "improved", threshold: 0,
    trend: [72.1, 74.3, 76.8, 78.3, 83.0],
    trendLabels: ["Build-1","Build-2","Build-3","Build-4","Build-5"],
    createdAt: "2026-08-31T00:00:00.000Z"
  },
  {
    id: "B",
    technique: "Coverage Delta",
    classification: "Test Suite Effectiveness Tracking",
    metric: "Discovery Power Assessment",
    measure: "Evaluates how many unique logical journeys through the code are validated by current test cases, measuring the ratio of executed paths to total possible paths.",
    value: 0.74, unit: "ratio", executedPaths: 148, totalPaths: 200,
    status: "adequate", threshold: 0.70,
    trend: [0.61, 0.65, 0.69, 0.71, 0.74],
    trendLabels: ["Sprint-1","Sprint-2","Sprint-3","Sprint-4","Sprint-5"],
    createdAt: "2026-08-31T00:00:00.000Z"
  },
  {
    id: "C",
    technique: "Coverage Delta",
    classification: "CI/CD Quality Gate Enforcement",
    metric: "Deployment Readiness Guard",
    measure: "Acts as an automated threshold that prevents code from being merged if the coverage delta is negative, ensuring that only logically verified code moves toward production.",
    value: "PASS", unit: "gate-status", coverageDelta: 4.7,
    status: "passed", threshold: 0,
    gateHistory: ["PASS","PASS","FAIL","PASS","PASS"],
    trendLabels: ["PR-12","PR-13","PR-14","PR-15","PR-16"],
    createdAt: "2026-08-31T00:00:00.000Z"
  },
  {
    id: "D",
    technique: "Coverage Delta",
    classification: "Change Impact Analysis",
    metric: "Ripple Effect Mapping",
    measure: "Identifies which specific logical paths are altered by a code change and which downstream paths might be affected, measuring the logical surface area of a modification to predict unintended side effects.",
    value: 12, unit: "paths", affectedPaths: 12, totalChangedFiles: 3,
    status: "moderate", threshold: 20,
    trend: [5, 8, 15, 12, 12],
    trendLabels: ["Commit-1","Commit-2","Commit-3","Commit-4","Commit-5"],
    createdAt: "2026-08-31T00:00:00.000Z"
  },
  {
    id: "E",
    technique: "Coverage Delta",
    classification: "New Code Testing Validation",
    metric: "Fresh Logic Proofing",
    measure: "Specifically measures whether newly added lines or paths have corresponding test cases, ensuring that the MVP growth is supported by an equal growth in testing depth.",
    value: 91.2, unit: "%", newLinesAdded: 125, newLinesCovered: 114,
    status: "good", threshold: 80,
    trend: [75.0, 82.3, 88.0, 90.1, 91.2],
    trendLabels: ["Sprint-1","Sprint-2","Sprint-3","Sprint-4","Sprint-5"],
    createdAt: "2026-08-31T00:00:00.000Z"
  },
  {
    id: "F",
    technique: "Coverage Delta",
    classification: "Quality Improvement Measurement",
    metric: "Structural Health Benchmarking",
    measure: "Provides a quantitative score of how much simpler or safer the code becomes after refactoring, measuring the successful reduction of complex untestable paths into cleaner sequences.",
    value: 67, unit: "score", complexityBefore: 142, complexityAfter: 75,
    status: "improving", threshold: 50,
    trend: [30, 42, 55, 61, 67],
    trendLabels: ["Refactor-1","Refactor-2","Refactor-3","Refactor-4","Refactor-5"],
    createdAt: "2026-08-31T00:00:00.000Z"
  }
];

// ── 11 branch definitions ────────────────────────────────────────────────────
const BRANCHES = [
  // First Creation: FULL + remove 1 each
  { name: "CD-FULL",  present: ["A","B","C","D","E","F"], removed: [] },
  { name: "CD-R1-A",  present: ["B","C","D","E","F"],     removed: ["A"] },
  { name: "CD-R1-B",  present: ["A","C","D","E","F"],     removed: ["B"] },
  { name: "CD-R1-C",  present: ["A","B","D","E","F"],     removed: ["C"] },
  { name: "CD-R1-D",  present: ["A","B","C","E","F"],     removed: ["D"] },
  { name: "CD-R1-E",  present: ["A","B","C","D","F"],     removed: ["E"] },
  { name: "CD-R1-F",  present: ["A","B","C","D","E"],     removed: ["F"] },
  // Second Creation: remove any 2
  { name: "CD-R2",    present: ["A","C","E","F"],         removed: ["B","D"] },
  // Third Creation: remove any 3
  { name: "CD-R3",    present: ["B","D","F"],             removed: ["A","C","E"] },
  // Fourth Creation: remove any 4
  { name: "CD-R4",    present: ["E","F"],                 removed: ["A","B","C","D"] },
  // Fifth Creation: remove any 5
  { name: "CD-R5",    present: ["F"],                     removed: ["A","B","C","D","E"] },
];

// ── Generate data file for each branch ──────────────────────────────────────
const outDir = path.join(__dirname, 'branch-data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const b of BRANCHES) {
  // Filter metrics — only keep those present on this branch (flat array like Digital-Sippoy)
  const data = ALL_METRICS.filter(m => b.present.includes(m.id));
  fs.writeFileSync(path.join(outDir, `${b.name}.json`), JSON.stringify(data, null, 2));
}

// ── Save manifest ────────────────────────────────────────────────────────────
const manifest = BRANCHES.map(b => ({
  name: b.name,
  present: b.present,
  removed: b.removed,
  description: b.removed.length === 0
    ? 'All 6 metrics present — full coverage'
    : `Removed: ${b.removed.join(', ')} | Present: ${b.present.join(', ')}`
}));

fs.writeFileSync(
  path.join(__dirname, 'branches-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`\n✅ Generated ${BRANCHES.length} branch data files:\n`);
BRANCHES.forEach(b => {
  const icon = b.removed.length === 0 ? '🟢' :
               b.removed.length <= 2 ? '🟡' :
               b.removed.length <= 3 ? '🟠' : '🔴';
  console.log(`  ${icon} ${b.name.padEnd(12)} present:[${b.present.join(',')}]  removed:[${b.removed.join(',') || 'none'}]`);
});
console.log(`\nManifest → scripts/branches-manifest.json`);
console.log(`Data     → scripts/branch-data/`);
