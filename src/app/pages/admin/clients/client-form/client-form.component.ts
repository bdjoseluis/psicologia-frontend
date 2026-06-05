import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  template: ''
})
export class ClientFormComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() { this.router.navigate(['/admin/clients']); }
}
