import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../../services/financial.service';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fin-page">
      <h2>Finanzas</h2>
      <p class="sub">Registro de ingresos y pagos de la consulta.</p>

      <div *ngIf="loading" class="loading-box"><div class="spinner"></div></div>

      <div *ngIf="!loading">
        <div class="stats-row">
          <div class="stat-card">
            <span>💶 {{ totalIngresos | number:'1.2-2' }} €</span>
            <label>Total ingresos</label>
          </div>
          <div class="stat-card">
            <span>📋 {{ records.length }}</span>
            <label>Registros</label>
          </div>
        </div>

        <div class="records-list">
          <div *ngIf="records.length === 0" class="empty">No hay registros financieros.</div>
          <div class="rec-row" *ngFor="let r of records">
            <div class="rec-fecha">{{ fmtDate(r.fecha) }}</div>
            <div class="rec-info">
              <strong>{{ r.client_name }}</strong>
              <span>{{ r.concepto }}</span>
            </div>
            <div class="rec-amount" [class.ingreso]="r.tipo==='ingreso'">
              {{ r.tipo === 'ingreso' ? '+' : '-' }}{{ r.importe | number:'1.2-2' }} €
            </div>
            <span class="badge" [class]="r.estado==='pagado'?'b-ok':'b-pend'">{{ r.estado }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fin-page { max-width: 900px; }
    h2 { color: #1e293b; font-weight: 800; margin-bottom: .2rem; }
    .sub { color: #64748b; margin-bottom: 2rem; }
    .loading-box { display: flex; justify-content: center; padding: 2rem; }
    .spinner { width: 32px; height: 32px; border: 2px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .stats-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .stat-card { background: #fff; border-radius: 12px; padding: 1rem 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
    .stat-card span { display: block; font-size: 1.4rem; font-weight: 800; color: #1e293b; }
    .stat-card label { font-size: .78rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .records-list { display: flex; flex-direction: column; gap: .6rem; }
    .empty { text-align: center; color: #94a3b8; padding: 2rem; }
    .rec-row { background: #fff; border-radius: 10px; padding: .8rem 1.2rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 6px rgba(0,0,0,.04); }
    .rec-fecha { font-size: .8rem; color: #64748b; min-width: 80px; }
    .rec-info { flex: 1; }
    .rec-info strong { display: block; color: #1e293b; font-size: .9rem; }
    .rec-info span { font-size: .82rem; color: #64748b; }
    .rec-amount { font-weight: 800; font-size: 1rem; }
    .rec-amount.ingreso { color: #059669; }
    .badge { padding: 3px 10px; border-radius: 20px; font-size: .75rem; font-weight: 700; }
    .b-ok { background: #d1fae5; color: #065f46; }
    .b-pend { background: #fef3c7; color: #92400e; }
  `]
})
export class FinancialComponent implements OnInit {
  records: any[] = [];
  loading = true;
  totalIngresos = 0;

  constructor(private svc: FinancialService) {}

  ngOnInit() {
    this.svc.getAll().subscribe({
      next: (r: any) => {
        this.records = r.records || r || [];
        this.totalIngresos = this.records.filter((r: any) => r.tipo === 'ingreso').reduce((s: number, r: any) => s + (+r.importe || 0), 0);
        this.loading = false;
      },
      error: () => { this.records = []; this.loading = false; }
    });
  }

  fmtDate(d: string) { return new Date(d).toLocaleDateString('es-ES'); }
}
