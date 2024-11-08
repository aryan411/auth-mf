import { Component, DoCheck, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../../shared/services/signup/signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { BaseComponent } from 'auth-guards';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'], 
})
export class SignupComponent extends BaseComponent {
  signupForm: FormGroup;
  public loading: boolean = false; 
  errorMessage: string | null = null;
  showPassword = false;
  faEye = faEye;
  faEyeClose = faEyeLowVision;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      // custom validator
      { validator: this.passwordMatchValidator }
    );
  }

  // Check if the password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Submit the form
  onSubmit = () => {
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    console.log(this.loading, 'loading');

    const { firstName, lastName, email, password } = this.signupForm.value;
    // Call the signup service to register the user
    const signupSubscriptions = this.signupService
      .signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        userId: 0,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Signup failed:', error);
          alert(error);
          this.errorMessage =
            error.message ||
            'An error occurred during signup. Please try again.';
        },
      });

    this.addSubscription(signupSubscriptions);
  };
}
