import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../shared/services/login/login.service';
import { Router } from '@angular/router';
import {
  faEye,
  faEyeLowVision,
} from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'auth-guards';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  showPassword = false;
  faEye = faEye;
  faEyeClose = faEyeLowVision;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const { email, password } = this.loginForm.value;

    // Call login service
    const loginSubscription = this.loginService
      .login(email, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (user) => {
          console.log('Login Successful:', user);
          this.errorMessage = null;

          this.router.navigate(['/']);
        },
        error: (error) => {
          alert(error);
          console.error('Login Error:', error);
          this.errorMessage = error.message;
        },
      });

    this.addSubscription(loginSubscription);
  }
}
