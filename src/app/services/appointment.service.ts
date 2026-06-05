import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private _headers(): HttpHeaders {
    const token = this.auth.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // Público
  getAvailableSlots(days = 14, duracion = 60): Observable<any> {
    return this.http.get<any>(`/api/appointments/available?days=${days}&duracion=${duracion}`);
  }

  // Paciente
  getMyAppointments(): Observable<any> {
    return this.http.get<any>('/api/appointments/my', { headers: this._headers() });
  }

  bookAppointment(body: { fecha_iso: string; duracion_min?: number; tipo?: string; notas?: string }): Observable<any> {
    return this.http.post<any>('/api/appointments/book', body, { headers: this._headers() });
  }

  cancelMyAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`/api/appointments/my/${id}`, { headers: this._headers() });
  }

  // Admin
  getAllAppointments(): Observable<any> {
    return this.http.get<any>('/api/appointments', { headers: this._headers() });
  }

  createAppointment(body: any): Observable<any> {
    return this.http.post<any>('/api/appointments', body, { headers: this._headers() });
  }

  updateAppointment(id: string, body: any): Observable<any> {
    return this.http.put<any>(`/api/appointments/${id}`, body, { headers: this._headers() });
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`/api/appointments/${id}`, { headers: this._headers() });
  }

  // Horario
  getScheduleConfig(): Observable<any> {
    return this.http.get<any>('/api/schedule/config');
  }

  updateScheduleConfig(config: any): Observable<any> {
    return this.http.put<any>('/api/schedule/config', config, { headers: this._headers() });
  }
}
