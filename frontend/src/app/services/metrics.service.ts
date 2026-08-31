import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetricsResponse, Metric } from '../models/metric.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<MetricsResponse> {
    return this.http.get<MetricsResponse>(`${this.API_URL}/metrics`);
  }

  getMetricById(id: string): Observable<{ success: boolean; metric: Metric }> {
    return this.http.get<{ success: boolean; metric: Metric }>(`${this.API_URL}/metrics/${id}`);
  }
}
