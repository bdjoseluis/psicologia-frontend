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
    <div class="pbar" [style.transform]="'scaleX('+pct/100+')'"></div>

    <!-- HERO -->
    <section class="hero" id="inicio">
      <div class="hero-glow g1"></div>
      <div class="hero-glow g2"></div>

      <div class="hero-inner">
        <p class="hero-tag fd d1">Psicología · Sexología · Terapia de Pareja</p>

        <h1 class="hero-h fd d2">
          Cuidar tu mente<br>es el mejor<br>
          <span class="accent">regalo.</span>
        </h1>

        <p class="hero-p fd d3">
          Atención profesional y confidencial en Crevillent (Alicante) y online.<br>
          Primera consulta gratuita, sin compromiso.
        </p>

        <div class="hero-ctas fd d4">
          <a [routerLink]="ctaLink" [queryParams]="ctaParams" class="btn-primary">{{ ctaLabel }}</a>
          <a (click)="scrollTo('servicios')" class="btn-ghost">Ver servicios</a>
        </div>

        <!-- Avatar circular -->
        <div class="hero-profile fd d5">
          <div class="avatar-ring">
            <img src="/image.png" alt="Dolores Devesa Santacruz" />
          </div>
          <div class="profile-text">
            <strong>Dolores Devesa Santacruz</strong>
            <span>Psicóloga colegiada · Crevillent</span>
          </div>
          <div class="profile-pill"><i class="fas fa-gift"></i> 1ª consulta gratis</div>
        </div>
      </div>

      <!-- Floating trust card (desktop) -->
      <div class="hero-float fd d5">
        <div class="hf-quote">"Encontré el espacio que necesitaba para avanzar."</div>
        <div class="hf-who">
          <div class="hf-av">A</div>
          <div><strong>Ana M.</strong><small>Terapia individual</small></div>
        </div>
        <div class="hf-stars"><i class="fas fa-star" *ngFor="let _ of [0,0,0,0,0]"></i></div>
      </div>

      <div class="scroll-hint fd d5">
        <div class="sh-mouse"><div class="sh-wheel"></div></div>
        <span>scroll</span>
      </div>
    </section>

    <!-- MARQUEE STRIP -->
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span *ngFor="let w of marqueeWords">{{ w }}</span>
        <span *ngFor="let w of marqueeWords">{{ w }}</span>
      </div>
    </div>

    <!-- SERVICIOS -->
    <section id="servicios" class="sec">
      <div class="w">
        <div class="sec-head rv">
          <p class="overline">Servicios</p>
          <h2>¿En qué puedo<br>ayudarte?</h2>
          <p class="sub">Cada persona es única. Trabajo de forma personalizada según tus necesidades.</p>
        </div>

        <div class="svc-grid">
          <div class="svc rv" *ngFor="let s of services; let i = index" [style.--i]="i">
            <div class="svc-ico"><i [class]="s.icon"></i></div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <div class="svc-foot">
              <span class="price">{{ s.price }}</span>
              <a [routerLink]="ctaLink" class="svc-link">Reservar →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOBRE MÍ -->
    <section id="sobre" class="sec sec-tinted">
      <div class="w about-w">
        <div class="about-img rv-l">
          <div class="about-avatar">
            <img src="/image.png" alt="Dolores Devesa Santacruz" />
          </div>
        </div>

        <div class="about-txt rv-r">
          <p class="overline">Sobre mí</p>
          <h2>Dolores Devesa<br>Santacruz</h2>
          <p class="about-role">Psicóloga · Sexóloga · Terapeuta de Pareja</p>
          <p class="body-txt">Con amplia experiencia en acompañamiento emocional y desarrollo personal, trabajo desde un enfoque integrador, humano y basado en la evidencia científica.</p>
          <p class="body-txt">Mi objetivo es crear un espacio seguro donde puedas explorar tus emociones y avanzar hacia el bienestar que mereces.</p>
          <div class="tags">
            <span *ngFor="let t of tags">{{ t }}</span>
          </div>
          <a routerLink="/registro" class="btn-primary" style="margin-top:1.8rem">Pedir cita</a>
        </div>
      </div>
    </section>

    <!-- PROCESO -->
    <section class="sec">
      <div class="w">
        <div class="sec-head rv">
          <p class="overline">Cómo funciona</p>
          <h2>Tu camino<br>al bienestar</h2>
        </div>
        <div class="steps">
          <div class="step rv" *ngFor="let s of steps; let i = index" [style.--i]="i">
            <div class="step-n">{{ i+1 }}</div>
            <div class="step-ico"><i [class]="s.icon"></i></div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="sec sec-tinted">
      <div class="w">
        <div class="sec-head rv">
          <p class="overline">Opiniones</p>
          <h2>Lo que dicen<br>mis pacientes</h2>
        </div>
        <div class="testi-grid">
          <div class="tcard rv" *ngFor="let t of testimonials; let i = index" [style.--i]="i">
            <div class="tcard-q">"</div>
            <p>{{ t.text }}</p>
            <div class="stars"><i class="fas fa-star" *ngFor="let _ of [0,0,0,0,0]"></i></div>
            <div class="tcard-who">
              <div class="tcard-av">{{ t.name[0] }}</div>
              <div><strong>{{ t.name }}</strong><small>{{ t.service }}</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="cta-sec">
      <div class="w cta-w rv">
        <div>
          <p class="overline-light">Sin compromiso</p>
          <h2>¿Hablamos?</h2>
          <p>La primera sesión es gratuita. Dé el primer paso hoy.</p>
        </div>
        <div class="cta-btns">
          <a routerLink="/registro" class="btn-white">Crear cuenta y reservar</a>
          <a routerLink="/login"    class="btn-white-o">Ya tengo cuenta →</a>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="sec">
      <div class="w">
        <div class="sec-head rv">
          <p class="overline">Contacto</p>
          <h2>Estoy aquí<br>para ti</h2>
        </div>
        <div class="cc-grid">
          <a [href]="info.phone?'tel:'+info.phone:'#'" class="cc rv" [style.--i]="0">
            <div class="cc-ic"><i class="fas fa-phone-alt"></i></div>
            <strong>Teléfono</strong><span>{{ info.phone||'+34 XXX XXX XXX' }}</span>
          </a>
          <a [href]="info.email?'mailto:'+info.email:'#'" class="cc rv" [style.--i]="1">
            <div class="cc-ic"><i class="fas fa-envelope"></i></div>
            <strong>Email</strong><span>{{ info.email||'consulta@devesan.com' }}</span>
          </a>
          <div class="cc rv" [style.--i]="2">
            <div class="cc-ic"><i class="fas fa-map-marker-alt"></i></div>
            <strong>Dirección</strong><span>{{ info.address||'Crevillent, Alicante' }}</span>
          </div>
          <a [href]="waLink()" target="_blank" class="cc cc-wa rv" [style.--i]="3" *ngIf="info.whatsapp">
            <div class="cc-ic cc-wa-ic"><i class="fab fa-whatsapp"></i></div>
            <strong>WhatsApp</strong><span>{{ info.whatsapp }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- HORARIOS -->
    <section id="horarios" class="sec sec-tinted">
      <div class="w">
        <div class="sec-head rv">
          <p class="overline">Disponibilidad</p>
          <h2>Horarios</h2>
        </div>
        <div class="hr-grid">
          <div class="hc rv" [style.--i]="0">
            <i class="fas fa-sun"></i>
            <h4>Lunes – Viernes</h4>
            <div class="htime">{{ info.hours_lv||'9:00 – 18:00' }}</div>
            <p>Presencial y online</p>
          </div>
          <div class="hc rv" [style.--i]="1">
            <i class="fas fa-coffee"></i>
            <h4>Sábados</h4>
            <div class="htime">{{ info.hours_sa||'9:00 – 14:00' }}</div>
            <p>Solo presencial</p>
          </div>
          <div class="hc rv" [style.--i]="2">
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
    /* ── TOKENS ── */
    :host {
      --lav:       #7c6fcd;
      --lav-hi:    #9d93d8;
      --lav-lo:    #5a4fb5;
      --lav-pale:  #f3f1fb;
      --lav-soft:  #e2dff6;
      --lav-mid:   #c8c3ee;
      --bg:        #ffffff;
      --tint:      #faf9fe;
      --text:      #111118;
      --text-2:    #3a3a4a;
      --muted:     #6e6e82;
      --border:    #e8e6f4;
      --r:         16px;
      font-family: -apple-system, 'SF Pro Display', 'Space Grotesk', 'Inter', sans-serif;
      color: var(--text);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :host { display: block; }
    .w { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }

    /* ── PROGRESS ── */
    .pbar {
      position: fixed; top: 0; left: 0; right: 0; height: 2.5px;
      background: linear-gradient(90deg, var(--lav), var(--lav-hi));
      transform-origin: left; z-index: 9999; pointer-events: none;
    }

    /* ── REVEAL ── */
    .rv {
      opacity: 0; transform: translateY(32px);
      transition: opacity .72s cubic-bezier(.22,1,.36,1),
                  transform .72s cubic-bezier(.22,1,.36,1);
      transition-delay: calc(var(--i,0) * .09s);
    }
    .rv.in { opacity: 1; transform: none; }
    .rv-l { opacity:0; transform:translateX(-42px);
      transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rv-r { opacity:0; transform:translateX(42px);
      transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rv-l.in, .rv-r.in { opacity:1; transform:none; }

    .fd { opacity:0; transform:translateY(20px); animation: afd .75s cubic-bezier(.22,1,.36,1) forwards; }
    .d1{animation-delay:.08s} .d2{animation-delay:.22s} .d3{animation-delay:.38s}
    .d4{animation-delay:.52s} .d5{animation-delay:.66s}
    @keyframes afd { to { opacity:1; transform:none; } }

    /* ── SECTIONS ── */
    .sec { padding: 7rem 0; background: var(--bg); }
    .sec-tinted { background: var(--tint); }

    .sec-head { margin-bottom: 3.5rem; }
    .sec-head h2 {
      font-size: clamp(2.2rem, 4.5vw, 3.8rem);
      font-weight: 700; letter-spacing: -.03em;
      line-height: 1.1; color: var(--text); margin: .4rem 0 .8rem;
    }
    .sec-head .sub { color: var(--muted); font-size: 1.05rem; max-width: 46ch; line-height: 1.7; }

    .overline {
      font-size: .7rem; font-weight: 700; letter-spacing: .18em;
      text-transform: uppercase; color: var(--lav); display: block; margin-bottom: .5rem;
    }
    .overline-light {
      font-size: .7rem; font-weight: 700; letter-spacing: .18em;
      text-transform: uppercase; color: rgba(255,255,255,.65); display: block; margin-bottom: .5rem;
    }

    /* ── BUTTONS ── */
    .btn-primary {
      display: inline-flex; align-items: center;
      padding: 14px 30px; background: var(--lav); color: #fff;
      border-radius: 980px; font-weight: 600; font-size: .95rem;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(124,111,205,.35);
      transition: background .2s, transform .2s, box-shadow .2s;
    }
    .btn-primary:hover { background: var(--lav-lo); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(124,111,205,.45); }

    .btn-ghost {
      display: inline-flex; align-items: center;
      padding: 14px 26px; border: 1.5px solid var(--border); color: var(--text-2);
      border-radius: 980px; font-weight: 600; font-size: .95rem;
      text-decoration: none; cursor: pointer;
      transition: border-color .2s, color .2s, background .2s;
    }
    .btn-ghost:hover { border-color: var(--lav-mid); color: var(--lav); background: var(--lav-pale); }

    .btn-white {
      display: inline-flex; padding: 14px 30px;
      background: #fff; color: var(--lav-lo);
      border-radius: 980px; font-weight: 700; font-size: .95rem;
      text-decoration: none; box-shadow: 0 4px 20px rgba(0,0,0,.12);
      transition: transform .2s, box-shadow .2s;
    }
    .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,.18); }

    .btn-white-o {
      display: inline-flex; padding: 14px 26px;
      border: 1.5px solid rgba(255,255,255,.4); color: #fff;
      border-radius: 980px; font-weight: 600; font-size: .95rem;
      text-decoration: none; transition: border-color .2s, background .2s;
    }
    .btn-white-o:hover { border-color: rgba(255,255,255,.8); background: rgba(255,255,255,.1); }

    /* ── MARQUEE ── */
    .marquee-wrap {
      overflow: hidden; white-space: nowrap;
      background: var(--lav-pale); border-top: 1px solid var(--lav-soft); border-bottom: 1px solid var(--lav-soft);
      padding: .85rem 0;
    }
    .marquee-track {
      display: inline-flex; gap: 2rem;
      animation: marquee 28s linear infinite;
      font-size: .8rem; font-weight: 700; letter-spacing: .08em;
      color: var(--lav-lo); text-transform: uppercase;
    }
    .marquee-track span { padding: 0 .5rem; }
    @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }

    /* Floating trust card */
    .hero-float {
      position: absolute; right: max(4vw, 2rem); top: 50%;
      transform: translateY(-50%);
      background: #fff; border: 1px solid var(--border);
      border-radius: 20px; padding: 1.4rem 1.6rem;
      width: 240px;
      box-shadow: 0 16px 48px rgba(124,111,205,.14), 0 2px 8px rgba(0,0,0,.06);
      display: flex; flex-direction: column; gap: .7rem;
      z-index: 2;
    }
    .hf-quote {
      font-size: .88rem; color: var(--text-2); line-height: 1.6;
      font-style: italic;
    }
    .hf-who {
      display: flex; align-items: center; gap: .6rem;
    }
    .hf-av {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      background: var(--lav-pale); border: 1.5px solid var(--lav-soft);
      color: var(--lav-lo); font-weight: 800; font-size: .85rem;
      display: flex; align-items: center; justify-content: center;
    }
    .hf-who strong { display: block; font-size: .83rem; color: var(--text); font-weight: 700; }
    .hf-who small  { font-size: .73rem; color: var(--muted); }
    .hf-stars      { color: #f59e0b; font-size: .72rem; display: flex; gap: .1rem; }

    /* ── HERO ── */
    .hero {
      min-height: 100svh; background: var(--bg);
      display: flex; flex-direction: column; justify-content: center;
      position: relative; overflow: hidden;
    }

    .hero-glow {
      position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px);
    }
    .g1 {
      width: 700px; height: 700px; top: -200px; right: -200px;
      background: radial-gradient(circle, rgba(200,195,238,.5) 0%, transparent 65%);
      animation: gfloat 22s ease-in-out infinite alternate;
    }
    .g2 {
      width: 500px; height: 500px; bottom: -100px; left: -100px;
      background: radial-gradient(circle, rgba(230,228,250,.5) 0%, transparent 65%);
      animation: gfloat 28s ease-in-out infinite alternate-reverse;
    }
    @keyframes gfloat { from{transform:translate(0,0)} to{transform:translate(24px,-32px)} }

    .hero-inner {
      max-width: 760px; margin: 0 auto;
      padding: 6rem 1.5rem 4rem;
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: flex-start;
    }

    .hero-tag {
      font-size: .75rem; font-weight: 600; letter-spacing: .12em;
      text-transform: uppercase; color: var(--muted);
      margin-bottom: 1.8rem;
    }

    .hero-h {
      font-size: clamp(3rem, 7.5vw, 7rem);
      font-weight: 700; line-height: 1.02;
      letter-spacing: -.04em; color: var(--text);
      margin-bottom: 1.5rem;
    }
    .accent {
      background: linear-gradient(135deg, var(--lav-lo), var(--lav-hi));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .hero-p {
      font-size: clamp(1rem, 1.8vw, 1.15rem); color: var(--muted);
      line-height: 1.75; max-width: 52ch; margin-bottom: 2.4rem;
    }

    .hero-ctas { display: flex; gap: .8rem; flex-wrap: wrap; margin-bottom: 3rem; }

    /* Avatar profile row */
    .hero-profile {
      display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    }
    .avatar-ring {
      width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
      border: 2.5px solid var(--lav-soft);
      box-shadow: 0 4px 16px rgba(124,111,205,.2);
    }
    .avatar-ring img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }

    .profile-text { display: flex; flex-direction: column; gap: .1rem; }
    .profile-text strong { font-size: .9rem; font-weight: 700; color: var(--text); }
    .profile-text span   { font-size: .78rem; color: var(--muted); }

    .profile-pill {
      display: inline-flex; align-items: center; gap: .4rem;
      background: var(--lav-pale); border: 1px solid var(--lav-soft);
      color: var(--lav-lo); border-radius: 980px;
      font-size: .75rem; font-weight: 600; padding: 5px 14px;
    }
    .profile-pill i { font-size: .75rem; }

    /* Scroll hint */
    .scroll-hint {
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .4rem;
      color: var(--muted); font-size: .65rem; letter-spacing: .14em; text-transform: uppercase;
      z-index: 1; font-weight: 600;
    }
    .sh-mouse {
      width: 22px; height: 34px; border: 1.5px solid var(--border);
      border-radius: 11px; display: flex; justify-content: center; align-items: flex-start; padding: 5px 0;
    }
    .sh-wheel {
      width: 3px; height: 8px; background: var(--lav-hi); border-radius: 2px;
      animation: shw 2s ease-in-out infinite;
    }
    @keyframes shw { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(9px);opacity:.25} }

    /* ── SERVICIOS ── */
    .svc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.2rem;
    }
    .svc {
      background: var(--tint); border: 1px solid var(--border);
      border-radius: var(--r); padding: 2rem 1.8rem;
      display: flex; flex-direction: column; gap: .7rem;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i,0) * .06s);
    }
    .svc:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(124,111,205,.12);
      border-color: var(--lav-mid);
    }
    .svc-ico {
      width: 48px; height: 48px; border-radius: 12px;
      background: var(--lav-pale); color: var(--lav);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; border: 1px solid var(--lav-soft);
    }
    .svc h3 { font-size: 1.05rem; font-weight: 700; color: var(--text); }
    .svc p  { font-size: .87rem; color: var(--muted); line-height: 1.65; flex: 1; }
    .svc-foot {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: .6rem; border-top: 1px solid var(--border);
    }
    .price  { font-size: .85rem; font-weight: 700; color: var(--lav); }
    .svc-link { font-size: .83rem; font-weight: 600; color: var(--muted); text-decoration: none; transition: color .15s; }
    .svc-link:hover { color: var(--lav); }

    /* ── SOBRE MÍ ── */
    .about-w {
      display: grid; grid-template-columns: 0.7fr 1.3fr;
      gap: 5rem; align-items: center;
    }
    .about-img { display: flex; justify-content: center; }
    .about-avatar {
      width: 260px; height: 260px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
      border: 4px solid var(--lav-soft);
      box-shadow: 0 16px 48px rgba(124,111,205,.2);
    }
    .about-avatar img { width:100%; height:100%; object-fit:cover; object-position:top center; }

    .about-txt h2 {
      font-size: clamp(1.8rem, 3.5vw, 3rem);
      font-weight: 700; letter-spacing: -.025em; line-height: 1.1;
      color: var(--text); margin: .4rem 0 .3rem;
    }
    .about-role { color: var(--lav); font-weight: 600; font-size: .9rem; margin-bottom: 1.2rem; }
    .body-txt   { color: var(--muted); line-height: 1.75; font-size: .97rem; margin-bottom: .8rem; }

    .tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: .8rem 0; }
    .tags span {
      font-size: .75rem; font-weight: 600;
      background: var(--lav-pale); border: 1px solid var(--lav-soft);
      color: var(--lav-lo); padding: 5px 14px; border-radius: 980px;
    }

    /* ── PROCESO ── */
    .steps {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
      gap: 1.2rem;
    }
    .step {
      background: var(--tint); border: 1px solid var(--border);
      border-radius: var(--r); padding: 2.2rem 1.7rem; position: relative;
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .step:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(124,111,205,.1); }
    .step-n {
      position: absolute; top: 1.4rem; right: 1.4rem;
      width: 26px; height: 26px; border-radius: 50%;
      background: var(--lav); color: #fff;
      font-weight: 700; font-size: .78rem;
      display: flex; align-items: center; justify-content: center;
    }
    .step-ico {
      width: 48px; height: 48px; border-radius: 12px;
      background: var(--lav-pale); color: var(--lav);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; border: 1px solid var(--lav-soft); margin-bottom: 1.1rem;
    }
    .step h4 { font-size: .97rem; font-weight: 700; color: var(--text); margin-bottom: .45rem; }
    .step p  { font-size: .85rem; color: var(--muted); line-height: 1.65; }

    /* ── TESTIMONIOS ── */
    .testi-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
      gap: 1.2rem;
    }
    .tcard {
      background: var(--bg); border: 1px solid var(--border);
      border-radius: var(--r); padding: 2.2rem 2rem;
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i,0) * .09s);
    }
    .tcard:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(124,111,205,.1); }
    .tcard-q { font-size: 3.5rem; line-height: .8; color: var(--lav-soft); font-family: Georgia,serif; margin-bottom: .3rem; }
    .tcard p  { color: var(--text-2); font-size: .95rem; line-height: 1.72; margin-bottom: 1.3rem; font-style: italic; }
    .stars    { color: #f59e0b; font-size: .8rem; display: flex; gap: .1rem; margin-bottom: 1.1rem; }
    .tcard-who { display: flex; align-items: center; gap: .75rem; }
    .tcard-av {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--lav-pale); border: 1.5px solid var(--lav-soft);
      color: var(--lav-lo); font-weight: 800;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .tcard-who strong { display:block; font-size:.88rem; font-weight:700; color:var(--text); }
    .tcard-who small  { font-size:.76rem; color:var(--muted); }

    /* ── CTA ── */
    .cta-sec {
      background: linear-gradient(135deg, var(--lav-lo) 0%, var(--lav) 50%, var(--lav-hi) 100%);
      padding: 6rem 0;
    }
    .cta-w {
      display: grid; grid-template-columns: 1fr auto;
      align-items: center; gap: 3rem;
    }
    .cta-w h2 {
      font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 700;
      color: #fff; letter-spacing: -.03em; line-height: 1.05; margin: .4rem 0 .7rem;
    }
    .cta-w p { color: rgba(255,255,255,.7); font-size: 1rem; }
    .cta-btns { display: flex; flex-direction: column; gap: .8rem; align-items: flex-end; }

    /* ── CONTACTO ── */
    .cc-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 1.2rem;
    }
    .cc {
      background: var(--tint); border: 1px solid var(--border); border-radius: var(--r);
      padding: 1.8rem 1.5rem;
      display: flex; flex-direction: column; align-items: center; text-align: center; gap: .5rem;
      text-decoration: none;
      transition: transform .22s, box-shadow .22s, border-color .22s;
      transition-delay: calc(var(--i,0) * .07s);
    }
    .cc:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(124,111,205,.1); border-color: var(--lav-mid); }
    .cc-ic {
      width: 48px; height: 48px; border-radius: 12px;
      background: var(--lav-pale); color: var(--lav);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; border: 1px solid var(--lav-soft); margin-bottom: .2rem;
    }
    .cc-wa-ic { background: rgba(34,197,94,.1); color: #16a34a; border-color: rgba(34,197,94,.25); }
    .cc strong { font-size: .88rem; font-weight: 700; color: var(--text); }
    .cc span   { font-size: .83rem; color: var(--muted); }

    /* ── HORARIOS ── */
    .hr-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 1.2rem;
    }
    .hc {
      background: var(--bg); border: 1px solid var(--border);
      border-radius: var(--r); padding: 2.5rem 1.5rem; text-align: center;
      transition: transform .22s, box-shadow .22s;
      transition-delay: calc(var(--i,0) * .08s);
    }
    .hc:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(124,111,205,.1); }
    .hc > i { font-size: 1.8rem; color: var(--lav); margin-bottom: .8rem; display: block; }
    .hc h4   { font-weight: 700; color: var(--text); margin-bottom: .4rem; font-size: .95rem; }
    .htime   { font-size: 1.5rem; font-weight: 700; color: var(--lav); margin-bottom: .35rem; }
    .hc p    { color: var(--muted); font-size: .84rem; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1100px) {
      .hero-float { display: none; }
    }

    @media (max-width: 900px) {
      .hero-inner  { align-items: center; text-align: center; }
      .hero-tag    { text-align: center; }
      .hero-p      { max-width: 100%; }
      .hero-ctas   { justify-content: center; }
      .hero-profile { justify-content: center; }

      .about-w { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-img { justify-content: center; }
      .about-avatar { width: 180px; height: 180px; }
      .about-txt { text-align: center; }
      .about-txt .tags { justify-content: center; }

      .cta-w { grid-template-columns: 1fr; text-align: center; }
      .cta-btns { align-items: center; }
    }

    @media (max-width: 600px) {
      .sec  { padding: 4.5rem 0; }
      .hero-h { font-size: clamp(2.6rem, 11vw, 4.5rem); }
      .hero-ctas { flex-direction: column; width: 100%; }
      .btn-primary, .btn-ghost { justify-content: center; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  info: any = {};
  ctaLink   = '/registro';
  ctaParams: any = null;
  ctaLabel  = 'Reservar cita';
  pct       = 0;

  tags = ['Cognitivo-conductual', 'Terapia sistémica', 'Sexología clínica', 'Mindfulness'];

  marqueeWords = [
    'Ansiedad ·', 'Autoestima ·', 'Terapia de pareja ·', 'Sexología ·',
    'Duelo ·', 'Mindfulness ·', 'Orientación laboral ·', 'Bienestar ·',
    'Terapia individual ·', 'Crevillent · Alicante ·', 'Online ·',
  ];

  services = [
    { icon: 'fas fa-brain',      title: 'Terapia individual',  price: '60 €/sesión', desc: 'Ansiedad, depresión, autoestima, duelo y gestión emocional.' },
    { icon: 'fas fa-heart',      title: 'Terapia de pareja',   price: '70 €/sesión', desc: 'Comunicación, crisis de pareja, duelos y reconciliación.' },
    { icon: 'fas fa-venus-mars', title: 'Sexología',           price: '60 €/sesión', desc: 'Disfunciones sexuales, educación y salud sexual.' },
    { icon: 'fas fa-briefcase',  title: 'Orientación laboral', price: '50 €/sesión', desc: 'CV, portfolio, entrevistas y videocurriculums.' },
    { icon: 'fas fa-users',      title: 'Talleres y grupos',   price: 'Consultar',   desc: 'Duelo, autoestima, biodanza y habilidades sociales.' },
    { icon: 'fas fa-building',   title: 'Empresas',            price: 'Consultar',   desc: 'Motivación, comunicación y habilidades en equipo.' },
  ];

  steps = [
    { icon: 'fas fa-phone-alt',      title: 'Contáctame',          desc: 'Llama, escribe por WhatsApp o rellena el formulario.' },
    { icon: 'fas fa-calendar-check', title: 'Primera consulta',    desc: 'Una sesión gratuita para conocernos sin compromiso.' },
    { icon: 'fas fa-clipboard-list', title: 'Plan personalizado',  desc: 'Diseñamos juntos un plan terapéutico a tu medida.' },
    { icon: 'fas fa-seedling',       title: 'Avanzas',             desc: 'Con sesiones regulares progresamos hacia tu bienestar.' },
  ];

  testimonials = [
    { name: 'Ana M.',    service: 'Terapia individual',  text: 'Gracias a Dolores pude superar mi ansiedad. Su enfoque cercano y profesional marcó la diferencia.' },
    { name: 'Carlos R.', service: 'Terapia de pareja',   text: 'Nuestra relación cambió por completo. Aprendimos a comunicarnos y entendernos de verdad.' },
    { name: 'Laura G.',  service: 'Orientación laboral', text: 'Encontré trabajo en pocas semanas con su ayuda. El portfolio que diseñamos juntas fue clave.' },
  ];

  private obs!: IntersectionObserver;
  private ticking = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>('/api/info').subscribe({
      next: r => { (r.info||[]).forEach((i:any) => { this.info[i.key] = i.value; }); },
      error: () => {}
    });
    this.auth.user$.subscribe(u => {
      if (u?.role === 'patient') { this.ctaLink='/mi-area'; this.ctaParams={tab:'reservar'}; this.ctaLabel='Reservar cita'; }
      else if (u?.role === 'admin') { this.ctaLink='/admin'; this.ctaParams=null; this.ctaLabel='Panel admin'; }
      else { this.ctaLink='/registro'; this.ctaParams=null; this.ctaLabel='Reservar cita'; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); this.obs.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => this.obs.observe(el));
    }, 80);
  }

  ngOnDestroy(): void { this.obs?.disconnect(); }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.pct = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100);
      this.ticking = false;
    });
  }

  waLink() { return this.info.whatsapp ? 'https://wa.me/'+this.info.whatsapp.replace(/\D/g,'') : '#'; }
  scrollTo(id: string) { setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }), 50); }
}
