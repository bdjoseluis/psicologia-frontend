import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
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
    <div class="scroll-bar" [style.transform]="'scaleX(' + scrollPct/100 + ')'"></div>

    <!-- ═══ HERO ═══ -->
    <section class="hero" id="inicio">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="eyebrow fade d1">
            <span class="eyebrow-pill">Crevillent &amp; Online</span>
            <span class="eyebrow-line"></span>
            <span>Primera consulta gratuita</span>
          </div>
          <h1 class="fade d2">
            Tu bienestar<br><span class="gold-text">comienza aquí</span>
          </h1>
          <p class="hero-p fade d3">
            Psicología, sexología y terapia de pareja. Acompañamiento profesional,
            cercano y confidencial para que puedas ser la mejor versión de ti mismo/a.
          </p>
          <div class="hero-actions fade d4">
            <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-gold">{{ ctaLabel }}</a>
            <a (click)="scrollTo('servicios')" class="btn-outline">Ver servicios ↓</a>
          </div>
          <div class="trust-row fade d5">
            <div class="trust-item" *ngFor="let t of trustItems">
              <i [class]="t.icon"></i>
              <span>{{ t.text }}</span>
            </div>
          </div>
        </div>

        <div class="hero-photo fade-right d2">
          <div class="photo-frame">
            <img src="/image.png" alt="Dolores Devesa Santacruz – Psicóloga" />
            <div class="photo-badge top-badge">
              <i class="fas fa-award"></i>
              <div>
                <strong>10+ años</strong>
                <small>de experiencia</small>
              </div>
            </div>
            <div class="photo-badge bot-badge">
              <i class="fas fa-heart"></i>
              <div>
                <strong>500+ pacientes</strong>
                <small>ayudados</small>
              </div>
            </div>
            <div class="photo-glow"></div>
          </div>
        </div>
      </div>

      <div class="hero-scroll-hint fade d5">
        <div class="mouse"><div class="mouse-wheel"></div></div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- ═══ SERVICIOS ═══ -->
    <section id="servicios" class="section bg-cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="label">Servicios</span>
          <h2>¿En qué podemos ayudarte?</h2>
          <p>Cada persona es única. Ofrecemos atención personalizada en distintas áreas.</p>
        </div>

        <div class="services-grid">
          <div class="svc-card reveal" *ngFor="let s of services; let i = index"
               [style.--i]="i">
            <div class="svc-icon-wrap">
              <i [class]="s.icon"></i>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <div class="svc-footer">
              <span class="svc-price">{{ s.price }}</span>
              <a [routerLink]="ctaLink" class="svc-cta">Reservar →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SOBRE MÍ ═══ -->
    <section id="sobre" class="section about-section">
      <div class="about-photo reveal-left">
        <div class="about-img-wrap">
          <img src="/image.png" alt="Dolores Devesa" />
          <div class="about-exp-badge">
            <span class="big-num">10+</span>
            <span>años de<br>experiencia</span>
          </div>
        </div>
      </div>

      <div class="about-text reveal-right">
        <span class="label">Sobre mí</span>
        <h2 class="about-name">Dolores Devesa<br>Santacruz</h2>
        <p class="about-title">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
        <p>Con amplia experiencia en acompañamiento emocional y desarrollo personal,
           trabajo desde un enfoque integrador, humano y basado en la evidencia científica.</p>
        <p>Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones,
           superar dificultades y alcanzar tu bienestar.</p>

        <div class="specialties">
          <span *ngFor="let t of aboutTags">{{ t }}</span>
        </div>

        <a routerLink="/registro" class="btn-gold">Pedir cita con Dolores</a>
      </div>
    </section>

    <!-- ═══ STATS ═══ -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat reveal" *ngFor="let s of stats; let i = index" [style.--i]="i">
            <div class="stat-num">
              <span class="counter" [attr.data-target]="s.value">0</span>{{ s.suffix }}
            </div>
            <p>{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PROCESO ═══ -->
    <section class="section bg-cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="label">Cómo funciona</span>
          <h2>Tu camino al bienestar</h2>
        </div>

        <div class="process-steps">
          <div class="step reveal" *ngFor="let s of processSteps; let i = index" [style.--i]="i">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-icon"><i [class]="s.icon"></i></div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TESTIMONIOS ═══ -->
    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="label">Opiniones</span>
          <h2>Lo que dicen nuestros pacientes</h2>
        </div>

        <div class="testi-grid">
          <div class="testi reveal" *ngFor="let t of testimonials; let i = index" [style.--i]="i">
            <div class="stars"><i class="fas fa-star" *ngFor="let _ of [0,0,0,0,0]"></i></div>
            <p class="testi-text">"{{ t.text }}"</p>
            <div class="testi-author">
              <div class="avatar">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <small>{{ t.service }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text reveal">
          <span class="label-light">Sin compromiso</span>
          <h2>¿Listo para dar el primer paso?</h2>
          <p>Reserva tu cita en menos de 2 minutos. La primera consulta es gratuita.</p>
        </div>
        <div class="cta-actions reveal">
          <a routerLink="/registro" class="btn-gold-lg">Crear cuenta y reservar</a>
          <a routerLink="/login" class="btn-ghost-light">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACTO ═══ -->
    <section id="contacto" class="section bg-cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="label">Contacto</span>
          <h2>Hablemos</h2>
          <p>El primer paso es el más difícil, y lo puedes dar hoy.</p>
        </div>

        <div class="contact-grid">
          <a [href]="info.phone ? 'tel:' + info.phone : '#'" class="contact-card reveal" [style.--i]="0">
            <div class="cc-ico"><i class="fas fa-phone-alt"></i></div>
            <strong>Teléfono</strong>
            <span>{{ info.phone || '+34 XXX XXX XXX' }}</span>
          </a>
          <a [href]="info.email ? 'mailto:' + info.email : '#'" class="contact-card reveal" [style.--i]="1">
            <div class="cc-ico"><i class="fas fa-envelope"></i></div>
            <strong>Email</strong>
            <span>{{ info.email || 'consulta@devesan.com' }}</span>
          </a>
          <div class="contact-card reveal" [style.--i]="2">
            <div class="cc-ico"><i class="fas fa-map-marker-alt"></i></div>
            <strong>Dirección</strong>
            <span>{{ info.address || 'Crevillent, Alicante' }}</span>
          </div>
          <a [href]="waLink()" target="_blank" class="contact-card wa-card reveal" [style.--i]="3" *ngIf="info.whatsapp">
            <div class="cc-ico"><i class="fab fa-whatsapp"></i></div>
            <strong>WhatsApp</strong>
            <span>{{ info.whatsapp }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ HORARIOS ═══ -->
    <section id="horarios" class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="label">Disponibilidad</span>
          <h2>Horarios</h2>
        </div>

        <div class="hours-grid">
          <div class="hours-card reveal" [style.--i]="0">
            <i class="fas fa-sun"></i>
            <h4>Lunes a Viernes</h4>
            <div class="hours-time">{{ info.hours_lv || '9:00 – 18:00' }}</div>
            <p>Presencial y online</p>
          </div>
          <div class="hours-card reveal" [style.--i]="1">
            <i class="fas fa-coffee"></i>
            <h4>Sábados</h4>
            <div class="hours-time">{{ info.hours_sa || '9:00 – 14:00' }}</div>
            <p>Solo presencial</p>
          </div>
          <div class="hours-card reveal" [style.--i]="2">
            <i class="fas fa-laptop"></i>
            <h4>Online</h4>
            <div class="hours-time">Flexible</div>
            <p>Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <app-chat-widget></app-chat-widget>
  `,

  styles: [`
    :host { display: block; }
    * { box-sizing: border-box; }

    /* ── VARIABLES ── */
    :host {
      --gold:       #c9a044;
      --gold-light: #e2c06a;
      --gold-dark:  #a8852e;
      --navy:       #1c2131;
      --navy-mid:   #2c3450;
      --text:       #374151;
      --muted:      #6b7280;
      --bg:         #faf9f7;
      --bg-cream:   #f3ede2;
      --bg-dark:    #1c2131;
      --border:     #e5ddd0;
      --white:      #ffffff;
      --radius:     16px;
      --shadow:     0 4px 24px rgba(0,0,0,.07);
      --shadow-lg:  0 12px 48px rgba(0,0,0,.12);
    }

    /* ── SCROLL BAR ── */
    .scroll-bar {
      position: fixed; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--gold), var(--gold-light));
      transform-origin: left; transform: scaleX(0);
      z-index: 9999; pointer-events: none;
      box-shadow: 0 0 10px rgba(201,160,68,.5);
    }

    /* ── SHARED ── */
    .container { max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; }
    .section { padding: 6rem 0; background: var(--bg); }
    .bg-cream { background: var(--bg-cream); }

    .section-head { text-align: center; margin-bottom: 3.5rem; }
    .section-head h2 {
      font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
      color: var(--navy); letter-spacing: -.02em;
      margin: .4rem 0 .8rem; line-height: 1.15;
    }
    .section-head p { color: var(--muted); font-size: 1.05rem; max-width: 520px; margin: 0 auto; }

    .label {
      display: inline-block; font-size: .72rem; font-weight: 800;
      letter-spacing: .14em; text-transform: uppercase;
      color: var(--gold); margin-bottom: .5rem;
    }
    .label-light {
      display: inline-block; font-size: .72rem; font-weight: 800;
      letter-spacing: .14em; text-transform: uppercase;
      color: rgba(201,160,68,.8); margin-bottom: .5rem;
    }

    /* ── BUTTONS ── */
    .btn-gold {
      display: inline-block; padding: 14px 32px;
      background: var(--gold); color: var(--white);
      border-radius: 50px; font-weight: 700; font-size: .95rem;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(201,160,68,.35);
      transition: transform .2s, box-shadow .2s, background .2s;
    }
    .btn-gold:hover {
      background: var(--gold-dark); transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(201,160,68,.45);
    }

    .btn-outline {
      display: inline-block; padding: 14px 28px;
      border: 2px solid var(--navy); color: var(--navy);
      border-radius: 50px; font-weight: 700; font-size: .95rem;
      text-decoration: none; cursor: pointer;
      transition: all .2s;
    }
    .btn-outline:hover { background: var(--navy); color: var(--white); }

    .btn-gold-lg {
      display: inline-block; padding: 18px 44px;
      background: var(--gold); color: var(--white);
      border-radius: 50px; font-weight: 800; font-size: 1.05rem;
      text-decoration: none;
      box-shadow: 0 6px 28px rgba(201,160,68,.4);
      transition: transform .2s, box-shadow .2s;
    }
    .btn-gold-lg:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(201,160,68,.5); }

    .btn-ghost-light {
      display: inline-block; padding: 18px 32px;
      border: 2px solid rgba(255,255,255,.25); color: rgba(255,255,255,.85);
      border-radius: 50px; font-weight: 700; font-size: 1.05rem;
      text-decoration: none; transition: all .2s;
    }
    .btn-ghost-light:hover { border-color: rgba(255,255,255,.6); color: var(--white); }

    /* ── REVEAL ANIMATIONS ── */
    .reveal {
      opacity: 0; transform: translateY(40px);
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
      transition-delay: calc(var(--i, 0) * .08s);
    }
    .reveal.in { opacity: 1; transform: none; }

    .reveal-left {
      opacity: 0; transform: translateX(-50px);
      transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
    }
    .reveal-left.in { opacity: 1; transform: none; }

    .reveal-right {
      opacity: 0; transform: translateX(50px);
      transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
    }
    .reveal-right.in { opacity: 1; transform: none; }

    /* Hero entry */
    .fade { opacity: 0; transform: translateY(22px); animation: fadeUp .7s cubic-bezier(.22,1,.36,1) forwards; }
    .fade-right { opacity: 0; transform: translateX(40px); animation: fadeRight .85s cubic-bezier(.22,1,.36,1) forwards; }
    .d1 { animation-delay: .1s; } .d2 { animation-delay: .25s; }
    .d3 { animation-delay: .4s; } .d4 { animation-delay: .55s; }
    .d5 { animation-delay: .7s; }
    @keyframes fadeUp   { to { opacity: 1; transform: none; } }
    @keyframes fadeRight{ to { opacity: 1; transform: none; } }

    /* ── HERO ── */
    .hero {
      min-height: 100vh; background: var(--bg);
      display: flex; flex-direction: column; justify-content: center;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; right: 0; top: 0; bottom: 0; width: 45%;
      background: linear-gradient(135deg, #f3ede2 0%, #e8ddc8 100%);
      clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
    }

    .hero-inner {
      max-width: 1140px; margin: 0 auto; padding: 5rem 1.5rem 4rem;
      display: grid; grid-template-columns: 1fr 1fr;
      align-items: center; gap: 4rem;
      position: relative; z-index: 1;
    }

    .gold-text {
      background: linear-gradient(135deg, var(--gold-dark), var(--gold-light));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .eyebrow {
      display: flex; align-items: center; gap: .8rem;
      font-size: .78rem; font-weight: 700; letter-spacing: .1em;
      text-transform: uppercase; color: var(--muted); margin-bottom: 1.5rem;
    }
    .eyebrow-pill {
      background: rgba(201,160,68,.12); color: var(--gold-dark);
      padding: 4px 12px; border-radius: 20px; font-size: .72rem;
      border: 1px solid rgba(201,160,68,.2);
    }
    .eyebrow-line { flex: 0 0 28px; height: 1px; background: var(--border); }

    .hero-text h1 {
      font-size: clamp(2.6rem, 5vw, 5rem);
      font-weight: 900; line-height: 1.08;
      letter-spacing: -.03em; color: var(--navy);
      margin: 0 0 1.5rem;
    }

    .hero-p {
      font-size: 1.05rem; color: var(--muted); line-height: 1.75;
      max-width: 440px; margin-bottom: 2.5rem;
    }

    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }

    .trust-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .trust-item { display: flex; align-items: center; gap: .5rem; font-size: .83rem; font-weight: 600; color: var(--muted); }
    .trust-item i { color: var(--gold); font-size: .9rem; }

    /* Hero photo */
    .hero-photo { display: flex; justify-content: center; align-items: center; }
    .photo-frame {
      position: relative; width: 380px; height: 460px;
      border-radius: 28px; overflow: visible;
    }
    .photo-frame img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center;
      border-radius: 24px;
      box-shadow: var(--shadow-lg);
    }
    .photo-glow {
      position: absolute; inset: -4px; border-radius: 28px;
      background: linear-gradient(135deg, rgba(201,160,68,.3), transparent 60%);
      z-index: -1;
    }
    .photo-badge {
      position: absolute; background: var(--white);
      border-radius: 14px; padding: 10px 16px;
      display: flex; align-items: center; gap: .7rem;
      box-shadow: 0 8px 30px rgba(0,0,0,.12);
      white-space: nowrap;
    }
    .photo-badge i { color: var(--gold); font-size: 1.1rem; }
    .photo-badge strong { display: block; font-size: .9rem; font-weight: 800; color: var(--navy); }
    .photo-badge small { font-size: .75rem; color: var(--muted); }
    .top-badge { top: 1.5rem; left: -2rem; }
    .bot-badge { bottom: 1.5rem; right: -2rem; }

    /* Hero scroll hint */
    .hero-scroll-hint {
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .5rem;
      font-size: .72rem; font-weight: 700; letter-spacing: .1em;
      text-transform: uppercase; color: var(--muted); z-index: 1;
    }
    .mouse {
      width: 22px; height: 34px; border: 2px solid var(--border);
      border-radius: 11px; display: flex; justify-content: center; padding: 5px 0;
    }
    .mouse-wheel {
      width: 3px; height: 7px; background: var(--gold);
      border-radius: 2px; animation: scroll-wheel 1.6s ease infinite;
    }
    @keyframes scroll-wheel { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:.3;transform:translateY(8px)} }

    /* ── SERVICIOS ── */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .svc-card {
      background: var(--white); border-radius: var(--radius);
      padding: 2rem 1.8rem; border: 1.5px solid var(--border);
      display: flex; flex-direction: column; gap: .75rem;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i, 0) * .06s);
    }
    .svc-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,.09);
      border-color: var(--gold-light);
    }
    .svc-icon-wrap {
      width: 52px; height: 52px; border-radius: 14px;
      background: rgba(201,160,68,.1);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; color: var(--gold);
      transition: background .2s;
    }
    .svc-card:hover .svc-icon-wrap { background: rgba(201,160,68,.18); }
    .svc-card h3 { font-size: 1.1rem; font-weight: 800; color: var(--navy); margin: 0; }
    .svc-card p { color: var(--muted); font-size: .9rem; line-height: 1.65; margin: 0; flex: 1; }
    .svc-footer { display: flex; align-items: center; justify-content: space-between; margin-top: .5rem; }
    .svc-price { font-size: .9rem; font-weight: 700; color: var(--gold-dark); }
    .svc-cta {
      font-size: .85rem; font-weight: 700; color: var(--navy);
      text-decoration: none; transition: color .15s;
    }
    .svc-cta:hover { color: var(--gold); }

    /* ── SOBRE MÍ ── */
    .about-section {
      display: grid; grid-template-columns: 1fr 1fr;
      min-height: 80vh; overflow: hidden; background: var(--bg);
      padding: 0;
    }
    .about-photo { overflow: hidden; background: var(--bg-cream); }
    .about-img-wrap { position: relative; height: 100%; min-height: 500px; }
    .about-img-wrap img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;
    }
    .about-exp-badge {
      position: absolute; bottom: 2rem; right: 2rem;
      background: var(--white); border-radius: 14px;
      padding: 1rem 1.4rem; text-align: center;
      box-shadow: 0 8px 28px rgba(0,0,0,.12);
    }
    .about-exp-badge .big-num {
      display: block; font-size: 2.5rem; font-weight: 900; color: var(--gold);
      line-height: 1;
    }
    .about-exp-badge span:last-child { font-size: .78rem; color: var(--muted); font-weight: 600; line-height: 1.4; }

    .about-text {
      padding: 5rem 4rem; display: flex; flex-direction: column;
      justify-content: center; gap: 1rem;
    }
    .about-name {
      font-size: clamp(1.8rem, 3vw, 3rem); font-weight: 900;
      color: var(--navy); line-height: 1.1; letter-spacing: -.02em;
      margin: .4rem 0 0;
    }
    .about-title { color: var(--gold); font-weight: 700; font-size: .95rem; margin-bottom: .5rem; }
    .about-text p { color: var(--text); line-height: 1.75; font-size: .97rem; margin: 0; }

    .specialties { display: flex; flex-wrap: wrap; gap: .5rem; margin: .5rem 0; }
    .specialties span {
      background: var(--bg-cream); border: 1px solid var(--border);
      color: var(--navy); font-size: .8rem; font-weight: 600;
      padding: 5px 14px; border-radius: 20px;
    }

    /* ── STATS ── */
    .stats-section { background: var(--navy); padding: 5rem 0; }
    .stats-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 2rem; text-align: center;
    }
    .stat { transition-delay: calc(var(--i, 0) * .1s); }
    .stat-num {
      font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 900; line-height: 1;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      margin-bottom: .6rem;
    }
    .stat p { color: rgba(255,255,255,.55); font-size: .9rem; font-weight: 500; margin: 0; }

    /* ── PROCESO ── */
    .process-steps {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem; position: relative;
    }
    .step {
      background: var(--white); border-radius: var(--radius);
      padding: 2rem 1.5rem; position: relative;
      border: 1.5px solid var(--border);
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i, 0) * .07s);
    }
    .step:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
    .step-num {
      position: absolute; top: -14px; left: 1.5rem;
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--gold); color: var(--white);
      font-weight: 900; font-size: .85rem;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(201,160,68,.35);
    }
    .step-icon {
      width: 52px; height: 52px; border-radius: 14px;
      background: rgba(201,160,68,.1); color: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; margin-bottom: 1rem;
    }
    .step h4 { font-size: 1rem; font-weight: 800; color: var(--navy); margin-bottom: .5rem; }
    .step p  { color: var(--muted); font-size: .87rem; line-height: 1.65; margin: 0; }

    /* ── TESTIMONIOS ── */
    .testi-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .testi {
      background: var(--bg-cream); border-radius: var(--radius);
      padding: 2rem 1.8rem; border: 1.5px solid var(--border);
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i, 0) * .08s);
    }
    .testi:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
    .stars { color: #f59e0b; display: flex; gap: .15rem; margin-bottom: 1rem; font-size: .85rem; }
    .testi-text {
      color: var(--text); font-size: .97rem; line-height: 1.72;
      margin-bottom: 1.5rem; font-style: italic;
    }
    .testi-author { display: flex; align-items: center; gap: .8rem; }
    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, var(--navy), var(--navy-mid));
      color: var(--white); font-weight: 800; font-size: .95rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .testi-author strong { display: block; font-size: .9rem; color: var(--navy); font-weight: 800; }
    .testi-author small  { font-size: .8rem; color: var(--muted); }

    /* ── CTA ── */
    .cta-section {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
      padding: 6rem 0;
    }
    .cta-inner {
      display: grid; grid-template-columns: 1fr auto;
      align-items: center; gap: 3rem;
    }
    .cta-text h2 {
      font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900;
      color: var(--white); letter-spacing: -.02em;
      margin: .4rem 0 .8rem; line-height: 1.15;
    }
    .cta-text p { color: rgba(255,255,255,.6); font-size: 1rem; margin: 0; }
    .cta-actions { display: flex; flex-direction: column; gap: .8rem; align-items: flex-end; }

    /* ── CONTACTO ── */
    .contact-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.2rem;
    }
    .contact-card {
      background: var(--white); border-radius: var(--radius);
      padding: 1.8rem 1.5rem; border: 1.5px solid var(--border);
      text-decoration: none; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: .6rem;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i, 0) * .07s);
    }
    .contact-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--gold-light); }
    .cc-ico {
      width: 52px; height: 52px; border-radius: 14px;
      background: rgba(201,160,68,.1); color: var(--gold);
      display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
    }
    .contact-card strong { font-size: .95rem; font-weight: 800; color: var(--navy); }
    .contact-card span   { font-size: .88rem; color: var(--muted); }
    .wa-card .cc-ico { background: rgba(34,197,94,.1); color: #16a34a; }

    /* ── HORARIOS ── */
    .hours-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .hours-card {
      background: var(--white); border-radius: var(--radius);
      padding: 2.5rem 1.5rem; border: 1.5px solid var(--border);
      text-align: center; transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i, 0) * .08s);
    }
    .hours-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
    .hours-card > i { font-size: 2rem; color: var(--gold); margin-bottom: .8rem; display: block; }
    .hours-card h4   { font-weight: 800; color: var(--navy); margin-bottom: .5rem; font-size: 1rem; }
    .hours-time { font-size: 1.6rem; font-weight: 900; color: var(--gold); margin-bottom: .4rem; }
    .hours-card p { color: var(--muted); font-size: .88rem; margin: 0; }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      .hero-inner { grid-template-columns: 1fr; text-align: center; gap: 3rem; padding: 4rem 1.5rem; }
      .hero::before { display: none; }
      .hero-photo { order: -1; }
      .photo-frame { width: 280px; height: 340px; }
      .top-badge { top: 1rem; left: -1rem; }
      .bot-badge { bottom: 1rem; right: -1rem; }
      .hero-actions { justify-content: center; }
      .trust-row { justify-content: center; }
      .eyebrow { justify-content: center; }
      .hero-p { margin-left: auto; margin-right: auto; }

      .about-section { grid-template-columns: 1fr; }
      .about-photo { min-height: 360px; }
      .about-text { padding: 3rem 1.5rem; }

      .stats-grid { grid-template-columns: repeat(2, 1fr); }

      .cta-inner { grid-template-columns: 1fr; text-align: center; }
      .cta-actions { align-items: center; }
    }

    @media (max-width: 600px) {
      .section { padding: 4rem 0; }
      .photo-frame { width: 240px; height: 300px; }
      .photo-badge { font-size: .78rem; padding: 8px 12px; }
      .top-badge { left: -.5rem; }
      .bot-badge { right: -.5rem; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';
  scrollPct = 0;

  trustItems = [
    { icon: 'fas fa-lock',     text: 'Confidencial' },
    { icon: 'fas fa-laptop',   text: 'Online y presencial' },
    { icon: 'fas fa-gift',     text: '1ª consulta gratis' },
  ];

  services = [
    { title: 'Terapia individual',   icon: 'fas fa-brain',       price: '60 €/sesión', desc: 'Autoestima, ansiedad, depresión, duelo y gestión emocional.' },
    { title: 'Terapia de pareja',    icon: 'fas fa-heart',       price: '70 €/sesión', desc: 'Comunicación, crisis, duelos relacionales y reconciliación.' },
    { title: 'Sexología',            icon: 'fas fa-venus-mars',  price: '60 €/sesión', desc: 'Disfunciones sexuales, educación y apoyo en salud sexual.' },
    { title: 'Orientación laboral',  icon: 'fas fa-briefcase',   price: '50 €/sesión', desc: 'CV, portfolio, entrevistas y videocurriculums profesionales.' },
    { title: 'Talleres grupales',    icon: 'fas fa-users',       price: 'Consultar',   desc: 'Duelo, autoestima, biodanza, risoterapia y habilidades sociales.' },
    { title: 'Empresas',             icon: 'fas fa-building',    price: 'Consultar',   desc: 'Talleres de motivación, comunicación y trabajo en equipo.' },
  ];

  stats = [
    { value: 10,  suffix: '+', label: 'Años de experiencia'  },
    { value: 500, suffix: '+', label: 'Pacientes atendidos'  },
    { value: 97,  suffix: '%', label: 'Satisfacción'         },
    { value: 4,   suffix: '',  label: 'Especialidades'       },
  ];

  processSteps = [
    { icon: 'fas fa-phone-alt',      title: 'Contáctame',          desc: 'Llama, escribe por WhatsApp o rellena el formulario. Sin compromiso.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',    desc: 'Una sesión gratuita para conocernos y entender tus necesidades.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',  desc: 'Diseñamos juntos un plan terapéutico adaptado a tus objetivos.' },
    { icon: 'fas fa-seedling',       title: 'Avanza y transforma', desc: 'Con sesiones regulares progresas hacia una vida más plena.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió completamente. Aprendimos a comunicarnos y a entendernos de verdad.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en 3 semanas con su ayuda. El portfolio que diseñamos juntas fue clave.' },
  ];

  aboutTags = ['Cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  private revealObs!: IntersectionObserver;
  private counterObs!: IntersectionObserver;
  private scrollTicking = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: r => { (r.info || []).forEach((item: any) => { this.info[item.key] = item.value; }); },
      error: () => {}
    });
    this.auth.user$.subscribe(user => {
      if (user?.role === 'patient') { this.ctaLink = '/mi-area'; this.ctaParams = { tab: 'reservar' }; this.ctaLabel = 'Reservar cita'; }
      else if (user?.role === 'admin') { this.ctaLink = '/admin'; this.ctaParams = null; this.ctaLabel = 'Panel admin'; }
      else { this.ctaLink = '/registro'; this.ctaParams = null; this.ctaLabel = 'Reservar cita'; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.initReveal(); this.initCounters(); }, 80);
  }

  ngOnDestroy(): void {
    this.revealObs?.disconnect();
    this.counterObs?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.scrollPct = Math.min(
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100
      );
      this.scrollTicking = false;
    });
  }

  private initReveal(): void {
    this.revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); this.revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => this.revealObs.observe(el));
  }

  private initCounters(): void {
    this.counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = +(el.getAttribute('data-target') || 0);
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        this.counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    setTimeout(() => {
      document.querySelectorAll('.counter').forEach(el => this.counterObs.observe(el));
    }, 200);
  }

  waLink(): string { return this.info.whatsapp ? 'https://wa.me/' + this.info.whatsapp.replace(/\D/g, '') : '#'; }

  scrollTo(id: string): void {
    setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  }
}
