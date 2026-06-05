import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';

const ALL_LV_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const ALL_SA_HOURS = [8, 9, 10, 11, 12, 13, 14];

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="horario-page">
      <div class="page-header">
        <h2>Gestión de horario</h2>
        <p>Configura las horas disponibles para que los pacientes puedan reservar citas.</p>
      </div>

      <div *ngIf="loading" class="loading-box"><div class="spinner"></div></div>

      <div *ngIf="!loading" class="config-grid">
        <!-- Lunes-Viernes -->
        <div class="config-card">
          <h3><i class="fas fa-calendar-week"></i> Lunes a Viernes</h3>
          <div class="hours-grid">
            <label *ngFor="let h of allLV" class="hour-toggle" [class.active]="isActive('lv', h)">
              <input type="checkbox" [checked]="isActive('lv', h)" (change)="toggleHour('lv', h)" />
              <span>{{ padHour(h) }}:00</span>
            </label>
          </div>
        </div>

        <!-- Sábados -->
        <div class="config-card">
          <h3><i class="fas fa-calendar-day"></i> Sábados</h3>
          <div class="hours-grid">
            <label *ngFor="let h of allSA" class="hour-toggle" [class.active]="isActive('sa', h)">
              <input type="checkbox" [checked]="isActive('sa', h)" (change)="toggleHour('sa', h)" />
              <span>{{ padHour(h) }}:00</span>
            </label>
          </div>
          <p class="note">Los domingos la consulta está cerrada.</p>
        </div>

        <!-- Duración + estado -->
        <div class="config-card config-options">
          <h3><i class="fas fa-cog"></i> Opciones</h3>

          <div class="option-row">
            <label>Duración por defecto de las citas</label>
            <div class="dur-btns">
              <button [class.sel]="config.duracion_defecto===30" (click)="config.duracion_defecto=30">30 min</button>
              <button [class.sel]="config.duracion_defecto===60" (click)="config.duracion_defecto=60">1 hora</button>
            </div>
          </div>

          <div class="option-row">
            <label>Agenda activa</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="config.slots_activos" />
              <span class="toggle-track">
                <span class="toggle-thumb"></span>
              </span>
              <span class="toggle-label">{{ config.slots_activos ? 'Activa — los pacientes pueden reservar' : 'Desactivada — sin reservas online' }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="save-row" *ngIf="!loading">
        <div class="save-msg success" *ngIf="saved">✅ Configuración guardada correctamente</div>
        <div class="save-msg error" *ngIf="saveError">❌ {{ saveError }}</div>
        <button class="btn-save" (click)="save()" [disabled]="saving">
          <span *ngIf="saving" class="spin">⟳</span>
          {{ saving ? 'Guardando...' : 'Guardar configuración' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .horario-page { max-width: 900px; }
    .page-header { margin-bottom: 2rem; }
    .page-header h2 { color: #1e293b; font-weight: 800; margin-bottom: .3rem; }
    .page-header p { color: #64748b; }
    .loading-box { display: flex; justify-content: center; padding: 3rem; }
    .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    @media (max-width: 700px) { .config-grid { grid-template-columns: 1fr; } }
    .config-options { grid-column: 1 / -1; }

    .config-card { background: #fff; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
    .config-card h3 { color: #1e293b; font-weight: 700; margin-bottom: 1.2rem; font-size: 1rem; }
    .config-card h3 i { color: #bfa046; margin-right: .5rem; }

    .hours-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .hour-toggle { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
    .hour-toggle input { display: none; }
    .hour-toggle span {
      padding: 8px 6px; border: 1.5px solid #e2e8f0; border-radius: 8px;
      font-size: .85rem; font-weight: 600; color: #94a3b8; background: #f8fafc;
      transition: all .15s; width: 100%; text-align: center;
    }
    .hour-toggle.active span { border-color: #bfa046; background: #fffbe7; color: #92400e; }
    .hour-toggle:hover span { border-color: #d4b660; }
    .note { font-size: .82rem; color: #94a3b8; margin-top: 1rem; }

    .option-row { display: flex; flex-direction: column; gap: .6rem; margin-bottom: 1.5rem; }
    .option-row label:first-child { font-weight: 600; color: #374151; font-size: .9rem; }
    .dur-btns { display: flex; gap: .5rem; }
    .dur-btns button { padding: 8px 20px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-weight: 600; color: #64748b; cursor: pointer; transition: all .15s; }
    .dur-btns button.sel { border-color: #bfa046; background: #fffbe7; color: #92400e; }

    .toggle-switch { display: flex; align-items: center; gap: .7rem; cursor: pointer; }
    .toggle-switch input { display: none; }
    .toggle-track { width: 44px; height: 24px; background: #e2e8f0; border-radius: 12px; position: relative; transition: background .2s; flex-shrink: 0; }
    .toggle-switch:has(input:checked) .toggle-track { background: #bfa046; }
    .toggle-thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: #fff; border-radius: 50%; transition: left .2s; box-shadow: 0 1px 4px rgba(0,0,0,.2); }
    .toggle-switch:has(input:checked) .toggle-thumb { left: 22px; }
    .toggle-label { font-size: .9rem; color: #374151; }

    .save-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .save-msg { font-size: .9rem; padding: 8px 16px; border-radius: 8px; }
    .save-msg.success { background: #f0fdf4; color: #166534; }
    .save-msg.error { background: #fef2f2; color: #991b1b; }
    .btn-save { padding: 12px 28px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: opacity .2s; }
    .btn-save:hover:not(:disabled) { opacity: .9; }
    .btn-save:disabled { opacity: .6; cursor: not-allowed; }
    .spin { display: inline-block; animation: spin 1s linear infinite; }
  `]
})
export class HorarioComponent implements OnInit {
  allLV = ALL_LV_HOURS;
  allSA = ALL_SA_HOURS;
  loading = true;
  saving = false;
  saved = false;
  saveError = '';

  config: any = {
    lunes_viernes: { horas: [9, 10, 11, 12, 13, 15, 16, 17] },
    sabado:        { horas: [9, 10, 11, 12, 13] },
    duracion_defecto: 60,
    slots_activos: true,
  };

  constructor(private apptSvc: AppointmentService) {}

  ngOnInit() {
    this.apptSvc.getScheduleConfig().subscribe({
      next: (c) => { this.config = c; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  isActive(day: 'lv' | 'sa', h: number): boolean {
    const key = day === 'lv' ? 'lunes_viernes' : 'sabado';
    return (this.config[key]?.horas || []).includes(h);
  }

  toggleHour(day: 'lv' | 'sa', h: number) {
    const key = day === 'lv' ? 'lunes_viernes' : 'sabado';
    if (!this.config[key]) this.config[key] = { horas: [] };
    const idx = this.config[key].horas.indexOf(h);
    if (idx >= 0) {
      this.config[key].horas.splice(idx, 1);
    } else {
      this.config[key].horas.push(h);
      this.config[key].horas.sort((a: number, b: number) => a - b);
    }
  }

  save() {
    this.saving = true; this.saved = false; this.saveError = '';
    this.apptSvc.updateScheduleConfig(this.config).subscribe({
      next: () => { this.saving = false; this.saved = true; setTimeout(() => this.saved = false, 3000); },
      error: (e: any) => { this.saving = false; this.saveError = e.error?.detail || 'Error al guardar'; }
    });
  }

  padHour(h: number): string { return h.toString().padStart(2, '0'); }
}
