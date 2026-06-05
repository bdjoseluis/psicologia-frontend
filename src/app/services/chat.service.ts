import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Horario {
  iso: string;
  label: string;
  fecha: string;
  hora: string;
}

export interface Cita {
  id: string;
  nombre: string;
  email: string;
  fecha: string;
  fecha_label: string;
}

export interface ChatResponse {
  reply: string;
  accion: 'mostrar_horarios' | 'cita_confirmada' | null;
  horarios?: Horario[];
  cita?: Cita;
}

export interface ChatContext {
  nombre?: string;
  email?: string;
  patient_id?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(messages: ChatMessage[], context?: ChatContext): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, {
      messages,
      nombre: context?.nombre || null,
      email: context?.email || null,
      patient_id: context?.patient_id || null,
    });
  }
}
