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
    <!-- ═══ SCROLL PROGRESS ═══ -->
    <div class="spb" [style.width]="scrollPct + '%'"></div>

    <!-- ══════════════════════════════════════════
         HERO — tipografía masiva + anillos
    ══════════════════════════════════════════ -->
    <header class="hero" id="inicio">
      <div class="hero-bg-blob"></div>

      <div class="hero-inner">
        <!-- Texto izquierda -->
        <div class="hero-text">
          <div class="hero-eyebrow fade-up d0">
            <span class="eyebrow-dot"></span>
            Psicología · Sexología · Terapia de Pareja
          </div>

          <h1 class="hero-h1 fade-up d1">
            Tu<br>
            <em>bien-<br>estar.</em>
          </h1>

          <p class="hero-sub fade-up d2">
            Atención profesional, cercana y confidencial<br>
            en Crevillent (Alicante) y online.
          </p>

          <div class="hero-actions fade-up d3">
            <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-fill">{{ ctaLabel }}</a>
            <a (click)="scrollTo('servicios')" class="btn-ghost">Ver servicios ↓</a>
          </div>

          <div class="hero-pills fade-up d4">
            <span class="pill"><i class="fas fa-map-marker-alt"></i> Crevillent</span>
            <span class="pill"><i class="fas fa-laptop"></i> Online</span>
            <span class="pill"><i class="fas fa-lock"></i> Confidencial</span>
            <span class="pill"><i class="fas fa-comment-dots"></i> 1ª consulta gratis</span>
          </div>
        </div>

        <!-- Anillos decorativos derecha -->
        <div class="hero-visual fade-left d2">
          <div class="rings-wrap">
            <div class="ring ring-outer"></div>
            <div class="ring ring-mid"></div>
            <div class="ring ring-inner"></div>
            <div class="logo-circle">
              <img src="/logo-devesan-2026.png" alt="PsicoSalud Devesan" />
            </div>
            <div class="ring-badge ring-badge-tl">10+ años</div>
            <div class="ring-badge ring-badge-br">500+ pacientes</div>
          </div>
        </div>
      </div>

      <div class="hero-scroll fade-up d5">
        <div class="scroll-track-line"></div>
        <span>scroll</span>
      </div>
    </header>

    <!-- ══════════════════════════════════════════
         MARQUEE — ticker infinito
    ══════════════════════════════════════════ -->
    <div class="marquee-strip">
      <div class="marquee-track">
        <ng-container *ngFor="let _ of [0,1]">
          <span *ngFor="let item of marqueeItems">
            {{ item }} <span class="mdot">✦</span>
          </span>
        </ng-container>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         SERVICIOS — lista numerada dramática
    ══════════════════════════════════════════ -->
    <section id="servicios" class="section-services">
      <div class="sv-header reveal rv-up">
        <span class="section-label">/ Servicios</span>
        <h2>Lo que hacemos</h2>
        <p>Elige la atención que necesitas</p>
      </div>

      <div class="sv-list">
        <div class="sv-row reveal rv-up"
             [style.--delay]="(i * 0.07) + 's'"
             *ngFor="let svc of services; let i = index">
          <div class="sv-row-inner">
            <span class="sv-num">0{{ i + 1 }}</span>
            <div class="sv-body">
              <div class="sv-top">
                <span class="sv-icon"><i [class]="svc.icon"></i></span>
                <h3 class="sv-title">{{ svc.title }}</h3>
                <span class="sv-price">{{ svc.price }}</span>
              </div>
              <p class="sv-desc">{{ svc.desc }}</p>
            </div>
            <i class="fas fa-arrow-right sv-arrow"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         SOBRE — split 50/50 a pantalla completa
    ══════════════════════════════════════════ -->
    <section id="sobre" class="section-about">
      <div class="about-img-side">
        <img src="/image.png" alt="Dolores Devesa Santacruz" />
        <div class="about-img-overlay">
          <div class="aio-badge">Col. nº XXXXXXXXX</div>
        </div>
      </div>

      <div class="about-text-side reveal rv-right">
        <span class="section-label">/ Sobre mí</span>
        <h2 class="about-name">Dolores<br>Devesa<br>Santacruz</h2>
        <p class="about-role">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
        <p class="about-bio">Con amplia experiencia en acompañamiento emocional y desarrollo personal, trabajo desde un enfoque integrador, humano y basado en la evidencia científica.</p>
        <p class="about-bio">Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones, superar dificultades y alcanzar tu bienestar.</p>
        <div class="about-tags">
          <span class="a-tag" *ngFor="let tag of aboutTags">{{ tag }}</span>
        </div>
        <div class="about-footer">
          <a routerLink="/registro" class="btn-fill">Pedir cita con Dolores</a>
          <div class="about-stat">
            <span class="as-n">10+</span>
            <span class="as-l">años de<br>experiencia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         STATS — números enormes, fondo oscuro
    ══════════════════════════════════════════ -->
    <section class="section-stats">
      <div class="stats-grid">
        <div class="stat-block reveal rv-up"
             [style.--delay]="(i * 0.1) + 's'"
             *ngFor="let s of stats; let i = index">
          <div class="st-num">
            <span class="counter" [attr.data-target]="s.value">0</span><span class="st-sfx">{{ s.suffix }}</span>
          </div>
          <p class="st-lbl">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         PROCESO — pasos con línea visual
    ══════════════════════════════════════════ -->
    <section class="section-process">
      <div class="proc-inner">
        <div class="proc-header reveal rv-up">
          <span class="section-label">/ Cómo funciona</span>
          <h2>Tu camino al bienestar</h2>
        </div>
        <div class="proc-steps">
          <div class="proc-step reveal rv-up"
               [style.--delay]="(i * 0.12) + 's'"
               *ngFor="let step of processSteps; let i = index">
            <div class="ps-num">{{ i + 1 }}</div>
            <div class="ps-icon"><i [class]="step.icon"></i></div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         CTA — fondo oscuro dramático
    ══════════════════════════════════════════ -->
    <section class="section-cta">
      <div class="cta-noise"></div>
      <div class="cta-wrap">
        <span class="cta-overline reveal rv-up">Sin compromiso</span>
        <h2 class="cta-h2 reveal rv-up" [style.--delay]="'0.1s'">
          ¿Listo para<br><em>dar el paso?</em>
        </h2>
        <p class="cta-sub reveal rv-up" [style.--delay]="'0.2s'">
          Reserva tu cita en menos de 2 minutos.
        </p>
        <div class="cta-actions reveal rv-up" [style.--delay]="'0.3s'">
          <a routerLink="/registro" class="btn-cta-fill">Crear cuenta y reservar</a>
          <a routerLink="/login" class="btn-cta-line">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         TESTIMONIOS — citas grandes
    ══════════════════════════════════════════ -->
    <section class="section-testi">
      <div class="testi-inner">
        <div class="testi-header reveal rv-up">
          <span class="section-label">/ Opiniones</span>
          <h2>Lo que dicen<br>nuestros pacientes</h2>
        </div>
        <div class="testi-grid">
          <div class="testi-card reveal rv-up"
               [style.--delay]="(i * 0.1) + 's'"
               *ngFor="let t of testimonials; let i = index">
            <div class="testi-quote">"</div>
            <p class="testi-text">{{ t.text }}</p>
            <div class="testi-stars">
              <i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i>
            </div>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.service }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         CONTACTO
    ══════════════════════════════════════════ -->
    <section id="contacto" class="section-contact">
      <div class="contact-inner">
        <div class="contact-header reveal rv-up">
          <span class="section-label">/ Contacto</span>
          <h2>Hablemos</h2>
          <p>No estás solo/a. El primer paso es el más difícil, y lo puedes dar hoy.</p>
        </div>
        <div class="contact-cards">
          <a [href]="info.phone ? 'tel:' + info.phone : '#'" class="cc reveal rv-up" [style.--delay]="'0s'">
            <div class="cc-icon blue"><i class="fas fa-phone"></i></div>
            <div><strong>Teléfono</strong><span>{{ info.phone || '+34 XXX XXX XXX' }}</span></div>
          </a>
          <a [href]="info.email ? 'mailto:' + info.email : '#'" class="cc reveal rv-up" [style.--delay]="'0.08s'">
            <div class="cc-icon green"><i class="fas fa-envelope"></i></div>
            <div><strong>Email</strong><span>{{ info.email || 'consulta@devesan.com' }}</span></div>
          </a>
          <div class="cc reveal rv-up" [style.--delay]="'0.16s'">
            <div class="cc-icon amber"><i class="fas fa-map-marker-alt"></i></div>
            <div><strong>Dirección</strong><span>{{ info.address || 'Crevillent, Alicante' }}</span></div>
          </div>
          <a [href]="waLink()" target="_blank" class="cc reveal rv-up" [style.--delay]="'0.24s'" *ngIf="info.whatsapp">
            <div class="cc-icon wa"><i class="fab fa-whatsapp"></i></div>
            <div><strong>WhatsApp</strong><span>{{ info.whatsapp }}</span></div>
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         HORARIOS
    ══════════════════════════════════════════ -->
    <section id="horarios" class="section-hours">
      <div class="hours-inner">
        <div class="hours-header reveal rv-up">
          <span class="section-label">/ Disponibilidad</span>
          <h2>Horarios</h2>
        </div>
        <div class="hours-cards">
          <div class="hc reveal rv-up" [style.--delay]="'0s'">
            <i class="fas fa-sun hc-icon"></i>
            <h4>Lunes a Viernes</h4>
            <div class="hc-time">{{ info.hours_lv || '9:00 – 18:00' }}</div>
            <p>Presencial y online</p>
          </div>
          <div class="hc reveal rv-up" [style.--delay]="'0.1s'">
            <i class="fas fa-coffee hc-icon"></i>
            <h4>Sábados</h4>
            <div class="hc-time">{{ info.hours_sa || '9:00 – 14:00' }}</div>
            <p>Solo presencial</p>
          </div>
          <div class="hc reveal rv-up" [style.--delay]="'0.2s'">
            <i class="fas fa-laptop hc-icon"></i>
            <h4>Online</h4>
            <div class="hc-time">Flexible</div>
            <p>Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         MISIÓN / VISIÓN / VALORES
    ══════════════════════════════════════════ -->
    <section class="section-mv">
      <div class="mv-inner">
        <h2 class="mv-title reveal rv-up">Misión, Visión y Valores</h2>
        <div class="mv-grid">
          <div class="mv-card mc-mission reveal rv-up" [style.--delay]="'0s'">
            <span class="mv-icon">🧭</span>
            <h3>Misión</h3>
            <p>Brindar acompañamiento psicológico profesional, cercano y ético a personas, parejas y familias que buscan mejorar su bienestar emocional.</p>
          </div>
          <div class="mv-card mc-vision reveal rv-up" [style.--delay]="'0.1s'">
            <span class="mv-icon">🌱</span>
            <h3>Visión</h3>
            <p>Convertirnos en centro de referencia en Crevillent y alrededores en psicoterapia individual, de pareja y sexología.</p>
          </div>
          <div class="mv-card mc-values reveal rv-up" [style.--delay]="'0.2s'">
            <span class="mv-icon">💎</span>
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
    /* ━━━ RESET & BASE ━━━ */
    * { box-sizing: border-box; }

    /* ━━━ SCROLL PROGRESS ━━━ */
    .spb {
      position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
      background: linear-gradient(90deg, #bfa046, #f0c832);
      box-shadow: 0 0 12px rgba(191,160,70,.8);
      pointer-events: none; transition: width .05s linear;
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       HERO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .hero {
      position: relative; min-height: 100vh; overflow: hidden;
      background: #fffdf5;
      display: flex; flex-direction: column; justify-content: center;
    }

    /* Blob de fondo */
    .hero-bg-blob {
      position: absolute; width: 700px; height: 700px;
      right: -180px; top: 50%; transform: translateY(-50%);
      background: radial-gradient(circle, rgba(191,160,70,.1) 0%, rgba(212,182,96,.05) 50%, transparent 70%);
      border-radius: 50%; pointer-events: none;
    }

    .hero-inner {
      max-width: 1200px; margin: 0 auto; width: 100%;
      padding: 6rem 2rem 4rem;
      display: flex; align-items: center; gap: 3rem;
      position: relative; z-index: 1;
    }

    /* HERO TEXTO */
    .hero-text { flex: 1; }
    .hero-eyebrow {
      display: flex; align-items: center; gap: .6rem;
      font-size: .78rem; font-weight: 700; letter-spacing: .12em;
      text-transform: uppercase; color: #92400e; margin-bottom: 2rem;
    }
    .eyebrow-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: linear-gradient(135deg, #bfa046, #d4b660);
      flex-shrink: 0;
    }

    .hero-h1 {
      font-size: clamp(4rem, 9vw, 9.5rem);
      font-weight: 900; line-height: .95; letter-spacing: -.04em;
      color: #1a1a2e; margin: 0 0 2rem;
    }
    .hero-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #bfa046 0%, #d4b660 50%, #bfa046 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }
    @keyframes shimmer { to { background-position: 200% center; } }

    .hero-sub {
      font-size: 1.1rem; color: #64748b; line-height: 1.7;
      margin-bottom: 2.5rem; max-width: 420px;
    }

    /* Botones hero */
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .btn-fill {
      padding: 15px 32px;
      background: linear-gradient(135deg, #1a1a2e, #2d2b55);
      color: #fff; border-radius: 50px; font-weight: 700; font-size: 1rem;
      text-decoration: none; display: inline-block;
      box-shadow: 0 4px 24px rgba(26,26,46,.3);
      transition: transform .22s, box-shadow .22s;
    }
    .btn-fill:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(26,26,46,.4); }
    .btn-ghost {
      padding: 15px 28px;
      border: 2px solid #1a1a2e; color: #1a1a2e;
      border-radius: 50px; font-weight: 700; font-size: 1rem;
      text-decoration: none; display: inline-block;
      transition: all .22s; cursor: pointer;
    }
    .btn-ghost:hover { background: #1a1a2e; color: #fff; transform: translateY(-2px); }

    /* Pills */
    .hero-pills { display: flex; gap: .6rem; flex-wrap: wrap; }
    .pill {
      display: inline-flex; align-items: center; gap: .4rem;
      background: #fff; border: 1.5px solid #f0e8c0;
      color: #64748b; font-size: .8rem; font-weight: 600;
      padding: 6px 14px; border-radius: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04);
    }
    .pill i { color: #bfa046; }

    /* HERO VISUAL — anillos */
    .hero-visual { flex: 0 0 auto; }
    .rings-wrap { position: relative; width: 380px; height: 380px; }
    .ring {
      position: absolute; border-radius: 50%; border: 1px solid rgba(191,160,70,.25);
      animation: spinRing linear infinite;
    }
    .ring-outer  { inset: 0;    animation-duration: 30s; }
    .ring-mid    { inset: 30px; animation-duration: 22s; animation-direction: reverse; border-color: rgba(191,160,70,.15); border-width: 2px; }
    .ring-inner  { inset: 65px; animation-duration: 16s; border-style: dashed; border-color: rgba(191,160,70,.2); }
    @keyframes spinRing { to { transform: rotate(360deg); } }

    .logo-circle {
      position: absolute; inset: 90px;
      border-radius: 50%; overflow: hidden;
      background: linear-gradient(135deg, #fffbe7, #fff);
      box-shadow: 0 0 0 6px rgba(191,160,70,.12), 0 24px 60px rgba(191,160,70,.22);
      display: flex; align-items: center; justify-content: center;
    }
    .logo-circle img { width: 80%; height: 80%; object-fit: contain; }

    .ring-badge {
      position: absolute; background: #1a1a2e; color: #fff;
      padding: 8px 16px; border-radius: 24px;
      font-size: .78rem; font-weight: 700; white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,.2);
    }
    .ring-badge-tl { top: 30px; left: -20px; }
    .ring-badge-br { bottom: 30px; right: -20px; color: #d4b660; }

    /* Scroll hint */
    .hero-scroll {
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .4rem;
      color: #94a3b8; font-size: .72rem; font-weight: 700;
      letter-spacing: .12em; text-transform: uppercase; z-index: 1;
    }
    .scroll-track-line {
      width: 1px; height: 44px; background: rgba(191,160,70,.25); overflow: hidden; position: relative;
    }
    .scroll-track-line::after {
      content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 100%;
      background: linear-gradient(180deg, transparent, #bfa046);
      animation: sdrop 2s ease-in-out infinite;
    }
    @keyframes sdrop { to { top: 100%; } }

    /* Hero entry animations */
    .fade-up  { opacity: 0; transform: translateY(30px); animation: fup .75s cubic-bezier(0.22,1,0.36,1) forwards; }
    .fade-left{ opacity: 0; transform: translateX(50px); animation: fleft .85s cubic-bezier(0.22,1,0.36,1) forwards; }
    .d0 { animation-delay: .1s; } .d1 { animation-delay: .25s; }
    .d2 { animation-delay: .45s; } .d3 { animation-delay: .65s; }
    .d4 { animation-delay: .85s; } .d5 { animation-delay: 1.05s; }
    @keyframes fup   { to { opacity: 1; transform: translateY(0); } }
    @keyframes fleft { to { opacity: 1; transform: translateX(0); } }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       MARQUEE
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .marquee-strip {
      background: #0f0e1a;
      padding: 1.1rem 0; overflow: hidden;
      border-top: 1px solid rgba(191,160,70,.15);
      border-bottom: 1px solid rgba(191,160,70,.15);
    }
    .marquee-track {
      display: flex; align-items: center;
      white-space: nowrap; gap: 0;
      animation: mq 28s linear infinite;
    }
    .marquee-track span {
      display: inline-flex; align-items: center; gap: 1.2rem;
      color: #d4b660; font-weight: 700; font-size: .85rem;
      letter-spacing: .12em; text-transform: uppercase;
      padding-right: 1.2rem;
    }
    .mdot { color: rgba(191,160,70,.5); font-size: .6rem; }
    @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       SCROLL REVEAL
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .reveal { opacity: 0; transition: opacity .7s cubic-bezier(0.22,1,0.36,1), transform .7s cubic-bezier(0.22,1,0.36,1); }
    .rv-up    { transform: translateY(55px); }
    .rv-right { transform: translateX(70px); }
    .reveal.in { opacity: 1; transform: translate(0); transition-delay: var(--delay, 0s); }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       SECTION LABELS (común)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-label {
      display: block; font-size: .72rem; font-weight: 800; letter-spacing: .14em;
      text-transform: uppercase; color: #bfa046; margin-bottom: .6rem;
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       SERVICIOS — lista numerada
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-services {
      background: #fff;
      padding: 6rem 2rem;
    }
    .sv-header {
      max-width: 1100px; margin: 0 auto 3rem;
    }
    .sv-header h2 {
      font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900;
      color: #1a1a2e; letter-spacing: -.025em; margin: .3rem 0 .6rem;
    }
    .sv-header p { color: #64748b; font-size: 1.05rem; }

    .sv-list { max-width: 1100px; margin: 0 auto; }

    .sv-row {
      position: relative; overflow: hidden;
      border-top: 1px solid rgba(26,26,46,.08);
    }
    .sv-row:last-child { border-bottom: 1px solid rgba(26,26,46,.08); }

    /* Fill de fondo oscuro al hacer hover */
    .sv-row::before {
      content: '';
      position: absolute; inset: 0; z-index: 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #2d2b55 100%);
      transform: scaleX(0); transform-origin: left;
      transition: transform .45s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .sv-row:hover::before { transform: scaleX(1); }

    .sv-row-inner {
      display: flex; align-items: center; gap: 2rem;
      padding: 1.8rem 0; position: relative; z-index: 1;
      transition: padding-left .35s cubic-bezier(0.22,1,0.36,1);
    }
    .sv-row:hover .sv-row-inner { padding-left: 1.5rem; }

    .sv-num {
      font-size: 1rem; font-weight: 900; color: rgba(191,160,70,.5);
      flex-shrink: 0; width: 36px; font-variant-numeric: tabular-nums;
      transition: color .25s;
    }
    .sv-row:hover .sv-num { color: rgba(212,182,96,.5); }

    .sv-body { flex: 1; }
    .sv-top { display: flex; align-items: center; gap: 1rem; margin-bottom: .3rem; }

    .sv-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: rgba(191,160,70,.1); color: #bfa046;
      display: flex; align-items: center; justify-content: center;
      font-size: .95rem; flex-shrink: 0; transition: background .25s, color .25s;
    }
    .sv-row:hover .sv-icon { background: rgba(191,160,70,.2); color: #f0c832; }

    .sv-title {
      font-size: 1.35rem; font-weight: 800; color: #1a1a2e;
      margin: 0; flex: 1; transition: color .25s;
      letter-spacing: -.01em;
    }
    .sv-row:hover .sv-title { color: #fff; }

    .sv-price {
      font-size: .9rem; font-weight: 800; color: #bfa046;
      white-space: nowrap; transition: color .25s;
    }
    .sv-row:hover .sv-price { color: #f0c832; }

    .sv-desc {
      font-size: .88rem; color: #64748b; line-height: 1.6;
      margin: 0; max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height .4s ease, opacity .3s ease;
    }
    .sv-row:hover .sv-desc { max-height: 80px; opacity: 1; transition-delay: .05s; }

    .sv-arrow {
      font-size: .9rem; color: rgba(191,160,70,.4);
      flex-shrink: 0; transition: color .25s, transform .25s;
    }
    .sv-row:hover .sv-arrow { color: #f0c832; transform: translateX(4px); }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       SOBRE — split 50/50
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-about {
      display: flex; min-height: 90vh; overflow: hidden;
    }
    .about-img-side {
      flex: 0 0 48%; position: relative; overflow: hidden;
      background: #e8dfc8;
    }
    .about-img-side img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center;
      display: block;
    }
    .about-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 60%, rgba(26,26,46,.5));
      display: flex; align-items: flex-end; padding: 2rem;
    }
    .aio-badge {
      background: rgba(255,255,255,.95); backdrop-filter: blur(8px);
      color: #1a1a2e; font-size: .8rem; font-weight: 700;
      padding: 8px 18px; border-radius: 24px;
    }

    .about-text-side {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 5rem 4rem; background: #fffdf5; overflow-y: auto;
    }
    .about-name {
      font-size: clamp(2.2rem, 4vw, 4rem); font-weight: 900;
      color: #1a1a2e; line-height: 1; letter-spacing: -.03em;
      margin: .5rem 0 .8rem;
    }
    .about-role { color: #bfa046; font-weight: 700; font-size: 1rem; margin-bottom: 1.5rem; }
    .about-bio { color: #475569; line-height: 1.78; margin-bottom: .9rem; font-size: .97rem; }
    .about-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.4rem 0; }
    .a-tag {
      background: #f1f5f9; color: #374151; padding: 5px 14px; border-radius: 20px;
      font-size: .8rem; font-weight: 600; border: 1px solid #e2e8f0;
      transition: background .2s; cursor: default;
    }
    .a-tag:hover { background: #fffbe7; border-color: #e8d98a; }
    .about-footer { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; margin-top: 1rem; }
    .about-stat { display: flex; align-items: center; gap: .7rem; }
    .as-n { font-size: 2.5rem; font-weight: 900; color: #bfa046; line-height: 1; }
    .as-l { font-size: .8rem; color: #64748b; font-weight: 600; line-height: 1.35; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       STATS — fondo oscuro, números enormes
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-stats {
      background: #0f0e1a; padding: 6rem 2rem;
    }
    .stats-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem; text-align: center;
    }
    .stat-block {}
    .st-num {
      display: flex; align-items: flex-end; justify-content: center; gap: .05rem;
      font-size: clamp(4rem, 8vw, 8rem); font-weight: 900; line-height: 1;
      background: linear-gradient(135deg, #bfa046, #f0c832, #bfa046);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: shimmer 5s linear infinite;
    }
    .counter { font-size: inherit; font-weight: inherit; }
    .st-sfx  { font-size: 60%; font-weight: 900; padding-bottom: .15em; }
    .st-lbl  { color: rgba(255,255,255,.5); font-size: .9rem; font-weight: 500; margin-top: .8rem; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       PROCESO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-process { background: #fff; padding: 6rem 2rem; }
    .proc-inner { max-width: 1100px; margin: 0 auto; }
    .proc-header { margin-bottom: 3.5rem; }
    .proc-header h2 {
      font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 900;
      color: #1a1a2e; letter-spacing: -.025em; margin: .3rem 0 0;
    }
    .proc-steps {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .proc-step {
      background: #fffdf5; border-radius: 20px; padding: 2.5rem 1.8rem 2rem;
      border: 1.5px solid #f0e8c0; position: relative;
      transition: transform .22s, box-shadow .22s, border-color .22s;
    }
    .proc-step:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(191,160,70,.16); border-color: #d4b660; }
    .ps-num {
      position: absolute; top: -15px; left: 1.8rem;
      width: 30px; height: 30px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; font-weight: 900; font-size: .85rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 14px rgba(191,160,70,.4);
    }
    .ps-icon {
      width: 56px; height: 56px; border-radius: 16px; margin-bottom: 1.2rem;
      background: rgba(191,160,70,.1); display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; color: #bfa046;
    }
    .proc-step h4 { font-size: 1.05rem; font-weight: 800; color: #1a1a2e; margin-bottom: .5rem; }
    .proc-step p  { color: #64748b; font-size: .88rem; line-height: 1.65; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       CTA — dramático
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-cta {
      background: #0f0e1a; padding: 7rem 2rem; text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-noise {
      position: absolute; inset: 0; pointer-events: none; opacity: .03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .cta-wrap { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
    .cta-overline {
      display: inline-block; color: #bfa046; font-size: .72rem; font-weight: 800;
      letter-spacing: .15em; text-transform: uppercase; margin-bottom: 1.5rem;
    }
    .cta-h2 {
      font-size: clamp(2.8rem, 7vw, 7rem); font-weight: 900;
      color: #fff; line-height: 1; letter-spacing: -.03em; margin-bottom: 1.5rem;
    }
    .cta-h2 em {
      font-style: normal;
      background: linear-gradient(135deg, #bfa046, #f0c832);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .cta-sub { color: rgba(255,255,255,.55); font-size: 1.15rem; margin-bottom: 3rem; }
    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-cta-fill {
      padding: 16px 40px;
      background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border-radius: 50px; font-weight: 800; font-size: 1.05rem;
      text-decoration: none; box-shadow: 0 6px 28px rgba(191,160,70,.4);
      transition: transform .22s, box-shadow .22s;
    }
    .btn-cta-fill:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(191,160,70,.5); }
    .btn-cta-line {
      padding: 16px 32px; border: 2px solid rgba(255,255,255,.2); color: rgba(255,255,255,.8);
      border-radius: 50px; font-weight: 700; font-size: 1.05rem; text-decoration: none;
      transition: all .22s;
    }
    .btn-cta-line:hover { border-color: rgba(255,255,255,.5); color: #fff; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       TESTIMONIOS
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-testi { background: #fffdf5; padding: 6rem 2rem; }
    .testi-inner { max-width: 1100px; margin: 0 auto; }
    .testi-header { margin-bottom: 3.5rem; }
    .testi-header h2 {
      font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 900;
      color: #1a1a2e; letter-spacing: -.025em; margin: .3rem 0 0; line-height: 1.1;
    }
    .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1.5rem; }
    .testi-card {
      background: #fff; border-radius: 24px; padding: 2.5rem 2rem;
      border: 1.5px solid #f0e8c0; box-shadow: 0 4px 24px rgba(0,0,0,.04);
      transition: transform .22s, box-shadow .22s;
      position: relative;
    }
    .testi-card:hover { transform: translateY(-6px); box-shadow: 0 18px 50px rgba(191,160,70,.14); }
    .testi-quote {
      font-size: 5rem; line-height: .8; font-weight: 900; color: rgba(191,160,70,.2);
      margin-bottom: .5rem; font-family: Georgia, serif;
    }
    .testi-text { color: #374151; font-size: 1rem; line-height: 1.72; margin-bottom: 1.5rem; }
    .testi-stars { color: #f59e0b; font-size: .85rem; display: flex; gap: .15rem; margin-bottom: 1.2rem; }
    .testi-author { display: flex; align-items: center; gap: .8rem; }
    .testi-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, #1a1a2e, #2d2b55);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 1rem; flex-shrink: 0;
    }
    .testi-author strong { display: block; font-size: .9rem; color: #1a1a2e; font-weight: 800; }
    .testi-author span   { font-size: .8rem; color: #64748b; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       CONTACTO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-contact { background: #0f0e1a; padding: 6rem 2rem; }
    .contact-inner { max-width: 1100px; margin: 0 auto; }
    .contact-header { margin-bottom: 3rem; }
    .contact-header h2 {
      font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900;
      color: #fff; letter-spacing: -.025em; margin: .3rem 0 .6rem;
    }
    .contact-header p { color: rgba(255,255,255,.5); font-size: 1rem; max-width: 480px; }
    .contact-header .section-label { color: rgba(191,160,70,.8); }

    .contact-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; }
    .cc {
      background: rgba(255,255,255,.05); border: 1px solid rgba(191,160,70,.12);
      border-radius: 18px; padding: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;
      text-decoration: none; transition: background .22s, border-color .22s, transform .22s;
    }
    .cc:hover { background: rgba(255,255,255,.09); border-color: rgba(191,160,70,.3); transform: translateY(-3px); }
    .cc-icon {
      width: 46px; height: 46px; border-radius: 14px; display: flex;
      align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;
    }
    .cc-icon.blue  { background: rgba(59,130,246,.15);  color: #60a5fa; }
    .cc-icon.green { background: rgba(34,197,94,.15);   color: #4ade80; }
    .cc-icon.amber { background: rgba(245,158,11,.15);  color: #fbbf24; }
    .cc-icon.wa    { background: rgba(34,197,94,.15);   color: #4ade80; }
    .cc strong { display: block; font-size: .85rem; color: rgba(255,255,255,.85); font-weight: 700; margin-bottom: .2rem; }
    .cc span   { font-size: .88rem; color: rgba(255,255,255,.45); }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       HORARIOS
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-hours { background: #fff; padding: 5rem 2rem; }
    .hours-inner { max-width: 1100px; margin: 0 auto; }
    .hours-header { margin-bottom: 2.5rem; }
    .hours-header h2 {
      font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
      color: #1a1a2e; letter-spacing: -.02em; margin: .3rem 0 0;
    }
    .hours-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
    .hc {
      background: #fffdf5; border-radius: 20px; padding: 2rem 1.5rem; text-align: center;
      border: 1.5px solid #f0e8c0; transition: transform .22s, box-shadow .22s;
    }
    .hc:hover { transform: translateY(-5px); box-shadow: 0 14px 40px rgba(191,160,70,.14); }
    .hc-icon { font-size: 2rem; color: #bfa046; margin-bottom: .8rem; }
    .hc h4   { font-weight: 800; color: #1a1a2e; margin-bottom: .5rem; font-size: 1rem; }
    .hc-time { font-size: 1.7rem; font-weight: 900; color: #bfa046; margin-bottom: .5rem; }
    .hc p    { color: #64748b; font-size: .88rem; margin: 0; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       MISIÓN / VISIÓN
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    .section-mv { background: #fffdf5; padding: 5rem 2rem; }
    .mv-inner { max-width: 1100px; margin: 0 auto; }
    .mv-title {
      font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
      color: #1a1a2e; letter-spacing: -.02em; margin-bottom: 2.5rem;
    }
    .mv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .mv-card {
      border-radius: 20px; padding: 2rem 1.8rem; border: 1.5px solid #f0e8c0;
      transition: transform .22s, box-shadow .22s;
    }
    .mv-card:hover { transform: translateY(-5px); box-shadow: 0 14px 40px rgba(191,160,70,.12); }
    .mc-mission { background: linear-gradient(135deg, #fffdf5, #fefce8); }
    .mc-vision  { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); }
    .mc-values  { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); }
    .mv-icon { font-size: 2.2rem; margin-bottom: .8rem; }
    .mv-card h3 { font-size: 1.1rem; font-weight: 800; color: #1a1a2e; margin-bottom: .8rem; }
    .mv-card p  { color: #475569; line-height: 1.72; font-size: .95rem; margin: 0; }
    .mv-card ul { list-style: none; padding: 0; margin: 0; }
    .mv-card ul li {
      color: #475569; padding: .4rem 0; font-size: .95rem;
      border-bottom: 1px solid rgba(0,0,0,.05);
      display: flex; align-items: center; gap: .5rem;
    }
    .mv-card ul li::before { content: '✓'; color: #bfa046; font-weight: 700; }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       RESPONSIVE
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    @media (max-width: 900px) {
      .hero-inner { flex-direction: column-reverse; text-align: center; gap: 2rem; padding: 4rem 1.5rem 3rem; }
      .hero-pills { justify-content: center; }
      .hero-actions { justify-content: center; }
      .hero-eyebrow { justify-content: center; }
      .hero-sub { margin-left: auto; margin-right: auto; }
      .rings-wrap { width: 260px; height: 260px; }
      .logo-circle { inset: 60px; }
      .ring-badge-tl { top: 10px; left: 0; }
      .ring-badge-br { bottom: 10px; right: 0; }

      .section-about { flex-direction: column; min-height: unset; }
      .about-img-side { flex: 0 0 320px; }
      .about-text-side { padding: 3rem 1.5rem; }
      .about-name { font-size: 2.5rem; }

      .hero-h1 { font-size: clamp(3.5rem, 12vw, 6rem); }
      .hero-scroll { display: none; }
    }

    @media (max-width: 600px) {
      .sv-row-inner { gap: 1rem; }
      .sv-num { display: none; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
      .st-num { font-size: clamp(3rem, 12vw, 5rem); }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';
  scrollPct = 0;

  marqueeItems = [
    'Psicología', 'Sexología', 'Terapia de Pareja',
    'Orientación Laboral', 'Crevillent', 'Atención Online',
    'Primera Consulta Gratis', 'Bienestar Emocional',
  ];

  stats = [
    { value: 10,  suffix: '+', label: 'Años de experiencia'  },
    { value: 500, suffix: '+', label: 'Pacientes atendidos'  },
    { value: 97,  suffix: '%', label: 'Tasa de satisfacción' },
    { value: 4,   suffix: '',  label: 'Especialidades'       },
  ];

  services = [
    { title: 'Terapia de pareja',   desc: 'Acompañamiento en crisis de pareja, desengaños, divorcio y duelos relacionales.',                price: '70 €/sesión', icon: 'fas fa-heart'      },
    { title: 'Sexología',           desc: 'Terapia sexual, disfunciones, educación sexual y apoyo a parejas con problemas reproductivos.', price: '60 €/sesión', icon: 'fas fa-venus-mars' },
    { title: 'Terapia individual',  desc: 'Autoestima, ansiedad, depresión, duelo, gestión emocional y crecimiento personal.',             price: '60 €/sesión', icon: 'fas fa-brain'      },
    { title: 'Orientación laboral', desc: 'Currículums, portfolios, preparación de entrevistas y videocurriculums profesionales.',          price: '50 €/sesión', icon: 'fas fa-briefcase'  },
    { title: 'Empresas',            desc: 'Talleres de motivación, comunicación y habilidades sociales para equipos.',                     price: 'Consultar',   icon: 'fas fa-building'   },
    { title: 'Grupos y talleres',   desc: 'Grupos de duelo, autoestima, biodanza, risoterapia y habilidades sociales.',                    price: 'Consultar',   icon: 'fas fa-users'      },
  ];

  processSteps = [
    { icon: 'fas fa-phone-alt',      title: 'Contacta',          desc: 'Llámanos, escríbenos por WhatsApp o rellena el formulario online. Sin compromiso.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',  desc: 'Una sesión orientativa para conocernos y entender tus necesidades.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',desc: 'Diseñamos juntos un plan terapéutico adaptado a tus objetivos.' },
    { icon: 'fas fa-seedling',       title: 'Transforma tu vida',desc: 'Con sesiones regulares avanzas hacia una vida más plena y equilibrada.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia en mi vida.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió completamente. Aprendimos a comunicarnos de verdad y a entendernos mejor.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en 3 semanas con su ayuda. El portfolio que diseñamos juntas fue clave en el proceso.' },
  ];

  aboutTags = ['Terapia cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  private revealObs!: IntersectionObserver;
  private counterObs!: IntersectionObserver;
  private scrollTicking = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: (r) => { (r.info || []).forEach((item: any) => { this.info[item.key] = item.value; }); },
      error: () => {}
    });
    this.auth.user$.subscribe(user => {
      if (user?.role === 'patient') { this.ctaLink = '/mi-area'; this.ctaParams = { tab: 'reservar' }; this.ctaLabel = 'Reservar cita'; }
      else if (user?.role === 'admin') { this.ctaLink = '/admin'; this.ctaParams = null; this.ctaLabel = 'Panel admin'; }
      else { this.ctaLink = '/registro'; this.ctaParams = null; this.ctaLabel = 'Reservar cita'; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.initReveal(); this.initCounters(); }, 100);
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
    this.revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); this.revealObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => this.revealObs.observe(el));
  }

  private initCounters(): void {
    this.counterObs = new IntersectionObserver((entries) => {
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
