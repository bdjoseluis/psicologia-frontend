import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinancialRecord, RecordType } from '../models/financial.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private apiUrl = 'http://localhost:8080/api/financial';

  constructor(private http: HttpClient) { }

  getAllFinancialRecords(): Observable<FinancialRecord[]> {
    return this.http.get<FinancialRecord[]>(`${this.apiUrl}/admin/all`);
  }

  getFinancialRecordById(id: number): Observable<FinancialRecord> {
    return this.http.get<FinancialRecord>(`${this.apiUrl}/admin/${id}`);
  }

  createFinancialRecord(record: FinancialRecord): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>(`${this.apiUrl}/admin`, record);
  }

  updateFinancialRecord(id: number, record: FinancialRecord): Observable<FinancialRecord> {
    return this.http.put<FinancialRecord>(`${this.apiUrl}/admin/${id}`, record);
  }

  deleteFinancialRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }

  getFinancialRecordsByType(recordType: RecordType): Observable<FinancialRecord[]> {
    return this.http.get<FinancialRecord[]>(`${this.apiUrl}/admin/type/${recordType}`);
  }

  getFinancialRecordsByClient(clientId: number): Observable<FinancialRecord[]> {
    return this.http.get<FinancialRecord[]>(`${this.apiUrl}/admin/client/${clientId}`);
  }

  getFinancialRecordsByCategory(category: string): Observable<FinancialRecord[]> {
    return this.http.get<FinancialRecord[]>(`${this.apiUrl}/admin/category/${category}`);
  }

  getFinancialRecordsByDateRange(startDate: Date, endDate: Date): Observable<FinancialRecord[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<FinancialRecord[]>(`${this.apiUrl}/admin/date-range`, { params });
  }

  calculateTotalIncome(startDate: Date, endDate: Date): Observable<number> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<number>(`${this.apiUrl}/admin/income`, { params });
  }

  calculateTotalExpenses(startDate: Date, endDate: Date): Observable<number> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<number>(`${this.apiUrl}/admin/expenses`, { params });
  }

  calculateBalance(startDate: Date, endDate: Date): Observable<number> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    return this.http.get<number>(`${this.apiUrl}/admin/balance`, { params });
  }
} 