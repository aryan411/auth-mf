import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user/user.service';
import { LoginService } from './services/login/login.service';
import { SignupService } from './services/signup/signup.service';
import { InputHighlightDirective } from './directives/auto-focus/input-highlight.directive';
import { PasswordStrengthDirective } from './directives/password-strength/password-strength.directive';

@NgModule({
  declarations: [InputHighlightDirective, PasswordStrengthDirective],
  imports: [CommonModule],
  providers: [UserService, LoginService, SignupService],
  exports: [InputHighlightDirective, PasswordStrengthDirective],
})
export class SharedModule {}
