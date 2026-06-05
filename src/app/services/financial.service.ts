import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FinancialService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private _headers(): HttpHeaders {
    const token = this.auth.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getAll(): Observable<any> {
    return this.http.get<any>('/api/financial', { headers: this._headers() });
  }

  create(body: any): Observable<any> {
    return this.http.post<any>('/api/financial', body, { headers: this._headers() });
  }

  update(id: string, body: any): Observable<any> {
    return this.http.put<any>(`/api/financial/${id}`, body, { headers: this._headers() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/financial/${id}`, { headers: this._headers() });
  }
}
