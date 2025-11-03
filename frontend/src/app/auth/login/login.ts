import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { register } from 'module';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  router = inject(Router);
  constructor(private fb: FormBuilder, private authService: Auth) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login Successful..', res);
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
      },
    });
  }
  // gotoRegister(): void {
  //   this.router.navigate(['/register', register]);
  //   console.log('Registeration Components');
  // }
}
