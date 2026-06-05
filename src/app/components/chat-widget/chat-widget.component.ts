import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ChatService, ChatMessage, Horario, Cita, ChatContext } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

interface UIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  horarios?: Horario[];
  cita?: Cita;
  loading?: boolean;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <!-- FAB -->
    <button class="chat-fab" (click)="toggleChat()" [class.open]="isOpen" aria-label="Abrir chat">
      <span *ngIf="!isOpen">💬</span>
      <span *ngIf="isOpen">✕</span>
      <span class="chat-badge" *ngIf="unread > 0 && !isOpen">{{ unread }}</span>
    </button>

    <!-- Panel -->
    <div class="chat-panel" [class.visible]="isOpen">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-avatar">🧠</div>
        <div class="chat-header-info">
          <strong>Asistente Devesan</strong>
          <span *ngIf="loggedUser">Hola, {{ loggedUser.nombre }} ✓</span>
          <span *ngIf="!loggedUser">Psicología · Responde al instante</span>
        </div>
        <button class="chat-close" (click)="toggleChat()">✕</button>
      </div>

      <!-- Banner login si no está logueado -->
      <div class="login-banner" *ngIf="!loggedUser">
        <span>💡 <a routerLink="/login" (click)="toggleChat()">Inicia sesión</a> para reservar citas sin escribir tu email</span>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #messagesContainer>
        <div *ngFor="let msg of messages" class="chat-message" [class]="'msg-' + msg.role">

          <div *ngIf="msg.loading" class="msg-bubble loading-bubble">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          </div>

          <div *ngIf="!msg.loading && msg.role !== 'system'" class="msg-bubble">
            {{ msg.content }}
          </div>

          <!-- Slots grid — solo muestra los últimos -->
          <div *ngIf="msg.horarios && msg.horarios.length > 0" class="slots-grid">
            <button *ngFor="let slot of msg.horarios" class="slot-btn" (click)="selectSlot(slot)">
              <span class="slot-fecha">{{ slot.fecha }}</span>
              <span class="slot-hora">{{ slot.hora }}</span>
            </button>
          </div>

          <!-- Confirmación -->
          <div *ngIf="msg.cita" class="booking-confirm">
            <div class="confirm-icon">✅</div>
            <div class="confirm-text">
              <strong>¡Cita confirmada!</strong><br>
              {{ msg.cita.fecha_label }}<br>
              <small>Puedes verla en <a routerLink="/mi-area" (click)="toggleChat()">Mi área</a></small>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="chat-input-row">
        <input
          #inputRef
          [(ngModel)]="inputText"
          (keydown.enter)="send()"
          placeholder="Escribe tu mensaje..."
          [disabled]="loading"
          class="chat-input"
          maxlength="500"
        />
        <button (click)="send()" [disabled]="!inputText.trim() || loading" class="send-btn">
          <span *ngIf="!loading">➤</span>
          <span *ngIf="loading" class="spin">⟳</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chat-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #6c63ff, #a78bfa);
      border: none; cursor: pointer; font-size: 24px;
      box-shadow: 0 4px 20px rgba(108,99,255,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
    }
    .chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(108,99,255,.6); }
    .chat-fab.open { background: linear-gradient(135deg, #ef4444, #f87171); }
    .chat-badge {
      position: absolute; top: 4px; right: 4px;
      background: #ef4444; color: #fff; font-size: 11px; font-weight: 700;
      border-radius: 50%; width: 18px; height: 18px;
      display: flex; align-items: center; justify-content: center;
    }
    .chat-panel {
      position: fixed; bottom: 102px; right: 28px; z-index: 9998;
      width: 370px; max-height: 580px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      display: flex; flex-direction: column;
      opacity: 0; transform: translateY(16px) scale(.97);
      pointer-events: none; transition: all .25s cubic-bezier(.4,0,.2,1);
    }
    .chat-panel.visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
    .chat-header {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 16px;
      background: linear-gradient(135deg, #6c63ff, #a78bfa);
      border-radius: 20px 20px 0 0; color: #fff;
    }
    .chat-header-avatar { font-size: 28px; line-height: 1; }
    .chat-header-info { flex: 1; display: flex; flex-direction: column; }
    .chat-header-info strong { font-size: 14px; }
    .chat-header-info span { font-size: 11px; opacity: .85; }
    .chat-close { background: none; border: none; color: #fff; font-size: 16px; cursor: pointer; padding: 4px; opacity: .8; }
    .chat-close:hover { opacity: 1; }

    .login-banner {
      background: #fffbe7; border-bottom: 1px solid #e8d98a;
      padding: 8px 14px; font-size: 12px; color: #92400e;
    }
    .login-banner a { color: #bfa046; font-weight: 700; text-decoration: none; }
    .login-banner a:hover { text-decoration: underline; }

    .chat-messages {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 200px; max-height: 380px;
    }
    .chat-message { display: flex; flex-direction: column; }
    .msg-user { align-items: flex-end; }
    .msg-assistant { align-items: flex-start; }
    .msg-bubble {
      max-width: 82%; padding: 10px 14px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.5; white-space: pre-wrap;
    }
    .msg-user .msg-bubble { background: linear-gradient(135deg, #6c63ff, #a78bfa); color: #fff; border-bottom-right-radius: 4px; }
    .msg-assistant .msg-bubble { background: #f3f4f6; color: #1f2937; border-bottom-left-radius: 4px; }
    .loading-bubble { display: flex; gap: 5px; align-items: center; background: #f3f4f6; padding: 12px 16px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; animation: bounce 1.2s infinite ease-in-out; }
    .dot:nth-child(1) { animation-delay: 0s; }
    .dot:nth-child(2) { animation-delay: .2s; }
    .dot:nth-child(3) { animation-delay: .4s; }
    @keyframes bounce { 0%,80%,100% { transform: scale(.8); opacity: .5; } 40% { transform: scale(1.2); opacity: 1; } }

    .slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px; width: 100%; }
    .slot-btn {
      display: flex; flex-direction: column; align-items: center;
      padding: 8px 4px; border: 1.5px solid #a78bfa; border-radius: 10px;
      background: #faf5ff; cursor: pointer; transition: all .15s;
    }
    .slot-btn:hover { background: #ede9fe; border-color: #6c63ff; }
    .slot-fecha { font-size: 10px; color: #6b7280; font-weight: 500; }
    .slot-hora { font-size: 14px; font-weight: 700; color: #6c63ff; }

    .booking-confirm {
      display: flex; align-items: flex-start; gap: 10px;
      background: #f0fdf4; border: 1.5px solid #86efac;
      border-radius: 12px; padding: 12px 14px; margin-top: 6px;
    }
    .confirm-icon { font-size: 22px; }
    .confirm-text { font-size: 13px; color: #166534; line-height: 1.6; }
    .confirm-text a { color: #15803d; font-weight: 700; text-decoration: none; }
    .confirm-text a:hover { text-decoration: underline; }

    .chat-input-row { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid #e5e7eb; }
    .chat-input {
      flex: 1; border: 1.5px solid #e5e7eb; border-radius: 12px;
      padding: 8px 12px; font-size: 13.5px; outline: none; transition: border-color .2s;
    }
    .chat-input:focus { border-color: #a78bfa; }
    .send-btn {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #6c63ff, #a78bfa);
      border: none; color: #fff; font-size: 16px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: transform .15s;
    }
    .send-btn:hover:not(:disabled) { transform: scale(1.08); }
    .send-btn:disabled { opacity: .5; cursor: not-allowed; }
    .spin { display: inline-block; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 480px) {
      .chat-panel { width: calc(100vw - 20px); right: 10px; bottom: 90px; }
      .chat-fab { bottom: 18px; right: 18px; }
    }
  `]
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;

  isOpen = false;
  messages: UIMessage[] = [];
  inputText = '';
  loading = false;
  unread = 0;
  history: ChatMessage[] = [];
  loggedUser: any = null;

  constructor(
    private chatService: ChatService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.auth.user$.subscribe(user => {
      this.loggedUser = user?.role === 'patient' ? user : null;
    });

    const welcome = this.loggedUser
      ? `¡Hola, ${this.loggedUser.nombre}! 👋 Soy la asistente de PsicoSalud Devesan. ¿En qué puedo ayudarte? Si quieres reservar una cita, dímelo y te muestro los horarios disponibles.`
      : '¡Hola! Soy la asistente virtual de PsicoSalud Devesan 👋 Puedo ayudarte a reservar una cita, contarte sobre nuestros servicios o responder tus dudas. ¿En qué puedo ayudarte?';

    this.messages.push({ role: 'assistant', content: welcome });
    this.unread = 1;
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unread = 0;
      setTimeout(() => this.inputRef?.nativeElement.focus(), 150);
    }
  }

  send() {
    const text = this.inputText.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', content: text });
    this.history.push({ role: 'user', content: text });
    this.inputText = '';
    this.loading = true;

    const loadingMsg: UIMessage = { role: 'assistant', content: '', loading: true };
    this.messages.push(loadingMsg);

    // Contexto del usuario logueado
    const context: ChatContext | undefined = this.loggedUser ? {
      nombre: this.loggedUser.nombre,
      email: this.loggedUser.email,
      patient_id: this.loggedUser.patient_id,
    } : undefined;

    this.chatService.sendMessage([...this.history], context).subscribe({
      next: (res) => {
        this.messages.pop();
        this.loading = false;

        const botMsg: UIMessage = {
          role: 'assistant',
          content: res.reply,
          horarios: res.horarios,
          cita: res.cita,
        };
        this.messages.push(botMsg);
        this.history.push({ role: 'assistant', content: res.reply });

        if (!this.isOpen) this.unread++;
      },
      error: () => {
        this.messages.pop();
        this.loading = false;
        this.messages.push({ role: 'assistant', content: 'Disculpa, hubo un problema técnico. Por favor inténtalo de nuevo.' });
      }
    });
  }

  selectSlot(slot: Horario) {
    // Eliminar slots del último mensaje para no repetirlos
    const last = this.messages[this.messages.length - 1];
    if (last?.horarios) last.horarios = [];

    const text = `Quiero reservar el ${slot.fecha} a las ${slot.hora}`;
    this.inputText = text;
    this.send();
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }
}
