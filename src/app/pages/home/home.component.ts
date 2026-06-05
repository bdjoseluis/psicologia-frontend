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
    <!-- ── SCROLL PROGRESS ── -->
    <div class="spb" [style.transform]="'scaleX('+scrollPct/100+')'"></div>

    <!-- ══════════════════════════════
         HERO
    ══════════════════════════════ -->
    <section class="hero" id="inicio">
      <!-- Background orbs -->
      <div class="orb orb-a"></div>
      <div class="orb orb-b"></div>
      <div class="orb orb-c"></div>
      <!-- Noise overlay -->
      <div class="noise"></div>

      <div class="hero-inner">
        <div class="hero-tag fd fd1">
          <span class="mono">Psicología</span>
          <span class="sep">·</span>
          <span class="mono">Sexología</span>
          <span class="sep">·</span>
          <span class="mono">Terapia&nbsp;de&nbsp;Pareja</span>
        </div>

        <h1 class="hero-h fd fd2">
          Tu&nbsp;espacio<br>
          <em>seguro.</em>
        </h1>

        <p class="hero-p fd fd3">
          Atención profesional y confidencial en Crevillent (Alicante) y online.<br>
          Primera consulta gratuita, sin compromiso.
        </p>

        <div class="hero-actions fd fd4">
          <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-fill">{{ ctaLabel }}</a>
          <a (click)="scrollTo('servicios')" class="btn-ghost">Ver servicios&thinsp;↓</a>
        </div>

        <div class="hero-location fd fd5">
          <span class="loc-dot"></span>
          <span class="mono-sm">Crevillent, Alicante &mdash; y online</span>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="scroll-cue fd fd5">
        <div class="sc-track"><div class="sc-bar"></div></div>
        <span class="mono-sm">SCROLL</span>
      </div>
    </section>

    <!-- ══════════════════════════════
         MARQUEE STRIP
    ══════════════════════════════ -->
    <div class="mq-strip">
      <div class="mq-track">
        <ng-container *ngFor="let _ of [0,1]">
          <span *ngFor="let m of mq">{{ m }}<span class="mq-dot">✦</span></span>
        </ng-container>
      </div>
    </div>

    <!-- ══════════════════════════════
         SERVICIOS
    ══════════════════════════════ -->
    <section id="servicios" class="sec-dark">
      <div class="sec-head rv">
        <span class="mono-tag">/ Servicios</span>
        <h2 class="sec-h">Lo que<br><em>ofrezco</em></h2>
        <p class="sec-p">Cada persona merece un espacio a su medida.</p>
      </div>

      <div class="svc-list">
        <div class="svc-row rv" *ngFor="let s of services; let i = index" [style.--i]="i"
             (click)="scrollTo('contacto')">
          <span class="svc-n mono">{{ pad(i+1) }}</span>
          <div class="svc-ico"><i [class]="s.icon"></i></div>
          <div class="svc-body">
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
          <span class="svc-price">{{ s.price }}</span>
          <span class="svc-arrow">→</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         SOBRE
    ══════════════════════════════ -->
    <section id="sobre" class="sec-about">
      <div class="about-photo rv-left">
        <img src="/image.png" alt="Dolores Devesa Santacruz" />
        <div class="about-photo-overlay"></div>
      </div>

      <div class="about-text rv-right">
        <span class="mono-tag glow-tag">/ Sobre mí</span>

        <h2 class="about-name">
          Dolores<br>Devesa<br><em>Santacruz</em>
        </h2>

        <p class="about-role mono-sm">Psicóloga · Sexóloga · Terapeuta de Pareja</p>

        <p class="about-bio">
          Con amplia experiencia en acompañamiento emocional y desarrollo personal,
          trabajo desde un enfoque integrador, humano y basado en la evidencia científica.
        </p>
        <p class="about-bio">
          Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones,
          superar dificultades y avanzar hacia el bienestar que mereces.
        </p>

        <div class="about-chips">
          <span *ngFor="let t of aboutTags">{{ t }}</span>
        </div>

        <a routerLink="/registro" class="btn-fill" style="margin-top:1rem">Pedir cita con Dolores</a>
      </div>
    </section>

    <!-- ══════════════════════════════
         PROCESO
    ══════════════════════════════ -->
    <section class="sec-dark sec-process">
      <div class="sec-head rv">
        <span class="mono-tag">/ Cómo funciona</span>
        <h2 class="sec-h">Tu camino<br><em>al bienestar</em></h2>
      </div>

      <div class="proc-grid">
        <div class="proc-step rv" *ngFor="let s of steps; let i = index" [style.--i]="i">
          <div class="proc-num">{{ i + 1 }}</div>
          <div class="proc-ico"><i [class]="s.icon"></i></div>
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         TESTIMONIOS
    ══════════════════════════════ -->
    <section class="sec-testi">
      <div class="container">
        <div class="sec-head rv">
          <span class="mono-tag">/ Opiniones</span>
          <h2 class="sec-h">Lo que dicen<br><em>mis pacientes</em></h2>
        </div>

        <div class="testi-grid">
          <div class="testi-card rv" *ngFor="let t of testimonials; let i = index" [style.--i]="i">
            <div class="testi-q">"</div>
            <p>{{ t.text }}</p>
            <div class="testi-stars"><i class="fas fa-star" *ngFor="let _ of [0,0,0,0,0]"></i></div>
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

    <!-- ══════════════════════════════
         CTA — "HABLEMOS" style
    ══════════════════════════════ -->
    <section class="sec-cta">
      <div class="cta-bg-word">BIENESTAR</div>
      <div class="cta-inner">
        <div class="cta-pill rv">
          <span class="live-dot"></span>
          <span class="mono-sm">Primera consulta gratuita</span>
        </div>
        <h2 class="cta-big rv">Hable<em>mos.</em></h2>
        <p class="cta-sub rv">Reserva en menos de 2 minutos.</p>
        <div class="cta-btns rv">
          <a routerLink="/registro" class="btn-fill-lg">Crear cuenta y reservar</a>
          <a routerLink="/login" class="btn-ghost-lg">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         CONTACTO
    ══════════════════════════════ -->
    <section id="contacto" class="sec-dark sec-contact">
      <div class="container">
        <div class="sec-head rv">
          <span class="mono-tag">/ Contacto</span>
          <h2 class="sec-h">Estoy<br><em>aquí</em></h2>
          <p class="sec-p">El primer paso es el más difícil, y lo puedes dar hoy.</p>
        </div>

        <div class="contact-grid">
          <a [href]="info.phone ? 'tel:'+info.phone : '#'" class="cc rv" [style.--i]="0">
            <div class="cc-ico"><i class="fas fa-phone-alt"></i></div>
            <span class="cc-lbl mono-sm">Teléfono</span>
            <strong>{{ info.phone || '+34 XXX XXX XXX' }}</strong>
          </a>
          <a [href]="info.email ? 'mailto:'+info.email : '#'" class="cc rv" [style.--i]="1">
            <div class="cc-ico"><i class="fas fa-envelope"></i></div>
            <span class="cc-lbl mono-sm">Email</span>
            <strong>{{ info.email || 'consulta@devesan.com' }}</strong>
          </a>
          <div class="cc rv" [style.--i]="2">
            <div class="cc-ico"><i class="fas fa-map-marker-alt"></i></div>
            <span class="cc-lbl mono-sm">Dirección</span>
            <strong>{{ info.address || 'Crevillent, Alicante' }}</strong>
          </div>
          <a [href]="waLink()" target="_blank" class="cc cc-wa rv" [style.--i]="3" *ngIf="info.whatsapp">
            <div class="cc-ico"><i class="fab fa-whatsapp"></i></div>
            <span class="cc-lbl mono-sm">WhatsApp</span>
            <strong>{{ info.whatsapp }}</strong>
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════
         HORARIOS
    ══════════════════════════════ -->
    <section id="horarios" class="sec-hours">
      <div class="container">
        <div class="sec-head rv">
          <span class="mono-tag">/ Disponibilidad</span>
          <h2 class="sec-h">Horarios</h2>
        </div>

        <div class="hours-grid">
          <div class="hc rv" [style.--i]="0">
            <i class="fas fa-sun"></i>
            <h4>Lunes – Viernes</h4>
            <div class="hc-time">{{ info.hours_lv || '9:00 – 18:00' }}</div>
            <p class="mono-sm">Presencial y online</p>
          </div>
          <div class="hc rv" [style.--i]="1">
            <i class="fas fa-coffee"></i>
            <h4>Sábados</h4>
            <div class="hc-time">{{ info.hours_sa || '9:00 – 14:00' }}</div>
            <p class="mono-sm">Solo presencial</p>
          </div>
          <div class="hc rv" [style.--i]="2">
            <i class="fas fa-laptop"></i>
            <h4>Online</h4>
            <div class="hc-time">Flexible</div>
            <p class="mono-sm">Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <app-chat-widget></app-chat-widget>
  `,

  styles: [`
    /* ══════ BASE ══════ */
    :host {
      --bg:       #09090f;
      --bg-mid:   #0e0d18;
      --bg-light: #141322;
      --gold:     #c9a050;
      --gold-hi:  #e8c97a;
      --gold-lo:  #a07830;
      --text:     #f0ede6;
      --muted:    rgba(240,237,230,.42);
      --border:   rgba(240,237,230,.08);
      --radius:   10px;
      font-family: 'Space Grotesk', 'Inter', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :host { display: block; }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

    /* ══════ SCROLL BAR ══════ */
    .spb {
      position: fixed; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold), var(--gold-hi));
      transform-origin: left; transform: scaleX(0);
      z-index: 9999; pointer-events: none;
      box-shadow: 0 0 12px rgba(201,160,80,.6);
    }

    /* ══════ REVEAL ANIMATIONS ══════ */
    .rv {
      opacity: 0; transform: translateY(44px);
      transition: opacity .75s cubic-bezier(.22,1,.36,1),
                  transform .75s cubic-bezier(.22,1,.36,1);
      transition-delay: calc(var(--i,0) * .09s);
    }
    .rv.in { opacity: 1; transform: none; }

    .rv-left {
      opacity: 0; transform: translateX(-60px);
      transition: opacity .8s cubic-bezier(.22,1,.36,1),
                  transform .8s cubic-bezier(.22,1,.36,1);
    }
    .rv-left.in { opacity: 1; transform: none; }

    .rv-right {
      opacity: 0; transform: translateX(60px);
      transition: opacity .8s cubic-bezier(.22,1,.36,1),
                  transform .8s cubic-bezier(.22,1,.36,1);
    }
    .rv-right.in { opacity: 1; transform: none; }

    /* Hero fade-up entries */
    .fd { opacity: 0; transform: translateY(28px);
      animation: fd .8s cubic-bezier(.22,1,.36,1) forwards; }
    .fd1{animation-delay:.1s} .fd2{animation-delay:.28s}
    .fd3{animation-delay:.46s} .fd4{animation-delay:.62s}
    .fd5{animation-delay:.78s}
    @keyframes fd { to { opacity:1; transform:none; } }

    /* ══════ SHARED TYPOGRAPHY ══════ */
    .mono     { font-family: 'Space Grotesk', monospace; }
    .mono-sm  { font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; font-weight: 500; }
    .mono-tag {
      display: block; font-size: .65rem; letter-spacing: .3em;
      text-transform: uppercase; color: rgba(201,160,80,.7);
      margin-bottom: 1rem; font-weight: 500;
    }
    .glow-tag { color: var(--gold); text-shadow: 0 0 20px rgba(201,160,80,.5); }

    .sec-h {
      font-size: clamp(2.4rem, 5.5vw, 5rem);
      font-weight: 700; line-height: .92;
      letter-spacing: -.04em; color: var(--text);
      margin-bottom: .9rem;
    }
    .sec-h em { color: var(--gold); font-style: normal; }
    .sec-p { font-size: 1rem; color: var(--muted); max-width: 44ch; line-height: 1.7; }

    .sec-head { margin-bottom: 3.5rem; }

    /* ══════ BUTTONS ══════ */
    .btn-fill {
      display: inline-block; padding: 14px 34px;
      background: var(--gold); color: #0a0810;
      border-radius: 50px; font-weight: 700; font-size: .95rem;
      text-decoration: none; letter-spacing: -.01em;
      box-shadow: 0 0 28px rgba(201,160,80,.35);
      transition: transform .2s, box-shadow .2s, background .2s;
    }
    .btn-fill:hover { background: var(--gold-hi); transform: translateY(-2px); box-shadow: 0 0 44px rgba(201,160,80,.5); }

    .btn-ghost {
      display: inline-block; padding: 14px 28px;
      border: 1px solid rgba(240,237,230,.2); color: rgba(240,237,230,.75);
      border-radius: 50px; font-weight: 600; font-size: .95rem;
      text-decoration: none; cursor: pointer;
      transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: rgba(201,160,80,.5); color: var(--gold); }

    .btn-fill-lg {
      display: inline-block; padding: 18px 46px;
      background: var(--gold); color: #0a0810;
      border-radius: 50px; font-weight: 700; font-size: 1.05rem;
      text-decoration: none;
      box-shadow: 0 0 40px rgba(201,160,80,.4);
      transition: transform .2s, box-shadow .2s;
    }
    .btn-fill-lg:hover { transform: translateY(-3px); box-shadow: 0 0 60px rgba(201,160,80,.55); }

    .btn-ghost-lg {
      display: inline-block; padding: 18px 34px;
      border: 1px solid rgba(240,237,230,.2); color: rgba(240,237,230,.75);
      border-radius: 50px; font-weight: 600; font-size: 1.05rem;
      text-decoration: none; transition: border-color .2s, color .2s;
    }
    .btn-ghost-lg:hover { border-color: rgba(201,160,80,.4); color: var(--gold); }

    /* ══════ HERO ══════ */
    .hero {
      position: relative; min-height: 100vh;
      background: var(--bg); overflow: hidden;
      display: flex; flex-direction: column; justify-content: center;
    }

    /* Animated orbs */
    .orb {
      position: absolute; border-radius: 50%;
      pointer-events: none; filter: blur(80px);
    }
    .orb-a {
      width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(201,160,80,.12) 0%, transparent 70%);
      top: -200px; right: -200px;
      animation: orb-float 18s ease-in-out infinite alternate;
    }
    .orb-b {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(100,80,180,.08) 0%, transparent 70%);
      bottom: -100px; left: -150px;
      animation: orb-float 24s ease-in-out infinite alternate-reverse;
    }
    .orb-c {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(201,160,80,.06) 0%, transparent 70%);
      top: 40%; left: 30%;
      animation: orb-float 14s ease-in-out infinite alternate;
    }
    @keyframes orb-float {
      from { transform: translate(0,0) scale(1); }
      to   { transform: translate(30px,-40px) scale(1.08); }
    }

    /* Noise texture overlay */
    .noise {
      position: absolute; inset: 0; pointer-events: none; opacity: .025; z-index: 1;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .hero-inner {
      max-width: 820px; margin: 0 auto; padding: 7rem 2rem 5rem;
      position: relative; z-index: 2;
    }

    .hero-tag {
      display: flex; align-items: center; gap: .7rem;
      font-size: .7rem; letter-spacing: .22em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 2.2rem; flex-wrap: wrap;
    }
    .sep { color: var(--gold-lo); font-size: .85rem; }

    .hero-h {
      font-size: clamp(4.5rem, 11vw, 10.5rem);
      font-weight: 700; line-height: .88;
      letter-spacing: -.055em; color: var(--text);
      margin-bottom: 2rem;
      text-shadow: 0 0 80px rgba(201,160,80,.18), 0 0 200px rgba(201,160,80,.08);
    }
    .hero-h em {
      color: var(--gold); font-style: normal;
      text-shadow: 0 0 60px rgba(201,160,80,.55), 0 0 120px rgba(201,160,80,.25);
    }

    .hero-p {
      font-size: clamp(.95rem, 1.6vw, 1.12rem); color: var(--muted);
      line-height: 1.7; max-width: 48ch; margin-bottom: 2.8rem;
    }

    .hero-actions { display: flex; gap: .9rem; flex-wrap: wrap; margin-bottom: 2.5rem; }

    .hero-location {
      display: inline-flex; align-items: center; gap: .6rem; color: var(--muted);
    }
    .loc-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--gold); animation: pulse-dot 2s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(201,160,80,.7);
    }
    @keyframes pulse-dot {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:.5; transform:scale(1.5); }
    }

    /* Scroll cue */
    .scroll-cue {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .5rem;
      color: var(--muted); z-index: 2;
    }
    .sc-track {
      width: 1px; height: 48px;
      background: rgba(240,237,230,.1); position: relative; overflow: hidden;
    }
    .sc-bar {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(180deg, transparent, var(--gold));
      animation: sc-drop 2.2s ease-in-out infinite;
    }
    @keyframes sc-drop { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }

    /* ══════ MARQUEE ══════ */
    .mq-strip {
      background: var(--bg-mid); padding: 1rem 0; overflow: hidden;
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .mq-track {
      display: flex; white-space: nowrap;
      animation: mq 30s linear infinite;
    }
    .mq-track span {
      display: inline-flex; align-items: center; gap: 1rem;
      font-size: .72rem; font-weight: 600; letter-spacing: .18em;
      text-transform: uppercase; color: rgba(201,160,80,.55);
      padding-right: 1rem;
    }
    .mq-dot { color: rgba(201,160,80,.25); font-size: .5rem; }
    @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* ══════ SERVICIOS — dark section ══════ */
    .sec-dark {
      background: var(--bg-mid); padding: 6rem 2rem;
    }
    .sec-dark .sec-head {
      max-width: 1100px; margin: 0 auto 4rem;
    }

    .svc-list { max-width: 1100px; margin: 0 auto; }

    .svc-row {
      display: flex; align-items: center; gap: 1.8rem;
      padding: 1.6rem 0; position: relative; cursor: pointer;
      border-top: 1px solid var(--border);
      transition: padding-left .35s cubic-bezier(.22,1,.36,1);
      transition-delay: calc(var(--i,0) * .07s);
    }
    .svc-row:last-child { border-bottom: 1px solid var(--border); }

    /* Hover gold line */
    .svc-row::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 2px; background: var(--gold);
      transform: scaleY(0); transform-origin: bottom;
      transition: transform .35s cubic-bezier(.22,1,.36,1);
      box-shadow: 0 0 12px rgba(201,160,80,.6);
    }
    .svc-row:hover::before { transform: scaleY(1); }
    .svc-row:hover { padding-left: 1.2rem; }

    .svc-n {
      font-size: .65rem; letter-spacing: .2em; color: rgba(201,160,80,.3);
      width: 28px; flex-shrink: 0;
      transition: color .25s;
    }
    .svc-row:hover .svc-n { color: rgba(201,160,80,.7); }

    .svc-ico {
      width: 40px; height: 40px; border-radius: 10px;
      background: rgba(201,160,80,.08); color: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; flex-shrink: 0;
      border: 1px solid rgba(201,160,80,.12);
      transition: background .25s, border-color .25s, box-shadow .25s;
    }
    .svc-row:hover .svc-ico {
      background: rgba(201,160,80,.14); border-color: rgba(201,160,80,.3);
      box-shadow: 0 0 18px rgba(201,160,80,.2);
    }

    .svc-body { flex: 1; }
    .svc-body h3 {
      font-size: 1.15rem; font-weight: 700; color: var(--text);
      letter-spacing: -.02em; margin-bottom: .25rem;
      transition: color .25s;
    }
    .svc-row:hover .svc-body h3 { color: var(--gold-hi); }
    .svc-body p {
      font-size: .85rem; color: var(--muted); line-height: 1.6;
      max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height .35s ease, opacity .25s ease;
    }
    .svc-row:hover .svc-body p { max-height: 60px; opacity: 1; transition-delay: .05s; }

    .svc-price {
      font-size: .82rem; font-weight: 700; color: rgba(201,160,80,.6);
      white-space: nowrap; transition: color .25s;
    }
    .svc-row:hover .svc-price { color: var(--gold); }

    .svc-arrow {
      color: rgba(201,160,80,.25); font-size: 1.1rem;
      transition: transform .25s, color .25s;
    }
    .svc-row:hover .svc-arrow { transform: translateX(5px); color: var(--gold); }

    /* ══════ SOBRE ══════ */
    .sec-about {
      display: grid; grid-template-columns: 1fr 1fr;
      min-height: 90vh; overflow: hidden; background: var(--bg);
    }

    .about-photo { position: relative; overflow: hidden; background: var(--bg-mid); }
    .about-photo img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center;
      display: block; filter: brightness(.88);
    }
    .about-photo-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, transparent 60%, var(--bg));
    }

    .about-text {
      display: flex; flex-direction: column; justify-content: center;
      padding: 5rem 4rem; gap: 1.1rem;
    }
    .about-name {
      font-size: clamp(2rem, 4vw, 4rem);
      font-weight: 700; line-height: .94;
      letter-spacing: -.04em; color: var(--text);
      margin: .5rem 0;
    }
    .about-name em { color: var(--gold); font-style: normal; }
    .about-role { color: rgba(201,160,80,.6); margin-bottom: .5rem; }
    .about-bio { color: var(--muted); line-height: 1.75; font-size: .97rem; }

    .about-chips { display: flex; flex-wrap: wrap; gap: .5rem; margin: .4rem 0; }
    .about-chips span {
      font-size: .7rem; letter-spacing: .1em; padding: 5px 13px;
      border: 1px solid var(--border); border-radius: 20px;
      color: rgba(240,237,230,.5); background: rgba(240,237,230,.03);
      transition: border-color .2s, color .2s;
    }
    .about-chips span:hover { border-color: rgba(201,160,80,.3); color: var(--gold); }

    /* ══════ PROCESO ══════ */
    .sec-process { padding: 6rem 2rem; }
    .sec-process .sec-head { max-width: 1100px; margin: 0 auto 3.5rem; }

    .proc-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
      gap: 1.2rem;
    }
    .proc-step {
      padding: 2.2rem 1.8rem; border: 1px solid var(--border);
      border-radius: var(--radius); background: rgba(255,255,255,.02);
      position: relative; overflow: hidden;
      transition: border-color .25s, transform .25s, box-shadow .25s;
      transition-delay: calc(var(--i,0) * .07s);
    }
    .proc-step::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(201,160,80,.06), transparent 65%);
      opacity: 0; transition: opacity .3s;
    }
    .proc-step:hover { border-color: rgba(201,160,80,.25); transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,.3); }
    .proc-step:hover::before { opacity: 1; }

    .proc-num {
      position: absolute; top: 1.4rem; right: 1.4rem;
      font-size: .6rem; letter-spacing: .2em; font-weight: 700;
      color: rgba(201,160,80,.2); font-family: monospace;
    }
    .proc-ico {
      width: 48px; height: 48px; border-radius: 12px;
      background: rgba(201,160,80,.08); color: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; margin-bottom: 1.2rem;
      border: 1px solid rgba(201,160,80,.15);
    }
    .proc-step h4 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: .5rem; }
    .proc-step p  { font-size: .85rem; color: var(--muted); line-height: 1.65; }

    /* ══════ TESTIMONIOS ══════ */
    .sec-testi { background: var(--bg); padding: 6rem 0; }
    .testi-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
      gap: 1.2rem;
    }
    .testi-card {
      background: var(--bg-mid); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 2.2rem 2rem;
      transition: border-color .25s, transform .25s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .testi-card:hover { border-color: rgba(201,160,80,.2); transform: translateY(-4px); }
    .testi-q {
      font-size: 4rem; line-height: .8; font-weight: 900;
      color: rgba(201,160,80,.15); margin-bottom: .4rem;
      font-family: Georgia, serif;
    }
    .testi-card p { color: var(--muted); font-size: .95rem; line-height: 1.72; margin-bottom: 1.4rem; font-style: italic; }
    .testi-stars { color: #f59e0b; font-size: .8rem; display: flex; gap: .15rem; margin-bottom: 1.2rem; }
    .testi-author { display: flex; align-items: center; gap: .8rem; }
    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, var(--bg-light), var(--bg-mid));
      border: 1px solid var(--border);
      color: var(--gold); font-weight: 800; font-size: .95rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .testi-author strong { display: block; font-size: .9rem; color: var(--text); font-weight: 700; }
    .testi-author small  { font-size: .75rem; color: var(--muted); }

    /* ══════ CTA ══════ */
    .sec-cta {
      background: var(--bg-mid); padding: 10rem 2rem;
      text-align: center; position: relative; overflow: hidden;
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .cta-bg-word {
      position: absolute; bottom: -1.5rem; left: 50%; transform: translateX(-50%);
      font-size: clamp(7rem, 22vw, 18rem); font-weight: 900;
      letter-spacing: -.06em; color: rgba(201,160,80,.025);
      white-space: nowrap; pointer-events: none; user-select: none;
      line-height: 1;
    }
    .cta-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }

    .cta-pill {
      display: inline-flex; align-items: center; gap: .6rem;
      padding: .45rem 1.1rem; border: 1px solid rgba(201,160,80,.2);
      border-radius: 999px; margin-bottom: 2rem;
      color: rgba(201,160,80,.7);
    }
    .live-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
      animation: pulse-dot 1.8s ease-in-out infinite;
      box-shadow: 0 0 8px rgba(201,160,80,.7);
    }

    .cta-big {
      font-size: clamp(4rem, 14vw, 12rem);
      font-weight: 700; line-height: .82;
      letter-spacing: -.055em; color: var(--text);
      margin-bottom: 1.5rem;
      text-shadow: 0 0 80px rgba(201,160,80,.2);
    }
    .cta-big em { color: var(--gold); font-style: normal; }

    .cta-sub { color: var(--muted); font-size: 1.05rem; margin-bottom: 2.8rem; }
    .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    /* ══════ CONTACTO ══════ */
    .sec-contact { padding: 6rem 2rem; }
    .sec-contact .sec-head { margin-bottom: 3rem; }

    .contact-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
      gap: 1rem; max-width: 1100px; margin: 0 auto;
    }
    .cc {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      gap: .5rem; padding: 2rem 1.5rem;
      background: rgba(255,255,255,.02); border: 1px solid var(--border);
      border-radius: var(--radius); text-decoration: none;
      transition: border-color .25s, transform .25s, box-shadow .25s;
      transition-delay: calc(var(--i,0) * .07s);
    }
    .cc:hover {
      border-color: rgba(201,160,80,.25); transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,.3);
    }
    .cc-ico {
      width: 48px; height: 48px; border-radius: 12px;
      background: rgba(201,160,80,.08); color: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; border: 1px solid rgba(201,160,80,.15);
      margin-bottom: .3rem;
    }
    .cc-lbl  { color: rgba(201,160,80,.5); }
    .cc strong { font-size: .92rem; color: var(--text); font-weight: 700; }
    .cc-wa .cc-ico { background: rgba(34,197,94,.08); color: #22c55e; border-color: rgba(34,197,94,.15); }

    /* ══════ HORARIOS ══════ */
    .sec-hours { background: var(--bg); padding: 5rem 0; }
    .hours-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
      gap: 1.2rem; max-width: 1100px; margin: 0 auto;
    }
    .hc {
      background: var(--bg-mid); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 2.5rem 1.5rem; text-align: center;
      transition: border-color .25s, transform .25s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .hc:hover { border-color: rgba(201,160,80,.2); transform: translateY(-4px); }
    .hc > i { font-size: 1.8rem; color: var(--gold); margin-bottom: .8rem; display: block; }
    .hc h4   { font-weight: 700; color: var(--text); margin-bottom: .5rem; font-size: .95rem; }
    .hc-time { font-size: 1.5rem; font-weight: 700; color: var(--gold); margin-bottom: .4rem; }
    .hc p    { color: var(--muted); }

    /* ══════ RESPONSIVE ══════ */
    @media (max-width: 900px) {
      .hero-inner { padding: 5rem 1.5rem 4rem; }
      .hero-h { font-size: clamp(3.5rem, 14vw, 7rem); }

      .sec-about { grid-template-columns: 1fr; min-height: unset; }
      .about-photo { height: 55vw; min-height: 280px; }
      .about-photo-overlay { background: linear-gradient(to bottom, transparent 60%, var(--bg)); }
      .about-text { padding: 3rem 1.5rem; }
      .about-name { font-size: clamp(2rem, 8vw, 3rem); }

      .svc-body p { max-height: unset !important; opacity: 1 !important; }

      .cta-big { font-size: clamp(3rem, 16vw, 8rem); }
    }

    @media (max-width: 600px) {
      .hero-tag { font-size: .62rem; gap: .5rem; }
      .hero-actions { flex-direction: column; align-items: flex-start; }
      .cta-btns { flex-direction: column; align-items: center; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';
  scrollPct = 0;

  mq = [
    'Psicología', 'Sexología', 'Terapia de Pareja',
    'Orientación Laboral', 'Crevillent', 'Online',
    'Primera Consulta Gratis', 'Confidencial',
  ];

  services = [
    { icon: 'fas fa-brain',       title: 'Terapia individual',   price: '60 €/sesión', desc: 'Ansiedad, depresión, autoestima, duelo y gestión emocional.' },
    { icon: 'fas fa-heart',       title: 'Terapia de pareja',    price: '70 €/sesión', desc: 'Comunicación, crisis relacionales, duelos y reconciliación.' },
    { icon: 'fas fa-venus-mars',  title: 'Sexología',            price: '60 €/sesión', desc: 'Disfunciones sexuales, educación y apoyo en salud sexual.' },
    { icon: 'fas fa-briefcase',   title: 'Orientación laboral',  price: '50 €/sesión', desc: 'CV, portfolio, entrevistas y videocurriculums profesionales.' },
    { icon: 'fas fa-users',       title: 'Talleres y grupos',    price: 'Consultar',   desc: 'Duelo, autoestima, biodanza y habilidades sociales.' },
    { icon: 'fas fa-building',    title: 'Empresas',             price: 'Consultar',   desc: 'Talleres de motivación, comunicación y trabajo en equipo.' },
  ];

  steps = [
    { icon: 'fas fa-phone-alt',      title: 'Contáctame',           desc: 'Llama, escribe por WhatsApp o rellena el formulario. Sin compromiso.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',     desc: 'Una sesión gratuita para conocernos y entender tus necesidades.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',   desc: 'Diseñamos juntos un plan terapéutico adaptado a tus objetivos.' },
    { icon: 'fas fa-seedling',       title: 'Avanzas y transformas',desc: 'Con sesiones regulares progresas hacia una vida más plena.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia en mi vida.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió completamente. Aprendimos a comunicarnos y entendernos de verdad.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en 3 semanas con su ayuda. El portfolio que diseñamos juntas fue clave.' },
  ];

  aboutTags = ['Cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  private revealObs!: IntersectionObserver;
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
    setTimeout(() => this.initReveal(), 80);
  }

  ngOnDestroy(): void { this.revealObs?.disconnect(); }

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
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv, .rv-left, .rv-right').forEach(el => this.revealObs.observe(el));
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }
  waLink(): string { return this.info.whatsapp ? 'https://wa.me/' + this.info.whatsapp.replace(/\D/g, '') : '#'; }
  scrollTo(id: string): void {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
}
