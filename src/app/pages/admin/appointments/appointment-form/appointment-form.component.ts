import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  template: ''
})
export class AppointmentFormComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() { this.router.navigate(['/admin/appointments']); }
}
