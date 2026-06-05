import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dash-page">
      <h2>Bienvenida, Dolores 👋</h2>
      <p class="dash-sub">Resumen de tu consulta</p>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#fffbe7;color:#bfa046">📅</div>
          <div class="stat-info">
            <span class="stat-num">{{ citasHoy }}</span>
            <label>Citas hoy</label>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#f0fdf4;color:#059669">📋</div>
          <div class="stat-info">
            <span class="stat-num">{{ citasSemana }}</span>
            <label>Esta semana</label>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#eff6ff;color:#2563eb">👥</div>
          <div class="stat-info">
            <span class="stat-num">{{ totalPacientes }}</span>
            <label>Pacientes</label>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#fef3c7;color:#d97706">⏳</div>
          <div class="stat-info">
            <span class="stat-num">{{ pendientes }}</span>
            <label>Pendientes</label>
          </div>
        </div>
      </div>

      <!-- Próximas citas -->
      <div class="section-card">
        <div class="section-header">
          <h3>Próximas citas</h3>
          <a routerLink="/admin/appointments">Ver todas →</a>
        </div>
        <div *ngIf="loadingAppts" class="loading-box"><div class="spinner"></div></div>
        <div *ngIf="!loadingAppts && proximas.length === 0" class="empty-msg">No hay citas próximas.</div>
        <div class="proximas-list" *ngIf="!loadingAppts">
          <div class="proxima-row" *ngFor="let a of proximas">
            <div class="prox-fecha">
              <span class="pf-day">{{ fmtDay(a.fecha) }}</span>
              <span class="pf-hour">{{ fmtHour(a.fecha) }}</span>
            </div>
            <div class="prox-info">
              <strong>{{ a.client_name }}</strong>
              <span>{{ a.tipo }} · {{ a.duracion_min }}min</span>
            </div>
            <span class="badge" [class]="'b-'+a.estado">{{ labelEstado(a.estado) }}</span>
          </div>
        </div>
      </div>

      <!-- Accesos rápidos -->
      <div class="quick-actions">
        <a routerLink="/admin/appointments" class="qa-card">
          <span>📅</span><strong>Gestionar citas</strong><p>Ver y editar todas las citas</p>
        </a>
        <a routerLink="/admin/clients" class="qa-card">
          <span>👥</span><strong>Pacientes</strong><p>Historial y ficha de pacientes</p>
        </a>
        <a routerLink="/admin/horario" class="qa-card">
          <span>🕐</span><strong>Configurar horario</strong><p>Define tus horas disponibles</p>
        </a>
        <a routerLink="/admin/financial" class="qa-card">
          <span>💶</span><strong>Finanzas</strong><p>Ingresos y facturación</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dash-page { max-width: 1000px; }
    .dash-page h2 { color: #1e293b; font-weight: 800; margin-bottom: .2rem; }
    .dash-sub { color: #64748b; margin-bottom: 2rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #fff; border-radius: 14px; padding: 1.2rem 1.5rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 2px 12px rgba(0,0,0,.05); }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
    .stat-num { display: block; font-size: 2rem; font-weight: 800; color: #1e293b; line-height: 1; }
    .stat-info label { font-size: .8rem; color: #64748b; font-weight: 600; text-transform: uppercase; }

    .section-card { background: #fff; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,.05); margin-bottom: 2rem; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
    .section-header h3 { color: #1e293b; font-weight: 700; margin: 0; }
    .section-header a { color: #bfa046; font-weight: 600; text-decoration: none; font-size: .9rem; }
    .loading-box { display: flex; justify-content: center; padding: 1.5rem; }
    .spinner { width: 28px; height: 28px; border: 2px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .empty-msg { text-align: center; color: #94a3b8; padding: 1rem; }

    .proximas-list { display: flex; flex-direction: column; gap: .7rem; }
    .proxima-row { display: flex; align-items: center; gap: 1rem; padding: .7rem 1rem; background: #f8fafc; border-radius: 10px; }
    .prox-fecha { text-align: center; min-width: 65px; }
    .pf-day { display: block; font-size: .75rem; font-weight: 700; color: #64748b; }
    .pf-hour { display: block; font-size: 1.1rem; font-weight: 800; color: #bfa046; }
    .prox-info { flex: 1; display: flex; flex-direction: column; }
    .prox-info strong { color: #1e293b; font-size: .95rem; }
    .prox-info span { color: #64748b; font-size: .8rem; text-transform: capitalize; }
    .badge { padding: 3px 10px; border-radius: 20px; font-size: .75rem; font-weight: 700; text-transform: uppercase; }
    .b-pendiente { background: #fef3c7; color: #92400e; }
    .b-confirmada { background: #d1fae5; color: #065f46; }
    .b-completada { background: #e0e7ff; color: #3730a3; }
    .b-cancelada { background: #fee2e2; color: #991b1b; }

    .quick-actions { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 1rem; }
    .qa-card { background: #fff; border-radius: 14px; padding: 1.5rem 1.2rem; text-decoration: none; display: flex; flex-direction: column; gap: .3rem; box-shadow: 0 2px 12px rgba(0,0,0,.05); border: 1.5px solid transparent; transition: all .15s; }
    .qa-card:hover { border-color: #bfa046; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(191,160,70,.12); }
    .qa-card span { font-size: 1.8rem; }
    .qa-card strong { color: #1e293b; font-size: .95rem; }
    .qa-card p { color: #64748b; font-size: .82rem; margin: 0; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  citasHoy = 0; citasSemana = 0; totalPacientes = 0; pendientes = 0;
  proximas: any[] = [];
  loadingAppts = true;

  constructor(private apptSvc: AppointmentService, private clientSvc: ClientService) {}

  ngOnInit() {
    this.apptSvc.getAllAppointments().subscribe({
      next: (r) => {
        const all: any[] = r.appointments || [];
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);
        this.citasHoy = all.filter(a => a.fecha?.slice(0,10) === todayStr).length;
        this.citasSemana = all.filter(a => { const d = new Date(a.fecha); return d >= now && d <= weekEnd; }).length;
        this.pendientes = all.filter(a => a.estado === 'pendiente').length;
        this.proximas = all
          .filter(a => new Date(a.fecha) >= now && a.estado !== 'cancelada')
          .sort((a,b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
          .slice(0, 5);
        this.loadingAppts = false;
      },
      error: () => { this.loadingAppts = false; }
    });
    this.clientSvc.getAllClients().subscribe({
      next: (r) => { this.totalPacientes = (r.clients || r).length; },
      error: () => {}
    });
  }

  fmtDay(iso: string) { return new Date(iso).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' }); }
  fmtHour(iso: string) { return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); }
  labelEstado(e: string) { return { pendiente:'Pendiente', confirmada:'Confirmada', completada:'Completada', cancelada:'Cancelada' }[e] || e; }
}
