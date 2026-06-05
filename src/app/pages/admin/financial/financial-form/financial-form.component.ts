import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-financial-form', standalone: true, template: '' })
export class FinancialFormComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() { this.router.navigate(['/admin/financial']); }
}
