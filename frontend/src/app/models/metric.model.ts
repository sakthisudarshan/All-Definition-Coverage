export interface Metric {
  id: string;
  classification: string;
  metric: string;
  measure: string;
  technique: string;
  value: number | string;
  unit: string;
  status: string;
  threshold: number;
  trend?: number[];
  trendLabels?: string[];
  baseline?: number;
  current?: number;
  executedPaths?: number;
  totalPaths?: number;
  coverageDelta?: number;
  gateHistory?: string[];
  affectedPaths?: number;
  totalChangedFiles?: number;
  newLinesAdded?: number;
  newLinesCovered?: number;
  complexityBefore?: number;
  complexityAfter?: number;
}

export interface BranchInfo {
  branch: string;
  description: string;
  metricsPresent: string[];
  metricsRemoved: string[];
}

export interface MetricsResponse {
  success: boolean;
  technique: string;
  branchInfo: BranchInfo;
  metrics: Metric[];
  count: number;
}
