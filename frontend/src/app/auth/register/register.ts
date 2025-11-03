import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  serverError: string | null = null;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  onRegister() {
    this.serverError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this.auth.register(payload).subscribe({
      next: (res: any) => {
        // success — redirect to login
        console.log('Register success', res);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Register failed', err);
        // Try to surface a helpful error message
        this.serverError = err?.error?.message || err?.message || 'Registration failed';
      },
    });
  }
}
