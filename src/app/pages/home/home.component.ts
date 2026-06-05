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
    <div class="progress-bar" [style.transform]="'scaleX('+pct/100+')'"></div>

    <!-- ══ HERO ══ -->
    <section class="hero" id="inicio">
      <div class="hero-blob hero-blob-1"></div>
      <div class="hero-blob hero-blob-2"></div>

      <div class="hero-content">
        <!-- LEFT -->
        <div class="hero-left">
          <div class="hero-eyebrow fd d1">
            <span class="chip">Crevillent · Online</span>
            <span class="dot-sep"></span>
            <span class="eyebrow-text">Primera consulta gratuita</span>
          </div>

          <h1 class="hero-h fd d2">
            Un espacio<br>
            para tu<br>
            <span class="hero-em">bienestar</span>
          </h1>

          <p class="hero-sub fd d3">
            Psicología, sexología y terapia de pareja.<br>
            Atención profesional y confidencial, a tu ritmo.
          </p>

          <div class="hero-btns fd d4">
            <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-primary">{{ ctaLabel }}</a>
            <a (click)="scrollTo('servicios')" class="btn-secondary">Conoce los servicios ↓</a>
          </div>

          <div class="hero-trust fd d5">
            <div class="trust-item" *ngFor="let t of trust">
              <i [class]="t.icon"></i>
              <span>{{ t.label }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT — photo tasteful -->
        <div class="hero-right fd d2">
          <div class="photo-wrap">
            <img src="/image.png" alt="Dolores Devesa Santacruz" />
            <div class="photo-card photo-card-top">
              <i class="fas fa-shield-alt"></i>
              <div>
                <strong>Confidencial</strong>
                <span>Espacio seguro</span>
              </div>
            </div>
            <div class="photo-card photo-card-bot">
              <i class="fas fa-gift"></i>
              <div>
                <strong>1ª consulta</strong>
                <span>sin coste</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-scroll fd d5">
        <div class="scroll-track"><div class="scroll-dot"></div></div>
        <span>scroll</span>
      </div>
    </section>

    <!-- ══ MARQUEE ══ -->
    <div class="marquee-strip">
      <div class="marquee-inner">
        <ng-container *ngFor="let _ of [0,1]">
          <span *ngFor="let m of mqItems">{{ m }} <em>·</em></span>
        </ng-container>
      </div>
    </div>

    <!-- ══ SERVICIOS ══ -->
    <section id="servicios" class="section section-light">
      <div class="wrap">
        <header class="sec-head rv">
          <span class="label">Servicios</span>
          <h2>¿En qué puedo<br>ayudarte?</h2>
          <p>Cada persona merece una atención adaptada a su historia.</p>
        </header>

        <div class="svc-grid">
          <div class="svc-card rv" *ngFor="let s of services; let i = index" [style.--i]="i">
            <div class="svc-icon">
              <i [class]="s.icon"></i>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <div class="svc-bottom">
              <span class="svc-price">{{ s.price }}</span>
              <a [routerLink]="ctaLink" class="svc-cta">Reservar →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SOBRE MÍ ══ -->
    <section id="sobre" class="section section-sage">
      <div class="wrap about-wrap">
        <div class="about-photo-col rv-left">
          <div class="about-photo-frame">
            <img src="/image.png" alt="Dolores Devesa Santacruz" />
          </div>
          <div class="about-decor"></div>
        </div>

        <div class="about-text-col rv-right">
          <span class="label">Sobre mí</span>
          <h2 class="about-name">Dolores<br>Devesa Santacruz</h2>
          <p class="about-role">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
          <p class="about-bio">
            Con amplia experiencia en acompañamiento emocional, trabajo desde un enfoque
            integrador, humano y basado en la evidencia. Creo en la capacidad de cada
            persona para transformar su vida cuando encuentra el apoyo adecuado.
          </p>
          <p class="about-bio">
            Mi consulta es un espacio de escucha activa, sin juicios, donde puedes
            explorar tus emociones y encontrar tu propio camino al bienestar.
          </p>
          <div class="about-tags">
            <span *ngFor="let t of aboutTags">{{ t }}</span>
          </div>
          <a routerLink="/registro" class="btn-primary" style="margin-top:1.5rem">
            Pedir cita con Dolores
          </a>
        </div>
      </div>
    </section>

    <!-- ══ PROCESO ══ -->
    <section class="section section-light">
      <div class="wrap">
        <header class="sec-head rv">
          <span class="label">Cómo funciona</span>
          <h2>Tu camino<br>empieza aquí</h2>
        </header>
        <div class="steps-grid">
          <div class="step rv" *ngFor="let s of steps; let i = index" [style.--i]="i">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-icon"><i [class]="s.icon"></i></div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ TESTIMONIOS ══ -->
    <section class="section section-cream">
      <div class="wrap">
        <header class="sec-head rv">
          <span class="label">Opiniones</span>
          <h2>Lo que dicen<br>mis pacientes</h2>
        </header>
        <div class="testi-grid">
          <div class="testi-card rv" *ngFor="let t of testimonials; let i = index" [style.--i]="i">
            <div class="testi-mark">"</div>
            <p>{{ t.text }}</p>
            <div class="testi-stars"><i class="fas fa-star" *ngFor="let _ of [0,0,0,0,0]"></i></div>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <small>{{ t.service }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CTA ══ -->
    <section class="section-cta">
      <div class="cta-blob cta-blob-1"></div>
      <div class="cta-blob cta-blob-2"></div>
      <div class="wrap cta-wrap">
        <div class="cta-left rv">
          <span class="label-light">Sin compromiso</span>
          <h2>¿Damos<br>el primer paso?</h2>
          <p>Reserva tu primera consulta gratuita hoy.</p>
        </div>
        <div class="cta-right rv">
          <a routerLink="/registro" class="btn-white">Crear cuenta y reservar</a>
          <a routerLink="/login" class="btn-white-ghost">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- ══ CONTACTO ══ -->
    <section id="contacto" class="section section-light">
      <div class="wrap">
        <header class="sec-head rv">
          <span class="label">Contacto</span>
          <h2>Hablemos</h2>
          <p>No estás sola/solo. El primer paso es el más difícil, y puedes darlo hoy.</p>
        </header>
        <div class="contact-grid">
          <a [href]="info.phone ? 'tel:'+info.phone : '#'" class="cc rv" [style.--i]="0">
            <div class="cc-icon"><i class="fas fa-phone-alt"></i></div>
            <strong>Teléfono</strong>
            <span>{{ info.phone || '+34 XXX XXX XXX' }}</span>
          </a>
          <a [href]="info.email ? 'mailto:'+info.email : '#'" class="cc rv" [style.--i]="1">
            <div class="cc-icon"><i class="fas fa-envelope"></i></div>
            <strong>Email</strong>
            <span>{{ info.email || 'consulta@devesan.com' }}</span>
          </a>
          <div class="cc rv" [style.--i]="2">
            <div class="cc-icon"><i class="fas fa-map-marker-alt"></i></div>
            <strong>Dirección</strong>
            <span>{{ info.address || 'Crevillent, Alicante' }}</span>
          </div>
          <a [href]="waLink()" target="_blank" class="cc cc-wa rv" [style.--i]="3" *ngIf="info.whatsapp">
            <div class="cc-icon cc-icon-wa"><i class="fab fa-whatsapp"></i></div>
            <strong>WhatsApp</strong>
            <span>{{ info.whatsapp }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ══ HORARIOS ══ -->
    <section id="horarios" class="section section-cream">
      <div class="wrap">
        <header class="sec-head rv">
          <span class="label">Disponibilidad</span>
          <h2>Horarios</h2>
        </header>
        <div class="hours-grid">
          <div class="hcard rv" [style.--i]="0">
            <i class="fas fa-sun"></i>
            <h4>Lunes – Viernes</h4>
            <div class="htime">{{ info.hours_lv || '9:00 – 18:00' }}</div>
            <p>Presencial y online</p>
          </div>
          <div class="hcard rv" [style.--i]="1">
            <i class="fas fa-coffee"></i>
            <h4>Sábados</h4>
            <div class="htime">{{ info.hours_sa || '9:00 – 14:00' }}</div>
            <p>Solo presencial</p>
          </div>
          <div class="hcard rv" [style.--i]="2">
            <i class="fas fa-laptop"></i>
            <h4>Online</h4>
            <div class="htime">Flexible</div>
            <p>Videollamada desde casa</p>
          </div>
        </div>
      </div>
    </section>

    <app-chat-widget></app-chat-widget>
  `,
  styles: [`
    /* ─── TOKENS ─── */
    :host {
      --sage:       #5a8a6a;
      --sage-hi:    #7aaa88;
      --sage-lo:    #3d6649;
      --sage-pale:  #edf4ef;
      --sage-soft:  #d6e9db;
      --cream:      #faf8f4;
      --cream-mid:  #f3ede3;
      --cream-dark: #e8e0d0;
      --text:       #1a2420;
      --text-mid:   #354039;
      --muted:      #6b7d72;
      --border:     #dde8e1;
      --white:      #ffffff;
      --r:          14px;
      --shadow:     0 4px 24px rgba(90,138,106,.08);
      --shadow-md:  0 8px 40px rgba(90,138,106,.14);
      font-family: 'Space Grotesk', 'Inter', sans-serif;
      color: var(--text);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :host { display: block; }

    .wrap { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

    /* ─── PROGRESS ─── */
    .progress-bar {
      position: fixed; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--sage), var(--sage-hi));
      transform-origin: left; transform: scaleX(0);
      z-index: 9999; pointer-events: none;
    }

    /* ─── SECTIONS ─── */
    .section       { padding: 6rem 0; }
    .section-light { background: var(--white); }
    .section-cream { background: var(--cream); }
    .section-sage  { background: var(--sage-pale); }

    /* ─── TYPOGRAPHY ─── */
    .label {
      display: inline-block; font-size: .7rem; font-weight: 700;
      letter-spacing: .18em; text-transform: uppercase;
      color: var(--sage); margin-bottom: .7rem;
    }
    .label-light {
      display: inline-block; font-size: .7rem; font-weight: 700;
      letter-spacing: .18em; text-transform: uppercase;
      color: rgba(255,255,255,.7); margin-bottom: .7rem;
    }
    .sec-head { margin-bottom: 3rem; }
    .sec-head h2 {
      font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 700;
      line-height: 1.1; letter-spacing: -.025em; color: var(--text);
      margin-bottom: .7rem;
    }
    .sec-head p { color: var(--muted); font-size: 1.05rem; max-width: 44ch; line-height: 1.7; }

    /* ─── BUTTONS ─── */
    .btn-primary {
      display: inline-block; padding: 14px 32px;
      background: var(--sage); color: #fff;
      border-radius: 50px; font-weight: 700; font-size: .95rem;
      text-decoration: none;
      box-shadow: 0 6px 24px rgba(90,138,106,.3);
      transition: background .2s, transform .2s, box-shadow .2s;
    }
    .btn-primary:hover {
      background: var(--sage-lo); transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(90,138,106,.38);
    }
    .btn-secondary {
      display: inline-block; padding: 14px 26px;
      border: 1.5px solid var(--border); color: var(--text-mid);
      border-radius: 50px; font-weight: 600; font-size: .95rem;
      text-decoration: none; cursor: pointer;
      transition: border-color .2s, color .2s, background .2s;
    }
    .btn-secondary:hover { border-color: var(--sage); color: var(--sage); background: var(--sage-pale); }

    .btn-white {
      display: inline-block; padding: 16px 38px;
      background: #fff; color: var(--sage-lo);
      border-radius: 50px; font-weight: 800; font-size: 1rem;
      text-decoration: none;
      box-shadow: 0 6px 28px rgba(0,0,0,.12);
      transition: transform .2s, box-shadow .2s;
    }
    .btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,0,0,.18); }

    .btn-white-ghost {
      display: inline-block; padding: 16px 30px;
      border: 1.5px solid rgba(255,255,255,.4); color: #fff;
      border-radius: 50px; font-weight: 600; font-size: 1rem;
      text-decoration: none; transition: border-color .2s, background .2s;
    }
    .btn-white-ghost:hover { border-color: rgba(255,255,255,.8); background: rgba(255,255,255,.08); }

    /* ─── REVEAL ─── */
    .rv {
      opacity: 0; transform: translateY(36px);
      transition: opacity .7s cubic-bezier(.22,1,.36,1),
                  transform .7s cubic-bezier(.22,1,.36,1);
      transition-delay: calc(var(--i,0) * .1s);
    }
    .rv.in { opacity: 1; transform: none; }
    .rv-left { opacity: 0; transform: translateX(-48px);
      transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rv-left.in { opacity: 1; transform: none; }
    .rv-right { opacity: 0; transform: translateX(48px);
      transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rv-right.in { opacity: 1; transform: none; }

    /* Hero fade-in */
    .fd { opacity: 0; transform: translateY(24px);
      animation: afd .75s cubic-bezier(.22,1,.36,1) forwards; }
    .d1{animation-delay:.05s} .d2{animation-delay:.2s}
    .d3{animation-delay:.38s} .d4{animation-delay:.54s}
    .d5{animation-delay:.7s}
    @keyframes afd { to { opacity:1; transform:none; } }

    /* ─── HERO ─── */
    .hero {
      min-height: 100vh; background: var(--cream);
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: center;
    }

    /* Background blobs */
    .hero-blob {
      position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px);
    }
    .hero-blob-1 {
      width: 600px; height: 600px; top: -120px; right: -100px;
      background: radial-gradient(circle, rgba(90,138,106,.14) 0%, transparent 70%);
      animation: blob-move 20s ease-in-out infinite alternate;
    }
    .hero-blob-2 {
      width: 400px; height: 400px; bottom: -60px; left: -80px;
      background: radial-gradient(circle, rgba(214,233,219,.6) 0%, transparent 70%);
      animation: blob-move 26s ease-in-out infinite alternate-reverse;
    }
    @keyframes blob-move {
      from { transform: translate(0,0) scale(1); }
      to   { transform: translate(20px,-30px) scale(1.06); }
    }

    .hero-content {
      max-width: 1100px; margin: 0 auto; padding: 6rem 1.5rem 4rem;
      display: grid; grid-template-columns: 1.1fr 0.9fr;
      align-items: center; gap: 4rem; position: relative; z-index: 1;
    }

    /* Hero left */
    .hero-eyebrow {
      display: flex; align-items: center; gap: .8rem;
      margin-bottom: 1.8rem; flex-wrap: wrap;
    }
    .chip {
      background: var(--sage-pale); color: var(--sage-lo);
      border: 1px solid var(--sage-soft); border-radius: 24px;
      font-size: .75rem; font-weight: 700; letter-spacing: .06em;
      padding: 5px 14px;
    }
    .dot-sep {
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--cream-dark); flex-shrink: 0;
    }
    .eyebrow-text { font-size: .8rem; color: var(--muted); font-weight: 500; }

    .hero-h {
      font-size: clamp(2.8rem, 6vw, 5.5rem);
      font-weight: 700; line-height: 1.05; letter-spacing: -.035em;
      color: var(--text); margin-bottom: 1.5rem;
    }
    .hero-em {
      color: var(--sage); display: inline-block;
      position: relative;
    }
    .hero-em::after {
      content: ''; position: absolute; left: 0; bottom: -4px; right: 0;
      height: 3px; border-radius: 2px;
      background: linear-gradient(90deg, var(--sage), var(--sage-hi));
      opacity: .5;
    }

    .hero-sub {
      font-size: 1.05rem; color: var(--muted); line-height: 1.75;
      max-width: 40ch; margin-bottom: 2.4rem;
    }

    .hero-btns { display: flex; gap: .9rem; flex-wrap: wrap; margin-bottom: 2.2rem; }

    .hero-trust { display: flex; gap: 1.6rem; flex-wrap: wrap; }
    .trust-item {
      display: flex; align-items: center; gap: .45rem;
      font-size: .8rem; color: var(--muted); font-weight: 500;
    }
    .trust-item i { color: var(--sage); font-size: .85rem; }

    /* Hero right — photo */
    .hero-right { display: flex; justify-content: center; align-items: center; }
    .photo-wrap { position: relative; width: 340px; }
    .photo-wrap img {
      width: 100%; aspect-ratio: 3/4;
      object-fit: cover; object-position: top center;
      border-radius: 24px 24px 120px 24px;
      box-shadow: 0 20px 60px rgba(90,138,106,.2), 0 4px 16px rgba(0,0,0,.06);
      display: block;
    }
    .photo-card {
      position: absolute; background: #fff;
      border-radius: 14px; padding: 10px 16px;
      display: flex; align-items: center; gap: .65rem;
      box-shadow: 0 8px 28px rgba(0,0,0,.1);
      font-size: .82rem;
    }
    .photo-card i { color: var(--sage); font-size: 1rem; }
    .photo-card strong { display: block; font-weight: 800; color: var(--text); font-size: .85rem; }
    .photo-card span  { color: var(--muted); font-size: .74rem; }
    .photo-card-top { top: 1.5rem; left: -2rem; }
    .photo-card-bot { bottom: 1.8rem; right: -2rem; }

    /* Scroll cue */
    .hero-scroll {
      position: absolute; bottom: 2.2rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .4rem;
      color: var(--muted); font-size: .68rem; letter-spacing: .14em;
      text-transform: uppercase; z-index: 1; font-weight: 600;
    }
    .scroll-track {
      width: 20px; height: 32px; border: 1.5px solid var(--cream-dark);
      border-radius: 10px; display: flex; justify-content: center; padding: 4px 0;
    }
    .scroll-dot {
      width: 4px; height: 8px; background: var(--sage);
      border-radius: 2px; animation: scroll-bounce 1.8s ease-in-out infinite;
    }
    @keyframes scroll-bounce {
      0%,100% { transform:translateY(0); opacity:1; }
      50%      { transform:translateY(10px); opacity:.3; }
    }

    /* ─── MARQUEE ─── */
    .marquee-strip {
      background: var(--sage); padding: .9rem 0; overflow: hidden;
    }
    .marquee-inner {
      display: flex; white-space: nowrap;
      animation: mq 32s linear infinite;
    }
    .marquee-inner span {
      display: inline-flex; align-items: center; gap: .9rem;
      font-size: .72rem; font-weight: 600; letter-spacing: .16em;
      text-transform: uppercase; color: rgba(255,255,255,.7);
      padding-right: .9rem;
    }
    .marquee-inner em { color: rgba(255,255,255,.3); font-style: normal; font-size: .5rem; }
    @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* ─── SERVICIOS ─── */
    .svc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.4rem;
    }
    .svc-card {
      background: var(--cream); border: 1.5px solid var(--border);
      border-radius: var(--r); padding: 2rem 1.8rem;
      display: flex; flex-direction: column; gap: .7rem;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i,0) * .06s);
    }
    .svc-card:hover {
      transform: translateY(-5px); box-shadow: var(--shadow-md);
      border-color: var(--sage-soft);
    }
    .svc-icon {
      width: 50px; height: 50px; border-radius: 14px;
      background: var(--sage-pale); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.25rem;
      border: 1px solid var(--sage-soft);
    }
    .svc-card h3 { font-size: 1.08rem; font-weight: 700; color: var(--text); }
    .svc-card p  { color: var(--muted); font-size: .87rem; line-height: 1.65; flex: 1; }
    .svc-bottom  { display: flex; align-items: center; justify-content: space-between; padding-top: .4rem; border-top: 1px solid var(--border); }
    .svc-price   { font-size: .85rem; font-weight: 700; color: var(--sage); }
    .svc-cta     { font-size: .83rem; font-weight: 700; color: var(--text-mid); text-decoration: none; transition: color .15s; }
    .svc-cta:hover { color: var(--sage); }

    /* ─── SOBRE MÍ ─── */
    .about-wrap {
      display: grid; grid-template-columns: 0.85fr 1.15fr;
      align-items: center; gap: 5rem;
    }

    .about-photo-col { position: relative; }
    .about-photo-frame {
      width: 100%; aspect-ratio: 4/5; overflow: hidden;
      border-radius: 24px 120px 24px 24px;
      box-shadow: var(--shadow-md);
    }
    .about-photo-frame img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;
    }
    .about-decor {
      position: absolute; width: 140px; height: 140px;
      bottom: -24px; left: -24px; border-radius: 50%;
      border: 3px solid var(--sage-soft); z-index: -1;
    }

    .about-name {
      font-size: clamp(1.8rem, 3.5vw, 3rem);
      font-weight: 700; line-height: 1.1; letter-spacing: -.025em;
      color: var(--text); margin: .4rem 0 .5rem;
    }
    .about-role { color: var(--sage); font-weight: 600; font-size: .9rem; margin-bottom: 1.2rem; }
    .about-bio  { color: var(--muted); line-height: 1.75; font-size: .97rem; margin-bottom: .8rem; }

    .about-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: .8rem 0; }
    .about-tags span {
      font-size: .75rem; font-weight: 600;
      background: var(--white); border: 1px solid var(--border);
      color: var(--text-mid); padding: 5px 14px; border-radius: 24px;
      transition: border-color .18s, color .18s;
    }
    .about-tags span:hover { border-color: var(--sage-soft); color: var(--sage); }

    /* ─── PROCESO ─── */
    .steps-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
      gap: 1.4rem;
    }
    .step {
      background: var(--cream); border: 1.5px solid var(--border);
      border-radius: var(--r); padding: 2.2rem 1.7rem; position: relative;
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .step:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
    .step-num {
      position: absolute; top: 1.4rem; right: 1.4rem;
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--sage); color: #fff;
      font-weight: 800; font-size: .8rem;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(90,138,106,.3);
    }
    .step-icon {
      width: 50px; height: 50px; border-radius: 14px;
      background: var(--sage-pale); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; margin-bottom: 1.1rem;
      border: 1px solid var(--sage-soft);
    }
    .step h4 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: .45rem; }
    .step p  { font-size: .86rem; color: var(--muted); line-height: 1.65; }

    /* ─── TESTIMONIOS ─── */
    .testi-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
      gap: 1.4rem;
    }
    .testi-card {
      background: var(--white); border: 1.5px solid var(--border);
      border-radius: var(--r); padding: 2rem 1.8rem;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i,0) * .09s);
    }
    .testi-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--sage-soft); }
    .testi-mark { font-size: 4rem; line-height: .8; color: var(--sage-soft); font-family: Georgia, serif; margin-bottom: .3rem; }
    .testi-card p { color: var(--text-mid); font-size: .95rem; line-height: 1.72; margin-bottom: 1.3rem; font-style: italic; }
    .testi-stars { color: #f59e0b; display: flex; gap: .12rem; font-size: .8rem; margin-bottom: 1.2rem; }
    .testi-author { display: flex; align-items: center; gap: .75rem; }
    .testi-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--sage-pale); color: var(--sage-lo);
      font-weight: 800; font-size: .95rem;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; border: 1.5px solid var(--sage-soft);
    }
    .testi-author strong { display: block; font-size: .88rem; color: var(--text); font-weight: 700; }
    .testi-author small  { font-size: .76rem; color: var(--muted); }

    /* ─── CTA ─── */
    .section-cta {
      background: linear-gradient(135deg, var(--sage-lo) 0%, var(--sage) 60%, var(--sage-hi) 100%);
      padding: 5.5rem 0; position: relative; overflow: hidden;
    }
    .cta-blob {
      position: absolute; border-radius: 50%; pointer-events: none; filter: blur(70px);
    }
    .cta-blob-1 { width:400px;height:400px;top:-120px;right:-80px;background:rgba(255,255,255,.08); }
    .cta-blob-2 { width:300px;height:300px;bottom:-80px;left:-60px;background:rgba(0,0,0,.06); }
    .cta-wrap {
      display: grid; grid-template-columns: 1fr auto;
      align-items: center; gap: 3rem; position: relative; z-index: 1;
    }
    .cta-left h2 {
      font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 700;
      color: #fff; line-height: 1.1; letter-spacing: -.025em; margin: .4rem 0 .7rem;
    }
    .cta-left p { color: rgba(255,255,255,.72); font-size: 1rem; }
    .cta-right { display: flex; flex-direction: column; gap: .8rem; align-items: flex-end; }

    /* ─── CONTACTO ─── */
    .contact-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 1.2rem;
    }
    .cc {
      background: var(--cream); border: 1.5px solid var(--border);
      border-radius: var(--r); padding: 1.8rem 1.5rem;
      display: flex; flex-direction: column; align-items: center; text-align: center; gap: .5rem;
      text-decoration: none;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i,0) * .07s);
    }
    .cc:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--sage-soft); }
    .cc-icon {
      width: 50px; height: 50px; border-radius: 14px;
      background: var(--sage-pale); color: var(--sage);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; border: 1px solid var(--sage-soft); margin-bottom: .2rem;
    }
    .cc-icon-wa { background: rgba(34,197,94,.1); color: #16a34a; border-color: rgba(34,197,94,.2); }
    .cc strong { font-size: .9rem; font-weight: 700; color: var(--text); }
    .cc span   { font-size: .85rem; color: var(--muted); }

    /* ─── HORARIOS ─── */
    .hours-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 1.4rem;
    }
    .hcard {
      background: var(--white); border: 1.5px solid var(--border);
      border-radius: var(--r); padding: 2.5rem 1.5rem; text-align: center;
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .hcard:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
    .hcard > i { font-size: 1.8rem; color: var(--sage); margin-bottom: .8rem; display: block; }
    .hcard h4   { font-weight: 700; color: var(--text); margin-bottom: .4rem; }
    .htime { font-size: 1.5rem; font-weight: 700; color: var(--sage); margin-bottom: .4rem; }
    .hcard p { color: var(--muted); font-size: .85rem; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 960px) {
      .hero-content { grid-template-columns: 1fr; gap: 2.5rem; padding: 5rem 1.5rem 3rem; }
      .hero-right { order: -1; }
      .photo-wrap { width: 260px; }
      .photo-card-top { left: -1rem; }
      .photo-card-bot { right: -1rem; }
      .hero-sub { max-width: 100%; }

      .about-wrap { grid-template-columns: 1fr; gap: 3rem; }
      .about-photo-frame { aspect-ratio: 16/9; border-radius: 20px; max-height: 320px; }
      .about-photo-frame img { object-position: center 15%; }
      .about-decor { display: none; }

      .cta-wrap { grid-template-columns: 1fr; text-align: center; }
      .cta-right { align-items: center; }
    }

    @media (max-width: 600px) {
      .section { padding: 4rem 0; }
      .hero-btns { flex-direction: column; align-items: flex-start; }
      .hero-trust { gap: 1rem; }
      .photo-wrap { width: 220px; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';
  pct       = 0;

  trust = [
    { icon: 'fas fa-lock',        label: '100% Confidencial'   },
    { icon: 'fas fa-laptop',      label: 'Online y presencial' },
    { icon: 'fas fa-map-marker-alt', label: 'Crevillent'       },
  ];

  mqItems = [
    'Psicología', 'Sexología', 'Terapia de Pareja',
    'Orientación Laboral', 'Crevillent', 'Online',
    'Confidencial', '1ª Consulta Gratis',
  ];

  services = [
    { icon: 'fas fa-brain',      title: 'Terapia individual',  price: '60 €/sesión', desc: 'Ansiedad, depresión, autoestima, duelo y gestión emocional.' },
    { icon: 'fas fa-heart',      title: 'Terapia de pareja',   price: '70 €/sesión', desc: 'Comunicación, crisis relacionales y duelos de pareja.' },
    { icon: 'fas fa-venus-mars', title: 'Sexología',           price: '60 €/sesión', desc: 'Disfunciones sexuales, educación y salud sexual.' },
    { icon: 'fas fa-briefcase',  title: 'Orientación laboral', price: '50 €/sesión', desc: 'CV, portfolio, entrevistas y videocurriculums.' },
    { icon: 'fas fa-users',      title: 'Talleres y grupos',   price: 'Consultar',   desc: 'Duelo, autoestima, biodanza y habilidades sociales.' },
    { icon: 'fas fa-building',   title: 'Empresas',            price: 'Consultar',   desc: 'Motivación, comunicación y habilidades en equipo.' },
  ];

  steps = [
    { icon: 'fas fa-phone-alt',      title: 'Contáctame',          desc: 'Llama, escribe por WhatsApp o rellena el formulario online.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',    desc: 'Una sesión gratuita para conocernos sin compromiso.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',  desc: 'Diseñamos juntos un plan adaptado a tus objetivos.' },
    { icon: 'fas fa-seedling',       title: 'Avanzas',             desc: 'Con sesiones regulares progresamos hacia tu bienestar.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió por completo. Aprendimos a comunicarnos y entendernos de verdad.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en pocas semanas con su ayuda. El portfolio que diseñamos juntas fue clave.' },
  ];

  aboutTags = ['Cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  private revealObs!: IntersectionObserver;
  private scrollTicking = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: r => { (r.info || []).forEach((i: any) => { this.info[i.key] = i.value; }); },
      error: () => {}
    });
    this.auth.user$.subscribe(u => {
      if (u?.role === 'patient') { this.ctaLink = '/mi-area'; this.ctaParams = { tab: 'reservar' }; this.ctaLabel = 'Reservar cita'; }
      else if (u?.role === 'admin') { this.ctaLink = '/admin'; this.ctaParams = null; this.ctaLabel = 'Panel admin'; }
      else { this.ctaLink = '/registro'; this.ctaParams = null; this.ctaLabel = 'Reservar cita'; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); this.revealObs.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el => this.revealObs.observe(el));
    }, 80);
  }

  ngOnDestroy(): void { this.revealObs?.disconnect(); }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.pct = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100);
      this.scrollTicking = false;
    });
  }

  waLink(): string { return this.info.whatsapp ? 'https://wa.me/' + this.info.whatsapp.replace(/\D/g,'') : '#'; }
  scrollTo(id: string): void { setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50); }
}
