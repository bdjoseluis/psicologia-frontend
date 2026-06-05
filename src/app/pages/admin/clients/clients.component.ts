import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="clients-page">
      <div class="page-header-row">
        <div>
          <h2>Pacientes</h2>
          <p>{{ filtered.length }} paciente{{ filtered.length !== 1 ? 's' : '' }}</p>
        </div>
        <button class="btn-new" (click)="openForm(null)">+ Nuevo paciente</button>
      </div>

      <!-- Búsqueda -->
      <div class="search-row">
        <input type="text" placeholder="Buscar por nombre o email..." [(ngModel)]="search" (input)="filter()" />
        <select [(ngModel)]="filterEstado" (change)="filter()">
          <option value="">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <div *ngIf="loading" class="loading-box"><div class="spinner"></div></div>

      <!-- Lista de pacientes -->
      <div *ngIf="!loading" class="clients-grid">
        <div class="empty" *ngIf="filtered.length === 0">No hay pacientes registrados.</div>
        <div class="client-card" *ngFor="let c of filtered" (click)="openDetail(c)">
          <div class="client-avatar">{{ initials(c.nombre) }}</div>
          <div class="client-info">
            <strong>{{ c.nombre }}</strong>
            <span *ngIf="c.email">📧 {{ c.email }}</span>
            <span *ngIf="c.telefono">📱 {{ c.telefono }}</span>
            <span *ngIf="c.edad">🎂 {{ c.edad }} años</span>
          </div>
          <div class="client-meta">
            <span class="badge" [class]="c.estado === 'activo' ? 'b-activo' : 'b-inactivo'">{{ c.estado }}</span>
            <span class="client-fuente">{{ c.fuente }}</span>
          </div>
        </div>
      </div>

      <!-- Modal detalle / edición -->
      <div class="modal-overlay" *ngIf="selected" (click)="selected=null">
        <div class="modal-card wide" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <div class="modal-avatar">{{ initials(formData.nombre) }}</div>
            <div>
              <h3>{{ isNew ? 'Nuevo paciente' : formData.nombre }}</h3>
              <span *ngIf="!isNew" class="modal-id">ID: {{ selected.id?.slice(0,8) }}...</span>
            </div>
            <button class="modal-close" (click)="selected=null">✕</button>
          </div>

          <div class="modal-tabs">
            <button [class.active]="modalTab==='info'" (click)="modalTab='info'">Información</button>
            <button [class.active]="modalTab==='citas'" (click)="modalTab='citas'; loadClientCitas()" *ngIf="!isNew">Citas</button>
          </div>

          <!-- Tab info -->
          <div *ngIf="modalTab==='info'" class="modal-body">
            <div class="form-row">
              <div class="form-field">
                <label>Nombre completo *</label>
                <input type="text" [(ngModel)]="formData.nombre" />
              </div>
              <div class="form-field">
                <label>Edad</label>
                <input type="number" [(ngModel)]="formData.edad" min="0" max="120" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>Email</label>
                <input type="email" [(ngModel)]="formData.email" />
              </div>
              <div class="form-field">
                <label>Teléfono</label>
                <input type="tel" [(ngModel)]="formData.telefono" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>Estado</label>
                <select [(ngModel)]="formData.estado">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div class="form-field">
                <label>Fuente</label>
                <select [(ngModel)]="formData.fuente">
                  <option value="directo">Directo</option>
                  <option value="registro-web">Registro web</option>
                  <option value="chat-ia">Chat IA</option>
                  <option value="derivado">Derivado</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
            <div class="form-field">
              <label>Descripción / Motivo de consulta</label>
              <textarea [(ngModel)]="formData.descripcion" rows="3" placeholder="Notas sobre el paciente, motivo de consulta, diagnóstico..."></textarea>
            </div>
            <div class="form-field">
              <label>Notas internas</label>
              <textarea [(ngModel)]="formData.notas" rows="2" placeholder="Observaciones privadas..."></textarea>
            </div>
          </div>

          <!-- Tab citas -->
          <div *ngIf="modalTab==='citas'" class="modal-body">
            <div *ngIf="loadingCitas" class="loading-box"><div class="spinner"></div></div>
            <div *ngIf="!loadingCitas && clientCitas.length === 0" class="empty">Este paciente no tiene citas registradas.</div>
            <div class="citas-mini" *ngIf="!loadingCitas">
              <div class="cita-mini-row" *ngFor="let c of clientCitas">
                <span class="cita-mini-fecha">{{ fmtDate(c.fecha) }}</span>
                <span class="cita-mini-tipo">{{ c.tipo }}</span>
                <span class="badge" [class]="'b-'+c.estado">{{ c.estado }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-danger" *ngIf="!isNew" (click)="deleteClient()">Eliminar</button>
            <div style="flex:1"></div>
            <button class="btn-outline" (click)="selected=null">Cancelar</button>
            <button class="btn-gold" (click)="save()" [disabled]="saving || !formData.nombre">
              {{ saving ? 'Guardando...' : (isNew ? 'Crear paciente' : 'Guardar cambios') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .clients-page { max-width: 1000px; }
    .page-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
    .page-header-row h2 { color: #1e293b; font-weight: 800; margin: 0; }
    .page-header-row p { color: #64748b; margin: .2rem 0 0; font-size: .9rem; }
    .btn-new { padding: 10px 20px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }

    .search-row { display: flex; gap: .75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .search-row input, .search-row select { padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: .9rem; outline: none; }
    .search-row input { flex: 1; min-width: 200px; }
    .search-row input:focus, .search-row select:focus { border-color: #bfa046; }

    .loading-box { display: flex; justify-content: center; padding: 2rem; }
    .spinner { width: 32px; height: 32px; border: 2px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .empty { text-align: center; color: #94a3b8; padding: 2rem; }

    .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 1rem; }
    .client-card {
      background: #fff; border-radius: 14px; padding: 1.2rem 1.5rem;
      display: flex; align-items: center; gap: 1rem; cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,.05); border: 1.5px solid transparent;
      transition: all .15s;
    }
    .client-card:hover { border-color: #bfa046; transform: translateY(-2px); }
    .client-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; flex-shrink: 0; }
    .client-info { flex: 1; display: flex; flex-direction: column; gap: .15rem; }
    .client-info strong { color: #1e293b; font-size: .95rem; }
    .client-info span { font-size: .8rem; color: #64748b; }
    .client-meta { display: flex; flex-direction: column; align-items: flex-end; gap: .3rem; }
    .badge { padding: 3px 10px; border-radius: 20px; font-size: .75rem; font-weight: 700; text-transform: uppercase; }
    .b-activo { background: #d1fae5; color: #065f46; }
    .b-inactivo { background: #f1f5f9; color: #64748b; }
    .b-pendiente { background: #fef3c7; color: #92400e; }
    .b-confirmada { background: #d1fae5; color: #065f46; }
    .b-completada { background: #e0e7ff; color: #3730a3; }
    .b-cancelada { background: #fee2e2; color: #991b1b; }
    .client-fuente { font-size: .72rem; color: #94a3b8; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; overflow-y: auto; }
    .modal-card { background: #fff; border-radius: 20px; max-width: 600px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); display: flex; flex-direction: column; max-height: 90vh; }
    .modal-header { display: flex; align-items: center; gap: 1rem; padding: 1.5rem 1.5rem 0; }
    .modal-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; flex-shrink: 0; }
    .modal-header h3 { margin: 0; color: #1e293b; font-weight: 800; }
    .modal-id { font-size: .78rem; color: #94a3b8; }
    .modal-close { margin-left: auto; background: none; border: none; font-size: 1.2rem; color: #94a3b8; cursor: pointer; padding: 4px; }

    .modal-tabs { display: flex; gap: .5rem; padding: .8rem 1.5rem 0; border-bottom: 1px solid #f1f5f9; }
    .modal-tabs button { padding: .5rem 1rem; border: none; background: none; font-size: .9rem; font-weight: 600; color: #94a3b8; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .15s; }
    .modal-tabs button.active { color: #bfa046; border-bottom-color: #bfa046; }

    .modal-body { padding: 1.2rem 1.5rem; overflow-y: auto; flex: 1; }
    .form-field { margin-bottom: 1rem; }
    .form-field label { display: block; font-weight: 600; color: #374151; margin-bottom: .35rem; font-size: .85rem; }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;
      font-size: .9rem; outline: none; box-sizing: border-box; font-family: inherit;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: #bfa046; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

    .citas-mini { display: flex; flex-direction: column; gap: .5rem; }
    .cita-mini-row { display: flex; align-items: center; gap: 1rem; padding: .6rem .8rem; background: #f8fafc; border-radius: 8px; }
    .cita-mini-fecha { font-size: .82rem; font-weight: 700; color: #64748b; flex: 1; }
    .cita-mini-tipo { font-size: .82rem; color: #1e293b; text-transform: capitalize; flex: 1; }

    .modal-footer { display: flex; gap: .8rem; padding: 1rem 1.5rem; border-top: 1px solid #f1f5f9; }
    .btn-gold { padding: 10px 22px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: .92rem; }
    .btn-gold:disabled { opacity: .6; cursor: not-allowed; }
    .btn-outline { padding: 10px 18px; background: #fff; color: #64748b; border: 1.5px solid #e2e8f0; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: .92rem; }
    .btn-danger { padding: 10px 16px; background: #fff; color: #ef4444; border: 1.5px solid #fecaca; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: .92rem; }
    .btn-danger:hover { background: #fef2f2; }
  `]
})
export class ClientsComponent implements OnInit {
  all: any[] = [];
  filtered: any[] = [];
  loading = true;
  saving = false;
  search = ''; filterEstado = '';
  selected: any = null;
  isNew = false;
  modalTab: 'info' | 'citas' = 'info';
  clientCitas: any[] = [];
  loadingCitas = false;
  formData: any = {};

  constructor(private svc: ClientService, private apptSvc: AppointmentService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAllClients().subscribe({
      next: (r) => { this.all = r.clients || []; this.filter(); this.loading = false; },
      error: () => { this.all = []; this.loading = false; }
    });
  }

  filter() {
    this.filtered = this.all.filter(c => {
      if (this.search) {
        const q = this.search.toLowerCase();
        if (!c.nombre?.toLowerCase().includes(q) && !c.email?.toLowerCase().includes(q)) return false;
      }
      if (this.filterEstado && c.estado !== this.filterEstado) return false;
      return true;
    });
  }

  openForm(c: any) {
    this.isNew = !c;
    this.selected = c || {};
    this.formData = c ? { ...c } : { nombre: '', email: '', telefono: '', estado: 'activo', fuente: 'directo', notas: '', descripcion: '', edad: null };
    this.modalTab = 'info';
    this.clientCitas = [];
  }

  openDetail(c: any) { this.openForm(c); }

  loadClientCitas() {
    if (!this.selected?.id) return;
    this.loadingCitas = true;
    this.apptSvc.getAllAppointments().subscribe({
      next: (r) => {
        this.clientCitas = (r.appointments || []).filter((a: any) => a.client_id === this.selected.id);
        this.loadingCitas = false;
      },
      error: () => { this.loadingCitas = false; }
    });
  }

  save() {
    this.saving = true;
    const obs = this.isNew
      ? this.svc.createClient(this.formData)
      : this.svc.updateClient(this.selected.id, this.formData);
    obs.subscribe({
      next: () => { this.saving = false; this.selected = null; this.load(); },
      error: () => { this.saving = false; alert('Error al guardar'); }
    });
  }

  deleteClient() {
    if (!confirm(`¿Eliminar a ${this.selected.nombre}?`)) return;
    this.svc.deleteClient(this.selected.id).subscribe({
      next: () => { this.selected = null; this.load(); },
      error: () => alert('Error al eliminar')
    });
  }

  initials(nombre: string) {
    return (nombre || '?').split(' ').slice(0,2).map((n:string) => n[0]).join('').toUpperCase();
  }
  fmtDate(iso: string) { return new Date(iso).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }); }
}
