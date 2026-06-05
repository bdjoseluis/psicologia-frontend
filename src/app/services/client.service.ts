import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private _headers(): HttpHeaders {
    const token = this.auth.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getAllClients(): Observable<any> {
    return this.http.get<any>('/api/clients', { headers: this._headers() });
  }

  getClient(id: string): Observable<any> {
    return this.http.get<any>(`/api/clients/${id}`, { headers: this._headers() });
  }

  createClient(body: any): Observable<any> {
    return this.http.post<any>('/api/clients', body, { headers: this._headers() });
  }

  updateClient(id: string, body: any): Observable<any> {
    return this.http.put<any>(`/api/clients/${id}`, body, { headers: this._headers() });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`/api/clients/${id}`, { headers: this._headers() });
  }
}
