import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { ConsultationService } from '../../services/consultation.service'; // DESACTIVADO: descomentar cuando el backend esté desplegado
// import { ConsultationInfo } from '../../models/consultation.model'; // DESACTIVADO: descomentar cuando el backend esté desplegado


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    


    <header class="hero-pro-center" id="inicio">
      <div class="hero-center-content hero-center-content-spaced">
        <div class="hero-center-text hero-center-text-spaced-left">
          <h1 class="hero-title-clean">DEVESAN</h1>
          <h2 class="hero-subtitle-clean">Psicología, Sexología y Terapia de Pareja</h2>
          <p class="hero-desc-clean">
            Atención profesional y cercana para tu bienestar emocional y personal.<br>
            Especialista en sexología, terapia de pareja, autoestima, orientación laboral y gestion de duelo.
          </p>
        </div>
        <div class="hero-center-logo hero-center-logo-spaced">
          <img src="/logosinfondo.png" alt="Logo DEVESAN" class="main-logo-clean" />
        </div>
      </div>
    </header>


    <main class="main-content-clean">
      <section class="mb-5" id="servicios">
        <h2 class="text-center mb-4 section-title-clean">Servicios</h2>
        <div class="services-grid">
          <div class="service-card-pro">
            <div class="service-icon service-icon-heart"><i class="fas fa-heart"></i></div>
            <h5>Terapia de pareja y relaciones</h5>
            <ul>
              <li>Terapia de pareja y desengaños amorosos</li>
              <li>Acompañamiento en divorcio, duelo y crisis personales/interpersonales</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-sex"><i class="fas fa-venus-mars"></i></div>
            <h5>Sexología</h5>
            <ul>
              <li>Terapia sexual y Tratamiento de disfunciones sexuales</li>
              <li>Educación en sexualidad a niños y adolescentes</li>
              <li>Apoyo a parejas con problemas reproductivos</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-growth"><i class="fas fa-user-astronaut"></i></div>
            <h5>Autoestima y crecimiento personal</h5>
            <ul>
              <li>Taller de autoconocimiento y autoestima</li>
              <li>Preparación para hablar en público</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-work"><i class="fas fa-briefcase"></i></div>
            <h5>Orientación laboral</h5>
            <ul>
              <li>Elaboración de currículums y portfolios</li>
              <li>Perfiles en redes y bolsas de trabajo</li>
              <li>Preparación para entrevistas</li>
              <li>Elaboración de videocurriculums</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-business"><i class="fas fa-building"></i></div>
            <h5>Servicios a empresas</h5>
            <ul>
              <li>Curso: Motivación para el trabajo y productividad</li>
              <li>Estilos de comunicación</li>
              <li>Habilidades sociales</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-group"><i class="fas fa-users"></i></div>
            <h5>Grupos de duelo y gestión de traumas</h5>
            <ul>
              <li>Grupos de duelo</li>
              <li>Asociación amigos para hacer amigos</li>
              <li>Redes de apoyo</li>
            </ul>
          </div>
          <div class="service-card-pro">
            <div class="service-icon service-icon-taller"><i class="fas fa-chalkboard-teacher"></i></div>
            <h5>Talleres</h5>
            <ul>
              <li>Taller de autoestima y autoconocimiento</li>
              <li>Taller de habilidades sociales y estilos de comunicacion</li>
              <li>Taller de gestión emocional</li>
              <li>Taller de comunicación asertiva</li>
              <li>Taller de biodanza</li>
              <li>Taller de risoterapia</li>
            </ul>
          </div>
        </div>
      </section>


      <section class="mb-5" id="sobre">
        <h2 class="text-center mb-4 section-title-clean">Sobre Dolores Devesa Santacruz</h2>
        <div class="row justify-content-center align-items-center">
          <div class="col-md-3 text-center mb-3 mb-md-0">
            <img src="/image.png" alt="Dolores Devesa Santacruz" class="about-photo-temp">
          </div>
          <div class="col-md-7">
            <div class="about-text">
              <p>Psicóloga, Sexóloga y Terapeuta de Pareja con amplia experiencia en el acompañamiento emocional y el desarrollo personal. Comprometida con el bienestar de sus pacientes y la mejora de la calidad de vida a través de la intervención psicológica, la educación sexual y la terapia de pareja.</p>
            </div>
          </div>
        </div>
      </section>


      <section class="mb-5" id="contacto">
        <h2 class="text-center mb-4 section-title-clean">Contacto</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-md-4">
            <div class="contact-card text-center">
              <i class="fas fa-phone fa-2x mb-2" style="color:#3b82f6;"></i>
              <h5 class="mb-1">Teléfono</h5>
              <!-- ESTÁTICO: volver a {{ consultationInfo?.phone || '+34 XXX XXX XXX' }} cuando el backend esté desplegado -->
              <p class="mb-0">+34 XXX XXX XXX</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="contact-card text-center">
              <i class="fas fa-envelope fa-2x mb-2" style="color:#10b981;"></i>
              <h5 class="mb-1">Email</h5>
              <!-- ESTÁTICO: volver a {{ consultationInfo?.email || 'consulta@psicologia.com' }} cuando el backend esté desplegado -->
              <p class="mb-0">consulta&#64;devesan.com</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="contact-card text-center">
              <i class="fas fa-map-marker-alt fa-2x mb-2" style="color:#f59e42;"></i>
              <h5 class="mb-1">Dirección</h5>
              <!-- ESTÁTICO: volver a {{ consultationInfo?.address || 'Dirección de la consulta' }} cuando el backend esté desplegado -->
              <p class="mb-0">Crevillent, Alicante</p>
            </div>
          </div>
        </div>
      </section>


      <section class="mb-5" id="horarios">
        <h2 class="text-center mb-4 section-title-clean">Horarios</h2>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="service-card text-center">
              <div class="row">
                <div class="col-6">
                  <h5>Lunes a Viernes</h5>
                  <p>9:00 - 18:00</p>
                </div>
                <div class="col-6">
                  <h5>Sábados</h5>
                  <p>9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="mb-5" id="mision-vision">
        <h2 class="text-center mb-4 section-title-clean">Misión, Visión y Valores</h2>
        <div class="row justify-content-center align-items-stretch mb-4">
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="mission-vision-card mission-card h-100">
              <div class="mv-icon">🧭</div>
              <h4 class="mv-title">MISIÓN</h4>
              <p class="mv-text">Brindar acompañamiento psicológico profesional, cercano y ético a personas, parejas y familias que buscan mejorar su bienestar emocional, relacional y sexual, promoviendo el autoconocimiento, la salud mental y el desarrollo personal en un espacio de seguridad, respeto y escucha activa.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="mission-vision-card vision-card h-100">
              <div class="mv-icon">🌱</div>
              <h4 class="mv-title">VISIÓN</h4>
              <p class="mv-text">Convertirnos en un centro de referencia en Crevillent y alrededores en el ámbito de la psicoterapia individual, de pareja y sexología, destacando por una atención integradora, humana y basada en la evidencia, que contribuya a una comunidad emocionalmente más sana, empática y consciente.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="mission-vision-card values-card h-100 text-center">
              <div class="mv-icon"><i class="fas fa-heart"></i></div>
              <h4 class="mv-title">VALORES</h4>
              <ul class="mv-values-list">
                <li>Respeto</li>
                <li>Autenticidad</li>
                <li>Compromiso</li>
                <li>Compasión</li>
                <li>Confidencialidad</li>
              </ul>
            </div>
          </div>
        </div>


      </section>
    </main>


    <footer class="text-center mt-5 mb-3">
      <a routerLink="/admin-login" style="font-size: 0.9em; color: #888; text-decoration: underline;">Acceso administración</a>
    </footer>
  `,
  styles: [
    `
    .main-navbar {
      width: 100vw;
      background: #fffbe7;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 2px 12px 0 rgba(255,193,7,0.04);
      padding: 0.5rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .clean-navbar {
      background: transparent;
      box-shadow: none;
      padding: 1rem 0;
    }
    .navbar-content {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
    }
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 800;
      color: #bfa046;
      letter-spacing: 2px;
      margin-right: 2rem;
    }
    .navbar-logo { display: none; }
    .navbar-links {
      list-style: none;
      display: flex;
      gap: 2.2rem;
      margin: 0;
      padding: 0;
    }
    .navbar-links li a {
      text-decoration: none;
      color: #232946;
      font-weight: 600;
      font-size: 1.08rem;
      letter-spacing: 0.5px;
      transition: color 0.2s;
      border-bottom: 2px solid transparent;
      padding-bottom: 2px;
    }
    .navbar-links li a:hover {
      color: #bfa046;
      border-bottom: 2px solid #bfa046;
    }
    header.hero-pro-center {
      width: 100vw;
      background: linear-gradient(90deg, #fffbe7 0%, #f8fafc 100%);
      padding: 2.5rem 0 2rem 0;
      margin-bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #e5e7eb;
    }
    .hero-center-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
    }
    .hero-center-content-spaced {
      gap: 2.5rem;
    }
    .hero-center-text {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      text-align: right;
      flex: 1 1 0;
      min-width: 0;
    }
    .hero-center-text-spaced {
      margin-right: 0.5rem;
    }
    .hero-center-text-spaced-left {
      align-items: flex-start !important;
      text-align: left !important;
      margin-right: 0.5rem;
      flex: 2;
    }
    .hero-title-clean {
      font-size: 2.7rem;
      font-weight: 900;
      color: #bfa046;
      margin-bottom: 0.2rem;
      letter-spacing: 2px;
      line-height: 1.1;
    }
    .hero-subtitle-clean {
      font-size: 1.25rem;
      font-weight: 600;
      color: #232946;
      margin-bottom: 0.7rem;
      letter-spacing: 0.5px;
    }
    .hero-desc-clean {
      font-size: 1.08rem;
      color: #444;
      margin-bottom: 0;
      max-width: 420px;
      line-height: 1.5;
    }
    .hero-center-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }
    .hero-center-logo-spaced {
      margin-left: 0.5rem;
    }
    .main-logo-clean {
      max-width: 240px;
      width: 100%;
      height: auto;
      object-fit: contain;
      display: block;
      border-radius: 12px;
      box-shadow: 0 2px 12px 0 rgba(191,160,70,0.07);
      background: #fffbe7;
      padding: 0.3rem 0.3rem 0.2rem 0.3rem;
    }
    @media (max-width: 991px) {
      .main-logo-clean { max-width: 120px; }
    }
    @media (max-width: 767px) {
      .main-logo-clean { max-width: 90px; }
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 2.2rem;
      max-width: 1100px;
      margin: 0 auto 1.5rem auto;
      padding: 0 1rem;
    }
    .service-card-pro {
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 4px 24px 0 rgba(191,160,70,0.08), 0 1.5px 6px 0 rgba(59,130,246,0.06);
      padding: 2.2rem 1.5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: box-shadow 0.3s, transform 0.3s;
      border: 1.5px solid #f3e9c7;
      position: relative;
      min-height: 270px;
    }
    .service-card-pro:hover {
      box-shadow: 0 8px 32px 0 rgba(191,160,70,0.18);
      transform: translateY(-6px) scale(1.025);
      border-color: #ffe082;
    }
    .service-icon {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1.1rem;
      box-shadow: 0 2px 8px 0 rgba(191,160,70,0.10);
    }
    .service-icon-heart { background: linear-gradient(135deg, #ffb6b9 60%, #ffe082 100%); color: #b71c1c; }
    .service-icon-sex { background: linear-gradient(135deg, #b2ebf2 60%, #ffe082 100%); color: #006064; }
    .service-icon-growth { background: linear-gradient(135deg, #c3aed6 60%, #ffe082 100%); color: #512da8; }
    .service-icon-work { background: linear-gradient(135deg, #ffe082 60%, #b2dfdb 100%); color: #bfa046; }
    .service-icon-mind { background: linear-gradient(135deg, #b2dfdb 60%, #ffe082 100%); color: #00897b; }
    .service-icon-group { background: linear-gradient(135deg, #ffd6e0 60%, #ffe082 100%); color: #ad1457; }
    .service-icon-business { background: linear-gradient(135deg, #ffe082 60%, #b3c6e7 100%); color: #1a237e; }
    .service-icon-taller { background: linear-gradient(135deg, #ffe082 60%, #b2dfdb 100%); color: #795548; }
    .service-card-pro h5 {
      font-size: 1.18rem;
      font-weight: 700;
      color: #232946;
      margin-bottom: 0.7rem;
      margin-top: 0;
    }
    .service-card-pro ul {
      padding-left: 1.1rem;
      margin-bottom: 0;
      color: #444;
      font-size: 1.04rem;
      list-style: disc;
    }
    .service-card-pro ul li {
      margin-bottom: 0.3rem;
    }
    @media (max-width: 991px) {
      .services-grid { grid-template-columns: 1fr; }
      .main-logo-clean { max-width: 120px; }
    }
    @media (max-width: 767px) {
      .main-logo-clean { max-width: 90px; }
    }
    .mission-vision-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 18px 0 rgba(191,160,70,0.07), 0 1.5px 6px 0 rgba(59,130,246,0.04);
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1.5px solid #f3e9c7;
      min-height: 260px;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .mission-vision-card:hover {
      box-shadow: 0 8px 32px 0 rgba(191,160,70,0.13);
      transform: translateY(-4px) scale(1.015);
      border-color: #ffe082;
    }
    .mv-icon {
      font-size: 2.2rem;
      margin-bottom: 0.7rem;
    }
    .mv-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #bfa046;
      margin-bottom: 0.5rem;
      margin-top: 0;
      letter-spacing: 1px;
    }
    .mv-text {
      color: #444;
      font-size: 1.04rem;
      text-align: center;
      margin-bottom: 0;
    }
    .values-card {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 18px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow 0.3s, transform 0.3s;
      min-height: 260px;
    }
    .values-card:hover {
      box-shadow: 0 8px 32px 0 rgba(191,160,70,0.13);
      transform: translateY(-4px) scale(1.015);
    }
    .mv-values-list {
      list-style: none;
      padding: 0;
      margin: 0;
      color: #444;
      font-size: 1.04rem;
      text-align: center;
    }
    .mv-values-list li {
      margin-bottom: 0.5rem;
    }
    @media (max-width: 991px) {
      .mission-vision-card { min-height: 0; }
    }
  `]
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // consultationInfo: ConsultationInfo | null = null; // DESACTIVADO: descomentar cuando el backend esté desplegado

  // constructor(private consultationService: ConsultationService) {} // DESACTIVADO: descomentar cuando el backend esté desplegado

  // ngOnInit(): void { // DESACTIVADO: descomentar cuando el backend esté desplegado
  //   this.loadConsultationInfo();
  // }

  // private loadConsultationInfo(): void {
  //   this.consultationService.getConsultationInfo().subscribe({
  //     next: (info) => { this.consultationInfo = info; },
  //     error: (error) => { console.error('Error loading consultation info:', error); }
  //   });
  // }
}
