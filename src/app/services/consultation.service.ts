import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultationInfo } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8080/api/consultation';

  constructor(private http: HttpClient) { }

  getConsultationInfo(): Observable<ConsultationInfo> {
    return this.http.get<ConsultationInfo>(`${this.apiUrl}/public/info`);
  }

  getConsultationInfoAdmin(): Observable<ConsultationInfo> {
    return this.http.get<ConsultationInfo>(`${this.apiUrl}/admin/info`);
  }

  updateConsultationInfo(info: ConsultationInfo): Observable<ConsultationInfo> {
    return this.http.post<ConsultationInfo>(`${this.apiUrl}/admin/info`, info);
  }
} 