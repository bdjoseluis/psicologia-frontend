import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatWidgetComponent } from '../../components/chat-widget/chat-widget.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatWidgetComponent],
  template: `

    <!-- ═══ HERO ═══ -->
    <header class="hero" id="inicio">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-badge">Psicología · Sexología · Terapia de Pareja</span>
          <h1>Tu bienestar<br><span class="hero-accent">es nuestra prioridad</span></h1>
          <p>Atención profesional, cercana y confidencial en Crevillent (Alicante) y online.<br>
            Especialista en sexología, terapia de pareja, autoestima y orientación laboral.</p>
          <div class="hero-cta">
            <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-primary">{{ ctaLabel }}</a>
            <a (click)="scrollTo('servicios')" class="btn-outline">Ver servicios</a>
          </div>
          <div class="hero-trust">
            <div class="trust-item"><span>✅</span> Atención online y presencial</div>
            <div class="trust-item"><span>🔒</span> Total confidencialidad</div>
            <div class="trust-item"><span>💬</span> Primera consulta orientativa</div>
          </div>
        </div>
        <div class="hero-logo">
          <img src="/logo-devesan-2026.png" alt="PsicoSalud Devesan" />
        </div>
      </div>
    </header>

    <!-- ═══ SERVICIOS ═══ -->
    <section id="servicios" class="section section-light">
      <div class="section-inner">
        <div class="section-header">
          <h2>Nuestros servicios</h2>
          <p>Atención especializada adaptada a tus necesidades</p>
        </div>
        <div class="services-grid">
          <div class="service-card">
            <div class="svc-icon pink"><i class="fas fa-heart"></i></div>
            <h4>Terapia de pareja</h4>
            <p>Acompañamiento en crisis de pareja, desengaños, divorcio y duelos relacionales.</p>
            <div class="svc-price">50 €/sesión</div>
          </div>
          <div class="service-card">
            <div class="svc-icon teal"><i class="fas fa-venus-mars"></i></div>
            <h4>Sexología</h4>
            <p>Terapia sexual, disfunciones, educación sexual y apoyo a parejas con problemas reproductivos.</p>
            <div class="svc-price">50 €/sesión</div>
          </div>
          <div class="service-card">
            <div class="svc-icon purple"><i class="fas fa-brain"></i></div>
            <h4>Terapia individual</h4>
            <p>Autoestima, duelo, gestión emocional y crecimiento personal.</p>
            <div class="svc-price">50 €/sesión</div>
          </div>
          <div class="service-card">
            <div class="svc-icon gold"><i class="fas fa-briefcase"></i></div>
            <h4>Orientación laboral</h4>
            <p>Currículums, portfolios, preparación de entrevistas y videocurriculums profesionales.</p>
            <div class="svc-price">50 €/sesión</div>
          </div>
          <div class="service-card">
            <div class="svc-icon blue"><i class="fas fa-building"></i></div>
            <h4>Empresas</h4>
            <p>Talleres de motivación, comunicación y habilidades sociales para equipos.</p>
            <div class="svc-price">Consultar</div>
          </div>
          <div class="service-card">
            <div class="svc-icon rose"><i class="fas fa-users"></i></div>
            <h4>Grupos y talleres</h4>
            <p>Grupos de duelo, talleres de autoestima, biodanza, risoterapia y habilidades sociales.</p>
            <div class="svc-price">Consultar</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SOBRE ═══ -->
    <section id="sobre" class="section section-warm">
      <div class="section-inner">
        <div class="about-wrap">
          <div class="about-img-wrap">
            <img src="/image.png" alt="Dolores Devesa Santacruz" class="about-photo" />
            <div class="about-badge">Col. nº XXXXXXXXX</div>
          </div>
          <div class="about-content">
            <span class="section-tag">Sobre mí</span>
            <h2>Dolores Devesa Santacruz</h2>
            <p class="about-role">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
            <p>Con amplia experiencia en acompañamiento emocional y desarrollo personal, trabajo desde un enfoque integrador, humano y basado en la evidencia científica.</p>
            <p>Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones, superar dificultades y alcanzar tu bienestar.</p>
            <div class="about-tags">
              <span>Terapia cognitivo-conductual</span>
              <span>Terapia sistémica</span>
              <span>Sexología clínica</span>
              <span>Mindfulness</span>
            </div>
            <a routerLink="/registro" class="btn-primary mt-2">Pedir cita con Dolores</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA CENTRAL ═══ -->
    <section class="section-cta">
      <div class="cta-inner">
        <h2>¿Listo para dar el primer paso?</h2>
        <p>Reserva tu cita online en menos de 2 minutos. Sin esperas, sin llamadas.</p>
        <div class="cta-btns">
          <a routerLink="/registro" class="cta-btn-primary">Crear cuenta y reservar</a>
          <a routerLink="/login" class="cta-btn-ghost">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACTO ═══ -->
    <section id="contacto" class="section section-light">
      <div class="section-inner">
        <div class="section-header">
          <h2>Contacto</h2>
          <p>Estamos aquí para ayudarte</p>
        </div>
        <div class="contact-grid">
          <a [href]="'tel:' + (info.phone || '+34653324336')" class="contact-card">
            <div class="contact-icon blue"><i class="fas fa-phone"></i></div>
            <div>
              <h5>Teléfono</h5>
              <p>{{ info.phone || '+34 653 324 336' }}</p>
            </div>
          </a>
          <a [href]="'mailto:' + (info.email || 'hola@b-dev.es')" class="contact-card">
            <div class="contact-icon green"><i class="fas fa-envelope"></i></div>
            <div>
              <h5>Email</h5>
              <p>{{ info.email || 'hola@b-dev.es' }}</p>
            </div>
          </a>
          <a href="https://maps.google.com/?q=San+Cayetano+2+C,+Crevillent,+Alicante" target="_blank" rel="noopener" class="contact-card">
            <div class="contact-icon gold"><i class="fas fa-map-marker-alt"></i></div>
            <div>
              <h5>Dirección</h5>
              <p>San Cayetano, 2C · Crevillent</p>
            </div>
          </a>
          <a [href]="waLink()" target="_blank" class="contact-card" *ngIf="info.whatsapp">
            <div class="contact-icon whatsapp"><i class="fab fa-whatsapp"></i></div>
            <div>
              <h5>WhatsApp</h5>
              <p>{{ info.whatsapp }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ HORARIOS ═══ -->
    <section id="horarios" class="section section-warm">
      <div class="section-inner">
        <div class="section-header">
          <h2>Horarios</h2>
          <p>Elige el momento que mejor te venga</p>
        </div>
        <div class="hours-grid">
          <div class="hours-card">
            <div class="hours-icon"><i class="fas fa-sun"></i></div>
            <h4>Lunes a Viernes</h4>
            <div class="hours-time">{{ info.hours_lv || '9:00 – 20:00' }}</div>
            <p>Sesiones presenciales y online</p>
          </div>
          <div class="hours-card hours-card-closed">
            <div class="hours-icon"><i class="fas fa-coffee"></i></div>
            <h4>Sábados y Domingos</h4>
            <div class="hours-time hours-time-closed">Cerrado</div>
            <p>La consulta no abre en fin de semana</p>
          </div>
          <div class="hours-card">
            <div class="hours-icon"><i class="fas fa-home"></i></div>
            <h4>Online</h4>
            <div class="hours-time">Flexible</div>
            <p>Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MISIÓN / VISIÓN ═══ -->
    <section class="section section-light">
      <div class="section-inner">
        <div class="section-header">
          <h2>Misión, Visión y Valores</h2>
        </div>
        <div class="mv-grid">
          <div class="mv-card mission">
            <div class="mv-icon">🧭</div>
            <h3>Misión</h3>
            <p>Brindar acompañamiento psicológico profesional, cercano y ético a personas, parejas y familias que buscan mejorar su bienestar emocional en un espacio de seguridad, respeto y escucha activa.</p>
          </div>
          <div class="mv-card vision">
            <div class="mv-icon">🌱</div>
            <h3>Visión</h3>
            <p>Convertirnos en centro de referencia en Crevillent y alrededores en psicoterapia individual, de pareja y sexología, destacando por una atención integradora, humana y basada en la evidencia.</p>
          </div>
          <div class="mv-card values">
            <div class="mv-icon">💎</div>
            <h3>Valores</h3>
            <ul>
              <li>Respeto y confidencialidad</li>
              <li>Autenticidad y compromiso</li>
              <li>Compasión y empatía</li>
              <li>Rigor científico</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Chat IA flotante -->
    <app-chat-widget></app-chat-widget>
  `,
  styles: [`
    /* ── Base ── */
    * { box-sizing: border-box; }
    .section { padding: 5rem 1.5rem; }
    .section-light { background: #fff; }
    .section-warm { background: linear-gradient(135deg, #fffdf5 0%, #fdf8ec 100%); }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-header h2 { font-size: 2rem; font-weight: 800; color: #1a1a2e; margin-bottom: .5rem; }
    .section-header p { color: #64748b; font-size: 1.05rem; }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, #fffdf5 0%, #fef9e8 50%, #f8f4e8 100%);
      padding: 4rem 1.5rem 3.5rem;
      border-bottom: 1px solid #f0e8c0;
    }
    .hero-inner {
      max-width: 1100px; margin: 0 auto;
      display: flex; align-items: center; gap: 4rem;
      flex-wrap: wrap;
    }
    .hero-text { flex: 1; min-width: 280px; }
    .hero-badge {
      display: inline-block; background: #fffbe7; border: 1px solid #e8d98a;
      color: #92400e; font-size: .82rem; font-weight: 700; padding: 5px 14px;
      border-radius: 20px; margin-bottom: 1.2rem; letter-spacing: .3px;
    }
    .hero-text h1 {
      font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900;
      color: #1a1a2e; line-height: 1.2; margin-bottom: 1.1rem;
    }
    .hero-accent { color: #bfa046; }
    .hero-text p { color: #475569; font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.8rem; }
    .hero-cta { display: flex; gap: .8rem; flex-wrap: wrap; margin-bottom: 1.8rem; }
    .btn-primary {
      padding: 13px 28px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border-radius: 10px; font-weight: 700; font-size: 1rem;
      text-decoration: none; box-shadow: 0 4px 18px rgba(191,160,70,.35);
      transition: opacity .2s, transform .15s; display: inline-block;
    }
    .btn-primary:hover { opacity: .92; transform: translateY(-2px); }
    .btn-outline {
      padding: 13px 24px; border: 2px solid #bfa046; color: #92400e;
      border-radius: 10px; font-weight: 700; font-size: 1rem;
      text-decoration: none; transition: all .2s; cursor: pointer;
      display: inline-block;
    }
    .btn-outline:hover { background: #fffbe7; }
    .hero-trust { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .trust-item { font-size: .88rem; color: #64748b; display: flex; align-items: center; gap: .4rem; }
    .hero-logo { flex: 0 0 auto; }
    .hero-logo img {
      width: clamp(180px, 22vw, 280px); height: auto;
      border-radius: 20px; box-shadow: 0 8px 40px rgba(191,160,70,.18);
    }

    /* ── Services ── */
    .services-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .service-card {
      background: #fff; border-radius: 16px; padding: 1.8rem 1.5rem;
      border: 1.5px solid #f0e8c0; transition: all .2s;
      box-shadow: 0 2px 12px rgba(0,0,0,.04);
      display: flex; flex-direction: column; gap: .6rem;
    }
    .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(191,160,70,.15); border-color: #d4b660; }
    .svc-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: .4rem; }
    .svc-icon.pink { background: #fce7f3; color: #be185d; }
    .svc-icon.teal { background: #ccfbf1; color: #0f766e; }
    .svc-icon.purple { background: #ede9fe; color: #7c3aed; }
    .svc-icon.gold { background: #fef9c3; color: #a16207; }
    .svc-icon.blue { background: #dbeafe; color: #1d4ed8; }
    .svc-icon.rose { background: #ffe4e6; color: #be123c; }
    .service-card h4 { font-size: 1.05rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .service-card p { color: #64748b; font-size: .9rem; line-height: 1.6; margin: 0; flex: 1; }
    .svc-price { font-weight: 800; color: #bfa046; font-size: .9rem; margin-top: .3rem; }

    /* ── About ── */
    .about-wrap { display: flex; gap: 4rem; align-items: center; flex-wrap: wrap; }
    .about-img-wrap { position: relative; flex: 0 0 auto; }
    .about-photo { width: clamp(180px, 22vw, 260px); height: auto; border-radius: 20px; box-shadow: 0 8px 40px rgba(191,160,70,.2); }
    .about-badge {
      position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff;
      padding: 6px 16px; border-radius: 20px; font-size: .78rem; font-weight: 700;
      white-space: nowrap; box-shadow: 0 4px 12px rgba(191,160,70,.4);
    }
    .about-content { flex: 1; min-width: 280px; }
    .section-tag { display: inline-block; background: #fffbe7; border: 1px solid #e8d98a; color: #92400e; font-size: .78rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 1rem; }
    .about-content h2 { font-size: 1.8rem; font-weight: 900; color: #1a1a2e; margin-bottom: .3rem; }
    .about-role { color: #bfa046; font-weight: 700; margin-bottom: 1.2rem; font-size: 1rem; }
    .about-content p { color: #475569; line-height: 1.7; margin-bottom: .8rem; }
    .about-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.2rem 0; }
    .about-tags span { background: #f1f5f9; color: #374151; padding: 5px 12px; border-radius: 20px; font-size: .8rem; font-weight: 600; }
    .mt-2 { margin-top: .8rem; }

    /* ── CTA Section ── */
    .section-cta {
      background: linear-gradient(135deg, #1a1a2e 0%, #2d2b55 100%);
      padding: 4.5rem 1.5rem; text-align: center;
    }
    .cta-inner { max-width: 700px; margin: 0 auto; }
    .cta-inner h2 { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: .8rem; }
    .cta-inner p { color: rgba(255,255,255,.75); font-size: 1.1rem; margin-bottom: 2rem; }
    .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .cta-btn-primary {
      padding: 14px 32px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border-radius: 12px; font-weight: 800; font-size: 1.05rem;
      text-decoration: none; box-shadow: 0 4px 20px rgba(191,160,70,.4);
      transition: opacity .2s, transform .15s;
    }
    .cta-btn-primary:hover { opacity: .92; transform: translateY(-2px); }
    .cta-btn-ghost { padding: 14px 28px; border: 2px solid rgba(255,255,255,.3); color: #fff; border-radius: 12px; font-weight: 700; font-size: 1.05rem; text-decoration: none; transition: all .2s; }
    .cta-btn-ghost:hover { border-color: rgba(255,255,255,.6); background: rgba(255,255,255,.08); }

    /* ── Contact ── */
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; }
    .contact-card {
      background: #fff; border-radius: 16px; padding: 1.5rem 1.2rem;
      display: flex; align-items: flex-start; gap: 1rem;
      border: 1.5px solid #f0e8c0; text-decoration: none;
      transition: all .2s; box-shadow: 0 2px 10px rgba(0,0,0,.04);
    }
    .contact-card:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(191,160,70,.12); border-color: #d4b660; }
    .contact-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .contact-icon.blue { background: #dbeafe; color: #1d4ed8; }
    .contact-icon.green { background: #dcfce7; color: #15803d; }
    .contact-icon.gold { background: #fef9c3; color: #a16207; }
    .contact-icon.whatsapp { background: #dcfce7; color: #16a34a; }
    .contact-card h5 { font-size: .85rem; font-weight: 700; color: #374151; margin: 0 0 .2rem; }
    .contact-card p { font-size: .9rem; color: #64748b; margin: 0; }

    /* ── Hours ── */
    .hours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
    .hours-card { background: #fff; border-radius: 16px; padding: 2rem 1.5rem; text-align: center; border: 1.5px solid #f0e8c0; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
    .hours-icon { font-size: 1.8rem; margin-bottom: .8rem; color: #bfa046; }
    .hours-card h4 { font-weight: 700; color: #1a1a2e; margin-bottom: .5rem; }
    .hours-time { font-size: 1.5rem; font-weight: 900; color: #bfa046; margin-bottom: .5rem; }
    .hours-card p { color: #64748b; font-size: .88rem; margin: 0; }
    .hours-card-closed { opacity: .65; }
    .hours-time-closed { color: #94a3b8; }

    /* ── Mission/Vision ── */
    .mv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .mv-card { border-radius: 16px; padding: 2rem 1.5rem; border: 1.5px solid #f0e8c0; }
    .mv-card.mission { background: linear-gradient(135deg, #fffdf5, #fefce8); }
    .mv-card.vision { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); }
    .mv-card.values { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); }
    .mv-icon { font-size: 2rem; margin-bottom: .8rem; }
    .mv-card h3 { font-size: 1.1rem; font-weight: 800; color: #1a1a2e; margin-bottom: .8rem; }
    .mv-card p { color: #475569; line-height: 1.7; margin: 0; font-size: .95rem; }
    .mv-card ul { list-style: none; padding: 0; margin: 0; }
    .mv-card ul li { color: #475569; padding: .35rem 0; font-size: .95rem; border-bottom: 1px solid rgba(0,0,0,.05); display: flex; align-items: center; gap: .5rem; }
    .mv-card ul li::before { content: '✓'; color: #bfa046; font-weight: 700; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .hero { padding: 3rem 1.2rem 2.5rem; }
      .hero-inner { gap: 2rem; flex-direction: column-reverse; align-items: center; text-align: center; }
      .hero-text h1 { font-size: 1.9rem; }
      .hero-cta { justify-content: center; }
      .hero-trust { justify-content: center; }
      .about-wrap { flex-direction: column; align-items: center; text-align: center; gap: 2.5rem; }
      .about-tags { justify-content: center; }
      .section { padding: 3.5rem 1.2rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  info: any = {};
  ctaLink = '/registro';
  ctaParams: any = null;
  ctaLabel = 'Reservar cita';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: (r) => {
        const rows: any[] = r.info || [];
        rows.forEach((item: any) => { this.info[item.key] = item.value; });
      },
      error: () => {}
    });

    this.auth.user$.subscribe(user => {
      if (user?.role === 'patient') {
        this.ctaLink = '/mi-area';
        this.ctaParams = { tab: 'reservar' };
        this.ctaLabel = 'Reservar cita';
      } else if (user?.role === 'admin') {
        this.ctaLink = '/admin';
        this.ctaParams = null;
        this.ctaLabel = 'Panel admin';
      } else {
        this.ctaLink = '/registro';
        this.ctaParams = null;
        this.ctaLabel = 'Reservar cita';
      }
    });
  }

  waLink(): string {
    return this.info.whatsapp ? 'https://wa.me/' + this.info.whatsapp.replace(/\D/g, '') : '#';
  }

  scrollTo(id: string) {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}
