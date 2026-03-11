import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container text-center py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="display-1 text-muted">404</h1>
          <h2 class="mb-4">Página no encontrada</h2>
          <p class="lead mb-4">La página que buscas no existe o ha sido movida.</p>
          <a routerLink="/home" class="btn btn-primary btn-lg">
            <i class="fas fa-home me-2"></i>
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .display-1 {
      font-size: 6rem;
      font-weight: 300;
    }
  `]
})
export class NotFoundComponent {} 