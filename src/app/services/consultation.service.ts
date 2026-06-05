import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private _headers(): HttpHeaders {
    const token = this.auth.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getInfo(): Observable<any> {
    return this.http.get<any>('/api/info');
  }

  updateInfo(key: string, value: string): Observable<any> {
    return this.http.put<any>(`/api/info/${key}`, { value }, { headers: this._headers() });
  }
}
