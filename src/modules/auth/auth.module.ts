import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomErrorHandler, HttpErrorInterceptor } from 'auth-guards';
import { SharedPackagesModule } from '../shared-packages/shared-packages.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    SharedPackagesModule,
  ],
  //custom Error handlers available globally
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class AuthModule {}
