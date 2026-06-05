import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface PatientInfo {
  patient_id: string;
  nombre: string;
  email: string;
  role: 'patient' | 'admin';
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private subject = new BehaviorSubject<PatientInfo | null>(null);
  public user$ = this.subject.asObservable();

  constructor(private http: HttpClient) {
    this._loadFromStorage();
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  adminLogin(password: string): Observable<any> {
    return this.http.post<any>('/api/auth/login', { password }).pipe(
      tap(res => this._save({ ...res, email: 'admin', nombre: 'Dolores' }))
    );
  }

  // ── Patient ───────────────────────────────────────────────────────────────

  patientRegister(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/auth/patient/register', { email, password }).pipe(
      tap(res => this._save(res))
    );
  }

  patientLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/auth/patient/login', { email, password }).pipe(
      tap(res => this._save(res))
    );
  }

  // ── Shared ────────────────────────────────────────────────────────────────

  logout(): void {
    localStorage.removeItem('dv_token');
    localStorage.removeItem('dv_user');
    this.subject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !this._isExpired();
  }

  isAdmin(): boolean {
    return this.subject.value?.role === 'admin';
  }

  isPatient(): boolean {
    return this.subject.value?.role === 'patient';
  }

  getToken(): string | null {
    return localStorage.getItem('dv_token');
  }

  getCurrentUser(): PatientInfo | null {
    return this.subject.value;
  }

  private _save(res: any): void {
    const info: PatientInfo = {
      token:      res.token,
      role:       res.role,
      patient_id: res.patient_id || '',
      nombre:     res.nombre || res.email || 'Usuario',
      email:      res.email || res.sub || '',
    };
    localStorage.setItem('dv_token', res.token);
    localStorage.setItem('dv_user', JSON.stringify(info));
    this.subject.next(info);
  }

  private _loadFromStorage(): void {
    try {
      const token = localStorage.getItem('dv_token');
      const raw   = localStorage.getItem('dv_user');
      if (token && raw) {
        const info = JSON.parse(raw) as PatientInfo;
        // Verificar expiración del JWT
        const payload = JSON.parse(atob(token.split('.')[1] + '=='));
        if (payload.exp * 1000 > Date.now()) {
          this.subject.next(info);
        } else {
          this.logout();
        }
      }
    } catch {
      this.logout();
    }
  }

  private _isExpired(): boolean {
    try {
      const token = localStorage.getItem('dv_token');
      if (!token) return true;
      const payload = JSON.parse(atob(token.split('.')[1] + '=='));
      return payload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }
}
