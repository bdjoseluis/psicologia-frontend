import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatWidgetComponent } from '../../components/chat-widget/chat-widget.component';
import { AuthService } from '../../services/auth.service';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; a: number; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatWidgetComponent],
  template: `
    <!-- ═══ SCROLL PROGRESS ═══ -->
    <div class="scroll-progress-bar" #progressBar></div>

    <!-- ═══ HERO ═══ -->
    <header class="hero" id="inicio">
      <canvas #heroCanvas class="hero-canvas"></canvas>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>

      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-badge anim-fade-up delay-0">Psicología · Sexología · Terapia de Pareja</span>
          <h1 class="anim-fade-up delay-1">Tu bienestar<br><span class="hero-accent">es nuestra prioridad</span></h1>
          <p class="anim-fade-up delay-2">Atención profesional, cercana y confidencial en Crevillent (Alicante) y online.
            Especialista en sexología, terapia de pareja, autoestima y orientación laboral.</p>
          <div class="hero-cta anim-fade-up delay-3">
            <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-primary">{{ ctaLabel }}</a>
            <a (click)="scrollTo('servicios')" class="btn-outline">Ver servicios</a>
          </div>
          <div class="hero-trust anim-fade-up delay-4">
            <div class="trust-item"><span class="trust-check">✓</span> Online y presencial</div>
            <div class="trust-item"><span class="trust-check">✓</span> Total confidencialidad</div>
            <div class="trust-item"><span class="trust-check">✓</span> Primera consulta orientativa</div>
          </div>
        </div>
        <div class="hero-visual anim-fade-left delay-2" #heroLogo>
          <div class="hero-logo-wrap">
            <div class="hero-glow"></div>
            <img src="/logo-devesan-2026.png" alt="PsicoSalud Devesan" />
          </div>
        </div>
      </div>

      <div class="scroll-indicator anim-fade-up delay-5">
        <span>Descubre más</span>
        <div class="scroll-line-wrap"><div class="scroll-line"></div></div>
      </div>
    </header>

    <!-- ═══ STATS ═══ -->
    <section class="stats-section">
      <div class="stats-inner">
        <div class="stat-item reveal reveal-up" *ngFor="let s of stats; let i = index" [style.--delay]="(i * 0.1) + 's'">
          <div class="stat-num-wrap">
            <span class="stat-number" [attr.data-target]="s.value">0</span><span class="stat-sfx">{{ s.suffix }}</span>
          </div>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ SERVICIOS ═══ -->
    <section id="servicios" class="section section-light">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <span class="section-eyebrow">Lo que ofrecemos</span>
          <h2>Nuestros servicios</h2>
          <p>Atención especializada adaptada a tus necesidades</p>
        </div>
        <div class="services-grid">
          <div class="service-card reveal reveal-up"
               [style.--delay]="(i * 0.08) + 's'"
               (mousemove)="onCardTilt($event)"
               (mouseleave)="onCardReset($event)"
               *ngFor="let svc of services; let i = index">
            <div class="svc-icon" [ngClass]="svc.iconClass"><i [class]="svc.icon"></i></div>
            <h4>{{ svc.title }}</h4>
            <p>{{ svc.desc }}</p>
            <div class="svc-price">{{ svc.price }}</div>
            <div class="card-shine"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SOBRE ═══ -->
    <section id="sobre" class="section section-warm">
      <div class="section-inner">
        <div class="about-wrap">
          <div class="about-img-wrap reveal reveal-left">
            <div class="about-img-frame">
              <img src="/image.png" alt="Dolores Devesa Santacruz" class="about-photo" />
            </div>
            <div class="about-badge">Col. nº XXXXXXXXX</div>
            <div class="about-years">
              <span class="years-num">10+</span>
              <span class="years-lbl">años de<br>experiencia</span>
            </div>
          </div>
          <div class="about-content reveal reveal-right">
            <span class="section-tag">Sobre mí</span>
            <h2>Dolores Devesa Santacruz</h2>
            <p class="about-role">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
            <p>Con amplia experiencia en acompañamiento emocional y desarrollo personal, trabajo desde un enfoque integrador, humano y basado en la evidencia científica.</p>
            <p>Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones, superar dificultades y alcanzar tu bienestar.</p>
            <div class="about-tags">
              <span class="about-tag" *ngFor="let tag of aboutTags">{{ tag }}</span>
            </div>
            <a routerLink="/registro" class="btn-primary mt-3">Pedir cita con Dolores</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PROCESO ═══ -->
    <section class="section section-light">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <span class="section-eyebrow">Cómo funciona</span>
          <h2>Tu camino hacia el bienestar</h2>
          <p>Un proceso sencillo, cercano y a tu ritmo</p>
        </div>
        <div class="process-grid">
          <div class="process-step reveal reveal-up"
               [style.--delay]="(i * 0.12) + 's'"
               *ngFor="let step of processSteps; let i = index">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-icon"><i [class]="step.icon"></i></div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA CENTRAL ═══ -->
    <section class="section-cta">
      <div class="cta-glow"></div>
      <div class="cta-inner">
        <div class="cta-badge reveal reveal-up">Sin compromiso</div>
        <h2 class="reveal reveal-up" [style.--delay]="'0.1s'">¿Listo para dar el primer paso?</h2>
        <p class="reveal reveal-up" [style.--delay]="'0.2s'">Reserva tu cita online en menos de 2 minutos. Sin esperas, sin llamadas.</p>
        <div class="cta-btns reveal reveal-up" [style.--delay]="'0.3s'">
          <a routerLink="/registro" class="cta-btn-primary">Crear cuenta y reservar</a>
          <a routerLink="/login" class="cta-btn-ghost">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ═══ TESTIMONIOS ═══ -->
    <section class="section section-light">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <span class="section-eyebrow">Opiniones</span>
          <h2>Lo que dicen nuestros pacientes</h2>
          <p>La confianza de quienes ya han dado el paso</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card reveal reveal-up"
               [style.--delay]="(i * 0.1) + 's'"
               *ngFor="let t of testimonials; let i = index">
            <div class="t-stars">
              <i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i>
            </div>
            <p class="t-text">"{{ t.text }}"</p>
            <div class="t-author">
              <div class="t-avatar">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.service }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACTO ═══ -->
    <section id="contacto" class="section section-warm">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <span class="section-eyebrow">Estamos aquí</span>
          <h2>Contacto</h2>
          <p>No estás solo/a. Da el primer paso hoy</p>
        </div>
        <div class="contact-grid">
          <a [href]="info.phone ? 'tel:' + info.phone : '#'" class="contact-card reveal reveal-up" [style.--delay]="'0s'">
            <div class="contact-icon blue"><i class="fas fa-phone"></i></div>
            <div><h5>Teléfono</h5><p>{{ info.phone || '+34 XXX XXX XXX' }}</p></div>
          </a>
          <a [href]="info.email ? 'mailto:' + info.email : '#'" class="contact-card reveal reveal-up" [style.--delay]="'0.08s'">
            <div class="contact-icon green"><i class="fas fa-envelope"></i></div>
            <div><h5>Email</h5><p>{{ info.email || 'consulta@devesan.com' }}</p></div>
          </a>
          <div class="contact-card reveal reveal-up" [style.--delay]="'0.16s'">
            <div class="contact-icon gold"><i class="fas fa-map-marker-alt"></i></div>
            <div><h5>Dirección</h5><p>{{ info.address || 'Crevillent, Alicante' }}</p></div>
          </div>
          <a [href]="waLink()" target="_blank" class="contact-card reveal reveal-up" [style.--delay]="'0.24s'" *ngIf="info.whatsapp">
            <div class="contact-icon whatsapp"><i class="fab fa-whatsapp"></i></div>
            <div><h5>WhatsApp</h5><p>{{ info.whatsapp }}</p></div>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ HORARIOS ═══ -->
    <section id="horarios" class="section section-light">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <span class="section-eyebrow">Disponibilidad</span>
          <h2>Horarios</h2>
          <p>Elige el momento que mejor te venga</p>
        </div>
        <div class="hours-grid">
          <div class="hours-card reveal reveal-up" [style.--delay]="'0s'">
            <div class="hours-icon"><i class="fas fa-sun"></i></div>
            <h4>Lunes a Viernes</h4>
            <div class="hours-time">{{ info.hours_lv || '9:00 – 18:00' }}</div>
            <p>Sesiones presenciales y online</p>
          </div>
          <div class="hours-card reveal reveal-up" [style.--delay]="'0.1s'">
            <div class="hours-icon"><i class="fas fa-coffee"></i></div>
            <h4>Sábados</h4>
            <div class="hours-time">{{ info.hours_sa || '9:00 – 14:00' }}</div>
            <p>Solo sesiones presenciales</p>
          </div>
          <div class="hours-card reveal reveal-up" [style.--delay]="'0.2s'">
            <div class="hours-icon"><i class="fas fa-laptop"></i></div>
            <h4>Online</h4>
            <div class="hours-time">Flexible</div>
            <p>Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MISIÓN / VISIÓN ═══ -->
    <section class="section section-warm">
      <div class="section-inner">
        <div class="section-header reveal reveal-up">
          <h2>Misión, Visión y Valores</h2>
        </div>
        <div class="mv-grid">
          <div class="mv-card mission reveal reveal-up" [style.--delay]="'0s'">
            <div class="mv-icon">🧭</div>
            <h3>Misión</h3>
            <p>Brindar acompañamiento psicológico profesional, cercano y ético a personas, parejas y familias que buscan mejorar su bienestar emocional.</p>
          </div>
          <div class="mv-card vision reveal reveal-up" [style.--delay]="'0.1s'">
            <div class="mv-icon">🌱</div>
            <h3>Visión</h3>
            <p>Convertirnos en centro de referencia en Crevillent y alrededores en psicoterapia individual, de pareja y sexología.</p>
          </div>
          <div class="mv-card values reveal reveal-up" [style.--delay]="'0.2s'">
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

    <app-chat-widget></app-chat-widget>
  `,
  styles: [`
    /* ── Scroll Progress ── */
    .scroll-progress-bar {
      position: fixed; top: 0; left: 0; height: 3px; width: 0%;
      background: linear-gradient(90deg, #bfa046, #d4b660, #f0c832);
      z-index: 9999; box-shadow: 0 0 10px rgba(191,160,70,.7); pointer-events: none;
    }

    /* ── Hero ── */
    .hero {
      position: relative; min-height: 100vh; overflow: hidden;
      display: flex; flex-direction: column; align-items: stretch; justify-content: center;
      background: linear-gradient(135deg, #fffdf5 0%, #fef9e8 40%, #f8f0dc 75%, #fffbe7 100%);
      background-size: 400% 400%; animation: aurora 14s ease infinite;
    }
    @keyframes aurora {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

    /* Orbs */
    .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(50px); animation: floatOrb linear infinite; }
    .orb-1 { width: 340px; height: 340px; top: -100px; right: -100px; background: rgba(191,160,70,.14); animation-duration: 20s; }
    .orb-2 { width: 220px; height: 220px; bottom: 5%;   left: -70px;  background: rgba(212,182,96,.11); animation-duration: 16s; animation-delay: -6s; }
    .orb-3 { width: 160px; height: 160px; top: 38%;    right: 12%;   background: rgba(191,160,70,.09); animation-duration: 24s; animation-delay: -11s; }
    .orb-4 { width: 110px; height: 110px; top: 15%;    left: 18%;    background: rgba(212,182,96,.07); animation-duration: 18s; animation-delay: -8s; }
    @keyframes floatOrb {
      0%,100% { transform: translateY(0) scale(1); }
      33%     { transform: translateY(-28px) scale(1.06); }
      66%     { transform: translateY(16px) scale(0.94); }
    }

    .hero-inner {
      max-width: 1100px; margin: 0 auto; width: 100%;
      display: flex; align-items: center; gap: 4rem; flex-wrap: wrap;
      padding: 5rem 1.5rem 4rem; position: relative; z-index: 1;
    }

    /* Hero entry animations */
    .anim-fade-up   { opacity: 0; transform: translateY(32px);  animation: fadeUp   0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-fade-left { opacity: 0; transform: translateX(40px);  animation: fadeLeft 0.85s cubic-bezier(0.22,1,0.36,1) forwards; }
    .delay-0 { animation-delay: 0.15s; } .delay-1 { animation-delay: 0.35s; }
    .delay-2 { animation-delay: 0.55s; } .delay-3 { animation-delay: 0.75s; }
    .delay-4 { animation-delay: 0.95s; } .delay-5 { animation-delay: 1.15s; }
    @keyframes fadeUp   { to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeLeft { to { opacity: 1; transform: translateX(0); } }

    .hero-text { flex: 1; min-width: 280px; }
    .hero-badge {
      display: inline-flex; align-items: center;
      background: rgba(255,251,231,.95); border: 1px solid rgba(191,160,70,.35);
      backdrop-filter: blur(8px); color: #92400e; font-size: .82rem; font-weight: 700;
      padding: 6px 18px; border-radius: 24px; margin-bottom: 1.4rem;
      box-shadow: 0 2px 14px rgba(191,160,70,.12);
    }
    .hero-text h1 {
      font-size: clamp(2.1rem, 5vw, 3.5rem); font-weight: 900;
      color: #1a1a2e; line-height: 1.12; margin-bottom: 1.2rem; letter-spacing: -.025em;
    }
    .hero-accent {
      background: linear-gradient(135deg, #bfa046, #d4b660);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-text p { color: #475569; font-size: 1.08rem; line-height: 1.78; margin-bottom: 2rem; }

    .hero-cta { display: flex; gap: .9rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .btn-primary {
      padding: 14px 30px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border-radius: 12px; font-weight: 700; font-size: 1rem;
      text-decoration: none; display: inline-block; position: relative; overflow: hidden;
      box-shadow: 0 4px 24px rgba(191,160,70,.38), 0 1px 0 rgba(255,255,255,.2) inset;
      transition: transform .22s, box-shadow .22s;
    }
    .btn-primary::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.18), transparent);
      opacity: 0; transition: opacity .22s;
    }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(191,160,70,.45); }
    .btn-primary:hover::after { opacity: 1; }
    .btn-outline {
      padding: 14px 26px; border: 2px solid rgba(191,160,70,.5); color: #92400e;
      border-radius: 12px; font-weight: 700; font-size: 1rem; text-decoration: none;
      display: inline-block; transition: all .22s; cursor: pointer; background: transparent;
    }
    .btn-outline:hover { background: rgba(255,251,231,.9); border-color: #bfa046; transform: translateY(-2px); }

    .hero-trust { display: flex; gap: 1.4rem; flex-wrap: wrap; }
    .trust-item { font-size: .88rem; color: #64748b; display: flex; align-items: center; gap: .45rem; }
    .trust-check {
      width: 18px; height: 18px; background: linear-gradient(135deg, #bfa046, #d4b660);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: .6rem; font-weight: 900; flex-shrink: 0;
    }

    .hero-visual { flex: 0 0 auto; position: relative; }
    .hero-logo-wrap { position: relative; display: inline-block; }
    .hero-logo-wrap img {
      width: clamp(180px, 22vw, 290px); height: auto; border-radius: 24px;
      box-shadow: 0 24px 64px rgba(191,160,70,.28), 0 4px 20px rgba(0,0,0,.07);
      position: relative; z-index: 1; display: block;
    }
    .hero-glow {
      position: absolute; inset: -24px; border-radius: 50%;
      background: radial-gradient(circle, rgba(191,160,70,.22), transparent 68%);
      animation: glowPulse 3.5s ease-in-out infinite; pointer-events: none;
    }
    @keyframes glowPulse {
      0%,100% { transform: scale(1);   opacity: .7; }
      50%      { transform: scale(1.1); opacity: 1; }
    }

    .scroll-indicator {
      position: absolute; bottom: 1.8rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .45rem;
      color: #94a3b8; font-size: .75rem; font-weight: 600;
      letter-spacing: .08em; text-transform: uppercase; z-index: 1;
    }
    .scroll-line-wrap { width: 1px; height: 42px; background: rgba(191,160,70,.25); overflow: hidden; position: relative; }
    .scroll-line-wrap::after {
      content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 100%;
      background: linear-gradient(180deg, transparent, #bfa046); animation: scrollDrop 2s ease-in-out infinite;
    }
    @keyframes scrollDrop { to { top: 100%; } }

    /* ── Scroll Reveal System ── */
    .reveal { opacity: 0; transition: opacity .7s cubic-bezier(0.22,1,0.36,1), transform .7s cubic-bezier(0.22,1,0.36,1); }
    .reveal.reveal-up    { transform: translateY(52px); }
    .reveal.reveal-left  { transform: translateX(-64px); }
    .reveal.reveal-right { transform: translateX(64px); }
    .reveal.in { opacity: 1; transform: translate(0); transition-delay: var(--delay, 0s); }

    /* ── Stats ── */
    .stats-section { background: linear-gradient(135deg, #1a1a2e 0%, #232946 100%); padding: 4.5rem 1.5rem; }
    .stats-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; }
    .stat-item { text-align: center; }
    .stat-num-wrap {
      display: flex; align-items: flex-end; justify-content: center; gap: .05rem;
      font-size: 3.6rem; font-weight: 900; line-height: 1; margin-bottom: .45rem;
      background: linear-gradient(135deg, #bfa046, #f0c832);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .stat-number { font-size: inherit; font-weight: inherit; }
    .stat-sfx    { font-size: 2.6rem; font-weight: 900; }
    .stat-label  { color: rgba(255,255,255,.6); font-size: .88rem; font-weight: 500; }

    /* ── Base ── */
    .section       { padding: 5.5rem 1.5rem; }
    .section-light { background: #fff; }
    .section-warm  { background: linear-gradient(135deg, #fffdf5 0%, #fdf8ec 100%); }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3.5rem; }
    .section-eyebrow {
      display: inline-block; background: #fffbe7; border: 1px solid #e8d98a; color: #92400e;
      font-size: .72rem; font-weight: 700; padding: 4px 14px; border-radius: 20px;
      letter-spacing: .1em; text-transform: uppercase; margin-bottom: .8rem;
    }
    .section-header h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 900; color: #1a1a2e; margin-bottom: .55rem; letter-spacing: -.015em; }
    .section-header p  { color: #64748b; font-size: 1.05rem; max-width: 460px; margin: 0 auto; }

    /* ── Services ── */
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.5rem; }
    .service-card {
      background: #fff; border-radius: 20px; padding: 2rem 1.8rem;
      border: 1.5px solid #f0e8c0; box-shadow: 0 2px 18px rgba(0,0,0,.04);
      display: flex; flex-direction: column; gap: .7rem;
      transition: box-shadow .2s, border-color .2s;
      position: relative; overflow: hidden; cursor: default; transform-style: preserve-3d;
    }
    .service-card:hover { box-shadow: 0 14px 44px rgba(191,160,70,.18); border-color: #d4b660; }
    .card-shine {
      position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,.45) 0%, transparent 55%);
      opacity: 0; transition: opacity .28s;
    }
    .service-card:hover .card-shine { opacity: 1; }
    .svc-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
    .svc-icon.pink   { background: #fce7f3; color: #be185d; }
    .svc-icon.teal   { background: #ccfbf1; color: #0f766e; }
    .svc-icon.purple { background: #ede9fe; color: #7c3aed; }
    .svc-icon.gold   { background: #fef9c3; color: #a16207; }
    .svc-icon.blue   { background: #dbeafe; color: #1d4ed8; }
    .svc-icon.rose   { background: #ffe4e6; color: #be123c; }
    .service-card h4 { font-size: 1.04rem; font-weight: 800; color: #1a1a2e; margin: 0; }
    .service-card p  { color: #64748b; font-size: .9rem; line-height: 1.65; margin: 0; flex: 1; }
    .svc-price       { font-weight: 800; color: #bfa046; font-size: .88rem; }

    /* ── About ── */
    .about-wrap { display: flex; gap: 5rem; align-items: center; flex-wrap: wrap; }
    .about-img-wrap { position: relative; flex: 0 0 auto; padding-bottom: 24px; }
    .about-img-frame { position: relative; }
    .about-img-frame::before {
      content: ''; position: absolute; inset: -10px; border-radius: 30px; z-index: 0;
      background: linear-gradient(135deg, rgba(191,160,70,.18), rgba(212,182,96,.08));
    }
    .about-photo {
      width: clamp(200px, 22vw, 270px); height: auto; border-radius: 20px;
      box-shadow: 0 18px 52px rgba(191,160,70,.24); position: relative; z-index: 1; display: block;
    }
    .about-badge {
      position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff;
      padding: 7px 20px; border-radius: 24px; font-size: .78rem; font-weight: 700;
      white-space: nowrap; box-shadow: 0 4px 16px rgba(191,160,70,.42); z-index: 2;
    }
    .about-years {
      position: absolute; top: -18px; right: -22px; z-index: 2;
      background: #1a1a2e; color: #fff; padding: 12px 15px; border-radius: 16px;
      text-align: center; box-shadow: 0 8px 28px rgba(26,26,46,.32);
    }
    .years-num { display: block; font-size: 1.65rem; font-weight: 900; color: #d4b660; }
    .years-lbl { font-size: .68rem; font-weight: 600; color: rgba(255,255,255,.65); line-height: 1.35; }

    .about-content { flex: 1; min-width: 280px; }
    .section-tag {
      display: inline-block; background: #fffbe7; border: 1px solid #e8d98a; color: #92400e;
      font-size: .78rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 1rem;
    }
    .about-content h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 900; color: #1a1a2e; margin-bottom: .35rem; letter-spacing: -.02em; }
    .about-role { color: #bfa046; font-weight: 700; margin-bottom: 1.3rem; font-size: 1rem; }
    .about-content p { color: #475569; line-height: 1.78; margin-bottom: .9rem; }
    .about-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.3rem 0; }
    .about-tag {
      background: #f1f5f9; color: #374151; padding: 5px 14px; border-radius: 20px;
      font-size: .82rem; font-weight: 600; border: 1px solid #e2e8f0; transition: background .2s, border-color .2s;
    }
    .about-tag:hover { background: #fffbe7; border-color: #e8d98a; }
    .mt-3 { margin-top: 1.2rem; }

    /* ── Process ── */
    .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .process-step {
      background: linear-gradient(135deg, #fffdf5, #fefce8);
      border-radius: 20px; border: 1.5px solid #f0e8c0;
      padding: 2.2rem 1.5rem 1.8rem; text-align: center; position: relative;
      transition: transform .22s, box-shadow .22s;
    }
    .process-step:hover { transform: translateY(-5px); box-shadow: 0 14px 40px rgba(191,160,70,.14); }
    .step-num {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      width: 28px; height: 28px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; font-weight: 900; font-size: .8rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 12px rgba(191,160,70,.45);
    }
    .step-icon {
      width: 62px; height: 62px; border-radius: 50%; margin: 0 auto 1rem;
      background: linear-gradient(135deg, #fffbe7, #fff); border: 2px solid #f0e8c0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; color: #bfa046; box-shadow: 0 4px 18px rgba(191,160,70,.14);
    }
    .process-step h4 { font-size: 1rem; font-weight: 800; color: #1a1a2e; margin-bottom: .5rem; }
    .process-step p  { color: #64748b; font-size: .88rem; line-height: 1.62; }

    /* ── CTA ── */
    .section-cta {
      background: linear-gradient(135deg, #1a1a2e 0%, #2d2b55 100%);
      padding: 5.5rem 1.5rem; text-align: center; position: relative; overflow: hidden;
    }
    .cta-glow {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at 15% 50%, rgba(191,160,70,.09), transparent 55%),
                  radial-gradient(ellipse at 85% 50%, rgba(212,182,96,.07), transparent 55%);
    }
    .cta-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 1; }
    .cta-badge {
      display: inline-block; background: rgba(191,160,70,.14); border: 1px solid rgba(191,160,70,.3);
      color: #d4b660; font-size: .72rem; font-weight: 700; padding: 4px 14px;
      border-radius: 20px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 1.2rem;
    }
    .cta-inner h2 { font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 900; color: #fff; margin-bottom: .8rem; }
    .cta-inner p  { color: rgba(255,255,255,.7); font-size: 1.1rem; margin-bottom: 2.5rem; }
    .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .cta-btn-primary {
      padding: 15px 36px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border-radius: 12px; font-weight: 800; font-size: 1.05rem;
      text-decoration: none; box-shadow: 0 4px 24px rgba(191,160,70,.42); transition: opacity .2s, transform .2s;
    }
    .cta-btn-primary:hover { opacity: .92; transform: translateY(-3px); }
    .cta-btn-ghost {
      padding: 15px 30px; border: 2px solid rgba(255,255,255,.25);
      color: #fff; border-radius: 12px; font-weight: 700; font-size: 1.05rem;
      text-decoration: none; transition: all .2s;
    }
    .cta-btn-ghost:hover { border-color: rgba(255,255,255,.5); background: rgba(255,255,255,.07); }

    /* ── Testimonials ── */
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .testimonial-card {
      background: linear-gradient(135deg, #fffdf5, #fffbe7);
      border-radius: 20px; padding: 2rem 1.8rem; border: 1.5px solid #f0e8c0;
      box-shadow: 0 4px 20px rgba(191,160,70,.08); transition: transform .22s, box-shadow .22s;
    }
    .testimonial-card:hover { transform: translateY(-6px); box-shadow: 0 16px 44px rgba(191,160,70,.16); }
    .t-stars { color: #f59e0b; font-size: .88rem; display: flex; gap: .18rem; margin-bottom: 1rem; }
    .t-text  { color: #374151; font-size: .95rem; line-height: 1.72; margin-bottom: 1.5rem; font-style: italic; }
    .t-author { display: flex; align-items: center; gap: .8rem; }
    .t-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 1rem; flex-shrink: 0;
    }
    .t-author strong { display: block; font-size: .9rem; color: #1a1a2e; font-weight: 700; }
    .t-author span   { font-size: .8rem; color: #64748b; }

    /* ── Contact ── */
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; }
    .contact-card {
      background: #fff; border-radius: 18px; padding: 1.5rem 1.3rem;
      display: flex; align-items: flex-start; gap: 1rem;
      border: 1.5px solid #f0e8c0; text-decoration: none;
      box-shadow: 0 2px 14px rgba(0,0,0,.04); transition: transform .2s, box-shadow .2s, border-color .2s;
    }
    .contact-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(191,160,70,.14); border-color: #d4b660; }
    .contact-icon { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .contact-icon.blue     { background: #dbeafe; color: #1d4ed8; }
    .contact-icon.green    { background: #dcfce7; color: #15803d; }
    .contact-icon.gold     { background: #fef9c3; color: #a16207; }
    .contact-icon.whatsapp { background: #dcfce7; color: #16a34a; }
    .contact-card h5 { font-size: .85rem; font-weight: 700; color: #374151; margin: 0 0 .25rem; }
    .contact-card p  { font-size: .9rem; color: #64748b; margin: 0; }

    /* ── Hours ── */
    .hours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
    .hours-card {
      background: linear-gradient(135deg, #fff, #fffdf5);
      border-radius: 20px; padding: 2.2rem 1.5rem; text-align: center;
      border: 1.5px solid #f0e8c0; box-shadow: 0 2px 14px rgba(0,0,0,.04);
      transition: transform .22s, box-shadow .22s;
    }
    .hours-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(191,160,70,.13); }
    .hours-icon { font-size: 1.9rem; margin-bottom: .8rem; color: #bfa046; }
    .hours-card h4   { font-weight: 800; color: #1a1a2e; margin-bottom: .5rem; font-size: 1rem; }
    .hours-time      { font-size: 1.7rem; font-weight: 900; color: #bfa046; margin-bottom: .5rem; }
    .hours-card p    { color: #64748b; font-size: .88rem; margin: 0; }

    /* ── Mission/Vision ── */
    .mv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .mv-card { border-radius: 20px; padding: 2rem 1.8rem; border: 1.5px solid #f0e8c0; transition: transform .22s, box-shadow .22s; }
    .mv-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(191,160,70,.1); }
    .mv-card.mission { background: linear-gradient(135deg, #fffdf5, #fefce8); }
    .mv-card.vision  { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); }
    .mv-card.values  { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); }
    .mv-icon { font-size: 2.2rem; margin-bottom: .8rem; }
    .mv-card h3 { font-size: 1.1rem; font-weight: 800; color: #1a1a2e; margin-bottom: .8rem; }
    .mv-card p  { color: #475569; line-height: 1.72; margin: 0; font-size: .95rem; }
    .mv-card ul { list-style: none; padding: 0; margin: 0; }
    .mv-card ul li { color: #475569; padding: .42rem 0; font-size: .95rem; border-bottom: 1px solid rgba(0,0,0,.05); display: flex; align-items: center; gap: .5rem; }
    .mv-card ul li::before { content: '✓'; color: #bfa046; font-weight: 700; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .hero-inner { gap: 2rem; flex-direction: column-reverse; align-items: center; text-align: center; padding: 4rem 1.2rem 3rem; }
      .hero-text h1 { font-size: 2rem; }
      .hero-cta, .hero-trust { justify-content: center; }
      .about-wrap { flex-direction: column; align-items: center; text-align: center; gap: 3rem; }
      .about-tags { justify-content: center; }
      .about-years { right: -8px; top: -10px; }
      .section { padding: 3.8rem 1.2rem; }
      .stats-section { padding: 3rem 1.2rem; }
      .stat-num-wrap { font-size: 2.8rem; }
      .scroll-indicator { display: none; }
      .hero-logo-wrap img { width: 180px; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('heroCanvas')  heroCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroLogo')    heroLogo!: ElementRef<HTMLDivElement>;

  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';

  stats = [
    { value: 10,  suffix: '+', label: 'Años de experiencia'  },
    { value: 500, suffix: '+', label: 'Pacientes atendidos'  },
    { value: 97,  suffix: '%', label: 'Tasa de satisfacción' },
    { value: 4,   suffix: '',  label: 'Especialidades'       },
  ];

  services = [
    { title: 'Terapia de pareja',   desc: 'Acompañamiento en crisis de pareja, desengaños, divorcio y duelos relacionales.',                       price: '70 €/sesión', icon: 'fas fa-heart',      iconClass: 'pink'   },
    { title: 'Sexología',           desc: 'Terapia sexual, disfunciones, educación sexual y apoyo a parejas con problemas reproductivos.',          price: '60 €/sesión', icon: 'fas fa-venus-mars', iconClass: 'teal'   },
    { title: 'Terapia individual',  desc: 'Autoestima, ansiedad, depresión, duelo, gestión emocional y crecimiento personal.',                      price: '60 €/sesión', icon: 'fas fa-brain',      iconClass: 'purple' },
    { title: 'Orientación laboral', desc: 'Currículums, portfolios, preparación de entrevistas y videocurriculums profesionales.',                   price: '50 €/sesión', icon: 'fas fa-briefcase',  iconClass: 'gold'   },
    { title: 'Empresas',            desc: 'Talleres de motivación, comunicación y habilidades sociales para equipos.',                              price: 'Consultar',   icon: 'fas fa-building',   iconClass: 'blue'   },
    { title: 'Grupos y talleres',   desc: 'Grupos de duelo, talleres de autoestima, biodanza, risoterapia y habilidades sociales.',                 price: 'Consultar',   icon: 'fas fa-users',      iconClass: 'rose'   },
  ];

  processSteps = [
    { icon: 'fas fa-phone-alt',      title: 'Contacta con nosotros',   desc: 'Llámanos, escríbenos por WhatsApp o rellena el formulario online. Sin compromiso.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',        desc: 'Una sesión inicial orientativa para conocernos y entender tus necesidades.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',      desc: 'Diseñamos juntos un plan terapéutico adaptado a tus objetivos y ritmo de vida.' },
    { icon: 'fas fa-seedling',       title: 'Transforma tu bienestar', desc: 'Con sesiones regulares avanzas hacia una vida más plena y equilibrada.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia en mi vida.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió completamente. Aprendimos a comunicarnos de verdad y a entendernos mejor.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en 3 semanas con su ayuda. El portfolio que diseñamos juntas fue clave en el proceso.' },
  ];

  aboutTags = ['Terapia cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  private particles: Particle[] = [];
  private animId = 0;
  private revealObs!: IntersectionObserver;
  private counterObs!: IntersectionObserver;
  private resizeHandler!: () => void;
  private scrollTicking = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: (r) => { const rows: any[] = r.info || []; rows.forEach((item: any) => { this.info[item.key] = item.value; }); },
      error: () => {}
    });
    this.auth.user$.subscribe(user => {
      if (user?.role === 'patient') { this.ctaLink = '/mi-area'; this.ctaParams = { tab: 'reservar' }; this.ctaLabel = 'Reservar cita'; }
      else if (user?.role === 'admin') { this.ctaLink = '/admin'; this.ctaParams = null; this.ctaLabel = 'Panel admin'; }
      else { this.ctaLink = '/registro'; this.ctaParams = null; this.ctaLabel = 'Reservar cita'; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.initParticles(); this.initReveal(); this.initCounters(); }, 80);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    this.revealObs?.disconnect();
    this.counterObs?.disconnect();
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      const el = this.progressBar?.nativeElement;
      if (el) el.style.width = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100) + '%';
      const logo = this.heroLogo?.nativeElement;
      if (logo) logo.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      this.scrollTicking = false;
    });
  }

  private initParticles(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    this.resizeHandler = resize; resize();
    window.addEventListener('resize', resize);

    const n = Math.min(55, Math.floor(canvas.width / 18));
    this.particles = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2 + 0.8, a: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = this.particles;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(191,160,70,${(1 - d / 115) * 0.14})`; ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
        const p = pts[i];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(191,160,70,${p.a})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      this.animId = requestAnimationFrame(draw);
    };
    draw();
  }

  private initReveal(): void {
    this.revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); this.revealObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -55px 0px' });
    setTimeout(() => { document.querySelectorAll('.reveal').forEach(el => this.revealObs.observe(el)); }, 180);
  }

  private initCounters(): void {
    this.counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseInt(el.getAttribute('data-target') || '0');
        const t0 = performance.now();
        const tick = (now: number) => {
          const prog = Math.min((now - t0) / 1800, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - prog, 3)) * target).toString();
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        this.counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    setTimeout(() => { document.querySelectorAll('.stat-number').forEach(el => this.counterObs.observe(el)); }, 260);
  }

  onCardTilt(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const r = card.getBoundingClientRect();
    const rx = ((event.clientY - r.top  - r.height / 2) / (r.height / 2)) * -7;
    const ry = ((event.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  7;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    card.style.transition = 'transform 0.08s ease';
  }

  onCardReset(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; card.style.transform = ''; }, 460);
  }

  waLink(): string { return this.info.whatsapp ? 'https://wa.me/' + this.info.whatsapp.replace(/\D/g, '') : '#'; }

  scrollTo(id: string): void {
    setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  }
}
