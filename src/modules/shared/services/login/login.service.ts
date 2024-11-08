// login.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.model';
import { TokenService } from 'auth-guards';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  // log in the user
  login(
    email: string,
    password: string,
  ): Observable<User | null> {
    const user = this.userService.findUserByEmailAndPassword(email,password);

    if (user) {
      this.tokenService.setToken(user.userId.toString(), window.location.hostname);
      return of(user); 
    } else {
      // Handle login failure
      return throwError(
        () => new Error('Login failed. Please check your credentials.')
      );
    }
  }

  
}
