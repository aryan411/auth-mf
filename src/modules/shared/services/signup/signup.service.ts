import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import { User } from '../../models/user.model'; // Assuming you have a User model
import { TokenService } from 'auth-guards'; // If you're using a token service for auth
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  // register a new user
  signup(user: User): Observable<User | null> {
    // Check if user already exists
    const existingUser = this.userService.findUserByEmail(user.email);

    if (existingUser) {
      // User already exists, throw error
      return throwError(() => new Error('Email already exists.'));
    }

    this.userService.createUser(user);

    this.tokenService.setToken(
      user.userId.toString(),
      window.location.hostname
    );

    return of(user);
  }
}
