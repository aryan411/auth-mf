import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from 'projects/auth-mf/src/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = environment.USER_DATA;
  private users: User[] = [];
  private nextId = 1;

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    console.table(this.users);
    this.http.get<User[]>(this.userUrl).subscribe((data) => {
      this.users = data;
      if (this.users.length > 0) {
        this.nextId = Math.max(...this.users.map((user) => user.userId)) + 1;
      }
    });
  }

  // Create a new user
  createUser(user: Omit<User, 'userId'>): User {
    console.table(this.users);
    const newUser: User = { ...user, userId: this.nextId++ };
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  // Read all users
  getUsers(): Observable<User[]> {
    console.table(this.users);
    return this.http.get<User[]>(this.userUrl);
  }

  // Update a user
  updateUser(updatedUser: User): boolean {
    console.table(this.users);
    const index = this.users.findIndex(
      (user) => user.userId === updatedUser.userId
    );
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
      return true;
    }
    return false;
  }

  // Delete a user
  deleteUser(userId: number): boolean {
    console.table(this.users);
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsers();
      return true;
    }
    return false;
  }

  // Find user by email and password
  findUserByEmailAndPassword(email: string, password: string): User | null {
    console.table(this.users);
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  }

  findUserByEmail(email: string): User | null {
    console.table(this.users);
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  private saveUsers(): void {
    console.table(this.users);
    // This function should handle saving the users array back to the user.json file
    // In a real application, you'd likely need to use a backend API for this.
    console.log('Users saved to JSON:', this.users);
  }
}
