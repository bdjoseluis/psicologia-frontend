import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationService } from '../../../services/consultation.service';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="consult-page">
      <h2>Configuración de la consulta</h2>
      <p class="sub">Información de contacto que aparece en la web pública.</p>

      <div *ngIf="loading" class="loading-box"><div class="spinner"></div></div>

      <div *ngIf="!loading" class="config-form">
        <div class="form-field">
          <label>📞 Teléfono</label>
          <input type="text" [(ngModel)]="info.phone" placeholder="+34 XXX XXX XXX" />
        </div>
        <div class="form-field">
          <label>📧 Email de contacto</label>
          <input type="email" [(ngModel)]="info.email" placeholder="consulta@devesan.com" />
        </div>
        <div class="form-field">
          <label>📍 Dirección</label>
          <input type="text" [(ngModel)]="info.address" placeholder="Calle, Ciudad" />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>🕘 Horario L-V</label>
            <input type="text" [(ngModel)]="info.hours_lv" placeholder="9:00 - 18:00" />
          </div>
          <div class="form-field">
            <label>🕘 Horario Sábados</label>
            <input type="text" [(ngModel)]="info.hours_sa" placeholder="9:00 - 14:00" />
          </div>
        </div>
        <div class="form-field">
          <label>📱 WhatsApp</label>
          <input type="text" [(ngModel)]="info.whatsapp" placeholder="+34 XXX XXX XXX" />
        </div>
        <div class="form-field">
          <label>📸 Instagram</label>
          <input type="text" [(ngModel)]="info.instagram" placeholder="@devesan_psicologia" />
        </div>

        <div class="save-row">
          <div class="save-msg success" *ngIf="saved">✅ Guardado correctamente</div>
          <div class="save-msg error" *ngIf="saveError">❌ {{ saveError }}</div>
          <button class="btn-save" (click)="save()" [disabled]="saving">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>

        <hr class="divider" />

        <div class="section-sub">
          <h3>Cambiar contraseña de administración</h3>
          <div class="form-row">
            <div class="form-field">
              <label>Nueva contraseña</label>
              <input type="password" [(ngModel)]="newPw" placeholder="Mínimo 6 caracteres" />
            </div>
            <div class="form-field">
              <label>Confirmar</label>
              <input type="password" [(ngModel)]="newPw2" placeholder="Repite la contraseña" />
            </div>
          </div>
          <button class="btn-outline" (click)="changePw()" [disabled]="!newPw || newPw !== newPw2 || newPw.length < 6 || pwSaving">
            {{ pwSaving ? 'Cambiando...' : 'Cambiar contraseña' }}
          </button>
          <div class="save-msg success" *ngIf="pwSaved">✅ Contraseña actualizada</div>
          <div class="save-msg error" *ngIf="pwError">❌ {{ pwError }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .consult-page { max-width: 700px; }
    h2 { color: #1e293b; font-weight: 800; margin-bottom: .2rem; }
    .sub { color: #64748b; margin-bottom: 2rem; }
    .loading-box { display: flex; justify-content: center; padding: 2rem; }
    .spinner { width: 32px; height: 32px; border: 2px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .config-form { background: #fff; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,.05); }
    .form-field { margin-bottom: 1.1rem; }
    .form-field label { display: block; font-weight: 600; color: #374151; margin-bottom: .35rem; font-size: .88rem; }
    .form-field input { width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: .9rem; outline: none; box-sizing: border-box; }
    .form-field input:focus { border-color: #bfa046; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
    .save-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-top: .5rem; }
    .save-msg { font-size: .88rem; padding: 6px 14px; border-radius: 8px; }
    .save-msg.success { background: #f0fdf4; color: #166534; }
    .save-msg.error { background: #fef2f2; color: #991b1b; }
    .btn-save { padding: 10px 24px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .btn-save:disabled { opacity: .6; cursor: not-allowed; }
    .btn-outline { padding: 10px 20px; background: #fff; color: #64748b; border: 1.5px solid #e2e8f0; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: .9rem; }
    .btn-outline:disabled { opacity: .6; cursor: not-allowed; }
    .divider { border: none; border-top: 1px solid #f1f5f9; margin: 1.5rem 0; }
    .section-sub h3 { color: #1e293b; font-weight: 700; font-size: 1rem; margin-bottom: 1rem; }
  `]
})
export class ConsultationComponent implements OnInit {
  info: any = {};
  loading = true;
  saving = false; saved = false; saveError = '';
  newPw = ''; newPw2 = '';
  pwSaving = false; pwSaved = false; pwError = '';

  constructor(private svc: ConsultationService) {}

  ngOnInit() {
    this.svc.getInfo().subscribe({
      next: (r: any) => {
        const rows: any[] = r.info || [];
        rows.forEach((item: any) => { this.info[item.key] = item.value; });
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  save() {
    this.saving = true; this.saved = false; this.saveError = '';
    const keys = ['phone','email','address','hours_lv','hours_sa','whatsapp','instagram'];
    const updates = keys.map(k => this.svc.updateInfo(k, this.info[k] || ''));
    Promise.all(updates.map(o => o.toPromise())).then(() => {
      this.saving = false; this.saved = true;
      setTimeout(() => this.saved = false, 3000);
    }).catch(() => {
      this.saving = false; this.saveError = 'Error al guardar';
    });
  }

  changePw() {
    this.pwSaving = true; this.pwSaved = false; this.pwError = '';
    // Uses the admin's own endpoint via HttpClient
    import('@angular/common/http').then(({ HttpClient }) => {}).catch(() => {});
    fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('dv_token')}` },
      body: JSON.stringify({ new_password: this.newPw })
    }).then(r => {
      this.pwSaving = false;
      if (r.ok) { this.pwSaved = true; this.newPw = ''; this.newPw2 = ''; setTimeout(() => this.pwSaved = false, 3000); }
      else { this.pwError = 'Error al cambiar contraseña'; }
    }).catch(() => { this.pwSaving = false; this.pwError = 'Error de conexión'; });
  }
}
