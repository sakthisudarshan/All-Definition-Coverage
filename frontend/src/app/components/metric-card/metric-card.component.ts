import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Metric } from '../../models/metric.model';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="metric-card" [class.selected]="selected"
     [style.--id-color]="getIdColor(metric.id)"
     [style.--status-color]="getStatusColor(metric.status)">
  <div class="card-header">
    <div class="metric-id" [style.color]="getIdColor(metric.id)"
         [style.border-color]="getIdColor(metric.id) + '44'"
         [style.background]="getIdColor(metric.id) + '15'">{{ metric.id }}</div>
    <div class="status-dot" [style.background]="getStatusColor(metric.status)"></div>
  </div>
  <div class="classification">{{ metric.classification }}</div>
  <h3 class="metric-name">{{ metric.metric }}</h3>
  <div class="value-section">
    <div class="metric-value" [style.color]="getStatusColor(metric.status)">{{ getDisplayValue() }}</div>
    <div class="extra-info" *ngIf="getExtraInfo()">{{ getExtraInfo() }}</div>
  </div>
  <div class="mini-trend" *ngIf="metric.trend">
    <div class="trend-bar" *ngFor="let val of metric.trend; let i = index"
         [style.height.px]="getBarHeight(val, metric.trend!)"
         [style.background]="getStatusColor(metric.status)"
         [style.opacity]="0.4 + ((i + 1) / metric.trend!.length) * 0.6">
    </div>
  </div>
  <div class="mini-trend gate-trend" *ngIf="metric.gateHistory">
    <div class="gate-dot" *ngFor="let g of metric.gateHistory"
         [class.pass]="g === 'PASS'" [class.fail]="g === 'FAIL'"></div>
  </div>
  <div class="card-footer">
    <span class="status-badge" [style.color]="getStatusColor(metric.status)"
          [style.background]="getStatusColor(metric.status) + '18'">● {{ metric.status }}</span>
    <span class="click-hint" [class.selected-hint]="selected">{{ selected ? '▲ Viewing' : 'Click for details' }}</span>
  </div>
</div>`,
  styles: [`
:host { display: block; cursor: pointer; }
.metric-card {
  background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 1.25rem; transition: all 0.25s;
  position: relative; overflow: hidden;
  &::before { content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:var(--id-color,#63b3ed); opacity:0; transition:opacity 0.25s; }
  &:hover { border-color:rgba(255,255,255,0.15); transform:translateY(-3px);
    box-shadow:0 8px 32px rgba(0,0,0,0.4); &::before{opacity:1;} }
  &.selected { border-color:var(--id-color,#63b3ed);
    box-shadow:0 0 0 1px var(--id-color,#63b3ed),0 8px 32px rgba(0,0,0,0.5);
    &::before{opacity:1;} }
}
.card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; }
.metric-id { font-family:'JetBrains Mono',monospace; font-weight:800; font-size:0.8rem;
  padding:0.2rem 0.6rem; border-radius:6px; border:1.5px solid; letter-spacing:0.1em; }
.status-dot { width:8px; height:8px; border-radius:50%;
  animation:pulse 2.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
.classification { font-size:0.65rem; font-weight:600; color:#4a5568;
  text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.4rem; }
.metric-name { font-size:0.95rem; font-weight:700; color:#e2e8f0; margin:0 0 1rem; line-height:1.4; }
.value-section { margin-bottom:0.75rem; }
.metric-value { font-size:1.75rem; font-weight:800; font-family:'JetBrains Mono',monospace; line-height:1; }
.extra-info { font-size:0.72rem; color:#8b9db5; margin-top:0.25rem; }
.mini-trend { display:flex; align-items:flex-end; gap:3px; height:28px; margin-bottom:1rem; }
.trend-bar { flex:1; border-radius:2px 2px 0 0; min-height:3px; }
.gate-trend { align-items:center; height:16px; }
.gate-dot { width:14px; height:14px; border-radius:50%; flex:0 0 14px;
  &.pass{background:#00d4aa;opacity:0.85} &.fail{background:#ff6b6b;opacity:0.85} }
.card-footer { display:flex; align-items:center; justify-content:space-between;
  padding-top:0.75rem; border-top:1px solid rgba(255,255,255,0.05); }
.status-badge { font-size:0.7rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:100px; }
.click-hint { font-size:0.65rem; color:#4a5568; &.selected-hint{color:#a78bfa;} }
`]
})
export class MetricCardComponent {
  @Input() metric!: Metric;
  @Input() selected = false;

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      improved:'#00d4aa', good:'#00d4aa', passed:'#00d4aa',
      adequate:'#ffd166', moderate:'#ffd166', improving:'#a78bfa', failed:'#ff6b6b'
    };
    return map[status] || '#8b9db5';
  }

  getIdColor(id: string): string {
    const colors: Record<string, string> = {
      A:'#63b3ed', B:'#00d4aa', C:'#ffd166', D:'#f6a35c', E:'#a78bfa', F:'#f687b3'
    };
    return colors[id] || '#8b9db5';
  }

  getDisplayValue(): string {
    const m = this.metric;
    if (m.unit === 'ratio') return `${(+m.value * 100).toFixed(1)}%`;
    if (m.unit === '%') return `${m.value}%`;
    return `${m.value}`;
  }

  getBarHeight(val: number, trend: number[]): number {
    const max = Math.max(...trend) || 1;
    return (val / max) * 24;
  }

  getExtraInfo(): string {
    const m = this.metric;
    if (m.executedPaths && m.totalPaths) return `${m.executedPaths}/${m.totalPaths} paths`;
    if (m.baseline !== undefined) return `${m.baseline}% → ${m.current}%`;
    if (m.affectedPaths !== undefined) return `${m.affectedPaths} paths affected`;
    if (m.newLinesAdded !== undefined) return `${m.newLinesCovered}/${m.newLinesAdded} lines`;
    if (m.complexityBefore !== undefined) return `${m.complexityBefore} → ${m.complexityAfter}`;
    return '';
  }
}
