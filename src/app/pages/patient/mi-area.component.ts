import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-mi-area',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mi-area-page">
      <!-- Header -->
      <div class="area-header">
        <div class="area-header-inner">
          <div>
            <h2>Hola, <span class="nombre">{{ user?.nombre }}</span> 👋</h2>
            <p>Gestiona tus citas desde aquí</p>
          </div>
          <button class="btn-logout" (click)="logout()">Cerrar sesión</button>
        </div>
      </div>

      <div class="area-body">
        <!-- Tabs -->
        <div class="tabs">
          <button [class.active]="tab==='citas'" (click)="tab='citas'">Mis citas</button>
          <button [class.active]="tab==='reservar'" (click)="tab='reservar'; loadSlots()">Reservar nueva cita</button>
        </div>

        <!-- MIS CITAS -->
        <div *ngIf="tab==='citas'">
          <div *ngIf="loadingCitas" class="loading-box"><div class="spinner"></div></div>

          <div *ngIf="!loadingCitas && citas.length === 0" class="empty-state">
            <div class="empty-icon">📅</div>
            <p>Todavía no tienes citas registradas.</p>
            <button class="btn-gold" (click)="tab='reservar'; loadSlots()">Reservar una cita</button>
          </div>

          <div class="citas-list" *ngIf="!loadingCitas && citas.length > 0">
            <div class="cita-card" *ngFor="let c of citas" [class.cancelada]="c.estado==='cancelada'">
              <div class="cita-fecha">
                <span class="fecha-day">{{ formatDay(c.fecha) }}</span>
                <span class="fecha-hour">{{ formatHour(c.fecha) }}</span>
              </div>
              <div class="cita-info">
                <div class="cita-tipo">{{ c.tipo || 'Consulta psicológica' }}</div>
                <div class="cita-dur">{{ c.duracion_min }} min</div>
                <div class="cita-notas" *ngIf="c.notas">{{ c.notas }}</div>
              </div>
              <div class="cita-estado">
                <span class="badge" [class]="'badge-' + c.estado">{{ labelEstado(c.estado) }}</span>
                <button class="btn-cancel" *ngIf="c.estado === 'pendiente' && isFuture(c.fecha)"
                  (click)="cancelCita(c.id)">Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- RESERVAR -->
        <div *ngIf="tab==='reservar'">
          <div *ngIf="loadingSlots" class="loading-box"><div class="spinner"></div></div>

          <div *ngIf="!loadingSlots && slots.length === 0" class="empty-state">
            <div class="empty-icon">😕</div>
            <p>No hay huecos disponibles en los próximos días.<br>Contacta por email para concertar cita.</p>
          </div>

          <div *ngIf="!loadingSlots && slots.length > 0 && !selectedSlot">
            <h3 class="section-sub">Elige un horario disponible</h3>
            <div class="tipo-row">
              <label>Tipo de sesión:</label>
              <select [(ngModel)]="tipoSesion">
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
              <label>Duración:</label>
              <select [(ngModel)]="duracion">
                <option [value]="30">30 min</option>
                <option [value]="60">1 hora</option>
              </select>
            </div>
            <div class="slots-grid">
              <button *ngFor="let s of slots" class="slot-card" (click)="selectSlot(s)">
                <span class="slot-fecha">{{ s.fecha }}</span>
                <span class="slot-hora">{{ s.hora }}</span>
              </button>
            </div>
          </div>

          <!-- Confirm step -->
          <div *ngIf="selectedSlot && !bookingDone" class="confirm-step">
            <div class="confirm-card">
              <div class="confirm-icon">📋</div>
              <h3>Confirma tu cita</h3>
              <div class="confirm-detail">
                <span class="cd-label">Fecha y hora:</span>
                <span class="cd-value">{{ selectedSlot.fecha }} a las {{ selectedSlot.hora }}</span>
              </div>
              <div class="confirm-detail">
                <span class="cd-label">Tipo:</span>
                <span class="cd-value">{{ tipoSesion }}</span>
              </div>
              <div class="confirm-detail">
                <span class="cd-label">Duración:</span>
                <span class="cd-value">{{ duracion }} minutos</span>
              </div>
              <div class="confirm-actions">
                <button class="btn-outline" (click)="selectedSlot=null">Cambiar horario</button>
                <button class="btn-gold" (click)="confirmBook()" [disabled]="booking">
                  <span *ngIf="booking" class="spin">⟳</span>
                  {{ booking ? 'Reservando...' : 'Confirmar cita' }}
                </button>
              </div>
              <div class="error-msg" *ngIf="bookingError">{{ bookingError }}</div>
            </div>
          </div>

          <!-- Success -->
          <div *ngIf="bookingDone" class="success-step">
            <div class="success-icon">✅</div>
            <h3>¡Cita reservada!</h3>
            <p>Tu cita ha quedado registrada para el <strong>{{ selectedSlot?.fecha }} a las {{ selectedSlot?.hora }}</strong>.</p>
            <button class="btn-gold" (click)="bookingDone=false; selectedSlot=null; tab='citas'; loadCitas()">Ver mis citas</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mi-area-page { min-height: 100vh; background: #f8fafc; }
    .area-header { background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; padding: 1.5rem 0; }
    .area-header-inner { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .area-header h2 { margin: 0; font-size: 1.5rem; font-weight: 800; }
    .area-header p { margin: .2rem 0 0; opacity: .85; font-size: .95rem; }
    .nombre { color: #fff8dc; }
    .btn-logout { background: rgba(255,255,255,.2); border: 1.5px solid rgba(255,255,255,.4); color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background .2s; }
    .btn-logout:hover { background: rgba(255,255,255,.35); }

    .area-body { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }

    .tabs { display: flex; gap: .5rem; margin-bottom: 2rem; border-bottom: 2px solid #e5e7eb; }
    .tabs button { padding: .7rem 1.4rem; border: none; background: none; font-size: 1rem; font-weight: 600; color: #6b7280; cursor: pointer; border-bottom: 2.5px solid transparent; margin-bottom: -2px; transition: all .2s; }
    .tabs button.active { color: #bfa046; border-bottom-color: #bfa046; }

    .loading-box { display: flex; justify-content: center; padding: 3rem; }
    .spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .empty-state { text-align: center; padding: 3rem 1rem; color: #6b7280; }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
    .empty-state p { margin-bottom: 1.5rem; }

    .citas-list { display: flex; flex-direction: column; gap: 1rem; }
    .cita-card {
      background: #fff; border-radius: 14px; padding: 1.2rem 1.5rem;
      display: flex; gap: 1.5rem; align-items: center;
      box-shadow: 0 2px 12px rgba(0,0,0,.06);
      border-left: 4px solid #bfa046;
    }
    .cita-card.cancelada { border-left-color: #ef4444; opacity: .7; }
    .cita-fecha { text-align: center; min-width: 80px; }
    .fecha-day { display: block; font-weight: 700; color: #232946; font-size: 1rem; }
    .fecha-hour { display: block; font-size: 1.3rem; font-weight: 900; color: #bfa046; }
    .cita-info { flex: 1; }
    .cita-tipo { font-weight: 700; color: #232946; margin-bottom: .2rem; text-transform: capitalize; }
    .cita-dur { font-size: .85rem; color: #6b7280; }
    .cita-notas { font-size: .85rem; color: #9ca3af; margin-top: .3rem; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: .78rem; font-weight: 700; text-transform: uppercase; }
    .badge-pendiente { background: #fef3c7; color: #92400e; }
    .badge-confirmada { background: #d1fae5; color: #065f46; }
    .badge-completada { background: #e0e7ff; color: #3730a3; }
    .badge-cancelada { background: #fee2e2; color: #991b1b; }
    .btn-cancel { display: block; margin-top: .5rem; background: none; border: 1px solid #ef4444; color: #ef4444; padding: 4px 10px; border-radius: 6px; font-size: .8rem; cursor: pointer; }
    .btn-cancel:hover { background: #fef2f2; }

    .section-sub { color: #232946; font-weight: 700; margin-bottom: 1.2rem; }
    .tipo-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .tipo-row label { font-weight: 600; color: #374151; font-size: .9rem; }
    .tipo-row select { padding: 6px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: .9rem; outline: none; }
    .tipo-row select:focus { border-color: #bfa046; }

    .slots-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
    .slot-card {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 14px 8px; border: 1.5px solid #e5e7eb; border-radius: 12px;
      background: #fff; cursor: pointer; transition: all .15s;
    }
    .slot-card:hover { border-color: #bfa046; background: #fffbe7; transform: translateY(-2px); }
    .slot-fecha { font-size: .8rem; color: #6b7280; font-weight: 600; }
    .slot-hora { font-size: 1.2rem; font-weight: 800; color: #bfa046; }

    .confirm-step { display: flex; justify-content: center; padding: 1rem 0; }
    .confirm-card { background: #fff; border-radius: 20px; padding: 2rem; max-width: 400px; width: 100%; box-shadow: 0 4px 24px rgba(0,0,0,.08); text-align: center; }
    .confirm-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .confirm-card h3 { color: #232946; margin-bottom: 1.5rem; }
    .confirm-detail { display: flex; justify-content: space-between; padding: .6rem 0; border-bottom: 1px solid #f3f4f6; }
    .cd-label { color: #6b7280; font-size: .9rem; font-weight: 600; }
    .cd-value { font-weight: 700; color: #232946; font-size: .9rem; }
    .confirm-actions { display: flex; gap: .8rem; margin-top: 1.5rem; }
    .btn-gold {
      flex: 1; padding: 12px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700;
      cursor: pointer; transition: opacity .2s;
    }
    .btn-gold:hover:not(:disabled) { opacity: .9; }
    .btn-gold:disabled { opacity: .6; cursor: not-allowed; }
    .btn-outline { flex: 1; padding: 12px; background: #fff; color: #bfa046; border: 2px solid #bfa046; border-radius: 10px; font-size: 1rem; font-weight: 700; cursor: pointer; }
    .btn-outline:hover { background: #fffbe7; }
    .error-msg { color: #ef4444; font-size: .9rem; margin-top: 1rem; background: #fef2f2; padding: 8px 12px; border-radius: 8px; }
    .spin { display: inline-block; animation: spin 1s linear infinite; }

    .success-step { text-align: center; padding: 3rem 1rem; }
    .success-icon { font-size: 3.5rem; margin-bottom: 1rem; }
    .success-step h3 { color: #166534; margin-bottom: .75rem; }
    .success-step p { color: #6b7280; margin-bottom: 2rem; }

    @media (max-width: 600px) {
      .cita-card { flex-direction: column; align-items: flex-start; }
      .cita-fecha { display: flex; gap: 1rem; align-items: center; }
      .area-header-inner { flex-direction: column; gap: 1rem; text-align: center; }
    }
  `]
})
export class MiAreaComponent implements OnInit {
  tab: 'citas' | 'reservar' = 'citas';
  user: any = null;
  citas: any[] = [];
  slots: any[] = [];
  loadingCitas = false;
  loadingSlots = false;
  selectedSlot: any = null;
  tipoSesion = 'presencial';
  duracion = 60;
  booking = false;
  bookingDone = false;
  bookingError = '';

  constructor(
    private auth: AuthService,
    private apptSvc: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    this.loadCitas();
    // Abrir tab de reservar si viene de ?tab=reservar
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'reservar') {
        this.tab = 'reservar';
        this.loadSlots();
      }
    });
  }

  loadCitas() {
    this.loadingCitas = true;
    this.apptSvc.getMyAppointments().subscribe({
      next: (r) => { this.citas = r.appointments || []; this.loadingCitas = false; },
      error: () => { this.citas = []; this.loadingCitas = false; }
    });
  }

  loadSlots() {
    if (this.slots.length > 0) return;
    this.loadingSlots = true;
    this.apptSvc.getAvailableSlots().subscribe({
      next: (r) => { this.slots = r.slots || []; this.loadingSlots = false; },
      error: () => { this.slots = []; this.loadingSlots = false; }
    });
  }

  selectSlot(s: any) { this.selectedSlot = s; this.bookingError = ''; }

  confirmBook() {
    if (!this.selectedSlot) return;
    this.booking = true;
    this.bookingError = '';
    this.apptSvc.bookAppointment({
      fecha_iso: this.selectedSlot.iso,
      duracion_min: this.duracion,
      tipo: this.tipoSesion,
    }).subscribe({
      next: () => { this.booking = false; this.bookingDone = true; this.slots = []; },
      error: (e: any) => {
        this.booking = false;
        this.bookingError = e.error?.detail || 'Error al reservar. Inténtalo de nuevo.';
      }
    });
  }

  cancelCita(id: string) {
    if (!confirm('¿Seguro que quieres cancelar esta cita?')) return;
    this.apptSvc.cancelMyAppointment(id).subscribe({
      next: () => this.loadCitas(),
      error: () => alert('Error al cancelar')
    });
  }

  formatDay(iso: string) {
    return new Date(iso).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' });
  }
  formatHour(iso: string) {
    return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  isFuture(iso: string) { return new Date(iso) > new Date(); }
  labelEstado(e: string) {
    return { pendiente: 'Pendiente', confirmada: 'Confirmada', completada: 'Completada', cancelada: 'Cancelada' }[e] || e;
  }
  logout() { this.auth.logout(); this.router.navigate(['/home']); }
}
